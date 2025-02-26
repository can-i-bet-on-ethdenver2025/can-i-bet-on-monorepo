"use client";
//TODO Doesn't support Option A or B, hardcoded to Yes and No
import { placeBet } from "@/lib/betting";
import { CHAIN_CONFIG, MAX_OPTIONS, OptionColorClasses } from "@/lib/config";
import { cn } from "@/lib/utils";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useState } from "react";

type BetButtonProps = {
  option: string;
  optionIndex: number;
  colorClassnames: OptionColorClasses;
  isSelected?: boolean;
  poolId: string;
  chainId: string | number;
  disabled?: boolean;
  amount: string;
};

export const BetButton = ({
  option,
  optionIndex,
  colorClassnames,
  poolId,
  chainId,
  disabled,
  amount,
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
  const handleClick = async () => {
    console.log("Handling click");

    // If the user is not signed in with Privy, show the popup to allow them to sign in
    if (!authenticated) {
      login();
      return;
    }

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
  //const isDisabled = disabled || !ready || !wallets?.[0] || !chainConfig;

  const buttonStyles = {
    // selected: `bg-${color} text-white border-${color} font-bold`,
    disabled: `bg-gray-900/50 ${colorClassnames.border}/30 ${colorClassnames.text}/50`,
  };

  console.log(buttonStyles);

  // if (!ready) {
  //   return (
  //     <div
  //       className={cn(
  //         `animate-pulse h-10 w-48 bg-gray-700`,
  //         `rounded-lg border-2 border-${color} text-${color} border-2`
  //       )}
  //     >
  //       Loading...
  //     </div>
  //   );
  // }
  // const isError =
  //   !wallets?.[0] || !chainConfig || !chainConfig.applicationContractAddress;

  // if (isError) {
  //   console.log("Could not render the BetButton: ", {
  //     ready,
  //     wallets,
  //     chainConfig,
  //     chainConfigApplicationContractAddress:
  //       chainConfig?.applicationContractAddress,
  //   });
  //   return <div>Failed to load betting options</div>;
  // }

  return (
    <button
      className={cn(
        `border-2 ${colorClassnames.border}`,
        "w-42 h-32 px-4 font-medium fond-bold rounded-xl",
        "flex items-center justify-center font-bold",
        `hover:${colorClassnames.backgroundColor}/20`,
        //isDisabled || (isError && buttonStyles.disabled)
      )}
      disabled={isLoading}
      type="button"
      onClick={handleClick}
      style={{
        WebkitAppearance: "none",
        MozAppearance: "textfield",
      }}
    >
      <span className={`text-center line-clamp-2 ${colorClassnames.text}`}>
        {isLoading ? "Processing bet..." : option}
      </span>
    </button>
  );
};
