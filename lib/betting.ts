import { TopUpUsdcBalanceParams } from "@/app/api/signing/mintTestnetUsdc/route";
import { ethers } from "ethers";
import { CHAIN_CONFIG } from "./config";

/**
 * Interface for the parameters needed to get signing properties
 */
export interface SigningParams {
  chainId: string | number;
  poolId: string;
  optionIndex: number;
  amount: string;
  userWalletAddress: string;
}

/**
 * Interface for the signed data to be sent to the backend
 */
export interface SignedBetData {
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
  usdcPermitDeadline: number;
}

/**
 * Interface for a wallet provider request parameters
 */
export interface ProviderRequestParams {
  method: string;
  params: unknown[];
}

/**
 * Interface for a wallet provider
 */
export interface EthereumProvider {
  request: (args: ProviderRequestParams) => Promise<unknown>;
}

/**
 * Interface for a wallet
 */
export interface Wallet {
  address: string;
  walletClientType: string;
  getEthereumProvider: () => Promise<EthereumProvider>;
}

/**
 * Fetches the signing properties needed for the bet
 */
export const getSigningProps = async (params: SigningParams) => {
  console.log("Getting signing parameters:", params);
  const signingResponse = await fetch("/api/signing/getSigningProps", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!signingResponse.ok) {
    throw new Error(
      `Failed to get signing props: ${signingResponse.statusText}`
    );
  }

  const signingData = await signingResponse.json();
  console.log("Received signing parameters:", signingData);
  return signingData;
};

export const topUpUsdcBalance = async (params: TopUpUsdcBalanceParams) => {
  console.log("calling topup");
  console.log("params", params);
  return fetch("/api/signing/mintTestnetUsdc", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
};

/**
 * Signs a USDC permit using EIP-712
 */
export const signUsdcPermit = async (
  provider: EthereumProvider,
  walletAddress: string,
  chainId: string | number,
  usdcAddress: string,
  spenderAddress: string,
  amount: string,
  usdcNonce: number,
  usdcName: string
) => {
  const usdcPermitDeadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

  // Verify the domain separator matches the contract
  const domainData = {
    name: usdcName,
    version: "1",
    chainId: Number(chainId),
    verifyingContract: usdcAddress,
  };

  // EIP-2612 standard types for permit
  const types = {
    Permit: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
    ],
  };

  const message = {
    owner: walletAddress,
    spender: spenderAddress,
    value: amount,
    nonce: usdcNonce,
    deadline: usdcPermitDeadline,
  };

  console.log("Permit data to sign:", {
    domain: domainData,
    types,
    message,
  });

  // Sign the permit using EIP-712
  const permitSignature = await provider.request({
    method: "eth_signTypedData_v4",
    params: [
      walletAddress,
      JSON.stringify({
        types,
        domain: domainData,
        primaryType: "Permit",
        message,
      }),
    ],
  });

  // Parse the signature
  const sig = ethers.Signature.from(permitSignature as string);

  return {
    signature: sig,
    deadline: usdcPermitDeadline,
  };
};

/**
 * Sends the signed bet transaction to the backend
 */
export const sendSignedBet = async (signedData: SignedBetData) => {
  console.log("Sending signed transaction:", signedData);

  const txResponse = await fetch("/api/signing/sendSignedPlaceBet", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signedData),
  });

  if (!txResponse.ok) {
    throw new Error(`Failed to send transaction: ${txResponse.statusText}`);
  }

  const txResult = await txResponse.json();
  console.log("Transaction result:", txResult);
  return txResult;
};

/**
 * Places a bet using the provided wallet and parameters
 */
export const placeBet = async (
  embeddedWallet: Wallet,
  chainId: string | number,
  poolId: string,
  optionIndex: number,
  amount: string
) => {
  if (!embeddedWallet?.getEthereumProvider) {
    throw new Error("Wallet does not support Ethereum provider");
  }

  const chainConfig = CHAIN_CONFIG[chainId];
  if (!chainConfig) {
    throw new Error(`Chain configuration not found for chainId: ${chainId}`);
  }

  // Get signing parameters
  const signingParams = {
    chainId,
    poolId,
    optionIndex,
    amount,
    userWalletAddress: embeddedWallet.address,
  };

  const signingData = await getSigningProps(signingParams);

  // Get Ethereum provider
  const provider = await embeddedWallet.getEthereumProvider();

  // Sign USDC permit
  const { signature, deadline } = await signUsdcPermit(
    provider,
    embeddedWallet.address,
    chainId,
    chainConfig.usdcAddress,
    chainConfig.applicationContractAddress,
    amount,
    signingData.usdcNonce,
    signingData.usdcName
  );

  // Send signed transaction
  const signedData = {
    chainId,
    poolId,
    optionIndex,
    amount,
    walletAddress: embeddedWallet.address,
    permitSignature: {
      v: signature.v,
      r: signature.r,
      s: signature.s,
    },
    usdcPermitDeadline: deadline,
  };

  return await sendSignedBet(signedData);
};
