"use client";
import {
  PrivyLoginButton,
  PrivyLogoutButton,
} from "@/components/PrivyLoginButton";
import { Button } from "@/components/ui/button";
import MockUSDCAbi from "@/contracts/out/MockUSDC.sol/MockUSDC.json";
import { CHAIN_CONFIG } from "@/lib/config";
import { parseChainId, USDC_DECIMALS, useCurrentChainId } from "@/lib/utils";
import PromptbetLogo from "@/stories/assets/CanIBetOn Logo.jpg";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { ethers } from "ethers";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PiXLogo } from "react-icons/pi";
import { NetworkButton } from "./NetworkButton";
import { base, baseSepolia } from "viem/chains";
import { Switch } from "@/components/ui/switch";

export const defaultChainId = baseSepolia.id;

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
  const [currentChainId, setCurrentChainId] = useCurrentChainId();

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
          // Remove all decimal places by parsing to float and then to integer
          setUsdcBalance(Math.floor(parseFloat(formattedBalance)).toString());
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
        <div className="flex gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={PromptbetLogo}
              alt="PromptBet Logo"
              width={32}
              height={32}
            />
            <span className="font-bold text-lg tracking-wide">@CanIBetOn</span>
          </Link>
        </div>

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
              {/* <NetworkButton chainId={currentChainId} size="small" /> */}
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {currentChainId === parseChainId(base.id)
                    ? "Using $"
                    : "Using Points"}
                </span>
                <Switch
                  checked={currentChainId === parseChainId(base.id)}
                  onCheckedChange={(value) => {
                    console.log({
                      value,
                      currentChainId,
                      baseId: String(base.id),
                    });
                    if (currentChainId === String(parseChainId(base.id))) {
                      embeddedWallet.switchChain(baseSepolia.id);
                      setCurrentChainId(parseChainId(baseSepolia.id));
                    } else {
                      embeddedWallet.switchChain(base.id);
                      setCurrentChainId(parseChainId(base.id));
                    }
                  }}
                />
              </div>
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
            <Button
              className="w-full mt-2 border border-input bg-accent text-white shadow-sm hover:bg-background hover:text-accent-foreground"
              onClick={() =>
                window.open(
                  "https://x.com/CanIBetOn",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <PiXLogo className="w-5 h-5 mr-2" />
              <span>Follow @CanIBetOn</span>
            </Button>
            {ready && authenticated && readyWallets && embeddedWallet && (
              <>
                {!isLoadingBalance && (
                  <div className="flex-col text-sm font-medium min-w-24 text-center border rounded-full">
                    <div className="text-xs text-gray-500">Balance</div>
                    <div>${usdcBalance}</div>
                  </div>
                )}
                {/* <NetworkButton chainId={currentChainId} size="small" /> */}
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
