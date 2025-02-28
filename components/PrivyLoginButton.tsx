import { topUpUsdcBalance } from "@/lib/betting";
import { parseChainId } from "@/lib/utils";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";
import { useEmbeddedWallet } from "./EmbeddedWalletProvider";
import { Button } from "./ui/button";
import { useUsdcBalance } from "./useUsdcBalance";
export const PrivyLogoutButton = () => {
  const { logout } = usePrivy();
  return <Button onClick={logout}>Log out</Button>;
};

export function PrivyLoginButton() {
  const { ready, authenticated } = usePrivy();

  // Get chainId from wallet
  const { embeddedWallet } = useEmbeddedWallet();
  const { refetch: fetchUsdcBalance } = useUsdcBalance();
  useEffect(() => {
    //Prereqs
    console.log("ready in privy login button", embeddedWallet);
    if (!embeddedWallet) {
      return;
    }
    const makeCall = async () => {
      console.log("embeddedWallet", embeddedWallet);
      if (embeddedWallet) {
        console.log("topping up");
        const result = await topUpUsdcBalance({
          chainId: parseChainId(embeddedWallet.chainId),
          walletAddress: embeddedWallet.address,
        });
        console.log("result", result);
      }
    };
    makeCall();
  }, [ready, authenticated, embeddedWallet]);

  const { login } = useLogin({
    onComplete: async ({ user }) => {
      console.log("login complete", embeddedWallet, user);
      const result = await topUpUsdcBalance({
        chainId: parseChainId("84532"), //We can always top up user on base sepolia
        walletAddress: user.wallet?.address || "",
      });
      console.log("onComplete useLoginResult", result);
      //Sleep for 2 seconds to ensure the balance is updated
      await new Promise((resolve) => setTimeout(resolve, 2000));

      fetchUsdcBalance();
    },
  });
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  return (
    <Button disabled={disableLogin} onClick={login}>
      Log in
    </Button>
  );
}
