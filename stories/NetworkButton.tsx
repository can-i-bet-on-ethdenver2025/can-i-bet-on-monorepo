import { CHAIN_CONFIG } from "@/lib/config";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface NetworkButtonProps {
  chainId: number | string;
  selected?: boolean;
  onClick?: () => void;
  size?: "default" | "small";
}

export function NetworkButton({
  chainId,
  selected = false,
  onClick,
  size = "default",
}: NetworkButtonProps) {
  let parsedChainId = chainId;

  if (typeof chainId === "string") {
    parsedChainId = chainId.replace("eip155:", "");
  }

  let chainConfig = CHAIN_CONFIG[parsedChainId];

  if (!chainConfig) {
    parsedChainId = 84532; //TODO Disgusting hack
    chainConfig = CHAIN_CONFIG[parsedChainId];
    // console.error(
    // `No configuration found for chain ID: ${chainId} (parsed: ${parsedChainId})`
    // );
    // return null;
  }

  return (
    <div
      className={cn(
        "relative rounded-lg",
        size === "default" ? "p-1.5" : "p-0.5",
        selected && "border-[3px]"
      )}
      style={{ borderColor: chainConfig.backgroundColor }}
    >
      <button
        onClick={onClick}
        style={{ backgroundColor: chainConfig.backgroundColor }}
        className={cn(
          "flex items-center justify-center rounded-lg transition-all",
          size === "default"
            ? "w-[12.5rem] h-[3.75rem]"
            : "w-[7.5rem] h-[2rem]",
          "hover:opacity-80 active:opacity-70"
        )}
      >
        <div
          className={cn(
            "relative",
            size === "default" ? "w-[10rem] h-[2.5rem]" : "w-[6rem] h-[1.25rem]"
          )}
        >
          <Image
            src={chainConfig.iconUrl}
            alt={`${chainConfig.chain.name} Network`}
            fill
            className="object-contain"
          />
        </div>
      </button>
    </div>
  );
}
