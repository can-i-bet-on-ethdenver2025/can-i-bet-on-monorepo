// CALL THIS SCRIPT WITH bun testSigningRest.ts
import axios from "axios";
import { ethers } from "ethers";

type SignedPlaceBetParams = {
  chainId: number;
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

type GenerateSigningPropsParams = {
  chainId: number;
  poolId: string;
  optionIndex: number;
  amount: string;
  walletAddress: string;
};

// Query backend to get all props needed to sign a placeBet request. see app/api/signing/getSigningProps
async function getSigningProps(params: GenerateSigningPropsParams) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/signing/getSigningProps",
      params
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data.error || "Failed to get signing props"
      );
    }
    throw error;
  }
}

// Actually send the signed placeBet request. See app/api/signing/sendSignedPlaceBet
async function sendSignedPlaceBet(params: SignedPlaceBetParams) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/signing/sendSignedPlaceBet",
      params
    );

    console.log("test");
    console.log("response", response);
    if (response.data.success) {
      return {
        success: true,
        transactionHash: response.data.transactionHash,
        blockNumber: response.data.blockNumber,
      };
    } else {
      throw new Error(response.data.error);
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || "Failed to place bet");
    }
    throw error;
  }
}

// Updated example usage:
const exampleCall = async () => {
  try {
    const provider = new ethers.JsonRpcProvider(
      process.env.BASE_SEPOLIA_RPC_URL
    );
    const userPrivateKey = process.env.ACCOUNT1_PRIVATE_KEY;
     if (!userPrivateKey) {
       throw new Error("Relayer private key not configured");
     }
    console.log("privateKey", userPrivateKey);
    const wallet = new ethers.Wallet(userPrivateKey, provider);
    console.log("user wallet address", wallet.address);

    // First get the signing props
    const signingProps = await getSigningProps({
      chainId: 84532, // Base Sepolia chain ID
      poolId: "1",
      optionIndex: 0,
      amount: "100", // Amount in USDC
      walletAddress: wallet.address,
    });

    console.log("Signing props received:", signingProps);

    // Then proceed with the bet placement
    const result = await sendSignedPlaceBet({
      chainId: 84532,
      poolId: "1",
      optionIndex: 0,
      amount: "100",
      walletAddress: wallet.address,
      permitSignature: {
        v: 27,
        r: "0x...",
        s: "0x...",
      },
      betSignature: {
        v: 27,
        r: "0x...",
        s: "0x...",
      },
      usdcPermitDeadline: Math.floor(Date.now() / 1000) + 3600,
    });

    console.log("Transaction successful:", result.transactionHash);
    console.log("Block number:", result.blockNumber);
  } catch (error) {
    console.error("Failed to place bet:", error);
  }
};

exampleCall();
