import { BetButton } from "@/stories/BetButton";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BetButton> = {
  title: "Components/BetButton",
  component: BetButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A button component for betting options that supports:
- Up to 5 different color variants (A through E)
- Selected state with background highlight
- Disabled state with reduced opacity
- Loading state
- Error handling for invalid chains
- Maximum 24 character text length
- Two-line text wrapping
        `,
      },
    },
    mockData: {
      wallets: {
        ready: true,
        wallets: [
          {
            address: "0x1234567890123456789012345678901234567890",
            chainId: 1,
          },
        ],
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-16 bg-[#1b1917]" data-testid="mock-wallet-context">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    option: {
      control: "text",
      description: "The text to display on the button (max 24 characters)",
    },
    optionIndex: {
      control: "number",
      options: [0, 1, 2, 3, 4],
      description: "Determines the color variant (0-4 for options A-E)",
    },
    isSelected: {
      control: "boolean",
      description: "Whether the option is currently selected",
    },
    disabled: {
      control: "boolean",
      description: "Manually disable the button",
    },
    poolId: {
      control: "text",
      description: "The ID of the betting pool",
    },
    chainId: {
      control: "text",
      description: "The blockchain network ID",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BetButton>;

// Option A Stories
export const OptionA: Story = {
  args: {
    option: "Yes",
    optionIndex: 0,
    isSelected: false,
    poolId: "pool-123",
    chainId: "84532",
  },
};

export const OptionASelected: Story = {
  args: {
    ...OptionA.args,
    isSelected: true,
  },
};

export const OptionADisabled: Story = {
  args: {
    ...OptionA.args,
    disabled: true,
  },
};

// Option B Stories
export const OptionB: Story = {
  args: {
    option: "No",
    optionIndex: 1,
    isSelected: false,
    poolId: "pool-123",
    chainId: "84532",
  },
};

export const OptionBSelected: Story = {
  args: {
    ...OptionB.args,
    isSelected: true,
  },
};

export const OptionBDisabled: Story = {
  args: {
    ...OptionB.args,
    disabled: true,
  },
};

// Option C Stories
export const OptionC: Story = {
  args: {
    option: "Long Option Right Here",
    optionIndex: 2,
    isSelected: false,
    poolId: "pool-123",
    chainId: "84532",
  },
};

export const OptionCSelected: Story = {
  args: {
    ...OptionC.args,
    isSelected: true,
  },
};

export const OptionCDisabled: Story = {
  args: {
    ...OptionC.args,
    disabled: true,
  },
};

// Option D Stories
export const OptionD: Story = {
  args: {
    option: "Option D",
    optionIndex: 3,
    isSelected: false,
    poolId: "pool-123",
    chainId: "84532",
  },
};

export const OptionDSelected: Story = {
  args: {
    ...OptionD.args,
    isSelected: true,
  },
};

export const OptionDDisabled: Story = {
  args: {
    ...OptionD.args,
    disabled: true,
  },
};

// Option E Stories
export const OptionE: Story = {
  args: {
    option: "Mid-length Optionsss",
    optionIndex: 4,
    isSelected: false,
    poolId: "pool-123",
    chainId: "84532",
  },
};

export const OptionESelected: Story = {
  args: {
    ...OptionE.args,
    isSelected: true,
  },
};

export const OptionEDisabled: Story = {
  args: {
    ...OptionE.args,
    disabled: true,
  },
};

// Error State Stories
export const InvalidChainId: Story = {
  args: {
    option: "Invalid Chain",
    optionIndex: 3,
    poolId: "pool-123",
    chainId: "invalid-chain",
  },
};

export const LongTextWrapped: Story = {
  args: {
    option: "This is a very long option that wraps",
    optionIndex: 2,
    poolId: "pool-123",
    chainId: "84532",
  },
};
