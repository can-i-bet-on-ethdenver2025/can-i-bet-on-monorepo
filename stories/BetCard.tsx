"use client";
import { Card, CardContent } from "@/components/ui/card";
import type { GetPoolsQuery } from "@/lib/__generated__/graphql";
import { usdcAmountToDollars } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import Jazzicon from "react-jazzicon";
import { BetButton } from "./BetButton";
import { VolumeWithIcon } from "./IconsWithNumbers";
import { RatioBar } from "./RatioBar";

// Define a list of colors for dynamic options
const optionColors = [
  "hsl(var(--option-a-color))",
  "hsl(var(--option-b-color))",
  "hsl(var(--option-c-color))", // TODO Doesn't exist
  "hsl(var(--option-d-color))", // TODO Doesn't exist
  "hsl(var(--option-e-color))", // TODO Doesn't exist
  "hsl(var(--option-f-color))", // TODO Doesn't exist
  // "#38A169", // Green
  // "#D69E2E", // Yellow
  // "#805AD5", // Purple
  // "#ED64A6", // Pink
];

export interface BetCardProps {
  pool: GetPoolsQuery["pools"][0]; //typeof single elem from GET_POOL
}

//TODO Implement placing an actual bet
const BetCard = ({ pool }: BetCardProps) => {
  console.log("pool", pool);
  // Build ratio items for the RatioBar from the pool options and their totals
  const ratioItems = pool.options.map((option, index) => ({
    label: option,
    amount: Number(pool.totalBetsByOption[index]),
    color: optionColors[index % optionColors.length],
  }));

  // Convert the pool's selected option to a number
  //TODO Bug, we want it to show selected if the logged on user has a bet only, but we're not fetching bets in the GET_POOLS query
  const selectedOption = Number(pool.selectedOption);

  return (
    <motion.div
      className="relative p-[2px] rounded-lg bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-emerald-500/30 w-full max-w-[420px]"
      initial={{
        boxShadow: "0 0 0 rgba(168, 85, 247, 0)",
        y: 0,
        background:
          "linear-gradient(to right, rgba(168, 85, 247, 0.3), rgba(59, 130, 246, 0.3), rgba(16, 185, 129, 0.3))",
      }}
      animate={{
        boxShadow: "0 0 0 rgba(168, 85, 247, 0)",
        y: 0,
        background:
          "linear-gradient(to right, rgba(168, 85, 247, 0.3), rgba(59, 130, 246, 0.3), rgba(16, 185, 129, 0.3))",
      }}
      whileHover={{
        boxShadow: [
          "0 0 20px rgba(168, 85, 247, 0.3)",
          "0 0 25px rgba(59, 130, 246, 0.3)",
          "0 0 20px rgba(16, 185, 129, 0.3)",
        ],
        y: -4,
        scale: 1.01,
        background: [
          "linear-gradient(to right, rgba(168, 85, 247, 0.8), rgba(59, 130, 246, 0.8), rgba(16, 185, 129, 0.8))",
          "linear-gradient(to right, rgba(59, 130, 246, 0.8), rgba(16, 185, 129, 0.8), rgba(168, 85, 247, 0.8))",
          "linear-gradient(to right, rgba(16, 185, 129, 0.8), rgba(168, 85, 247, 0.8), rgba(59, 130, 246, 0.8))",
        ],
      }}
      transition={{
        duration: 0.3,
        y: {
          type: "spring",
          stiffness: 500,
          damping: 25,
        },
        background: {
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        },
      }}
    >
      <Card className="bg-background/95 backdrop-blur-sm rounded-lg overflow-hidden">
        <CardContent className="p-4 flex flex-col">
          {/* Header section with pool image, avatar, and text */}
          <div className="flex gap-3 mb-2">
            <div className="h-10 w-10 flex-shrink-0 rounded-lg overflow-hidden">
              <img
                src={pool.imageUrl}
                alt="Pool Image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 flex-shrink-0">
                  <Jazzicon
                    diameter={20}
                    // Use a slice of the address for the seed calculation
                    seed={parseInt(pool.creatorAddress.slice(2, 10), 16)}
                  />
                </div>
                <span className="text-sm font-medium text-muted-foreground truncate">
                  {pool.creatorName}
                </span>
              </div>
              <h3 className="text-base font-semibold line-clamp-3 leading-tight">
                <Link href={`/pools/${pool.id}`}>{pool.question}</Link>
              </h3>
            </div>
          </div>

          {/* Ratio Bar showing distribution for options */}
          <div className="mb-4">
            <RatioBar items={ratioItems} />
          </div>

          {/* Dynamic Bet Buttons section */}
          <div className="flex gap-8 justify-center mb-2">
            {pool.options.map((option, index) => {
              const isSelected = selectedOption === index;
              return (
                <div key={index} className="flex flex-col items-center gap-1">
                  <BetButton
                    option={option}
                    optionIndex={index}
                    isSelected={isSelected}
                  />
                  <span className="text-sm text-muted-foreground">
                    {usdcAmountToDollars(pool.totalBetsByOption[index])}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Stats section */}
          <div className="mt-auto">
            {/* TODO: totalBets is known to be inaccurate */}
            <VolumeWithIcon number={Number(pool.totalBets)} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BetCard;
