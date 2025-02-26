"use client";

import { GET_POOLS } from "@/app/queries";
import { Input } from "@/components/ui/input";
import {
  GetPoolsQueryVariables,
  OrderDirection,
  Pool_OrderBy,
  PoolStatus,
} from "@/lib/__generated__/graphql";
import { BottomNav } from "@/stories/BottomNav";
import { FilterButton } from "@/stories/FilterButton";
import Tweet from "@/stories/Tweet";
import { useQuery } from "@apollo/client";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
  const [activeFilter, setActiveFilter] = useState("newest");
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
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-8">
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

        {/* Filters */}
        <div className="mb-8 overflow-x-auto md:overflow-x-visible">
          <div className="flex flex-nowrap md:flex-wrap gap-2 pb-4 md:pb-0">
            {FILTERS.map((filter) => (
              <FilterButton
                key={filter.id}
                label={filter.label}
                isActive={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
              />
            ))}
          </div>
        </div>

        {/* Bet Cards Grid */}
        {!poolsLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-items-center p-2">
            {pools?.pools.map((pool) => (
              <div key={pool.id} className={"w-full"}>
                <hr className="relative -mx-[100vw] md:mx-0 my-4" />
                <Link href={`/pools/${pool.id}`}>
                  <Tweet id={pool.xPostId} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav currentPath="/pools" />
    </main>
  );
}
