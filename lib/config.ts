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
  usdcAddress: `0x${string}`;
  nativeCurrency: {
    symbol: string;
  };
};

// chainId -> per-chain config
// CHANGEME WHEN ADDING A NEW CHAIN OR DEPLOYING A NEW CONTRACT
export const CHAIN_CONFIG: Record<string, ChainConfig> = {
  [baseSepolia.id]: {
    chain: baseSepolia,
    applicationContractAddress: "0xcA7214565ae6994F81e5dd1ed97a4F817afa0A25",
    iconUrl: baseIcon,
    backgroundColor: "#0052FF",
    usdcAddress: "0x3224f86e3e6dfC22aC1d04Ad4037e9b1983D7ba2",
    nativeCurrency: {
      symbol: "ETH",
    },
  },
  [base.id]: {
    chain: base,
    applicationContractAddress: "0x0000000000000000000000000000000000000000",
    iconUrl: baseIcon,
    backgroundColor: "#0052FF",
    usdcAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    nativeCurrency: {
      symbol: "ETH",
    },
  },
  [arbitrum.id]: {
    chain: arbitrum,
    applicationContractAddress: "0x0000000000000000000000000000000000000000",
    iconUrl: arbitrumIcon,
    backgroundColor: "#FFFFFF",
    usdcAddress: "0x0000000000000000000000000000000000000000",
    nativeCurrency: {
      symbol: "ETH",
    },
  },
  [arbitrumSepolia.id]: {
    chain: arbitrumSepolia,
    applicationContractAddress: "0x0000000000000000000000000000000000000000",
    iconUrl: arbitrumIcon,
    backgroundColor: "#FFFFFF",
    usdcAddress: "0x0000000000000000000000000000000000000000",
    nativeCurrency: {
      symbol: "ETH",
    },
  },
};

export const MAX_OPTIONS = 5;

export const optionColor: Array<string> = [
  "option-a",
  "option-b",
  "option-c",
  "option-d",
  "option-e",
];

export interface OptionColorClasses {
  backgroundColor: string;
  border: string;
  text: string;
}

export const optionColorClasses: Record<number, OptionColorClasses> = {
  0: {
    backgroundColor: "bg-option-a",
    border: "border-option-a",
    text: "text-option-a",
  },
  1: {
    backgroundColor: "bg-option-b",
    border: "border-option-b",
    text: "text-option-b",
  },
  2: {
    backgroundColor: "bg-option-c",
    border: "border-option-c",
    text: "text-option-c",
  },
  3: {
    backgroundColor: "bg-option-d",
    border: "border-option-d",
    text: "text-option-d",
  },
  4: {
    backgroundColor: "bg-option-e",
    border: "border-option-e",
    text: "text-option-e",
  },
};
