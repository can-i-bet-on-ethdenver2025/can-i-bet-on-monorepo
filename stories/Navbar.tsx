"use client";
import {
  PrivyLoginButton,
  PrivyLogoutButton,
} from "@/components/PrivyLoginButton";
import PromptbetLogo from "@/stories/assets/promptbet-logo2.jpg";
import { usePrivy } from "@privy-io/react-auth";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { NavbarLink } from "./NavbarLink";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { ready, authenticated } = usePrivy();

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
          <NavbarLink href="/pools">Browse pools</NavbarLink>
          <NavbarLink href="/activity">
            Recent activity (NOT IMPLEMENTED)
          </NavbarLink>
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
            <NavbarLink href="/pools">Browse pools</NavbarLink>
            <NavbarLink href="/activity">
              Recent activity (NOT IMPLEMENTED)
            </NavbarLink>
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
