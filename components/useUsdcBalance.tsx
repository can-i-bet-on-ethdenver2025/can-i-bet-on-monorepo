import MockUSDCAbi from "@/contracts/out/MockUSDC.sol/MockUSDC.json";
import { USDC_DECIMALS } from "@/lib/utils";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useEmbeddedWallet } from "./EmbeddedWalletProvider";

export const useUsdcBalance = () => {
  const [usdcBalance, setUsdcBalance] = useState<string | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { embeddedWallet, currentChainId, chainConfig } = useEmbeddedWallet();

  console.log("embeddedWallet", embeddedWallet);
  console.log("currentChainId", currentChainId);
  console.log("chainConfig", chainConfig);
  useEffect(() => {
    const fetchUsdcBalance = async () => {
      // Reset state at the beginning of each fetch attempt
      setError(null);

      if (!embeddedWallet) {
        setUsdcBalance("0");
        return;
      }

      if (!currentChainId) {
        setError("No chain ID available");
        setUsdcBalance("0");
        return;
      }

      if (!chainConfig) {
        setError(
          `No chain configuration found for chain ID: ${currentChainId}`
        );
        setUsdcBalance("0");
        return;
      }

      try {
        setIsLoadingBalance(true);

        if (
          chainConfig.usdcAddress ===
          "0x0000000000000000000000000000000000000000"
        ) {
          setError(`USDC contract not deployed on chain ID: ${currentChainId}`);
          setUsdcBalance("0");
          return;
        }

        // Get provider from wallet
        const provider = await embeddedWallet.getEthereumProvider();
        const ethersProvider = new ethers.BrowserProvider(provider);

        console.log("chainConfig.usdcAddress", chainConfig.usdcAddress);
        // Create contract instance
        const usdcContract = new ethers.Contract(
          chainConfig.usdcAddress,
          MockUSDCAbi.abi,
          ethersProvider
        );

        console.log("embeddedWallet.address", embeddedWallet.address);

        try {
          // Get balance
          const balance = await usdcContract.balanceOf(embeddedWallet.address);
          console.log("balance", balance);

          // Format balance (assuming 6 decimals for USDC)
          const formattedBalance = ethers.formatUnits(balance, USDC_DECIMALS);
          // Remove all decimal places by parsing to float and then to integer
          setUsdcBalance(Math.floor(parseFloat(formattedBalance)).toString());
        } catch (contractError) {
          console.error("Contract interaction error:", contractError);

          // Handle the specific "could not decode result data" error
          if (
            contractError instanceof Error &&
            (contractError.message.includes("could not decode result data") ||
              contractError.message.includes("BAD_DATA"))
          ) {
            // This likely means there's no balance or the contract doesn't recognize the address
            console.log(
              "No balance found or contract doesn't recognize address - setting to 0"
            );
            setUsdcBalance("0");
          } else {
            // Rethrow for the outer catch block to handle other contract errors
            throw contractError;
          }
        }
      } catch (error) {
        console.error("Error fetching USDC balance:", error);

        // Handle specific error types
        if (error instanceof Error) {
          if (error.message.includes("contract not deployed")) {
            setError(
              `USDC contract not deployed at address: ${chainConfig.usdcAddress}`
            );
          } else if (error.message.includes("network changed")) {
            setError("Network changed during balance fetch. Please try again.");
          } else if (error.message.includes("user rejected")) {
            setError("Request was rejected by the user");
          } else if (error.message.includes("insufficient funds")) {
            setError("Insufficient funds for transaction");
          } else if (
            error.message.includes("could not decode result data") ||
            error.message.includes("BAD_DATA")
          ) {
            // This is now handled in the inner try/catch, but keep as fallback
            setUsdcBalance("0");
            // Don't set an error for this case as it's expected when there's no balance
          } else {
            setError(`Failed to fetch USDC balance: ${error.message}`);
          }
        } else {
          setError("Unknown error occurred while fetching USDC balance");
        }

        // Ensure we always have a balance value
        if (usdcBalance === null) {
          setUsdcBalance("0");
        }
      } finally {
        setIsLoadingBalance(false);
      }
    };

    fetchUsdcBalance();
  }, [embeddedWallet, currentChainId, chainConfig, usdcBalance]);

  return { usdcBalance, isLoadingBalance, error };
};
