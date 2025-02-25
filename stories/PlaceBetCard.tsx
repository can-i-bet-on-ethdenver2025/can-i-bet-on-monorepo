"use client";

import { GET_POOL } from "@/app/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUsdcBalance } from "@/components/useUsdcBalance";
import { PoolStatus } from "@/lib/__generated__/graphql";
import { optionColorClasses } from "@/lib/config";
import { USDC_DECIMALS, usdcAmountToDollars } from "@/lib/utils";
import { BetButton } from "@/stories/BetButton";
import { useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Custom hook for fetching USDC balance

interface PlaceBetCardProps {
  poolId: string;
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

export const PlaceBetCard = ({ poolId }: PlaceBetCardProps) => {
  const { usdcBalance, isLoadingBalance, currentChainId } = useUsdcBalance();
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

  const {
    data,
    loading,
    error: queryError,
  } = useQuery(GET_POOL, {
    variables: { poolId },
  });

  // Handle MAX button click
  const handleMaxClick = () => {
    if (usdcBalance && parseFloat(usdcBalance) > 0) {
      // Limit to 10000 as per the form validation
      const maxAmount = Math.min(parseFloat(usdcBalance), 10000).toString();
      setValue("betAmount", maxAmount, { shouldValidate: true });
    }
  };

  if (queryError) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="py-4">
          <div className="text-red-500">
            Error loading bet data. Please try again later:
            {queryError.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data?.pool) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="py-4">
          <div className="text-red-500 text-center font-medium">
            Pool {poolId} not found
          </div>
        </CardContent>
      </Card>
    );
  }

  const betAmount = watch("betAmount");
  const betAmountInUSDC =
    parseFloat(betAmount || "0") * Math.pow(10, USDC_DECIMALS);
  const { totalBets, totalBetsByOption, options, status } = data.pool;
  const totalPool = parseFloat(data.pool.totalBets);
  const bettingOpen = data.pool.status === PoolStatus.Pending;

  // Calculate potential earnings
  const calculateEarnings = (optionIndex: number) => {
    const optionTotal = parseFloat(totalBetsByOption[optionIndex]);

    if (!betAmountInUSDC) {
      return 0;
    }

    // If there's no bets on the other side (i.e this option is 100% of the pool), you win your bet amount back
    if (optionTotal === totalPool) {
      return 0;
    }

    return (
      (betAmountInUSDC / (optionTotal + betAmountInUSDC)) *
      (totalPool + betAmountInUSDC) -
      betAmountInUSDC
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Place a bet</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="relative">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
              $
            </span>
            <input
              id="betAmount"
              type="number"
              {...register("betAmount")}
              className={`w-full pl-10 pr-24 py-4 text-xl rounded-2xl border transition-colors focus:outline-none ${
                errors.betAmount
                  ? "border-red-500"
                  : "border-primary/60 hover:border-primay/80 focus:border-primary"
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
                className="text-primary hover:text-primary/80 font-bold text-sm transition-colors"
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
                  : `Balance: $${usdcBalance || 0}`}
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
            const earnings = calculateEarnings(index);
            console.log('Earnings:', earnings);
            const colorClassnames = optionColorClasses[index];

            return (
              <div key={index} className="flex flex-col items-center gap-2">
                <BetButton
                  option={option}
                  optionIndex={index}
                  poolId={poolId}
                  chainId={currentChainId}
                  disabled={!bettingOpen || !!errors.betAmount}
                  amount={betAmountInUSDC.toString()}
                  colorClassnames={colorClassnames}
                />
                <div
                  className={`flex flex-col items-center gap-2 ${optionColorClasses[index].text}`}
                >
                  <p className="text-lg font-bold">
                    +{usdcAmountToDollars(earnings)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
