"use client";

import { GET_POOLS } from "@/app/queries";
import { Input } from "@/components/ui/input";
import {
  GetPoolsQueryVariables,
  OrderDirection,
  Pool_OrderBy,
  PoolStatus,
} from "@/lib/__generated__/graphql";
import { CountdownTimer } from "@/stories/CountdownTimer";
import { CurrentSpreadCard } from "@/stories/CurrentSpreadCard";
import IconsWithNumbers from "@/stories/IconsWithNumbers";
import { RatioBar } from "@/stories/RatioBar";
import PromptbetLogo from "@/stories/assets/CanIBetOn Logo.jpg";
import { useQuery } from "@apollo/client";
import { formatDistanceToNow } from "date-fns";
import { Clock, Search, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdStackedLineChart } from "react-icons/md";
import { PiXLogo } from "react-icons/pi";
import Jazzicon from "react-jazzicon";

const FILTERS = [
  { id: "newest", label: "Newest" },
  { id: "volume", label: "Highest Vol." },
  { id: "ending_soon", label: "Ending Soon" },
  { id: "recently_closed", label: "Recently Closed" },
  { id: "politics", label: "Politics" },
  { id: "technology", label: "Technology" },
  { id: "sports", label: "Sports" },
  { id: "crypto", label: "Crypto" },
  { id: "ai", label: "AI" },
  { id: "entertainment", label: "Entertainment" },
  { id: "celebrities", label: "Celebrities" },
  { id: "science", label: "Science" },
];

// Simple sparkline component to show volume trends
const VolumeSparkline: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  // This is a placeholder - in a real implementation, you would pass in actual data points
  return (
    <svg
      className={`h-8 w-16 ${className}`}
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
    >
      <path
        d="M0,35 L10,30 L20,32 L30,25 L40,28 L50,20 L60,15 L70,18 L80,10 L90,5 L100,8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-green-500"
      />
    </svg>
  );
};

