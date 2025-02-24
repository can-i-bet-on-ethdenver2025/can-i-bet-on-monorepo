import BettingPoolsAbi from "@/contracts/out/BettingPools.sol/BettingPools.json";
import MockUSDCAbi from "@/contracts/out/MockUSDC.sol/MockUSDC.json";
import { CHAIN_CONFIG } from "@/lib/config";
import { ethers, ZeroAddress } from "ethers";
import { NextResponse } from "next/server";

// Define the expected request type
type GenerateSigningPropsRequest = {
  chainId: string | number;
  poolId: string;
  optionIndex: number;
  amount: string;
  userWalletAddress: string;
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
    if (
      chainConfig.usdcAddress === ZeroAddress ||
      chainConfig.applicationContractAddress === ZeroAddress
    ) {
      return NextResponse.json(
        {
          error: "Invalid chainId, no usdc and/or application contract address",
        },
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

    // Setup provider and contracts
    const provider = new ethers.JsonRpcProvider(privateConfig.rpcUrl);

    const usdcContract = new ethers.Contract(
      chainConfig.usdcAddress,
      MockUSDCAbi.abi,
      provider
    );

    // Get USDC nonce for the user
    const nonce = await usdcContract.nonces(body.userWalletAddress);

    // Get USDC balance for the user
    const balance = await usdcContract.balanceOf(body.userWalletAddress);
    console.log('USDC Balance', balance);

    // Get PERMIT_TYPEHASH from USDC contract
    const PERMIT_TYPEHASH = await usdcContract.PERMIT_TYPEHASH();

    // Return the input parameters plus contract info and USDC details
    return NextResponse.json({
      ...body,
      applicationContractAddress: chainConfig.applicationContractAddress,
      usdcContractAddress: chainConfig.usdcAddress,
      usdcNonce: nonce.toString(),
      usdcPermitTypehash: PERMIT_TYPEHASH,
      rpcUrl: privateConfig.rpcUrl,
      usdcName: await usdcContract.name(),
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
