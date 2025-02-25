import { USDC_DECIMALS } from "@/lib/utils";

import MockUSDCAbi from "@/contracts/out/MockUSDC.sol/MockUSDC.json";
import { CHAIN_CONFIG } from "@/lib/config";
import { parseChainId } from "@/lib/utils";
import { useWallets } from "@privy-io/react-auth";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export const useUsdcBalance = () => {
  const [usdcBalance, setUsdcBalance] = useState<string | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const { ready: readyWallets, wallets } = useWallets();

  // Get chainId from wallet
  const currentChainId = parseChainId(wallets?.[0]?.chainId || 84532);

  useEffect(() => {
    const fetchUsdcBalance = async () => {
      if (readyWallets && wallets[0] && currentChainId) {
        try {
          setIsLoadingBalance(true);

          // Get chain config for the current chain
          const chainConfig = CHAIN_CONFIG[currentChainId];

          if (
            !chainConfig ||
            chainConfig.usdcAddress ===
              "0x0000000000000000000000000000000000000000"
          ) {
            console.error(
              "No chain config or usdc address found for chain ID:",
              currentChainId
            );
            setUsdcBalance("0");
            return;
          }

          // Get provider from wallet
          const provider = await wallets[0].getEthereumProvider();
          const ethersProvider = new ethers.BrowserProvider(provider);

          // Create contract instance
          const usdcContract = new ethers.Contract(
            chainConfig.usdcAddress,
            MockUSDCAbi.abi,
            ethersProvider
          );

          // Get balance
          const balance = await usdcContract.balanceOf(wallets[0].address);

          // Format balance (assuming 6 decimals for USDC)
          const formattedBalance = ethers.formatUnits(balance, USDC_DECIMALS);
          setUsdcBalance(formattedBalance.replace(".0", ""));
        } catch (error) {
          console.error("Error fetching USDC balance:", error);
          setUsdcBalance("0");
        } finally {
          setIsLoadingBalance(false);
        }
      } else {
        setUsdcBalance("0");
      }
    };

    fetchUsdcBalance();
  }, [readyWallets, wallets, currentChainId]);

  return { usdcBalance, isLoadingBalance, currentChainId };
};
