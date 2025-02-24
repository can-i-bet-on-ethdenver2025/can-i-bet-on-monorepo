import { BetButton } from "@/stories/BetButton";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BetButton> = {
  title: "Components/BetButton",
  component: BetButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    option: {
      control: "text",
    },
    optionIndex: {
      control: "number",
      options: [0, 1],
    },
    isSelected: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BetButton>;

export const OptionA: Story = {
  args: {
    option: "Yes",
    optionIndex: 0,
    isSelected: false,
  },
};

export const OptionASelected: Story = {
  args: {
    option: "Yes",
    optionIndex: 0,
    isSelected: true,
  },
};

export const OptionB: Story = {
  args: {
    option: "No",
    optionIndex: 1,
    isSelected: false,
  },
};

export const OptionBSelected: Story = {
  args: {
    option: "No",
    optionIndex: 1,
    isSelected: true,
  },
};
