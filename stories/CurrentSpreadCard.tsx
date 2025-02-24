import { GET_POOL } from "@/app/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { optionColor } from "@/lib/config";
import { shame, usdcAmountToDollars } from "@/lib/utils";
import { useQuery } from "@apollo/client";
import { FC } from "react";
import { RatioBar } from "./RatioBar";
interface CurrentSpreadCardProps {
  poolId: string;
}

const LoadingSkeleton = () => (
  <Card className="w-full max-w-md mx-auto">
    <CardHeader>
      <Skeleton className="h-8 w-40" />
    </CardHeader>
    <CardContent className="space-y-4">
      <Skeleton className="h-5 w-full" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </CardContent>
  </Card>
);

export const CurrentSpreadCard: FC<CurrentSpreadCardProps> = ({ poolId }) => {
  const { data, loading, error } = useQuery(GET_POOL, {
    variables: { poolId: shame(poolId) },
    fetchPolicy: "no-cache",
  });

  // Add this for debugging
  console.log("Pool data:", data?.pool);

  if (loading) return <LoadingSkeleton />;
  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="py-4">
          <div className="text-red-500">
            Error loading spread data. Please try again later.
          </div>
        </CardContent>
      </Card>
    );
  }

  const ratioItems = [
    {
      label: data?.pool?.options[0] || "Oh, yes",
      amount: parseInt(data?.pool?.totalBetsByOption[0]) || 0, // Ensure number
      color: "hsl(var(--option-a-color))",
    },
    {
      label: data?.pool?.options[1] || "Oh, No",
      amount: parseInt(data?.pool?.totalBetsByOption[1]) || 0, // Ensure number
      color: "hsl(var(--option-b-color))",
    },
  ];

  // Add this for debugging
  console.log("Ratio items:", ratioItems);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className={"text-center"}>Current Spread</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center">
          <RatioBar items={ratioItems} className="mb-2" />

          <div className="text-center">
            {`Total bets: ${usdcAmountToDollars(data?.pool?.totalBets || 0)}`}
          </div>
        </div>

        <div className="flex-col gap-4">
          {data?.pool?.options.map((option: string, index: number) => (
            <div key={index} className="flex">
              <div
                className={`text-lg font-bold mb-2 text-${optionColor[index]}`}
              >
                {option}
              </div>
              <div className="text-lg font-semibold ml-auto">
                {usdcAmountToDollars(data?.pool?.totalBetsByOption[index] || 0)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
