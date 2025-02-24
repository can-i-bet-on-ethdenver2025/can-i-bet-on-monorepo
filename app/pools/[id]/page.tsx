"use client";

import { GET_POOL } from "@/app/queries";
import { Card, CardContent } from "@/components/ui/card";
import { PoolStatus } from "@/lib/__generated__/graphql";
import { shame } from "@/lib/utils";
import { CountdownTimer } from "@/stories/CountdownTimer";
import { CurrentSpreadCard } from "@/stories/CurrentSpreadCard";
import { PlaceBetCard } from "@/stories/PlaceBetCard";
import { useQuery } from "@apollo/client";
import { use } from "react";
import Jazzicon from "react-jazzicon";

// See BetList.tsx for the fragment, ass backwards

type Params = Promise<{ id: string }>;

export default function PoolDetailsPage({ params }: { params: Params }) {
  const { id } = use(params);

  const { data: pool, loading: poolLoading } = useQuery(GET_POOL, {
    variables: {
      poolId: shame(id),
    },
  });

  if (poolLoading) {
    return <div>Loading...</div>;
  }

  console.log("pool", pool);

  return (
    <div className="mx-auto py-8 flex flex-col gap-4">
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-1">
            <div className="md:w-1/4 flex items-center">
              {pool?.pool?.imageUrl ? (
                <img
                  src={pool.pool.imageUrl}
                  alt={pool.pool.question.slice(0, 10) || "Pool image"}
                  width={300}
                  height={300}
                  className="rounded-lg w-full h-auto object-cover"
                />
              ) : (
                <div className="bg-gray-200 rounded-lg w-full aspect-square" />
              )}
            </div>
            <div className="md:w-3/4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex-shrink-0">
                    <Jazzicon
                      diameter={20}
                      // Use a slice of the address for the seed calculation
                      seed={parseInt(pool?.pool?.creatorId || "0")}
                    />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground truncate">
                    {pool?.pool?.creatorName}
                  </span>
                </div>
                <p className="text-2xl font-bold">{pool?.pool?.question}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          {pool?.pool?.status === PoolStatus.Pending &&
          pool?.pool?.betsCloseAt ? (
            <CountdownTimer betsCloseAt={pool.pool.betsCloseAt} />
          ) : (
            <div className="text-red-500 font-medium">Pool is closed</div>
          )}
        </CardContent>
      </Card>

      <CurrentSpreadCard poolId={id} />
      <PlaceBetCard poolId={id} />
    </div>
  );
}
