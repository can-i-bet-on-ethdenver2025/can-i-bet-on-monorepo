"use client";

import { GET_POOL } from "@/app/queries";
import { Card, CardContent } from "@/components/ui/card";
import { PoolStatus } from "@/lib/__generated__/graphql";
import { shame } from "@/lib/utils";
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
    <div className="container mx-auto px-4 py-8">
      <div className="text-2xl text-center font-bold">
        {pool?.pool?.question}
      </div>
      {/* <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          <a
            href={`https://x.com/search?q=${id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-blue-500 hover:underline">
              LINK TO X, WOW
            </span>
          </a>
        </div>
      </div> */}
      {/* TODO Flawed logic, will not work w/ new statuses */}
      {pool?.pool?.status !== PoolStatus.Pending && (
        <div className="bg-gray-800">
          <div className="text-white">
            <p>Pool is closed</p>
          </div>
        </div>
      )}

      {pool?.pool?.status === PoolStatus.Pending && (
        <Card className={"text-center"}>
          <CardContent>
            <p className={"text-xl"}>00:15:00 left before bets close</p>
          </CardContent>
        </Card>
      )}
      <CurrentSpreadCard poolId={id} />
      <SimulateBets poolId={id} />
    </div>
  );
}
