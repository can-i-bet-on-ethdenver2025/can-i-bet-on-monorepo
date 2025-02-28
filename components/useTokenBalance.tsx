import { useEffect, useState } from "react";
import { erc20Abi, formatUnits } from "viem";
import { usePublicClient } from "wagmi";
import { useEmbeddedWallet } from "./EmbeddedWalletProvider";

interface UseTokenBalanceProps {
  tokenAddress: `0x${string}`;
  userAddress?: `0x${string}`;
}

export const useTokenBalance = ({
  tokenAddress,
  userAddress,
}: UseTokenBalanceProps) => {
  const publicClient = usePublicClient();
  const [balance, setBalance] = useState<string>("0");
  const { embeddedWallet } = useEmbeddedWallet();

  useEffect(() => {
    const fetchBalanceAndDecimals = async () => {
      if (!publicClient) {
        console.error("No public client found, can't get token balance");
        return;
      }

      // Use the provided userAddress or fall back to the embedded wallet address
      const address =
        userAddress || (embeddedWallet?.address as `0x${string}` | undefined);

      if (!address) {
        console.error(
          "No user address provided and no embedded wallet available"
        );
        return;
      }

      try {
        const [rawBalance, decimals] = await Promise.all([
          publicClient.readContract({
            address: tokenAddress,
            abi: erc20Abi,
            functionName: "balanceOf",
            args: [address],
          }),
          publicClient.readContract({
            address: tokenAddress,
            abi: erc20Abi,
            functionName: "decimals",
          }),
        ]);

        setBalance(formatUnits(rawBalance, decimals));
      } catch (error) {
        console.error("Error fetching token balance:", error);
        setBalance("0");
      }
    };

    if (tokenAddress && (userAddress || embeddedWallet?.address)) {
      fetchBalanceAndDecimals();
    }
  }, [tokenAddress, userAddress, publicClient, embeddedWallet]);

  return balance;
};
