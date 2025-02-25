import Redis from 'ioredis';
import { NextResponse } from 'next/server';

// Validate API key
const validateApiKey = async (request: Request) => {
  const apiKey = request.headers.get('api-key');
  if (!apiKey || apiKey !== process.env.CLF_API_KEY) {
    return false;
  }
  return true;
};

export async function POST(request: Request) {
  try {
    // Validate API key
    if (!validateApiKey(request)) {
      console.log('Chainlink Functions provided invalid API key');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { poolId } = body;

    // Validate poolId
    if (typeof poolId !== 'number') {
      console.error('Invalid poolId:', poolId);
      return NextResponse.json(
        { error: 'Invalid poolId. Must be a number.' },
        { status: 400 }
      );
    }

    const redis = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      tls: {
        rejectUnauthorized: false
      }
    });

    // Convert poolId to properly padded hex string format
    const hexString = poolId.toString(16).toLowerCase();
    const redisKey = 'POOL_GRADE:0x' + hexString.padStart(2 * Math.ceil(hexString.length / 2), '0');
    console.log('redisKey:', redisKey);

    const value = await redis.get(redisKey);

    if (value === null) {
      return NextResponse.json(
        { error: 'Decision not found' },
        { status: 404 }
      );
    }

    const decision = parseInt(value);

    switch (decision) {
      case 1:
        return NextResponse.json({ decision: 0 });
      case 2:
        return NextResponse.json({ decision: 1 });
      case 3:
        return NextResponse.json({ decision: 2 });
      default:
        return NextResponse.json(
          { error: 'Invalid decision' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in get-decision endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
