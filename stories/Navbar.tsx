"use client";
import { useEmbeddedWallet } from "@/components/EmbeddedWalletProvider";
import {
  PrivyLoginButton,
  PrivyLogoutButton,
} from "@/components/PrivyLoginButton";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUsdcBalance } from "@/components/useUsdcBalance";
import { renderUsdcPrefix } from "@/lib/usdcUtils";
import { parseChainId } from "@/lib/utils";
import PromptbetLogo from "@/stories/assets/CanIBetOn Logo.jpg";
import usdpLogo from "@/stories/assets/usdp-logo.svg";
import { usePrivy } from "@privy-io/react-auth";
import { AlertCircle, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PiXLogo } from "react-icons/pi";
import { base, baseSepolia } from "viem/chains";
import { NetworkButton } from "./NetworkButton";

export const defaultChainId = baseSepolia.id;

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { ready, authenticated } = usePrivy();

  // Use our context for wallet and chain info
  const { embeddedWallet, currentChainId, switchChain, chainConfig } =
    useEmbeddedWallet();

  // Use the useUsdcBalance hook instead of implementing fetchUsdcBalance
  const { usdcBalance, error } = useUsdcBalance();

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
          {ready && authenticated && embeddedWallet && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex-col text-sm font-medium min-w-24 text-center border rounded-full relative">
                      <div className="text-xs text-gray-500">Balance</div>
                      <div className="flex items-center justify-center gap-1">
                        {renderUsdcPrefix(chainConfig)}
                        {parseFloat(usdcBalance || "0").toLocaleString()}
                      </div>
                      {error && (
                        <span className="absolute -right-2 -top-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        </span>
                      )}
                    </div>
                  </TooltipTrigger>
                  {error && (
                    <TooltipContent>
                      <p>{error}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
              <NetworkButton size="small" />
              <div className="flex items-center gap-2">
                <Image
                  src={usdpLogo}
                  alt="USD Points Logo"
                  width={20}
                  height={20}
                />
                <Switch
                  checked={currentChainId === parseChainId(base.id)}
                  onCheckedChange={(value) => {
                    console.log({
                      value,
                      currentChainId,
                      baseId: String(base.id),
                    });
                    if (currentChainId === String(parseChainId(base.id))) {
                      switchChain(baseSepolia.id);
                    } else {
                      switchChain(base.id);
                    }
                  }}
                />
                <span>USD</span>
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
            {ready && authenticated && embeddedWallet && (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex-col text-sm font-medium min-w-24 text-center border rounded-full relative">
                        <div className="text-xs text-gray-500">Balance</div>
                        <div className="flex items-center justify-center gap-1">
                          {renderUsdcPrefix(chainConfig)}
                          {usdcBalance}
                        </div>
                        {error && (
                          <span className="absolute -right-2 -top-2">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          </span>
                        )}
                      </div>
                    </TooltipTrigger>
                    {error && (
                      <TooltipContent>
                        <p>{error}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
                <NetworkButton size="small" />
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
