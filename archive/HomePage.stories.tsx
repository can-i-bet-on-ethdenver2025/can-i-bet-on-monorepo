import type { Meta, StoryObj } from "@storybook/react";
import { HomePage } from "./HomePage";

const meta: Meta<typeof HomePage> = {
  title: "Pages/HomePage",
  component: HomePage,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    title: {
      control: "text",
      description: "Main hero title",
    },
    subtitle: {
      control: "text",
      description: "Hero subtitle text",
    },
    ctaText: {
      control: "text",
      description: "Call to action button text",
    },
    onCtaClick: {
      action: "clicked",
      description: "Callback function when CTA button is clicked",
    },
    onSearch: {
      action: "searched",
      description: "Callback function when search input changes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof HomePage>;

export const Default: Story = {
  args: {
    title: "@CanIBetOn",
    subtitle: "Bet on anything.",
    ctaText: "Create Pool",
  },
};

export const CustomContent: Story = {
  args: {
    title: "Create & Trade",
    subtitle: "Transform your predictions into profitable opportunities",
    ctaText: "Start Now",
  },
};
