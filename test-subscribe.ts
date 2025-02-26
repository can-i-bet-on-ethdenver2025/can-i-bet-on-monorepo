// graph-subscription-client.ts
import { createClient } from "graphql-ws";
import WebSocket from "ws";

// Your specific endpoint - using wss:// protocol for WebSockets
const endpoint =
  "wss://api.studio.thegraph.com/query/105450/promptbet-subgraph/version/latest";

// Get subscription query from command line arguments or use default
// Updated to match the schema from queries.tsx
const query =
  process.argv[2] ||
  `subscription { 
  bets { 
    id 
    optionIndex
    amount
    user
  } 
}`;

console.log(`Connecting to The Graph API: ${endpoint}`);
console.log(`Using subscription query: ${query}`);
console.log(`Press Ctrl+C to exit\n`);

// Create a client
const client = createClient({
  url: endpoint,
  webSocketImpl: WebSocket,
  retryAttempts: 5,
  connectionParams: {
    // The Graph may require specific protocol handling
    protocols: ["graphql-ws"],
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Sec-WebSocket-Protocol": "graphql-ws",
    },
  },
  onNonLazyError: (error) => {
    console.error("Non-lazy error:", error);
  },
});

// Execute the subscription
const unsubscribe = client.subscribe(
  {
    query,
  },
  {
    next: (data) => {
      console.log("Subscription data received:");
      console.log(JSON.stringify(data, null, 2));
    },
    error: (error) => {
      console.error("Subscription error:", error);
    },
    complete: () => {
      console.log("Subscription completed");
    },
  }
);

console.log("Waiting for subscription events...");
console.log("(This will keep running until you press Ctrl+C)");

// Handle process termination
process.on("SIGINT", () => {
  console.log("Unsubscribing and closing connection...");
  unsubscribe();
  process.exit(0);
});
