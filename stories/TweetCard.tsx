"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CountdownTimer } from "./CountdownTimer";
import { CreatorInfo } from "./CreatorInfo";
import Tweet from "./Tweet";

// Sample tweet IDs to randomly select from
const SAMPLE_TWEET_IDS = [
  "1893049568805486621",
  "1894085659263951232",
  "1894094861931778280",
  "1826015426658415033",
] as const;

interface TweetCardProps {
  poolId: string;
  className?: string;
}

const TweetCard = ({ poolId, className = "" }: TweetCardProps) => {
  // Randomly select a tweet ID for now
  const randomTweetId =
    SAMPLE_TWEET_IDS[Math.floor(Math.random() * SAMPLE_TWEET_IDS.length)];

  //  const {
  //    data,
  //    loading,
  //    error: queryError,
  //  } = useQuery(GET_POOL, {
  //    variables: { poolId: shame(poolId) },
  //  });

  return (
    <Card className={className}>
      <CardContent>
        <div className="flex-col justify-between gap-4 mt-4">
          <div className={"flex flex-row gap-2 justify-center"}>
            <p>Pool started by:</p>
            <CreatorInfo
              creatorId="1" // Hardcoded for now
              creatorName="@example" // Hardcoded for now
              className="justify-center"
            />
          </div>
          <Tweet id={randomTweetId} />
          <CountdownTimer
            betsCloseAt={new Date(Date.now() + 1000 * 60 * 60 * 24).getTime()}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TweetCard;
