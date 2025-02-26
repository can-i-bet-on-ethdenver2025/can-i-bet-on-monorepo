"use client";

import { GET_POOLS } from "@/app/queries";
import { Input } from "@/components/ui/input";
import {
  GetPoolsQueryVariables,
  OrderDirection,
  Pool_OrderBy,
  PoolStatus,
} from "@/lib/__generated__/graphql";
import { CurrentSpreadCard } from "@/stories/CurrentSpreadCard";
import { useQuery } from "@apollo/client";
import { formatDistanceToNow } from "date-fns";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PiXLogo } from "react-icons/pi";
import Jazzicon from "react-jazzicon";

const FILTERS = [
  { id: "newest", label: "Newest" },
  { id: "volume", label: "Highest Vol." },
  { id: "politics", label: "Politics" },
  { id: "technology", label: "Technology" },
  { id: "sports", label: "Sports" },
  { id: "crypto", label: "Crypto" },
  { id: "ai", label: "AI" },
  { id: "entertainment", label: "Entertainment" },
  { id: "celebrities", label: "Celebrities" },
  { id: "science", label: "Science" },
];

//TODO move pool listing that we have in this page to a component so we can reuse it on the pool browser.
export default function PoolsPage() {
  // const [activeFilter, setActiveFilter] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const filter: GetPoolsQueryVariables["filter"] = {};

  // Do not show pools where bets are closed unless the user is searching for it
  if (searchQuery.length === 0) {
    filter.status = PoolStatus.Pending;
  } else {
    filter.question_contains = searchQuery;
  }

  //TODO Implement search and filter
  const { data: pools, loading: poolsLoading } = useQuery(GET_POOLS, {
    variables: {
      filter,
      orderBy: Pool_OrderBy.CreatedBlockTimestamp,
      orderDirection: OrderDirection.Desc,
    },
  });

  if (poolsLoading) {
    //TODO make me a skeleton
    return (
      <main className="min-h-screen pb-24 md:pb-8">
        <div className="container mx-auto px-4 py-8">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Search pools..."
              className="pl-10 h-12 text-lg border-2 border-gray-200 hover:border-primary/30 focus-visible:ring-primary/20 focus-visible:border-primary"
              disabled
            />
          </div>
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-24 md:pb-8">
      <div className="container mx-auto px-4 py-8 overflow-x-hidden">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="search"
            placeholder="Search pools..."
            className="pl-10 h-12 text-lg border-2 border-gray-200 hover:border-primary/30 focus-visible:ring-primary/20 focus-visible:border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Bet Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-items-center p-2">
          {pools?.pools.map((pool) => (
            <div key={pool.id} className="w-full">
              <hr className="relative -mx-4 md:mx-0 mb-4" />
              <div className="flex gap-4">
                <div>
                  <Jazzicon diameter={32} seed={parseInt(pool.creatorId)} />
                </div>
                <div className="flex flex-col space-y-2 flex-1 overflow-hidden">
                  <div className="flex">
                    <p className="font-bold">{pool.creatorName}</p>
                    <p className="text-sm text-muted-foreground ml-auto">
                      {formatDistanceToNow(pool.createdBlockTimestamp * 1000, {
                        addSuffix: true,
                      })}
                    </p>
                    <a
                      className="ml-2"
                      href={`https://x.com/${pool.creatorName}`}
                    >
                      <PiXLogo className="w-5 h-5" />
                    </a>
                  </div>
                  <Link href={`/pools/${pool.id}`}>
                    <p className="text-xl hover:underline line-clamp-2">
                      {pool.question}
                    </p>
                  </Link>
                  <Link href={`/pools/${pool.id}`}>
                    <CurrentSpreadCard
                      poolId={pool.id}
                      showTitle={false}
                      showTotalBets={false}
                      cardClassName="w-full max-w-md mx-auto bg-black border border-gray-600"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
