// Simple HTTP query test for The Graph API
import fetch from "node-fetch";

// Your specific endpoint (HTTP version)
const endpoint =
  "https://api.studio.thegraph.com/query/105450/promptbet-subgraph/version/latest";

// Simple query to test the API
const query = `
  subscription{
bets{
  id
}    
  }

`;

// Define types for the GraphQL response
interface GraphQLResponse {
  data?: any;
  errors?: Array<{ message: string }>;
  extensions?: {
    subscriptionSupported?: boolean;
  };
}

async function testGraphQLQuery() {
  console.log(`Testing GraphQL query to: ${endpoint}`);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subscription: query }),
    });

    if (!response.ok) {
      console.log("response", response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = (await response.json()) as GraphQLResponse;
    console.log("Query result:");
    console.log(JSON.stringify(data, null, 2));

    console.log(data.extensions);
    // Check if the API returned data about subscription support
    console.log("\nChecking if subscriptions are supported...");
    if (data.extensions && data.extensions.subscriptionSupported) {
      console.log("✅ Subscriptions are supported by this endpoint");
    } else {
      console.log("⚠️ No explicit subscription support information found");
      console.log("This endpoint may not support WebSocket subscriptions");
    }
  } catch (error) {
    console.error("Error testing GraphQL query:", error);
  }
}

testGraphQLQuery();