export default function PoolsPage() {
  const [activeFilter, setActiveFilter] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const filter: GetPoolsQueryVariables["filter"] = {};

  // Set up variables for the main query based on active filter
  let orderBy = Pool_OrderBy.CreatedBlockTimestamp;
  let orderDirection = OrderDirection.Desc;

  // Do not show pools where bets are closed unless the user is searching for it
  // or has selected "recently closed" filter
  if (searchQuery.length === 0 && activeFilter !== "recently_closed") {
    filter.status = PoolStatus.Pending;
  } else if (searchQuery.length > 0) {
    filter.question_contains = searchQuery;
  }

  // Apply filter based on selected category
  switch (activeFilter) {
    case "newest":
      // Default is already set (CreatedBlockTimestamp Desc)
      break;
    case "volume":
      orderBy = Pool_OrderBy.TotalBets;
      orderDirection = OrderDirection.Desc;
      break;
    case "ending_soon":
      orderBy = Pool_OrderBy.BetsCloseAt;
      orderDirection = OrderDirection.Asc;
      break;
    case "recently_closed":
      filter.status_not = PoolStatus.Pending;
      orderBy = Pool_OrderBy.LastUpdatedBlockTimestamp;
      orderDirection = OrderDirection.Desc;
      break;
    case "politics":
      filter.category = "Politics";
      break;
    case "technology":
      filter.category = "Technology";
      break;
    case "sports":
      filter.category = "Sports";
      break;
    case "crypto":
      filter.category = "Crypto";
      break;
    case "ai":
      filter.category = "AI";
      break;
    case "entertainment":
      filter.category = "Entertainment";
      break;
    case "celebrities":
      filter.category = "Celebrities";
      break;
    case "science":
      filter.category = "Science";
      break;
    default:
      // If no match, default to newest
      break;
  }

  // Main pools query - with dynamic ordering based on filter
  const { data: pools, loading: poolsLoading } = useQuery(GET_POOLS, {
    variables: {
      filter,
      orderBy,
      orderDirection,
    },
  });

  // Query for highest volume pools
  const { data: highestVolumePools, loading: volumePoolsLoading } = useQuery(
    GET_POOLS,
    {
      variables: {
        filter: { status: PoolStatus.Pending },
        orderBy: Pool_OrderBy.TotalBets,
        orderDirection: OrderDirection.Desc,
      },
      onCompleted: (data) => {
        console.log("Highest volume pools data:", data);
      },
      onError: (error) => {
        console.error("Error fetching highest volume pools:", error);
      },
    }
  );

  // Query for pools ending soonest
  const { data: endingSoonPools, loading: endingSoonPoolsLoading } = useQuery(
    GET_POOLS,
    {
      variables: {
        filter: { status: PoolStatus.Pending },
        orderBy: Pool_OrderBy.BetsCloseAt,
        orderDirection: OrderDirection.Asc,
      },
      onCompleted: (data) => {
        console.log("Ending soon pools data:", data);
      },
      onError: (error) => {
        console.error("Error fetching ending soon pools:", error);
      },
    }
  );

  if (poolsLoading) {
    return (
      <main className="min-h-screen pb-24 md:pb-8">
        <div className="container mx-auto px-4 py-8">
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
      <div className="container mx-auto px-4 py-8">
        {/* Mobile Search Bar - only visible on small screens */}
        <div className="relative mb-6 md:hidden">
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

        {/* Mobile Filter Tabs - only visible on small screens */}
        <div className="md:hidden overflow-x-auto pb-2 mb-4">
          <div className="flex space-x-2 min-w-max">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                  activeFilter === filter.id
                    ? "bg-primary text-black"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop 3-column layout */}
        <div className="hidden md:grid md:grid-cols-12 gap-6">
          {/* Left Column - Logo and Filters */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="sticky top-20 space-y-6">
              {/* Logo and Website Name */}
              {/* <Link
                href="/"
                className="flex items-center gap-3 mb-8 justify-center"
              >
                <Image
                  src={PromptbetLogo}
                  alt="@CanIBetOn Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="font-bold text-lg tracking-wide">
                  @CanIBetOn
                </span>
              </Link> */}

              {/* Filters */}
              <div className="space-y-2">
                {FILTERS.map((filter) => (
                  <button
                    key={filter.id}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${
                      activeFilter === filter.id
                        ? "bg-primary text-black"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setActiveFilter(filter.id)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column - Pools */}
          <div className="md:col-span-6 lg:col-span-7">
            <div className="space-y-6">
              {pools?.pools && pools.pools.length > 0 ? (
                pools.pools.map((pool) => (
                  <div
                    key={pool.id}
                    className="bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800"
                  >
                    <div className="flex gap-4">
                      <div>
                        <Jazzicon
                          diameter={32}
                          seed={parseInt(pool.creatorId)}
                        />
                      </div>
                      <div className="flex flex-col space-y-2 flex-1 overflow-hidden">
                        <div className="flex">
                          <p className="font-bold">{pool.creatorName}</p>
                          <p className="text-sm text-muted-foreground ml-auto">
                            {formatDistanceToNow(
                              pool.createdBlockTimestamp * 1000,
                              {
                                addSuffix: true,
                              }
                            )}
                          </p>
                          <a
                            className="ml-2"
                            href={`https://x.com/${pool.creatorName}`}
                            target="_blank"
                            rel="noopener noreferrer"
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
                            showTotalBets={true}
                            cardClassName="w-full bg-black border border-gray-600"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-dark:bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 text-center">
                  <p className="text-xl text-gray-500">No pools found</p>
                  <p className="text-gray-400 mt-2">
                    Try a different filter or search term
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Search & Trending */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="sticky top-20 space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="search"
                  placeholder="Search pools..."
                  className="pl-10 h-12 text-lg rounded-full border border-gray-200 hover:border-primary/30 focus-visible:ring-primary/20 focus-visible:border-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Highest Volume Pools */}
              <div className="bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                  <h3 className="font-bold text-lg">Highest Volume</h3>
                </div>
                <div className="space-y-4">
                  {volumePoolsLoading ? (
                    <div className="animate-pulse space-y-4">
                      <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                      <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                      <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                    </div>
                  ) : highestVolumePools?.pools &&
                    highestVolumePools.pools.length > 0 ? (
                    highestVolumePools.pools
                      .filter(
                        (pool) => pool.totalBets && parseInt(pool.totalBets) > 0
                      )
                      .slice(0, 3)
                      .map((pool) => (
                        <Link key={pool.id} href={`/pools/${pool.id}`}>
                          <div className="flex flex-col hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors">
                            <p className="font-medium line-clamp-2 mb-2">
                              {pool.question}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <VolumeSparkline className="flex-shrink-0" />
                                <IconsWithNumbers
                                  icon={MdStackedLineChart}
                                  number={parseInt(pool.totalBets) / 1000000}
                                  prefix="$"
                                  suffix=" vol."
                                  abbreviateNumbers={true}
                                  decimalPlaces={1}
                                  minValForDecimals={1000}
                                />
                              </div>
                              <div className="w-24">
                                {pool.options && pool.totalBetsByOption && (
                                  <RatioBar
                                    items={[
                                      {
                                        label: pool.options[0] || "Yes",
                                        amount:
                                          parseInt(pool.totalBetsByOption[0]) ||
                                          0,
                                        color: "hsl(var(--option-a-color))",
                                      },
                                      {
                                        label: pool.options[1] || "No",
                                        amount:
                                          parseInt(pool.totalBetsByOption[1]) ||
                                          0,
                                        color: "hsl(var(--option-b-color))",
                                      },
                                    ]}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      No high volume pools available
                    </div>
                  )}
                </div>
              </div>

              {/* Ending Soon Pools */}
              <div className="bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex items-center mb-4">
                  <Clock className="w-5 h-5 text-amber-500 mr-2" />
                  <h3 className="font-bold text-lg">Ending Soon</h3>
                </div>
                <div className="space-y-4">
                  {endingSoonPoolsLoading ? (
                    <div className="animate-pulse space-y-4">
                      <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                      <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                      <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
                    </div>
                  ) : endingSoonPools?.pools &&
                    endingSoonPools.pools.length > 0 ? (
                    endingSoonPools.pools
                      .filter(
                        (pool) =>
                          pool.betsCloseAt &&
                          parseInt(pool.betsCloseAt) >
                            Math.floor(Date.now() / 1000)
                      )
                      .slice(0, 5)
                      .map((pool) => (
                        <Link key={pool.id} href={`/pools/${pool.id}`}>
                          <div className="flex items-start space-x-3 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors">
                            {pool.imageUrl ? (
                              <img
                                src={pool.imageUrl}
                                alt={pool.question}
                                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                              />
                            ) : (
                              <div className="flex-shrink-0">
                                <Jazzicon
                                  diameter={48}
                                  seed={parseInt(pool.creatorId)}
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium line-clamp-2">
                                {pool.question}
                              </p>
                              <div className="flex justify-between items-center mt-1">
                                <IconsWithNumbers
                                  icon={MdStackedLineChart}
                                  number={parseInt(pool.totalBets) / 1000000}
                                  prefix="$"
                                  suffix=" vol."
                                  abbreviateNumbers={true}
                                  decimalPlaces={1}
                                  minValForDecimals={1000}
                                />
                                <CountdownTimer
                                  betsCloseAt={parseInt(pool.betsCloseAt)}
                                  compact={true}
                                />
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      No pools ending soon
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Pool List - only visible on small screens */}
        <div className="md:hidden space-y-6">
          {pools?.pools && pools.pools.length > 0 ? (
            pools.pools.map((pool) => (
              <div
                key={pool.id}
                className="bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800"
              >
                <div className="flex gap-4">
                  <div>
                    <Jazzicon diameter={32} seed={parseInt(pool.creatorId)} />
                  </div>
                  <div className="flex flex-col space-y-2 flex-1 overflow-hidden">
                    <div className="flex">
                      <p className="font-bold">{pool.creatorName}</p>
                      <p className="text-sm text-muted-foreground ml-auto">
                        {formatDistanceToNow(
                          pool.createdBlockTimestamp * 1000,
                          {
                            addSuffix: true,
                          }
                        )}
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
            ))
          ) : (
            <div className="bg-gray-900 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 text-center">
              <p className="text-xl text-gray-500">No pools found</p>
              <p className="text-gray-400 mt-2">
                Try a different filter or search term
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
