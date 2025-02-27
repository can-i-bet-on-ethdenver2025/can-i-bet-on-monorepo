"use client";

import { GET_BETS } from "@/app/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useUsdcBalance } from "@/components/useUsdcBalance";
import {
  Bet_OrderBy,
  GetBetsQuery,
  GetPoolQuery,
  OrderDirection,
} from "@/lib/__generated__/graphql";
import { optionColorClasses } from "@/lib/config";
import { USDC_DECIMALS, usdcAmountToDollarsNumber } from "@/lib/utils";
import { BetButton } from "@/stories/BetButton";
import { ApolloError, useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWallets } from "@privy-io/react-auth";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
// Custom hook for fetching USDC balance

interface PlaceBetCardProps {
  pool: GetPoolQuery["pool"];
  loading: boolean;
  queryError?: ApolloError;
}

// const LoadingSkeleton = () => (
//   <Card className="w-full max-w-md mx-auto">
//     <CardHeader>
//       <Skeleton className="h-8 w-40" />
//     </CardHeader>
//     <CardContent className="space-y-4">
//       <div>
//         <Skeleton className="h-4 w-32 mb-2" />
//         <Skeleton className="h-10 w-full" />
//       </div>
//       <div className="grid grid-cols-2 gap-4">
//         <Skeleton className="h-32 w-full" />
//         <Skeleton className="h-32 w-full" />
//       </div>
//       <div className="space-y-2">
//         <Skeleton className="h-4 w-36" />
//         <Skeleton className="h-4 w-36" />
//       </div>
//     </CardContent>
//   </Card>
// );

const betFormSchema = z.object({
  betAmount: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)), "Must be a valid number")
    .refine((val) => parseFloat(val) > 0, "Bet amount must be greater than 0")
    .refine(
      (val) => parseFloat(val) <= 10000,
      "Maximum bet amount is 10,000 USDC"
    ),
});

type BetFormValues = z.infer<typeof betFormSchema>;

