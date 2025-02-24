import { CHAIN_CONFIG } from "@/lib/config";
import { ethers, parseUnits } from "ethers";
import { NextResponse } from "next/server";
import { baseSepolia } from "viem/chains";

type PlaceBetRequest = {
  chainId: string | number;
  poolId: string;
  optionIndex: number;
  amount: string;
  walletAddress: string;
  permitSignature: {
    v: number;
    r: string;
    s: string;
  };
  betSignature: {
    v: number;
    r: string;
    s: string;
  };
  usdcPermitDeadline: number;
};

import BettingPoolsAbi from "@/contracts/out/BettingPools.sol/BettingPools.json";

const PRIVATE_CHAIN_CONFIG: {
  [key: keyof typeof CHAIN_CONFIG]: { rpcUrl: string };
} = {
  [baseSepolia.id]: {
    rpcUrl: process.env.BASE_SEPOLIA_RPC_URL || "", // Move to env variable
  },
};

export async function POST(request: Request) {
  try {
    const body: PlaceBetRequest = await request.json();
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
    // Create contract instance
    const contract = new ethers.Contract(
      chainConfig.applicationContractAddress,
      BettingPoolsAbi.abi,
      wallet
    );
    // Convert amount to proper format
    const amount = parseUnits(body.amount, 6); // USDC has 6 decimals

  
    // Call placeBet
    const tx = await contract.placeBet(
      body.poolId,
      body.optionIndex,
      amount,
      body.walletAddress,
      body.usdcPermitDeadline,
      body.permitSignature,
      body.betSignature,
      {
        gasLimit: 500000, // Set appropriate gas limit
      }
    );

    // Wait for transaction
    const receipt = await tx.wait();

    // Return transaction hash and other relevant data
    return NextResponse.json({
      success: true,
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber,
    });
  } catch (error) {
    console.error("Error in sendSignedPlaceBet:", error);
    return NextResponse.json(
      {
        error: `Failed to place bet: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 }
    );
  }
}
