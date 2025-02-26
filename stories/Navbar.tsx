"use client";
import {
  PrivyLoginButton,
  PrivyLogoutButton,
} from "@/components/PrivyLoginButton";
import MockUSDCAbi from "@/contracts/out/MockUSDC.sol/MockUSDC.json";
import { CHAIN_CONFIG } from "@/lib/config";
import { parseChainId, USDC_DECIMALS } from "@/lib/utils";
import PromptbetLogo from "@/stories/assets/promptbet-logo2.jpg";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { ethers } from "ethers";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NetworkButton } from "./NetworkButton";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [usdcBalance, setUsdcBalance] = useState<string | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const { ready, authenticated } = usePrivy();
  const { ready: readyWallets, wallets } = useWallets();

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy"
  )!;

  // Get the chain ID from the first wallet if available
  const currentChainId = parseChainId(84532);

  // Fetch USDC balance when wallet is connected
  useEffect(() => {
    const fetchUsdcBalance = async () => {
      if (readyWallets && embeddedWallet && currentChainId) {
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
            setUsdcBalance("N/A");
            return;
          }

          // Get provider from wallet
          const provider = await embeddedWallet.getEthereumProvider();
          const ethersProvider = new ethers.BrowserProvider(provider);

          // Create contract instance
          const usdcContract = new ethers.Contract(
            chainConfig.usdcAddress,
            MockUSDCAbi.abi,
            ethersProvider
          );

          // Get balance
          const balance = await usdcContract.balanceOf(embeddedWallet.address);

          // Format balance (assuming 6 decimals for USDC)
          const formattedBalance = ethers.formatUnits(balance, USDC_DECIMALS);
          setUsdcBalance(formattedBalance.replace(".0", ""));
        } catch (error) {
          console.error("Error fetching USDC balance:", error);
          setUsdcBalance("Error");
        } finally {
          setIsLoadingBalance(false);
        }
      } else {
        setUsdcBalance(null);
      }
    };

    fetchUsdcBalance();
  }, [readyWallets, wallets, currentChainId]);

  // Get the chain ID from the first wallet if available
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={PromptbetLogo}
            alt="PromptBet Logo"
            width={32}
            height={32}
          />
          <span className="font-bold text-lg tracking-wide">PROMPTBET</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
            {ready && authenticated && readyWallets && embeddedWallet && (
            <>
              {!isLoadingBalance && (
                <div className="flex-col text-sm font-medium min-w-24 text-center border rounded-full">
                  <div className="text-xs text-gray-500">Balance</div>
                  <div>${usdcBalance}</div>
                </div>
              )}
              <NetworkButton chainId={currentChainId} size="small" />
            </>
          )}
          {ready && authenticated ? (
            <PrivyLogoutButton />
          ) : (
            <PrivyLoginButton />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={handleToggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-2 flex flex-col gap-2">
            {ready && authenticated && readyWallets && embeddedWallet && (
              <>
                {!isLoadingBalance && (
                  <div className="flex-col text-sm font-medium min-w-24 text-center border rounded-full">
                    <div className="text-xs text-gray-500">Balance</div>
                    <div>${usdcBalance}</div>
                  </div>
                )}
                <NetworkButton chainId={currentChainId} size="small" />
              </>
            )}
            {ready && authenticated ? (
              <div>
                <PrivyLogoutButton />
              </div>
            ) : (
              <PrivyLoginButton />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
