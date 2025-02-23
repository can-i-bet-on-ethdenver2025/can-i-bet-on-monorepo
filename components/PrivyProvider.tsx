"use client";
import { PrivyProvider } from "@privy-io/react-auth";
import { arbitrum, arbitrumSepolia, base, baseSepolia, scrollSepolia, mainnet, sepolia, Chain } from "viem/chains";


export default function PrivyProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivyProvider
      appId="cm7b6229i003ccgeozvxyjv2h"
      config={{
        defaultChain: baseSepolia,
        supportedChains: [baseSepolia, arbitrumSepolia, scrollSepolia, base, arbitrum, mainnet, sepolia],
        // Customize Privy's appearance in your app
        // TODO Don't harcode theme
        appearance: {
          theme: "dark",
          accentColor: "#9000FF",
          logo: "https://i.imgur.com/GeQsoyC.jpeg", //TODO Placeholder logo
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
