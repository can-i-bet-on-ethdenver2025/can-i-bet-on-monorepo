import { usePublicClient } from "wagmi";
import { erc20Abi, formatUnits } from "viem";
import { useState, useEffect } from "react";
interface UseTokenBalanceProps {
  tokenAddress: `0x${string}`;
  userAddress: `0x${string}`;
}

export const useTokenBalance = ({
  tokenAddress,
  userAddress,
}: UseTokenBalanceProps) => {
  const publicClient = usePublicClient();
  const [balance, setBalance] = useState<string>("0");

  useEffect(() => {
    const fetchBalanceAndDecimals = async () => {
      if (!publicClient) {
        console.error("No public client found, can't get token balance")
        return;
      }
      try {
        const [rawBalance, decimals] = await Promise.all([
          publicClient.readContract({
            address: tokenAddress,
            abi: erc20Abi,
            functionName: "balanceOf",
            args: [userAddress],
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

    if (tokenAddress && userAddress) {
      fetchBalanceAndDecimals();
    }
  }, [tokenAddress, userAddress, publicClient]);

  return balance;
};