// Custom hook to fetch user bets for a specific pool
const useUserBets = (poolId: string, userAddress?: string) => {
  const [userBets, setUserBets] = useState<GetBetsQuery["bets"]>([]);

  // Only query if we have both poolId and userAddress
  const shouldFetch = !!poolId && !!userAddress;

  // Create filter for the query
  const filter = useMemo(() => {
    if (!shouldFetch) return {};
    return { pool: poolId, user: userAddress };
  }, [poolId, userAddress, shouldFetch]);

  // Query for initial data with polling for real-time updates
  const { data, loading, subscribeToMore } = useQuery(GET_BETS, {
    variables: {
      filter,
      orderBy: Bet_OrderBy.BlockTimestamp,
      orderDirection: OrderDirection.Desc,
    },
    skip: !shouldFetch,
    fetchPolicy: "network-only",
    pollInterval: 3000, // Poll every 3 seconds as a fallback
  });

  // Update state when data changes
  useEffect(() => {
    if (data?.bets) {
      setUserBets(data.bets);
    }
  }, [data]);

  // Set up subscription for real-time updates
  useEffect(() => {
    if (!shouldFetch) return;

    // Subscribe to new bets using the same query
    const unsubscribe = subscribeToMore({
      document: GET_BETS,
      variables: {
        filter,
        orderBy: Bet_OrderBy.BlockTimestamp,
        orderDirection: OrderDirection.Desc,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        // Extract the new bet from the subscription data
        const newBet = subscriptionData.data.bets?.[0];

        if (!newBet) return prev;

        // Check if the bet already exists in our list to avoid duplicates
        const betExists = prev.bets.some((bet) => bet.id === newBet.id);
        if (betExists) return prev;

        // Add the new bet at the beginning of the array (most recent first)
        return {
          ...prev,
          bets: [newBet, ...prev.bets],
        };
      },
    });

    // Clean up subscription when component unmounts
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [subscribeToMore, filter, shouldFetch]);

  return { userBets, loading };
};

// Helper function to calculate total bets by option
const calculateTotalsByOption = (bets: GetBetsQuery["bets"]) => {
  const totals: Record<string, number> = {};

  bets.forEach((bet) => {
    const optionIndex = bet.optionIndex;
    const amount = parseInt(bet.amount);

    if (!totals[optionIndex]) {
      totals[optionIndex] = 0;
    }

    totals[optionIndex] += amount;
  });

  return totals;
};

export const PlaceBetCard = ({ pool, loading }: PlaceBetCardProps) => {
  const { usdcBalance, isLoadingBalance, currentChainId } = useUsdcBalance();
  const { ready, wallets } = useWallets();
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy"
  );

  // Fetch user bets for this pool
  const { userBets, loading: loadingBets } = useUserBets(
    pool?.id,
    embeddedWallet?.address
  );

  // Calculate totals by option
  const userBetTotalsByOption = useMemo(() => {
    return calculateTotalsByOption(userBets);
  }, [userBets]);

  // Check if user has any bets
  const hasUserBets = userBets.length > 0;

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BetFormValues>({
    resolver: zodResolver(betFormSchema),
    defaultValues: {
      betAmount: "100",
    },
  });

  // Handle MAX button click
  const handleMaxClick = () => {
    if (usdcBalance && parseFloat(usdcBalance) > 0) {
      // Limit to 10000 as per the form validation
      const maxAmount = Math.min(parseFloat(usdcBalance), 10000).toString();
      setValue("betAmount", maxAmount, { shouldValidate: true });
    }
  };

  if (loading || !ready) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Place a bet</CardTitle>
        </CardHeader>
        <CardContent className="mt-2 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-36" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!pool) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="text-red-500 text-center font-medium">
          Pool not found
        </div>
      </div>
    );
  }

  const betAmount = watch("betAmount");
  const betAmountInUSDC =
    parseFloat(betAmount || "0") * Math.pow(10, USDC_DECIMALS);
  const { totalBetsByOption, options } = pool;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center leading-relaxed">
          {pool.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-center mb-2">Place a bet</p>

          <div className="relative">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
              $
            </span>
            <input
              id="betAmount"
              type="number"
              {...register("betAmount")}
              className={`w-full pl-10 pr-24 py-4 text-xl rounded-2xl border transition-colors focus:outline-none bg-black ${
                errors.betAmount
                  ? "border-red-500"
                  : "border-white/60 hover:border-primay/80 focus:border-white"
              } appearance-none`}
              min="0"
              step="1"
              placeholder="Bet amount"
              style={{
                WebkitAppearance: "none",
                MozAppearance: "textfield",
              }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-end">
              <button
                type="button"
                onClick={handleMaxClick}
                className="text-white hover:text-white/80 font-bold text-sm transition-colors"
                disabled={
                  isLoadingBalance ||
                  !usdcBalance ||
                  parseFloat(usdcBalance) <= 0
                }
              >
                MAX
              </button>
              <span className="text-xs text-gray-400 mt-1">
                {isLoadingBalance
                  ? "Loading balance..."
                  : `Balance: $${
                      usdcBalance
                        ? usdcAmountToDollarsNumber(parseFloat(usdcBalance))
                        : 0
                    }`}
              </span>
            </div>
          </div>
          {errors.betAmount && (
            <div className="text-sm text-red-500 mt-1">
              {errors.betAmount.message}
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => {
            const colorClassnames = optionColorClasses[index];

            return (
              <div
                key={index}
                className="flex flex-col items-center w-full h-[160px]"
              >
                <BetButton
                  option={option}
                  optionIndex={index}
                  poolId={pool.id}
                  chainId={currentChainId}
                  amount={betAmountInUSDC.toString()}
                  colorClassnames={colorClassnames}
                  totalBetsByOption={totalBetsByOption}
                  totalBets={pool.totalBets}
                />
              </div>
            );
          })}
        </div>

        {/* User's bets section - only show if user has bets and embedded wallet exists */}
        {embeddedWallet && hasUserBets && (
          <>
            <Separator className="my-2" />
            <div className="space-y-2">
              <p className="text-center font-medium">Your bets on this pool</p>
              <div className="space-y-2">
                {options.map((option, index) => {
                  const optionIndex = index.toString();
                  const amount = userBetTotalsByOption[optionIndex] || 0;

                  // Skip if user has no bets on this option
                  if (amount === 0) return null;

                  const colorClassnames = optionColorClasses[index];

                  return (
                    <div
                      key={`user-bet-${index}`}
                      className={`flex items-center justify-between p-3 rounded-lg border ${colorClassnames.border}`}
                    >
                      <span className={`font-medium ${colorClassnames.text}`}>
                        {option}
                      </span>
                      <span className="text-white font-medium">
                        ${usdcAmountToDollarsNumber(amount)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
