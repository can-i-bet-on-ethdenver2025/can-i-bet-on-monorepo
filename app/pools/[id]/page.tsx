"use client";

import { GET_POOL } from "@/app/queries";
import { Card, CardContent } from "@/components/ui/card";
import { PoolStatus } from "@/lib/__generated__/graphql";
import { shame } from "@/lib/utils";
import { CountdownTimer } from "@/stories/CountdownTimer";
import { CurrentSpreadCard } from "@/stories/CurrentSpreadCard";
import { SimulateBets } from "@/stories/SimulateBets";
import { useQuery } from "@apollo/client";
import { use } from "react";

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
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
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
            <div className="md:w-2/3 flex flex-col justify-between">
              <div>
                <p className="text-2xl font-bold mb-1">
                  {pool?.pool?.question}
                </p>
                <p className="text-gray-600">
                  Created by: {pool?.pool?.creatorName || "Anonymous"}
                </p>
              </div>
              {pool?.pool?.status === PoolStatus.Pending &&
                pool?.pool?.betsCloseAt && (
                  <CountdownTimer betsCloseAt={pool.pool.betsCloseAt} />
                )}
              {pool?.pool?.status !== PoolStatus.Pending && (
                <div className="text-red-500 font-medium">Pool is closed</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <CurrentSpreadCard poolId={id} />
      <SimulateBets poolId={id} />
    </div>
  );
}
