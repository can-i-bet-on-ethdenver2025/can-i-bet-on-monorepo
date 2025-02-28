import { usePrivy, useLogin, useWallets } from "@privy-io/react-auth";
import { Button } from "./ui/button";
import { ethers } from "ethers";
import { CHAIN_CONFIG } from "@/lib/config";
import { useCurrentChainId } from "@/lib/utils";
import MockUSDCAbi from "@/contracts/out/MockUSDC.sol/MockUSDC.json";
import { topUpUsdcBalance } from "@/lib/betting";
import { useEffect, useMemo } from "react";
import { useEmbeddedWallet } from "./EmbeddedWalletProvider";

export const PrivyLogoutButton = () => {
  const { logout } = usePrivy();
  return <Button onClick={logout}>Log out</Button>;
};

export function PrivyLoginButton() {
  const { ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const [currentChainId, _] = useCurrentChainId();

  // Get chainId from wallet
  const { embeddedWallet } = useEmbeddedWallet();

  useEffect(() => {
    //Prereqs
    const makeCall = async () => {
      console.log({ embeddedWallet });
      if (embeddedWallet) {
        console.log("topping up");
        const result = await topUpUsdcBalance({
          chainId: currentChainId,
          walletAddress: embeddedWallet.address,
        });
      }
    };
    makeCall();
  }, [ready, embeddedWallet]);

  const { login } = useLogin({});
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  return (
    <Button disabled={disableLogin} onClick={login}>
      Log in
    </Button>
  );
}
