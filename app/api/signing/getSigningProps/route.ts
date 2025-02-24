import BettingPoolsAbi from "@/contracts/out/BettingPools.sol/BettingPools.json";
import { CHAIN_CONFIG } from "@/lib/config";
import { ethers } from "ethers";
import { NextResponse } from "next/server";

// Define the expected request type
type GenerateSigningPropsRequest = {
  chainId: string | number;
  poolId: string;
  optionIndex: number;
  amount: string;
  walletAddress: string;
};

const PRIVATE_CHAIN_CONFIG: {
  [key: keyof typeof CHAIN_CONFIG]: { rpcUrl: string };
} = {
  // Using the same config as in sendSignedPlaceBet
  "84532": {
    rpcUrl: process.env.BASE_SEPOLIA_RPC_URL || "",
  },
};

export async function POST(request: Request) {
  try {
    const body: GenerateSigningPropsRequest = await request.json();

    // Validate chain configuration
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

    // Setup provider and contract
    const provider = new ethers.JsonRpcProvider(privateConfig.rpcUrl);
    const contract = new ethers.Contract(
      chainConfig.applicationContractAddress,
      BettingPoolsAbi.abi,
      provider
    );

    // Return the input parameters plus contract info
    // (In a real implementation, you'd use these to generate signatures)
    return NextResponse.json({
      ...body,
      applicationContractAddress: chainConfig.applicationContractAddress,
      rpcUrl: privateConfig.rpcUrl,
    });
  } catch (error) {
    console.error("Error in generateSigningProps:", error);
    return NextResponse.json(
      {
        error: `Failed to generate signing props: ${
          error instanceof Error ? error.message : String(error)
        }`,
      },
      { status: 500 }
    );
  }
}
