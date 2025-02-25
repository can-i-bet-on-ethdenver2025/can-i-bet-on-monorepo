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
}

// chainId -> per-chain config
// CHANGEME WHEN ADDING A NEW CHAIN OR DEPLOYING A NEW CONTRACT
  export const CHAIN_CONFIG: Record<string, ChainConfig> = {
    [baseSepolia.id]: {
      chain: baseSepolia,
      applicationContractAddress: "0xf815D9F7668b95745B0320ADD786692249edFbBe",
      iconUrl: baseIcon,
      backgroundColor: "#0052FF",
      usdcAddress: "0x3224f86e3e6dfC22aC1d04Ad4037e9b1983D7ba2",
    },
    [base.id]: {
      chain: base,
      applicationContractAddress: "0x0000000000000000000000000000000000000000",
      iconUrl: baseIcon,
      backgroundColor: "#0052FF",
      usdcAddress: "0x0000000000000000000000000000000000000000",
    },
    [arbitrum.id]: {
      chain: arbitrum,
      applicationContractAddress: "0x0000000000000000000000000000000000000000",
      iconUrl: arbitrumIcon,
      backgroundColor: "#FFFFFF",
      usdcAddress: "0x0000000000000000000000000000000000000000",
    },
    [arbitrumSepolia.id]: {
      chain: arbitrumSepolia,
      applicationContractAddress: "0x0000000000000000000000000000000000000000",
      iconUrl: arbitrumIcon,
      backgroundColor: "#FFFFFF",
      usdcAddress: "0x0000000000000000000000000000000000000000",
    },
  };

export const optionColor: Array<string> = [
  "option-a",
  "option-b",
  "option-c",
  "option-d",
  "option-e",
];
