import { GET_BETS } from "@/app/queries";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bet_OrderBy,
  GetBetsQuery,
  OrderDirection,
} from "@/lib/__generated__/graphql";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { FC, useEffect, useState } from "react";
import { ActivityLine } from "./ActivityLine";

// Query to fetch initial data
//TODO Try using fragments again, repeating common fields takes up space unnecessarily

// Subscription for real-time updates
export const GET_BETS_SUBSCRIPTION = gql`
  subscription GetBetsSubscription($filter: Bet_filter) {
    bets(orderBy: blockTimestamp, orderDirection: desc, where: $filter) {
      id
      betIntId
      optionIndex
      amount
      user
      poolIntId
      blockNumber
      blockTimestamp
      transactionHash
      chainId
      chainName
      createdAt
      updatedAt
      poolIdHex
      pool {
        id
        poolIntId
        question
        options
        totalBets
        totalBetsByOption
        selectedOption
        status
        decisionDate
        betsCloseAt
        creatorId
        creatorName
        imageUrl
        chainId
        chainName
        isDraw
        xPostId
        category
        closureCriteria
        closureInstructions
        createdBlockNumber
        createdBlockTimestamp
        createdTransactionHash
        gradedBlockNumber
        gradedBlockTimestamp
        gradedTransactionHash
        lastUpdatedBlockNumber
        lastUpdatedBlockTimestamp
        lastUpdatedTransactionHash
      }
    }
  }
`;

export const Activity: FC<{
  maxEntries?: number;
  poolId?: string;
  showQuestion?: boolean;
  showPoolImage?: boolean;
}> = ({
  maxEntries = 10,
  poolId,
  showQuestion = true,
  showPoolImage = true,
}) => {
  // State to store combined data from query and subscription
  const [activities, setActivities] = useState<GetBetsQuery["bets"]>([]);
  const [showAdditionalBets, setShowAdditionalBets] = useState(0);

  // Create filter based on poolId if provided
  const filter = poolId ? { pool: poolId } : {};

  // Query for initial data
  const { data: queryData, loading: queryLoading } = useQuery(GET_BETS, {
    variables: {
      first: maxEntries + showAdditionalBets,
      filter,
      orderBy: Bet_OrderBy.BlockTimestamp,
      orderDirection: OrderDirection.Desc,
    },
  });

  // Subscribe to real-time updates
  const { data: subscriptionData } = useSubscription(GET_BETS_SUBSCRIPTION, {
    variables: {
      filter,
    },
  });

  // Update activities when query data changes
  useEffect(() => {
    if (queryData?.bets) {
      setActivities(queryData.bets);
    }
  }, [queryData]);

  // Update activities when subscription data changes
  useEffect(() => {
    if (subscriptionData?.bets && subscriptionData.bets.length > 0) {
      // Add new bet to the beginning and maintain maxEntries limit
      setActivities((prevActivities) => {
        const newBet = subscriptionData.bets[0];

        // Check if this bet is already in our list to avoid duplicates
        if (prevActivities.some((bet) => bet.id === newBet.id)) {
          return prevActivities;
        }

        // Add new bet to the beginning and limit to maxEntries
        return [newBet, ...prevActivities].slice(0, maxEntries);
      });
    }
  }, [subscriptionData, maxEntries]);

  // Determine loading state
  const isLoading = queryLoading && activities.length === 0;

  // TODO get count of all bets for the pool and then hide the show more button at the end
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className={"text-center"}>Bet history</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {isLoading && (
            <div className="text-center py-4">Loading activities...</div>
          )}
          {!isLoading && activities.length === 0 && (
            <div className="text-center py-4">No bets found</div>
          )}
          {activities.map((activity, index) => (
            <ActivityLine
              key={`${activity.user}-${activity.blockTimestamp}-${index}`}
              bet={activity}
              showQuestion={showQuestion}
              showPoolImage={showPoolImage}
            />
          ))}
          <div className="flex justify-center">
            <Button
              onClick={() => setShowAdditionalBets(showAdditionalBets + 5)}
            >
              Show more
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
