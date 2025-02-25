"use client";

import { GET_POOL } from "@/app/queries";
import { Card, CardContent } from "@/components/ui/card";
import { PoolStatus } from "@/lib/__generated__/graphql";
import { shame } from "@/lib/utils";
import { useQuery } from "@apollo/client";
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
  const {
    data,
    loading,
    error: queryError,
  } = useQuery(GET_POOL, {
    variables: { poolId: shame(poolId) },
  });

  //TODO Show a skeleton here, not loading
  if (loading) {
    return <div>Loading...</div>;
  }
  if (queryError) {
    return <div>Error: {queryError.message}</div>;
  }

  if (!data?.pool?.xPostId) {
    return <div>No tweet ID found for pool or pool undefined</div>;
  }

  return (
    <Card className={className}>
      <CardContent>
        <div className="flex-col justify-between gap-4 mt-4">
          <div className={"flex flex-row gap-2 justify-center"}>
            <p>Pool started by:</p>
            <CreatorInfo
              creatorId={data?.pool?.creatorId}
              creatorName={data?.pool?.creatorName}
              className="justify-center"
            />
          </div>
          <Tweet id={data?.pool?.xPostId} />
          {data?.pool?.status === PoolStatus.Pending &&
          data?.pool?.betsCloseAt ? (
            <CountdownTimer betsCloseAt={data?.pool?.betsCloseAt} />
          ) : (
            <div className="text-red-500 font-medium">Pool is closed</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TweetCard;
