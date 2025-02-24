import { GET_POOL } from "@/app/queries";
import { Pool, PoolStatus } from "@/lib/__generated__/graphql";
import { MockedProvider } from "@apollo/client/testing";
import type { Meta, StoryObj } from "@storybook/react";
import { CurrentSpreadCard } from "./CurrentSpreadCard";

const mocks = [
  {
    request: {
      query: GET_POOL,
      variables: { poolId: "0x01" },
    },
    result: {
      data: {
        pool: {
          id: "0x01",
          poolIntId: "0x01",
          question: "What is the capital of France?",
          options: ["Paris", "London"],
          totalBets: "3000000",
          totalBetsByOption: ["1000000", "2000000"],
          selectedOption: "Paris",
          status: PoolStatus.Pending,
        } as Pool,
      },
    },
  },
];

const meta: Meta<typeof CurrentSpreadCard> = {
  title: "Components/CurrentSpreadCard",
  component: CurrentSpreadCard,
  decorators: [
    (Story) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        <Story />
      </MockedProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof CurrentSpreadCard>;

export const Default: Story = {
  args: {
    poolId: "0x01",
  },
};

export const Loading: Story = {
  args: {
    poolId: "2", // Different poolId to trigger loading state
  },
};
