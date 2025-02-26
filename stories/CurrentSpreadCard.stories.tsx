import { GET_POOL } from "@/app/queries";
import { Pool, PoolStatus } from "@/lib/__generated__/graphql";
import { MockedProvider } from "@apollo/client/testing";
import type { Meta, StoryObj } from "@storybook/react";
import { CurrentSpreadCard } from "./CurrentSpreadCard";

const mockPool = {
  id: "0x01",
  poolIntId: "0x01",
  question: "What is the capital of France?",
  options: ["Paris", "London"],
  totalBets: "3000000",
  totalBetsByOption: ["1000000", "2000000"],
  selectedOption: "Paris",
  status: PoolStatus.Pending,
} as Pool;

const mocks = [
  {
    request: {
      query: GET_POOL,
      variables: { poolId: "0x01" },
    },
    result: {
      data: {
        pool: mockPool,
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
  argTypes: {
    showTitle: {
      control: "boolean",
      description: "Whether to show the card title",
      defaultValue: false,
    },
    cardClassName: {
      control: "text",
      description: "Custom class name for the card",
      defaultValue: "w-full max-w-md mx-auto",
    },
    showTotalBets: {
      control: "boolean",
      description: "Whether to show the total bets section",
      defaultValue: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof CurrentSpreadCard>;

export const Default: Story = {
  args: {
    pool: mockPool,
    showTitle: false,
  },
};

export const WithTitle: Story = {
  args: {
    pool: mockPool,
    showTitle: true,
  },
};

export const WithoutTotalBets: Story = {
  args: {
    pool: mockPool,
    showTitle: true,
    showTotalBets: false,
  },
};

export const CustomClassName: Story = {
  args: {
    pool: mockPool,
    showTitle: true,
    cardClassName: "w-full max-w-sm mx-auto bg-slate-800 border-slate-700",
  },
};

export const WithPoolId: Story = {
  args: {
    poolId: "0x01",
    showTitle: true,
  },
};

export const Loading: Story = {
  args: {
    poolId: "0x02", // Different poolId to trigger loading state
    loading: true,
  },
};
