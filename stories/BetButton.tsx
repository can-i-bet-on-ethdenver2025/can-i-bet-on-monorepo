//TODO Doesn't support Option A or B, hardcoded to Yes and No
import { CHAIN_CONFIG } from "@/lib/config";
import { cn, USDC_DECIMALS } from "@/lib/utils";
import { useWallets } from "@privy-io/react-auth";
import { zeroAddress } from "viem";

type BetButtonProps = {
  option: string;
  optionIndex: number;
  isSelected?: boolean;
  poolId: string;
  chainId: string | number;
};

export const BetButton = ({
  option,
  optionIndex,
  isSelected = false,
  poolId,
  chainId,
}: BetButtonProps) => {
  const { ready, wallets } = useWallets();
  const chainConfig = CHAIN_CONFIG[chainId];
  if (!chainConfig) {
    throw new Error(`Chain ${chainId} not supported`);
  }
  if (optionIndex !== 0 && optionIndex !== 1) {
    throw new Error("Invalid option index, can only be 0 or 1 (for now)");
  }
  const baseColors = {
    0: "bg-option-a/20 text-option-a",
    1: "bg-option-b/20 text-option-b",
  };

  const hoverColors = {
    0: `hover:bg-option-a/30 hover:text-option-a`,
    1: `hover:bg-option-b/30 hover:text-option-b`,
  };

  const borderColors = {
    0: "border-option-a text-option-a border-2",
    1: "border-option-b text-option-b border-2",
  };

  if (!ready) {
    // TODO return skeleton or just disable button

    return <div>::::</div>;
  }
  // if (!wallets || !wallets?.[0]?.address) {
  //   return <div>NO WALLET LOADED</div>;
  // }
  if (
    !chainConfig?.applicationContractAddress ||
    chainConfig.applicationContractAddress === zeroAddress
  ) {
    console.log("CHAIN_CONFIG", chainConfig);
    return <div>NO APPPLICATION CONTRACT ADDRESS FOR CHAIN</div>;
  }
  const hardcodedAmount = 100 * Math.pow(10, USDC_DECIMALS);

  console.log("signingParams", {
    chainId,
    poolId,
    optionIndex,
    hardcodedAmount,
    walletAddress: wallets?.[0]?.address,
    applicationContractAddress: chainConfig.applicationContractAddress,
  });
  return (
    <button
      className={cn(
        "min-w-24 px-4 py-2 rounded-md font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",

        baseColors[optionIndex],
        hoverColors[optionIndex],
        isSelected && borderColors[optionIndex]
      )}
      type="button"
    >
      {option}
    </button>
  );
};
