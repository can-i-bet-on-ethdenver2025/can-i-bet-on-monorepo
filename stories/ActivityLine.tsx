import { Card } from "@/components/ui/card";
import { GetBetsQuery } from "@/lib/__generated__/graphql";
import { optionColor } from "@/lib/config";
import { USDC_DECIMALS } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { FC, memo, useMemo } from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { PlayerAddressChip } from "./PlayerAddressChip";

export type ActivityLineProps = {
  bet: GetBetsQuery["bets"][0];
  showQuestion?: boolean;
  showPoolImage?: boolean;
};

// Map option colors to actual Tailwind classes
const getOptionClasses = (colorKey: string) => {
  const colorMap: Record<string, { text: string; bg: string }> = {
    "option-a": { text: "text-blue-500", bg: "bg-blue-500/20" },
    "option-b": { text: "text-red-500", bg: "bg-red-500/20" },
    "option-c": { text: "text-green-500", bg: "bg-green-500/20" },
    "option-d": { text: "text-purple-500", bg: "bg-purple-500/20" },
    "option-e": { text: "text-yellow-500", bg: "bg-yellow-500/20" },
  };

  return colorMap[colorKey] || colorMap["option-a"];
};

const ActivityLineComponent: FC<ActivityLineProps> = ({
  bet,
  showQuestion = true,
  showPoolImage = true,
}) => {
  const poolSlug = bet.pool.id.toString();
  const timestamp = new Date(Number(bet.blockTimestamp) * 1000);
  const optionIdx = Number(bet.optionIndex);

  // Format bet amount as requested - human readable with commas and no cents
  const betAmountInUSDC = Number(bet.amount) / Math.pow(10, USDC_DECIMALS);
  const formattedBetAmount = `$${Math.round(betAmountInUSDC).toLocaleString()}`;

  const optionClasses = useMemo(() => {
    const colorKey = optionColor[optionIdx] || "option-a";
    return getOptionClasses(colorKey);
  }, [optionIdx]);

  return (
    <div className="block">
      <Card className="p-3 sm:p-4">
        <div className="flex gap-3 items-center">
          {showPoolImage && (
            <div className="flex-shrink-0">
              <Link href={`/pools/${poolSlug}`} className="block">
                <img
                  src={bet.pool.imageUrl}
                  alt={bet.pool.question.slice(0, 10)}
                  width={40}
                  height={40}
                  className="rounded-full object-cover sm:w-12 sm:h-12"
                />
              </Link>
            </div>
          )}

          <div className="flex-grow min-w-0">
            {showQuestion && (
              <Link href={`/pools/${poolSlug}`} className="block">
                <div className="text-sm sm:text-md font-bold text-foreground mb-1 hover:underline truncate">
                  {bet.pool.question}
                </div>
              </Link>
            )}

            <div
              className={`flex items-center flex-wrap gap-x-1.5 gap-y-2 ${
                !showQuestion ? "py-1" : ""
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Jazzicon
                  diameter={20}
                  seed={jsNumberForAddress(String(bet.user))}
                />
                <PlayerAddressChip
                  address={bet.user}
                  showAvatar={false}
                  variant="small"
                />
              </div>
              <span className="text-xs sm:text-sm">
                bet {formattedBetAmount} on
              </span>
              <span
                className={`${optionClasses.text} ${optionClasses.bg} rounded px-1.5 py-0.5 text-xs sm:text-sm`}
              >
                {bet.pool.options[optionIdx]}
              </span>
            </div>

            <div className="text-xs sm:hidden mt-2 text-gray-500">
              {formatDistanceToNow(timestamp, {
                addSuffix: true,
              })
                .replace("about ", "")
                .replace("minutes", "min.")}
            </div>
          </div>

          <div className="hidden sm:block flex-shrink-0 text-sm text-gray-500 self-center">
            {formatDistanceToNow(timestamp, {
              addSuffix: false,
            })
              .replace("about ", "")
              .replace("minutes", "min.")}
          </div>
        </div>
      </Card>
    </div>
  );
};

export const ActivityLine = memo(ActivityLineComponent);
