//TODO Doesn't support Option A or B, hardcoded to Yes and No
import { CHAIN_CONFIG, optionColor } from "@/lib/config";
import { cn } from "@/lib/utils";
import { useWallets } from "@privy-io/react-auth";
import { useState } from "react";

type BetButtonProps = {
  option: string;
  optionIndex: number;
  isSelected?: boolean;
  poolId: string;
  chainId: string | number;
  disabled?: boolean;
  amount: string;
};

export const BetButton = ({
  option,
  optionIndex,
  isSelected,
  poolId,
  chainId,
  disabled,
  amount,
}: BetButtonProps) => {
  const walletData = useWallets();

  // In Storybook/development, use mock data if real data isn't available
  const { ready, wallets } = process.env.STORYBOOK
    ? {
        ready: true,
        wallets: [
          {
            address: "0x1234567890123456789012345678901234567890",
            chainId: 1,
          },
        ],
      }
    : walletData;

  const chainConfig = CHAIN_CONFIG[chainId];

  if (option.length > 24) {
    throw new Error("Option text cannot be longer than 24 characters");
  }
  if (optionIndex < 0 || optionIndex >= optionColor.length) {
    throw new Error(
      `Invalid option index, can only be 0-${optionColor.length - 1}`
    );
  }

  const color = optionColor[optionIndex];

  const getButtonStyles = (color: string) => ({
    default: `border-${color} text-${color} border-2`,
    text: `text-${color}`,
    hover: `hover:bg-${color}/20`,
    selected: `bg-${color} text-white border-${color} font-bold`,
    disabled: `bg-gray-900/50 border-${color}/30 text-${color}/50`,
  });

  const buttonStyles = getButtonStyles(color);

  const isDisabled = disabled || !ready || !wallets?.[0] || !chainConfig;
  const isError =
    !ready ||
    !wallets?.[0] ||
    !chainConfig ||
    !chainConfig.applicationContractAddress;
  if (isError) {
    console.log("Could not render the BetButton: ", {
      ready,
      wallets,
      chainConfig,
      chainConfigApplicationContractAddress:
        chainConfig?.applicationContractAddress,
    });
  }
  if (!ready) {
    return (
      <div className="animate-pulse h-10 w-48 bg-gray-200 rounded-lg">
        Loading...
      </div>
    );
  }

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);

      // First API call to get signing parameters
      const signingParams = {
        chainId,
        poolId,
        optionIndex,
        amount,
        userWalletAddress: wallets?.[0]?.address,
      };

      console.log("Getting signing parameters:", signingParams);

      const signingResponse = await fetch("/api/signing/getSigningProps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signingParams),
      });

      if (!signingResponse.ok) {
        throw new Error(
          `Failed to get signing props: ${signingResponse.statusText}`
        );
      }
//TODO SIGN WITH PRIVY RIGHT HERE
      const signingData = await signingResponse.json();
      console.log("Received signing parameters:", signingData);

      // For now, we'll use mock signature data
      // In production, you would generate real signatures here
      const mockSignedData = {
        chainId,
        poolId,
        optionIndex,
        amount,
        walletAddress: wallets?.[0]?.address,
        permitSignature: { v: 27, r: "0x0", s: "0x0" },
        betSignature: { v: 27, r: "0x0", s: "0x0" },
        usdcPermitDeadline: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
      };

      console.log("Sending signed transaction:", mockSignedData);

      const txResponse = await fetch("/api/signing/sendSignedPlaceBet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockSignedData),
      });

      if (!txResponse.ok) {
        throw new Error(`Failed to send transaction: ${txResponse.statusText}`);
      }

      const txResult = await txResponse.json();
      console.log("Transaction result:", txResult);

      alert("Transaction submitted successfully!");
    } catch (error) {
      console.error("Error processing bet:", error);
      alert(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        className={cn(
          "w-48 h-[72px] px-4 py-2 font-medium transition-colors border-2",
          "rounded-2xl",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "flex items-center justify-center",
          isDisabled || isError
            ? buttonStyles.disabled
            : cn(
                isSelected
                  ? buttonStyles.selected
                  : cn(buttonStyles.default, buttonStyles.hover)
              )
        )}
        disabled={isDisabled || isError || isLoading}
        type="button"
        onClick={handleClick}
      >
        <span className={`text-center line-clamp-2 ${buttonStyles.text}`}>
          {isLoading ? "Processing..." : option}
        </span>
      </button>
      <div className="text-center text-sm text-muted-foreground">
        {isLoading && "Please wait..."}
      </div>
    </div>
  );
};
