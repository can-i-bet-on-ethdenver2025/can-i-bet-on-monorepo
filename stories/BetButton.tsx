//TODO Doesn't support Option A or B, hardcoded to Yes and No
import { cn } from "@/lib/utils";

type BetButtonProps = {
  option: string;
  optionIndex: number;
  isSelected?: boolean;
  onClick?: () => void;
};

export const BetButton = ({
  option,
  optionIndex,
  isSelected = false,
  onClick,
}: BetButtonProps) => {
  if (optionIndex !== 0 && optionIndex !== 1) {
    throw new Error("Invalid option index, can only be 0 or 1 (for now)");
  }
  const baseColors = {
    0: "bg-option-a/20 text-option-a",
    1: "bg-option-b/20 text-option-b",
  };

  const hoverColors = {
    0: `hover:bg-option-a/30 hover:text-option-a`,
    1: `hover:bg-option-b/30 hover:text-option-b`,
  };

  const borderColors = {
    0: "border-option-a text-option-a border-2",
    1: "border-option-b text-option-b border-2",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "min-w-24 px-4 py-2 rounded-md font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",

        baseColors[optionIndex],
        hoverColors[optionIndex],
        isSelected && borderColors[optionIndex]
      )}
      type="button"
    >
      {option}
    </button>
  );
};
