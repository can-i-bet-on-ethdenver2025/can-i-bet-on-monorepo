"use client";

import { GET_POOL } from "@/app/queries";
import { Activity } from "@/stories/Activity";
import { CurrentSpreadCard } from "@/stories/CurrentSpreadCard";
import { PlaceBetCard } from "@/stories/PlaceBetCard";
import TweetCard from "@/stories/TweetCard";
import { useQuery } from "@apollo/client";
import { use } from "react";

// See BetList.tsx for the fragment, ass backwards

type Params = Promise<{ id: string }>;

export default function PoolDetailsPage({ params }: { params: Params }) {
  const { id } = use(params);

  const { data: pool, loading: poolLoading } = useQuery(GET_POOL, {
    variables: {
      poolId: id,
    },
    pollInterval: 3000,
  });

  if (poolLoading) {
    return <div>Loading...</div>;
  }

  console.log("pool", pool);

  return (
    <div className="mx-auto py-8 flex flex-col gap-4">
      <TweetCard poolId={id} className="w-full max-w-md mx-auto" />
      <CurrentSpreadCard pool={pool?.pool} loading={poolLoading} />
      {pool?.pool?.status === "PENDING" && (
        <PlaceBetCard pool={pool.pool} loading={poolLoading} />
      )}
      <Activity
        poolId={id}
        showQuestion={false}
        showPoolImage={false}
        maxEntries={5}
      />
    </div>
  );
}
