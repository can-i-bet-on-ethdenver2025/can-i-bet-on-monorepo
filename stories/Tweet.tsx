"use client";
import React, { useEffect } from "react";

interface TweetProps {
  id: string;
}

const Tweet: React.FC<TweetProps> = ({ id }) => {
  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <script async src="https://platform.twitter.com/widgets.js" />
      <blockquote
        className="twitter-tweet bg-black"
        data-dnt="true"
        data-theme="dark"
        data-cards="hidden"
        data-conversation="none"
      >
        <a href={`https://twitter.com/x/status/${id}`}></a>
      </blockquote>
    </div>
  );
};

export default Tweet;
