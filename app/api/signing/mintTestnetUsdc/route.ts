import MockUSDCAbi from "@/contracts/out/MockUSDC.sol/MockUSDC.json";
import { CHAIN_CONFIG } from "@/lib/config";
import { USDC_DECIMALS } from "@/lib/utils";
import { ethers } from "ethers";
import { NextResponse } from "next/server";
import { base, baseSepolia } from "viem/chains";

export type TopUpUsdcBalanceParams = {
  chainId: string | number;
  walletAddress: string;
};

const PRIVATE_CHAIN_CONFIG: {
  [key: keyof typeof CHAIN_CONFIG]: { rpcUrl: string };
} = {
  [baseSepolia.id]: {
    rpcUrl: process.env.BASE_SEPOLIA_RPC_URL || "", // Move to env variable
  },
  [base.id]: {
    rpcUrl: process.env.BASE_RPC_URL || "", // Move to env variable
  },
};

export async function POST(request: Request) {
  try {
    console.log("Received request:", request);
    const body: TopUpUsdcBalanceParams = await request.json();
    const chainConfig = CHAIN_CONFIG[body.chainId];
    if (!chainConfig) {
      return NextResponse.json(
        { error: "Invalid chainId, no public config" },
        { status: 400 }
      );
    }
    const privateConfig = PRIVATE_CHAIN_CONFIG[body.chainId];

    if (!privateConfig) {
      return NextResponse.json(
        { error: "Invalid chainId, no private rpc url" },
        { status: 400 }
      );
    }

    // Setup provider and wallet
    const provider = new ethers.JsonRpcProvider(privateConfig.rpcUrl);
    const privateKey = process.env.MAIN_PRIVATE_KEY;
    if (!privateKey) {
      throw new Error("Relayer private key not configured");
    }
    const wallet = new ethers.Wallet(privateKey, provider);

    const usdcContract = new ethers.Contract(
      chainConfig.usdcAddress,
      MockUSDCAbi.abi,
      wallet
    );
    const balance = await usdcContract.balanceOf(body.walletAddress);
    const targetAmount = BigInt(1000) * BigInt(10) ** BigInt(USDC_DECIMALS);

    // If balance is less than target, add the difference, otherwise add 0
    const amountToAdd =
      balance < targetAmount ? targetAmount - balance : BigInt(0);

    console.log("Balance:", balance, "Amount to add:", amountToAdd);

    console.log("Minting USDC to the user", body.walletAddress, amountToAdd);
    const tx = await usdcContract.mint(body.walletAddress, amountToAdd);
    console.log("Minted USDC to the user", body.walletAddress, amountToAdd);

    // Create contract instance

    // Don't wait for confirmations, just get the response
    return NextResponse.json({
      success: true,
      transactionHash: tx.hash,
    });
  } catch (error) {
    console.error("Error in mintTestnetUsdc:", error);
    return NextResponse.json(
      {
        error: `Failed to mint testnet usdc: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 }
    );
  }
}
