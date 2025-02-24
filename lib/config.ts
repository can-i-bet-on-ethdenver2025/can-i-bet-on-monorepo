import arbitrumIcon from "@/stories/assets/crypto/arbitrum-full-primary.svg";
import baseIcon from "@/stories/assets/crypto/base-full-white.svg";
import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  Chain,
} from "viem/chains";

type ChainConfig = {
  chain: Chain;
  applicationContractAddress: `0x${string}`;
  iconUrl: string;
  backgroundColor: string;
};

// chainId -> per-chain config
// CHANGEME WHEN ADDING A NEW CHAIN OR DEPLOYING A NEW CONTRACT
export const CHAIN_CONFIG: Record<string, ChainConfig> = {
  [baseSepolia.id]: {
    chain: baseSepolia,
    applicationContractAddress: "0x0f313f70143096f9acebdab79a8cfd10a5378e44",
    iconUrl: baseIcon,
    backgroundColor: "#0052FF",
  },
  [base.id]: {
    chain: base,
    applicationContractAddress: "0x0000000000000000000000000000000000000000",
    iconUrl: baseIcon,
    backgroundColor: "#0052FF",
  },
  [arbitrum.id]: {
    chain: arbitrum,
    applicationContractAddress: "0x0000000000000000000000000000000000000000",
    iconUrl: arbitrumIcon,
    backgroundColor: "#FFFFFF",
  },
  [arbitrumSepolia.id]: {
    chain: arbitrumSepolia,
    applicationContractAddress: "0x0000000000000000000000000000000000000000",
    iconUrl: arbitrumIcon,
    backgroundColor: "#FFFFFF",
  },
};
