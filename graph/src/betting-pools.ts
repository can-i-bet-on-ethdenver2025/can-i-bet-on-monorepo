import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  BetPlaced as BetPlacedEvent,
  PoolClosed as PoolClosedEvent,
  PoolCreated as PoolCreatedEvent,
} from "../generated/BettingPools/BettingPools";
import {
  Bet,
  BetCancelled,
  BetPlaced,
  Pool,
  PoolClosed,
  PoolCreated,
} from "../generated/schema";

export function handleBetPlaced(event: BetPlacedEvent): void {
  const betId = Bytes.fromByteArray(Bytes.fromBigInt(event.params.betId));
  const poolId = Bytes.fromByteArray(Bytes.fromBigInt(event.params.poolId));

  // Create BetPlaced entity
  const entity = new BetPlaced(betId);
  entity.betId = event.params.betId;
  entity.poolId = event.params.poolId;
  entity.user = event.params.user;
  entity.optionIndex = event.params.optionIndex;
  entity.amount = event.params.amount;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  const poolCreated = PoolCreated.load(poolId);
  if (poolCreated == null) {
    throw new Error("PoolCreated not found");
  }
  entity.poolCreated = poolCreated.id;

  // Create new Bet entity
  const bet = new Bet(betId);
  bet.betIntId = event.params.betId;
  bet.poolIntId = event.params.poolId;
  bet.poolIdHex = poolId;
  bet.pool = poolId;
  bet.user = event.params.user;
  bet.optionIndex = event.params.optionIndex;
  bet.amount = event.params.amount;
  bet.createdAt = event.block.timestamp;
  bet.updatedAt = event.block.timestamp;
  bet.blockNumber = event.block.number;
  bet.blockTimestamp = event.block.timestamp;
  bet.transactionHash = event.transaction.hash;

  // Update Pool totals and timestamps
  const pool = Pool.load(poolId);
  if (pool == null) {
    throw new Error("Pool not found");
  }
  pool.totalBets = pool.totalBets.plus(event.params.amount);
  const optionTotals = pool.totalBetsByOption;
  optionTotals[event.params.optionIndex.toI32()] = optionTotals[
    event.params.optionIndex.toI32()
  ].plus(event.params.amount);
  pool.totalBetsByOption = optionTotals;

  // Update lastUpdated timestamps
  pool.lastUpdatedBlockNumber = event.block.number;
  pool.lastUpdatedBlockTimestamp = event.block.timestamp;
  pool.lastUpdatedTransactionHash = event.transaction.hash;

  pool.save();
  bet.save();
  entity.save();
}

export function handlePoolClosed(event: PoolClosedEvent): void {
  const poolId = Bytes.fromByteArray(Bytes.fromBigInt(event.params.poolId));

  // Create PoolClosed entity
  const entity = new PoolClosed(poolId);
  entity.poolId = event.params.poolId;
  entity.selectedOption = event.params.selectedOption;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  // Update Pool status and timestamps
  const pool = Pool.load(poolId);
  if (pool == null) {
    throw new Error("Pool not found");
  }
  pool.selectedOption = event.params.selectedOption;
  pool.status = "GRADED";

  // Update graded timestamps
  pool.gradedBlockNumber = event.block.number;
  pool.gradedBlockTimestamp = event.block.timestamp;
  pool.gradedTransactionHash = event.transaction.hash;

  pool.save();
  entity.save();
}

export function handlePoolCreated(event: PoolCreatedEvent): void {
  const poolId = Bytes.fromByteArray(Bytes.fromBigInt(event.params.poolId));

  // Create PoolCreated entity
  const entity = new PoolCreated(poolId);
  entity.poolId = event.params.poolId;
  entity.creatorId = event.params.params.creatorId;
  entity.question = event.params.params.question;
  entity.options = event.params.params.options;
  entity.betsCloseAt = event.params.params.betsCloseAt;
  entity.decisionDate = event.params.params.decisionDate;
  entity.imageUrl = event.params.params.imageUrl;
  entity.category = event.params.params.category;
  entity.creatorName = event.params.params.creatorName;
  entity.closureCriteria = event.params.params.closureCriteria;
  entity.closureInstructions = event.params.params.closureInstructions;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  // Create new Pool entity
  const pool = new Pool(poolId);
  pool.poolIntId = event.params.poolId;
  pool.question = event.params.params.question;
  pool.options = event.params.params.options;
  pool.totalBets = BigInt.fromI32(0);
  pool.totalBetsByOption = [BigInt.fromI32(0), BigInt.fromI32(0)];
  pool.selectedOption = BigInt.fromI32(0);
  pool.status = "PENDING";
  pool.imageUrl = event.params.params.imageUrl;
  pool.category = event.params.params.category;
  pool.creatorId = event.params.params.creatorId;
  pool.creatorName = event.params.params.creatorName;
  pool.closureCriteria = event.params.params.closureCriteria;
  pool.closureInstructions = event.params.params.closureInstructions;
  pool.betsCloseAt = event.params.params.betsCloseAt;
  pool.decisionDate = event.params.params.decisionDate;
  pool.isDraw = false;

  // Set initial timestamps
  pool.createdBlockNumber = event.block.number;
  pool.createdBlockTimestamp = event.block.timestamp;
  pool.createdTransactionHash = event.transaction.hash;

  // Initialize lastUpdated timestamps to match created timestamps
  pool.lastUpdatedBlockNumber = event.block.number;
  pool.lastUpdatedBlockTimestamp = event.block.timestamp;
  pool.lastUpdatedTransactionHash = event.transaction.hash;

  // Initialize graded timestamps to zero
  pool.gradedBlockNumber = BigInt.fromI32(0);
  pool.gradedBlockTimestamp = BigInt.fromI32(0);
  pool.gradedTransactionHash = Bytes.empty();

  pool.save();
  entity.save();
}
