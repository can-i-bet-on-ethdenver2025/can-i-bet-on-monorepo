"use client";
import { GET_POOLS } from "@/app/queries";
import { Input } from "@/components/ui/input";
import { OrderDirection, Pool_OrderBy } from "@/lib/__generated__/graphql";
import PromptBetLogo from "@/stories/assets/promptbet-logo.png";
import BetCard from "@/stories/BetCard";
import { useQuery } from "@apollo/client";
import { Search } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { BottomNav } from "./BottomNav";

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

  return (
    <main className="min-h-screen pb-16 md:pb-0">
      <section className="relative min-h-[32vh] sm:min-h-[80vh] md:min-h-[90vh] flex items-center justify-center bg-[#8000FF] px-4 py-4 md:py-0">
        {/* Hero Content */}
        <div className="container mx-auto">
          {/* Mobile Card View */}
          <div className="block md:hidden bg-white/10 backdrop-blur-sm rounded-2xl p-4 max-w-sm mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-[60px] h-[60px]">
                <Image
                  src={PromptBetLogo}
                  alt="PromptBet Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold text-white">{title}</h1>
            </div>
            <p className="text-base text-white/90 mb-3">{subtitle}</p>
            <button
              onClick={onCtaClick}
              className="w-full px-6 py-2.5 bg-white text-[#8000FF] rounded-xl font-bold text-lg
                     hover:bg-opacity-90 transition-all duration-200 
                     focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#8000FF]"
            >
              {ctaText}
            </button>
          </div>

          {/* Desktop View */}
          <div className="hidden md:flex flex-row items-center justify-between py-16">
            {/* Left side - Text Content */}
            <div className="w-1/2 text-left pr-8">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                {title}
              </h1>
              <p className="text-2xl md:text-3xl text-white/90 mb-8 max-w-xl">
                {subtitle}
              </p>
              <button
                onClick={onCtaClick}
                className="px-8 py-4 bg-white text-[#8000FF] rounded-xl font-bold text-lg
                         hover:bg-opacity-90 transition-all duration-200 
                         focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#8000FF]"
              >
                {ctaText}
              </button>
            </div>

            {/* Right side - Hero Image */}
            <div className="w-1/2">
              <div className="relative w-[700px] h-[700px]">
                <Image
                  src={PromptBetLogo}
                  alt="PromptBet Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-0 w-16 md:w-64 h-16 md:h-64 bg-purple-400 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-16 md:w-64 h-16 md:h-64 bg-violet-400 rounded-full opacity-20 blur-3xl" />
        </div>
      </section>

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
              className="pl-10 h-12 text-lg border-2 border-gray-200 hover:border-[#8000FF]/30 focus-visible:ring-[#8000FF]/20 focus-visible:border-[#8000FF]"
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
