"use client";
import { GET_POOLS } from "@/app/queries";
import { Input } from "@/components/ui/input";
import { OrderDirection, Pool_OrderBy } from "@/lib/__generated__/graphql";
import BetCard from "@/stories/BetCard";
import { useQuery } from "@apollo/client";
import { Search } from "lucide-react";
import { FC } from "react";
import { BottomNav } from "../stories/BottomNav";

interface HomePageProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  onSearch?: (value: string) => void;
  currentPath?: string;
}

//TODO move pool listing that we have in this page to a component so we can reuse it on the pool browser.
export const HomePage: FC<HomePageProps> = ({
  title = "PromptBet",
  subtitle = "Turn any idea into a betting pool",
  ctaText = "Create Pool",
  onCtaClick = () => {},
  onSearch = () => {},
  currentPath = "/",
}) => {
  // Replace fake data with real query
  const { data: poolsData, loading: poolsLoading } = useQuery(GET_POOLS, {
    variables: {
      filter: {},
      orderBy: Pool_OrderBy.CreatedBlockTimestamp,
      orderDirection: OrderDirection.Desc,
    },
  });
  console.log("poolsData", poolsData);

  return (
    <main className="min-h-screen pb-16 md:pb-0">
      {/* Search Section */}
      <section className="py-8 md:py-12 px-2 md:px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Search for betting pools..."
              className="pl-10 h-12 text-lg border-2 border-gray-200 hover:border-primary/30 focus-visible:ring-primary/20 focus-visible:border-primary"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Betting Cards Grid */}
      <section className="px-2 md:px-4 pb-8 md:pb-16">
        <div className="container mx-auto">
          {poolsLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-items-center">
              {poolsData?.pools.map((pool) => (
                <BetCard key={pool.id} pool={pool} />
              ))}
            </div>
          )}
        </div>
      </section>

      <BottomNav currentPath={currentPath} />
    </main>
  );
};
