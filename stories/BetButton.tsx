"use client";
//TODO Doesn't support Option A or B, hardcoded to Yes and No
import { placeBet } from "@/lib/betting";
import {
  CHAIN_CONFIG,
  MAX_OPTIONS,
  optionColor,
  OptionColorClasses,
} from "@/lib/config";
import { cn, usdcAmountToDollars } from "@/lib/utils";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useState } from "react";

type BetButtonProps = {
  option: string;
  optionIndex: number;
  colorClassnames: OptionColorClasses;
  isSelected?: boolean;
  poolId: string;
  chainId: string | number;
  /**
   * @deprecated This prop is deprecated and will be removed in a future version.
   * The button's disabled state is now handled internally based on loading state.
   */
  disabled?: boolean;
  amount: string;
  // New props for earnings calculation
  totalBetsByOption?: string[];
  totalBets?: string;
};

export const BetButton = ({
  option,
  optionIndex,
  colorClassnames,
  poolId,
  chainId,
  disabled,
  amount,
  totalBetsByOption = [],
  totalBets = "0",
}: BetButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { ready, wallets } = useWallets();
  const { login, authenticated } = usePrivy();
  const chainConfig = CHAIN_CONFIG[chainId];

  // In Storybook/development, use mock data if real data isn't available

  // if (option.length > 24) {
  //   throw new Error("Option text cannot be longer than 24 characters");
  // }
  if (optionIndex < 0 || optionIndex >= MAX_OPTIONS) {
    throw new Error(`Invalid option index, can only be 0-${MAX_OPTIONS - 1}`);
  }

  // Log deprecation warning when disabled prop is used
  if (disabled !== undefined) {
    console.warn(
      "The 'disabled' prop in BetButton is deprecated and will be removed in a future version. " +
        "The button's disabled state is now handled internally based on loading state."
    );
  }

  // Calculate potential earnings
  const calculateEarnings = () => {
    if (
      !amount ||
      parseFloat(amount) === 0 ||
      !totalBetsByOption[optionIndex]
    ) {
      return 0;
    }

    const betAmountInUSDC = parseFloat(amount);
    const optionTotal = parseFloat(totalBetsByOption[optionIndex]);
    const totalPool = parseFloat(totalBets);

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

  const potentialEarnings = calculateEarnings();

  const handleClick = async () => {
    console.log("Handling click");

    // If the user is not signed in with Privy, show the popup to allow them to sign in
    if (!authenticated) {
      login();
      return;
    }

    const embeddedWallet = wallets.find(
      (wallet) => wallet.walletClientType === "privy"
    )!;
    try {
      setIsLoading(true);

      // Use the placeBet function from our betting library
      const txResult = await placeBet(
        embeddedWallet,
        chainId,
        poolId,
        optionIndex,
        amount
      );

      alert("Transaction submitted successfully!");
    } catch (error) {
      console.error("Error processing bet:", error);
      alert(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonStyles = {
    // selected: `bg-${color} text-white border-${color} font-bold`,
    disabled: `bg-gray-900/50 ${colorClassnames.border}/30 ${colorClassnames.text}/50`,
  };

  return (
    <button
      className={cn(
        `border-2 ${colorClassnames.border}`,
        "w-42 h-32 px-4 font-medium fond-bold rounded-xl",
        "flex flex-col items-center justify-center font-bold",
        colorClassnames.text,
        `hover:${colorClassnames.backgroundColor}/20`,
        isLoading
          ? `text-white hsl(var(--${optionColor[optionIndex]}-color))`
          : ""
      )}
      disabled={isLoading}
      type="button"
      onClick={handleClick}
      aria-busy={isLoading}
      aria-label={`Place bet on ${option}`}
      style={{
        WebkitAppearance: "none",
        MozAppearance: "textfield",
      }}
    >
      {/* {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-xl">
          <div
            className={`w-5 h-5 border-2 ${colorClassnames.border} border-t-transparent rounded-full animate-spin`}
          ></div>
        </div>
      ) : ( */}
      <div className="flex flex-col">
        <span
          className={`
              text-center line-clamp-2 mb-1`}
        >
          {option}
        </span>
        <span className={`text-[8px] text-gray-500`}>You could win</span>
        <span className={`text-lg font-medium`}>
          +{usdcAmountToDollars(potentialEarnings)}
        </span>
      </div>
      {/* )} */}
    </button>
  );
};
