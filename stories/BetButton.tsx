//TODO Doesn't support Option A or B, hardcoded to Yes and No
import { CHAIN_CONFIG, optionColor } from "@/lib/config";
import { cn } from "@/lib/utils";
import { ConnectedWallet, useWallets } from "@privy-io/react-auth";
import { ethers } from "ethers";
import { useState } from "react";
import { Chain } from "viem/chains";

type RpcRequest = {
  method: "eth_signTypedData_v4";
  params: [string, string]; // [address, stringified typed data]
};

type ExtendedConnectedWallet = ConnectedWallet & {
  getEthereumProvider: () => Promise<{
    request: (request: RpcRequest) => Promise<string>;
  }>;
};

type BetButtonProps = {
  option: string;
  optionIndex: number;
  isSelected?: boolean;
  poolId: string;
  chainId: string | number;
  disabled?: boolean;
  amount: string;
};

export const BetButton = ({
  option,
  optionIndex,
  isSelected,
  poolId,
  chainId,
  disabled,
  amount,
}: BetButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // In Storybook/development, use mock data if real data isn't available

  const { ready, wallets } = useWallets();
  const chainConfig = CHAIN_CONFIG[chainId];

  // if (option.length > 24) {
  //   throw new Error("Option text cannot be longer than 24 characters");
  // }
  if (optionIndex < 0 || optionIndex >= optionColor.length) {
    throw new Error(
      `Invalid option index, can only be 0-${optionColor.length - 1}`
    );
  }

  const color = optionColor[optionIndex];

  const getButtonStyles = (color: string) => ({
    default: `border-${color} text-${color} border-2`,
    text: `text-${color}`,
    hover: `hover:bg-${color}/20`,
    selected: `bg-${color} text-white border-${color} font-bold`,
    disabled: `bg-gray-900/50 border-${color}/30 text-${color}/50`,
  });

  const buttonStyles = getButtonStyles(color);

  const handleClick = async () => {
    try {
      setIsLoading(true);

      // First API call to get signing parameters
      const signingParams = {
        chainId,
        poolId,
        optionIndex,
        amount,
        userWalletAddress: wallets?.[0]?.address,
      };

      console.log("Getting signing parameters:", signingParams);
      const signingResponse = await fetch("/api/signing/getSigningProps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signingParams),
      });

      
      if (!signingResponse.ok) {
        throw new Error(
          `Failed to get signing props: ${signingResponse.statusText}`
        );
      }

      const signingData = await signingResponse.json();
      console.log("Received signing parameters:", signingData);

      // Generate USDC permit signature using Privy wallet
      const wallet = wallets[0] as ExtendedConnectedWallet;
      if (!wallet?.getEthereumProvider) {
        throw new Error("Wallet does not support Ethereum provider");
      }

      // Log the wallet address
      console.log("Wallet Address", wallet.address);

      // Print the current USDC balance of the wallet for the USDC ERC20 token
      const provider = await wallet.getEthereumProvider();

      const usdcPermitDeadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

      // Verify the domain separator matches the contract
      const domainData = {
        name: signingData.usdcName,
        version: "1",
        chainId: Number(chainId),
        verifyingContract: chainConfig.usdcAddress,
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
        owner: wallet.address,
        spender: chainConfig.applicationContractAddress,
        value: amount,
        nonce: signingData.usdcNonce,
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
          wallet.address,
          JSON.stringify({
            types,
            domain: domainData,
            primaryType: "Permit",
            message,
          }),
        ],
      });

      // Parse the signature
      const sig = ethers.Signature.from(permitSignature);
      const { v, r, s } = sig;

      // Send the signed data to the backend
      const signedData = {
        chainId,
        poolId,
        optionIndex,
        amount,
        walletAddress: wallet.address,
        permitSignature: { v, r, s },
        usdcPermitDeadline,
      };

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

      alert("Transaction submitted successfully!");
    } catch (error) {
      console.error("Error processing bet:", error);
      alert(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };
  const isDisabled = disabled || !ready || !wallets?.[0] || !chainConfig;
  const isError =
    !wallets?.[0] || !chainConfig || !chainConfig.applicationContractAddress;
  if (isError) {
    // console.log("Could not render the BetButton: ", {
    //   ready,
    //   wallets,
    //   chainConfig,
    //   chainConfigApplicationContractAddress:
    //     chainConfig?.applicationContractAddress,
    // });
  }
  if (!ready) {
    return (
      <div className="animate-pulse h-10 w-48 bg-gray-200 rounded-lg">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <button
        className={cn(
          "w-48 h-[72px] px-4 py-2 font-medium transition-colors border-2",
          "rounded-2xl",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "flex items-center justify-center",
          isDisabled || isError
            ? buttonStyles.disabled
            : cn(
                isSelected
                  ? buttonStyles.selected
                  : cn(buttonStyles.default, buttonStyles.hover)
              )
        )}
        disabled={isDisabled || isError || isLoading}
        type="button"
        onClick={handleClick}
      >
        <span className={`text-center line-clamp-2 ${buttonStyles.text}`}>
          {isLoading ? "Processing..." : option}
        </span>
      </button>
      <div className="text-center text-sm text-muted-foreground">
        {isLoading && "Please wait..."}
      </div>
    </div>
  );
};
