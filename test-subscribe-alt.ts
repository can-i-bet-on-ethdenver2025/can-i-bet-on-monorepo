// Alternative approach using a different WebSocket client
import WebSocket from "ws";

// Your specific endpoint
const endpoint =
  "wss://api.studio.thegraph.com/query/105450/promptbet-subgraph/version/latest";

console.log(`Connecting to The Graph API: ${endpoint}`);
console.log(`Press Ctrl+C to exit\n`);

// Simple subscription query
const subscriptionQuery = {
  type: "connection_init",
  payload: {},
};

const operationMessage = {
  id: "1",
  type: "start",
  payload: {
    query: `subscription { 
      bets { 
        id 
        optionIndex
        amount
        user
      } 
    }`,
  },
};

// Create WebSocket connection
const ws = new WebSocket(endpoint, ["graphql-ws"]);

ws.on("open", () => {
  console.log("WebSocket connection established");

  // Send connection initialization
  ws.send(JSON.stringify(subscriptionQuery));

  // Wait a bit before sending the operation
  setTimeout(() => {
    console.log("Sending subscription operation");
    ws.send(JSON.stringify(operationMessage));
  }, 1000);
});

ws.on("message", (data) => {
  console.log("Received message:");
  try {
    const message = JSON.parse(data.toString());
    console.log(JSON.stringify(message, null, 2));

    // If we receive a connection_ack, we can send our subscription
    if (message.type === "connection_ack") {
      console.log("Connection acknowledged, sending subscription");
      ws.send(JSON.stringify(operationMessage));
    }
  } catch (e) {
    console.error("Error parsing message:", e);
    console.log("Raw message:", data.toString());
  }
});

ws.on("error", (error) => {
  console.error("WebSocket error:", error);
});

ws.on("close", (code, reason) => {
  console.log(`WebSocket connection closed: ${code} - ${reason}`);
});

console.log("Waiting for subscription events...");
console.log("(This will keep running until you press Ctrl+C)");

// Handle process termination
process.on("SIGINT", () => {
  console.log("Closing WebSocket connection...");
  ws.close();
  process.exit(0);
});
