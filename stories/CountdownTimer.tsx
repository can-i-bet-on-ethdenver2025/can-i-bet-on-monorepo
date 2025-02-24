"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export interface CountdownTimerProps {
  betsCloseAt: number;
  className?: string;
}

export const CountdownTimer = ({
  betsCloseAt,
  className = "",
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [timeDigits, setTimeDigits] = useState<string[]>([]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Math.floor(Date.now() / 1000);
      const diff = betsCloseAt - now;

      if (diff <= 0) {
        return "Betting closed";
      }

      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    const updateTime = () => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      // Split the time string into individual characters, including colons
      if (newTimeLeft !== "Betting closed") {
        setTimeDigits(newTimeLeft.split(""));
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, [betsCloseAt]);

  if (timeLeft === "Betting closed") {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold"
        >
          {timeLeft}
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="text-base font-medium mb-1">
        Time left before bets close
      </div>
      <div className="text-4xl font-bold flex">
        <AnimatePresence mode="popLayout">
          {timeDigits.map((digit, index) => (
            <motion.span
              key={`${index}-${digit}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.15 }}
              className={digit === ":" ? "mx-1" : "tabular-nums"}
            >
              {digit}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
