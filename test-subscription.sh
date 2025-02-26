#!/bin/bash

# The Graph Subscription Test Script (Improved)
# Usage: ./test_graph_subscription.sh [subscription_query]

# Your specific endpoint
ENDPOINT="wss://api.studio.thegraph.com/query/105450/promptbet-subgraph/version/latest"

# Default query - replace with your actual entity
DEFAULT_QUERY='subscription { bets(first: 5) { id betAmount } }'

# Get query from arguments or use default
QUERY=${1:-$DEFAULT_QUERY}

# Check if wscat is installed
if ! command -v wscat &> /dev/null; then
    echo "wscat is not installed. Installing it now..."
    npm install -g wscat
    
    # Check if installation was successful
    if ! command -v wscat &> /dev/null; then
        echo "Failed to install wscat. Please install it manually with: npm install -g wscat"
        exit 1
    fi
fi

echo "Connecting to The Graph API: $ENDPOINT"
echo "Using subscription query: $QUERY"
echo "Press Ctrl+C to exit"
echo ""

# Format the messages for The Graph protocol
INIT_MESSAGE="{\"type\":\"connection_init\",\"payload\":{}}"
SUBSCRIPTION_MESSAGE="{\"type\":\"start\",\"id\":\"1\",\"payload\":{\"query\":\"$QUERY\"}}"

echo "Connecting to The Graph API..."
echo "If you don't see any data after a few seconds, try triggering an event on the blockchain that would create new data."

# Use wscat with the --execute flag to send messages and keep the connection open
wscat -c "$ENDPOINT" --execute "$INIT_MESSAGE" --execute "$SUBSCRIPTION_MESSAGE" --wait 60