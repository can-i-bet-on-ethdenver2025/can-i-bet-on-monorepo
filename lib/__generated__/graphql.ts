/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  /**
   * 8 bytes signed integer
   *
   */
  Int8: { input: any; output: any; }
  /**
   * A string representation of microseconds UNIX timestamp (16 digits)
   *
   */
  Timestamp: { input: any; output: any; }
};

export enum Aggregation_Interval {
  Day = 'day',
  Hour = 'hour'
}

export type Bet = {
  __typename?: 'Bet';
  amount: Scalars['BigInt']['output'];
  betIntId: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  createdAt: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  optionIndex: Scalars['BigInt']['output'];
  pool: Pool;
  poolIdHex: Scalars['Bytes']['output'];
  poolIntId: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
  updatedAt: Scalars['BigInt']['output'];
  user: Scalars['Bytes']['output'];
};

export type BetCancelled = {
  __typename?: 'BetCancelled';
  amount: Scalars['BigInt']['output'];
  betId: Scalars['BigInt']['output'];
  betPlaced: BetPlaced;
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  optionIndex: Scalars['BigInt']['output'];
  poolCreated: PoolCreated;
  poolId: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
  user: Scalars['Bytes']['output'];
};

export type BetCancelled_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<BetCancelled_Filter>>>;
  betId?: InputMaybe<Scalars['BigInt']['input']>;
  betId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  betId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  betId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  betId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  betId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  betId_not?: InputMaybe<Scalars['BigInt']['input']>;
  betId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  betPlaced?: InputMaybe<Scalars['String']['input']>;
  betPlaced_?: InputMaybe<BetPlaced_Filter>;
  betPlaced_contains?: InputMaybe<Scalars['String']['input']>;
  betPlaced_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  betPlaced_ends_with?: InputMaybe<Scalars['String']['input']>;
  betPlaced_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  betPlaced_gt?: InputMaybe<Scalars['String']['input']>;
  betPlaced_gte?: InputMaybe<Scalars['String']['input']>;
  betPlaced_in?: InputMaybe<Array<Scalars['String']['input']>>;
  betPlaced_lt?: InputMaybe<Scalars['String']['input']>;
  betPlaced_lte?: InputMaybe<Scalars['String']['input']>;
  betPlaced_not?: InputMaybe<Scalars['String']['input']>;
  betPlaced_not_contains?: InputMaybe<Scalars['String']['input']>;
  betPlaced_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  betPlaced_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  betPlaced_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  betPlaced_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  betPlaced_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  betPlaced_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  betPlaced_starts_with?: InputMaybe<Scalars['String']['input']>;
  betPlaced_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  optionIndex?: InputMaybe<Scalars['BigInt']['input']>;
  optionIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  optionIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  optionIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  optionIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  optionIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  optionIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  optionIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<BetCancelled_Filter>>>;
  poolCreated?: InputMaybe<Scalars['String']['input']>;
  poolCreated_?: InputMaybe<PoolCreated_Filter>;
  poolCreated_contains?: InputMaybe<Scalars['String']['input']>;
  poolCreated_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  poolCreated_ends_with?: InputMaybe<Scalars['String']['input']>;
  poolCreated_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  poolCreated_gt?: InputMaybe<Scalars['String']['input']>;
  poolCreated_gte?: InputMaybe<Scalars['String']['input']>;
  poolCreated_in?: InputMaybe<Array<Scalars['String']['input']>>;
  poolCreated_lt?: InputMaybe<Scalars['String']['input']>;
  poolCreated_lte?: InputMaybe<Scalars['String']['input']>;
  poolCreated_not?: InputMaybe<Scalars['String']['input']>;
  poolCreated_not_contains?: InputMaybe<Scalars['String']['input']>;
  poolCreated_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  poolCreated_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  poolCreated_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  poolCreated_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  poolCreated_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  poolCreated_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  poolCreated_starts_with?: InputMaybe<Scalars['String']['input']>;
  poolCreated_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  poolId?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  user?: InputMaybe<Scalars['Bytes']['input']>;
  user_contains?: InputMaybe<Scalars['Bytes']['input']>;
  user_gt?: InputMaybe<Scalars['Bytes']['input']>;
  user_gte?: InputMaybe<Scalars['Bytes']['input']>;
  user_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  user_lt?: InputMaybe<Scalars['Bytes']['input']>;
  user_lte?: InputMaybe<Scalars['Bytes']['input']>;
  user_not?: InputMaybe<Scalars['Bytes']['input']>;
  user_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum BetCancelled_OrderBy {
  Amount = 'amount',
  BetId = 'betId',
  BetPlaced = 'betPlaced',
  BetPlacedAmount = 'betPlaced__amount',
  BetPlacedBetId = 'betPlaced__betId',
  BetPlacedBlockNumber = 'betPlaced__blockNumber',
  BetPlacedBlockTimestamp = 'betPlaced__blockTimestamp',
  BetPlacedId = 'betPlaced__id',
  BetPlacedOptionIndex = 'betPlaced__optionIndex',
  BetPlacedPoolId = 'betPlaced__poolId',
  BetPlacedTransactionHash = 'betPlaced__transactionHash',
  BetPlacedUser = 'betPlaced__user',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  OptionIndex = 'optionIndex',
  PoolCreated = 'poolCreated',
  PoolCreatedBetsCloseAt = 'poolCreated__betsCloseAt',
  PoolCreatedBlockNumber = 'poolCreated__blockNumber',
  PoolCreatedBlockTimestamp = 'poolCreated__blockTimestamp',
  PoolCreatedCategory = 'poolCreated__category',
  PoolCreatedClosureCriteria = 'poolCreated__closureCriteria',
  PoolCreatedClosureInstructions = 'poolCreated__closureInstructions',
  PoolCreatedCreatorId = 'poolCreated__creatorId',
  PoolCreatedCreatorName = 'poolCreated__creatorName',
  PoolCreatedDecisionDate = 'poolCreated__decisionDate',
  PoolCreatedId = 'poolCreated__id',
  PoolCreatedImageUrl = 'poolCreated__imageUrl',
  PoolCreatedPoolId = 'poolCreated__poolId',
  PoolCreatedQuestion = 'poolCreated__question',
  PoolCreatedTransactionHash = 'poolCreated__transactionHash',
  PoolId = 'poolId',
  TransactionHash = 'transactionHash',
  User = 'user'
}

export type BetPlaced = {
  __typename?: 'BetPlaced';
  amount: Scalars['BigInt']['output'];
  betId: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  optionIndex: Scalars['BigInt']['output'];
  poolCreated: PoolCreated;
  poolId: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
  user: Scalars['Bytes']['output'];
};

export type BetPlaced_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<BetPlaced_Filter>>>;
  betId?: InputMaybe<Scalars['BigInt']['input']>;
  betId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  betId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  betId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  betId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  betId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  betId_not?: InputMaybe<Scalars['BigInt']['input']>;
  betId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  optionIndex?: InputMaybe<Scalars['BigInt']['input']>;
  optionIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  optionIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  optionIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  optionIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  optionIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  optionIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  optionIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<BetPlaced_Filter>>>;
  poolCreated?: InputMaybe<Scalars['String']['input']>;
  poolCreated_?: InputMaybe<PoolCreated_Filter>;
  poolCreated_contains?: InputMaybe<Scalars['String']['input']>;
  poolCreated_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  poolCreated_ends_with?: InputMaybe<Scalars['String']['input']>;
  poolCreated_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  poolCreated_gt?: InputMaybe<Scalars['String']['input']>;
  poolCreated_gte?: InputMaybe<Scalars['String']['input']>;
  poolCreated_in?: InputMaybe<Array<Scalars['String']['input']>>;
  poolCreated_lt?: InputMaybe<Scalars['String']['input']>;
  poolCreated_lte?: InputMaybe<Scalars['String']['input']>;
  poolCreated_not?: InputMaybe<Scalars['String']['input']>;
  poolCreated_not_contains?: InputMaybe<Scalars['String']['input']>;
  poolCreated_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  poolCreated_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  poolCreated_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  poolCreated_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  poolCreated_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  poolCreated_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  poolCreated_starts_with?: InputMaybe<Scalars['String']['input']>;
  poolCreated_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  poolId?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  user?: InputMaybe<Scalars['Bytes']['input']>;
  user_contains?: InputMaybe<Scalars['Bytes']['input']>;
  user_gt?: InputMaybe<Scalars['Bytes']['input']>;
  user_gte?: InputMaybe<Scalars['Bytes']['input']>;
  user_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  user_lt?: InputMaybe<Scalars['Bytes']['input']>;
  user_lte?: InputMaybe<Scalars['Bytes']['input']>;
  user_not?: InputMaybe<Scalars['Bytes']['input']>;
  user_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum BetPlaced_OrderBy {
  Amount = 'amount',
  BetId = 'betId',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  OptionIndex = 'optionIndex',
  PoolCreated = 'poolCreated',
  PoolCreatedBetsCloseAt = 'poolCreated__betsCloseAt',
  PoolCreatedBlockNumber = 'poolCreated__blockNumber',
  PoolCreatedBlockTimestamp = 'poolCreated__blockTimestamp',
  PoolCreatedCategory = 'poolCreated__category',
  PoolCreatedClosureCriteria = 'poolCreated__closureCriteria',
  PoolCreatedClosureInstructions = 'poolCreated__closureInstructions',
  PoolCreatedCreatorId = 'poolCreated__creatorId',
  PoolCreatedCreatorName = 'poolCreated__creatorName',
  PoolCreatedDecisionDate = 'poolCreated__decisionDate',
  PoolCreatedId = 'poolCreated__id',
  PoolCreatedImageUrl = 'poolCreated__imageUrl',
  PoolCreatedPoolId = 'poolCreated__poolId',
  PoolCreatedQuestion = 'poolCreated__question',
  PoolCreatedTransactionHash = 'poolCreated__transactionHash',
  PoolId = 'poolId',
  TransactionHash = 'transactionHash',
  User = 'user'
}

export type Bet_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Bet_Filter>>>;
  betIntId?: InputMaybe<Scalars['BigInt']['input']>;
  betIntId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  betIntId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  betIntId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  betIntId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  betIntId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  betIntId_not?: InputMaybe<Scalars['BigInt']['input']>;
  betIntId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  optionIndex?: InputMaybe<Scalars['BigInt']['input']>;
  optionIndex_gt?: InputMaybe<Scalars['BigInt']['input']>;
  optionIndex_gte?: InputMaybe<Scalars['BigInt']['input']>;
  optionIndex_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  optionIndex_lt?: InputMaybe<Scalars['BigInt']['input']>;
  optionIndex_lte?: InputMaybe<Scalars['BigInt']['input']>;
  optionIndex_not?: InputMaybe<Scalars['BigInt']['input']>;
  optionIndex_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Bet_Filter>>>;
  pool?: InputMaybe<Scalars['String']['input']>;
  poolIdHex?: InputMaybe<Scalars['Bytes']['input']>;
  poolIdHex_contains?: InputMaybe<Scalars['Bytes']['input']>;
  poolIdHex_gt?: InputMaybe<Scalars['Bytes']['input']>;
  poolIdHex_gte?: InputMaybe<Scalars['Bytes']['input']>;
  poolIdHex_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  poolIdHex_lt?: InputMaybe<Scalars['Bytes']['input']>;
  poolIdHex_lte?: InputMaybe<Scalars['Bytes']['input']>;
  poolIdHex_not?: InputMaybe<Scalars['Bytes']['input']>;
  poolIdHex_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  poolIdHex_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  poolIntId?: InputMaybe<Scalars['BigInt']['input']>;
  poolIntId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolIntId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolIntId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolIntId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolIntId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolIntId_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolIntId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pool_?: InputMaybe<Pool_Filter>;
  pool_contains?: InputMaybe<Scalars['String']['input']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_gt?: InputMaybe<Scalars['String']['input']>;
  pool_gte?: InputMaybe<Scalars['String']['input']>;
  pool_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_lt?: InputMaybe<Scalars['String']['input']>;
  pool_lte?: InputMaybe<Scalars['String']['input']>;
  pool_not?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains?: InputMaybe<Scalars['String']['input']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with?: InputMaybe<Scalars['String']['input']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  updatedAt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  user?: InputMaybe<Scalars['Bytes']['input']>;
  user_contains?: InputMaybe<Scalars['Bytes']['input']>;
  user_gt?: InputMaybe<Scalars['Bytes']['input']>;
  user_gte?: InputMaybe<Scalars['Bytes']['input']>;
  user_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  user_lt?: InputMaybe<Scalars['Bytes']['input']>;
  user_lte?: InputMaybe<Scalars['Bytes']['input']>;
  user_not?: InputMaybe<Scalars['Bytes']['input']>;
  user_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum Bet_OrderBy {
  Amount = 'amount',
  BetIntId = 'betIntId',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  CreatedAt = 'createdAt',
  Id = 'id',
  OptionIndex = 'optionIndex',
  Pool = 'pool',
  PoolIdHex = 'poolIdHex',
  PoolIntId = 'poolIntId',
  PoolBetsCloseAt = 'pool__betsCloseAt',
  PoolCategory = 'pool__category',
  PoolClosureCriteria = 'pool__closureCriteria',
  PoolClosureInstructions = 'pool__closureInstructions',
  PoolCreatedBlockNumber = 'pool__createdBlockNumber',
  PoolCreatedBlockTimestamp = 'pool__createdBlockTimestamp',
  PoolCreatedTransactionHash = 'pool__createdTransactionHash',
  PoolCreatorAddress = 'pool__creatorAddress',
  PoolCreatorId = 'pool__creatorId',
  PoolCreatorName = 'pool__creatorName',
  PoolDecisionDate = 'pool__decisionDate',
  PoolGradedBlockNumber = 'pool__gradedBlockNumber',
  PoolGradedBlockTimestamp = 'pool__gradedBlockTimestamp',
  PoolGradedTransactionHash = 'pool__gradedTransactionHash',
  PoolId = 'pool__id',
  PoolImageUrl = 'pool__imageUrl',
  PoolIsDraw = 'pool__isDraw',
  PoolLastUpdatedBlockNumber = 'pool__lastUpdatedBlockNumber',
  PoolLastUpdatedBlockTimestamp = 'pool__lastUpdatedBlockTimestamp',
  PoolLastUpdatedTransactionHash = 'pool__lastUpdatedTransactionHash',
  PoolPoolIntId = 'pool__poolIntId',
  PoolQuestion = 'pool__question',
  PoolSelectedOption = 'pool__selectedOption',
  PoolStatus = 'pool__status',
  PoolTotalBets = 'pool__totalBets',
  TransactionHash = 'transactionHash',
  UpdatedAt = 'updatedAt',
  User = 'user'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Pool = {
  __typename?: 'Pool';
  bets: Array<Bet>;
  betsCloseAt: Scalars['BigInt']['output'];
  category: Scalars['String']['output'];
  closureCriteria: Scalars['String']['output'];
  closureInstructions: Scalars['String']['output'];
  createdBlockNumber: Scalars['BigInt']['output'];
  createdBlockTimestamp: Scalars['BigInt']['output'];
  createdTransactionHash: Scalars['Bytes']['output'];
  creatorAddress: Scalars['Bytes']['output'];
  creatorId: Scalars['String']['output'];
  creatorName: Scalars['String']['output'];
  decisionDate: Scalars['BigInt']['output'];
  gradedBlockNumber: Scalars['BigInt']['output'];
  gradedBlockTimestamp: Scalars['BigInt']['output'];
  gradedTransactionHash: Scalars['Bytes']['output'];
  id: Scalars['Bytes']['output'];
  imageUrl: Scalars['String']['output'];
  isDraw: Scalars['Boolean']['output'];
  lastUpdatedBlockNumber: Scalars['BigInt']['output'];
  lastUpdatedBlockTimestamp: Scalars['BigInt']['output'];
  lastUpdatedTransactionHash: Scalars['Bytes']['output'];
  options: Array<Scalars['String']['output']>;
  poolIntId: Scalars['BigInt']['output'];
  question: Scalars['String']['output'];
  selectedOption: Scalars['BigInt']['output'];
  status: PoolStatus;
  totalBets: Scalars['BigInt']['output'];
  totalBetsByOption: Array<Scalars['BigInt']['output']>;
};


export type PoolBetsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Bet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Bet_Filter>;
};

export type PoolClosed = {
  __typename?: 'PoolClosed';
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  poolId: Scalars['BigInt']['output'];
  selectedOption: Scalars['BigInt']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type PoolClosed_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PoolClosed_Filter>>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  or?: InputMaybe<Array<InputMaybe<PoolClosed_Filter>>>;
  poolId?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  selectedOption?: InputMaybe<Scalars['BigInt']['input']>;
  selectedOption_gt?: InputMaybe<Scalars['BigInt']['input']>;
  selectedOption_gte?: InputMaybe<Scalars['BigInt']['input']>;
  selectedOption_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  selectedOption_lt?: InputMaybe<Scalars['BigInt']['input']>;
  selectedOption_lte?: InputMaybe<Scalars['BigInt']['input']>;
  selectedOption_not?: InputMaybe<Scalars['BigInt']['input']>;
  selectedOption_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum PoolClosed_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  PoolId = 'poolId',
  SelectedOption = 'selectedOption',
  TransactionHash = 'transactionHash'
}

export type PoolCreated = {
  __typename?: 'PoolCreated';
  betsCloseAt: Scalars['BigInt']['output'];
  blockNumber: Scalars['BigInt']['output'];
  blockTimestamp: Scalars['BigInt']['output'];
  category: Scalars['String']['output'];
  closureCriteria: Scalars['String']['output'];
  closureInstructions: Scalars['String']['output'];
  creatorId: Scalars['String']['output'];
  creatorName: Scalars['String']['output'];
  decisionDate: Scalars['BigInt']['output'];
  id: Scalars['Bytes']['output'];
  imageUrl: Scalars['String']['output'];
  options: Array<Scalars['String']['output']>;
  poolId: Scalars['BigInt']['output'];
  question: Scalars['String']['output'];
  transactionHash: Scalars['Bytes']['output'];
};

export type PoolCreated_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PoolCreated_Filter>>>;
  betsCloseAt?: InputMaybe<Scalars['BigInt']['input']>;
  betsCloseAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  betsCloseAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  betsCloseAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  betsCloseAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  betsCloseAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  betsCloseAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  betsCloseAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  category?: InputMaybe<Scalars['String']['input']>;
  category_contains?: InputMaybe<Scalars['String']['input']>;
  category_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  category_ends_with?: InputMaybe<Scalars['String']['input']>;
  category_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  category_gt?: InputMaybe<Scalars['String']['input']>;
  category_gte?: InputMaybe<Scalars['String']['input']>;
  category_in?: InputMaybe<Array<Scalars['String']['input']>>;
  category_lt?: InputMaybe<Scalars['String']['input']>;
  category_lte?: InputMaybe<Scalars['String']['input']>;
  category_not?: InputMaybe<Scalars['String']['input']>;
  category_not_contains?: InputMaybe<Scalars['String']['input']>;
  category_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  category_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  category_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  category_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  category_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  category_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  category_starts_with?: InputMaybe<Scalars['String']['input']>;
  category_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  closureCriteria?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_contains?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_ends_with?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_gt?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_gte?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_in?: InputMaybe<Array<Scalars['String']['input']>>;
  closureCriteria_lt?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_lte?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_not?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_not_contains?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  closureCriteria_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_starts_with?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  closureInstructions?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_contains?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_ends_with?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_gt?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_gte?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_in?: InputMaybe<Array<Scalars['String']['input']>>;
  closureInstructions_lt?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_lte?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_not?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_not_contains?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  closureInstructions_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_starts_with?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creatorId?: InputMaybe<Scalars['String']['input']>;
  creatorId_contains?: InputMaybe<Scalars['String']['input']>;
  creatorId_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  creatorId_ends_with?: InputMaybe<Scalars['String']['input']>;
  creatorId_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creatorId_gt?: InputMaybe<Scalars['String']['input']>;
  creatorId_gte?: InputMaybe<Scalars['String']['input']>;
  creatorId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  creatorId_lt?: InputMaybe<Scalars['String']['input']>;
  creatorId_lte?: InputMaybe<Scalars['String']['input']>;
  creatorId_not?: InputMaybe<Scalars['String']['input']>;
  creatorId_not_contains?: InputMaybe<Scalars['String']['input']>;
  creatorId_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  creatorId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  creatorId_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creatorId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  creatorId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  creatorId_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creatorId_starts_with?: InputMaybe<Scalars['String']['input']>;
  creatorId_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creatorName?: InputMaybe<Scalars['String']['input']>;
  creatorName_contains?: InputMaybe<Scalars['String']['input']>;
  creatorName_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  creatorName_ends_with?: InputMaybe<Scalars['String']['input']>;
  creatorName_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creatorName_gt?: InputMaybe<Scalars['String']['input']>;
  creatorName_gte?: InputMaybe<Scalars['String']['input']>;
  creatorName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  creatorName_lt?: InputMaybe<Scalars['String']['input']>;
  creatorName_lte?: InputMaybe<Scalars['String']['input']>;
  creatorName_not?: InputMaybe<Scalars['String']['input']>;
  creatorName_not_contains?: InputMaybe<Scalars['String']['input']>;
  creatorName_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  creatorName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  creatorName_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creatorName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  creatorName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  creatorName_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creatorName_starts_with?: InputMaybe<Scalars['String']['input']>;
  creatorName_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  decisionDate?: InputMaybe<Scalars['BigInt']['input']>;
  decisionDate_gt?: InputMaybe<Scalars['BigInt']['input']>;
  decisionDate_gte?: InputMaybe<Scalars['BigInt']['input']>;
  decisionDate_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  decisionDate_lt?: InputMaybe<Scalars['BigInt']['input']>;
  decisionDate_lte?: InputMaybe<Scalars['BigInt']['input']>;
  decisionDate_not?: InputMaybe<Scalars['BigInt']['input']>;
  decisionDate_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  imageUrl_contains?: InputMaybe<Scalars['String']['input']>;
  imageUrl_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  imageUrl_ends_with?: InputMaybe<Scalars['String']['input']>;
  imageUrl_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  imageUrl_gt?: InputMaybe<Scalars['String']['input']>;
  imageUrl_gte?: InputMaybe<Scalars['String']['input']>;
  imageUrl_in?: InputMaybe<Array<Scalars['String']['input']>>;
  imageUrl_lt?: InputMaybe<Scalars['String']['input']>;
  imageUrl_lte?: InputMaybe<Scalars['String']['input']>;
  imageUrl_not?: InputMaybe<Scalars['String']['input']>;
  imageUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  imageUrl_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  imageUrl_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  imageUrl_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  imageUrl_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  imageUrl_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  imageUrl_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  imageUrl_starts_with?: InputMaybe<Scalars['String']['input']>;
  imageUrl_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  options?: InputMaybe<Array<Scalars['String']['input']>>;
  options_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  options_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  options_not?: InputMaybe<Array<Scalars['String']['input']>>;
  options_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  options_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  or?: InputMaybe<Array<InputMaybe<PoolCreated_Filter>>>;
  poolId?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  question?: InputMaybe<Scalars['String']['input']>;
  question_contains?: InputMaybe<Scalars['String']['input']>;
  question_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  question_ends_with?: InputMaybe<Scalars['String']['input']>;
  question_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  question_gt?: InputMaybe<Scalars['String']['input']>;
  question_gte?: InputMaybe<Scalars['String']['input']>;
  question_in?: InputMaybe<Array<Scalars['String']['input']>>;
  question_lt?: InputMaybe<Scalars['String']['input']>;
  question_lte?: InputMaybe<Scalars['String']['input']>;
  question_not?: InputMaybe<Scalars['String']['input']>;
  question_not_contains?: InputMaybe<Scalars['String']['input']>;
  question_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  question_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  question_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  question_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  question_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  question_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  question_starts_with?: InputMaybe<Scalars['String']['input']>;
  question_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum PoolCreated_OrderBy {
  BetsCloseAt = 'betsCloseAt',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Category = 'category',
  ClosureCriteria = 'closureCriteria',
  ClosureInstructions = 'closureInstructions',
  CreatorId = 'creatorId',
  CreatorName = 'creatorName',
  DecisionDate = 'decisionDate',
  Id = 'id',
  ImageUrl = 'imageUrl',
  Options = 'options',
  PoolId = 'poolId',
  Question = 'question',
  TransactionHash = 'transactionHash'
}

export enum PoolStatus {
  Graded = 'GRADED',
  Pending = 'PENDING'
}

export type Pool_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Pool_Filter>>>;
  betsCloseAt?: InputMaybe<Scalars['BigInt']['input']>;
  betsCloseAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  betsCloseAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  betsCloseAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  betsCloseAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  betsCloseAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  betsCloseAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  betsCloseAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  bets_?: InputMaybe<Bet_Filter>;
  category?: InputMaybe<Scalars['String']['input']>;
  category_contains?: InputMaybe<Scalars['String']['input']>;
  category_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  category_ends_with?: InputMaybe<Scalars['String']['input']>;
  category_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  category_gt?: InputMaybe<Scalars['String']['input']>;
  category_gte?: InputMaybe<Scalars['String']['input']>;
  category_in?: InputMaybe<Array<Scalars['String']['input']>>;
  category_lt?: InputMaybe<Scalars['String']['input']>;
  category_lte?: InputMaybe<Scalars['String']['input']>;
  category_not?: InputMaybe<Scalars['String']['input']>;
  category_not_contains?: InputMaybe<Scalars['String']['input']>;
  category_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  category_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  category_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  category_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  category_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  category_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  category_starts_with?: InputMaybe<Scalars['String']['input']>;
  category_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  closureCriteria?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_contains?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_ends_with?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_gt?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_gte?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_in?: InputMaybe<Array<Scalars['String']['input']>>;
  closureCriteria_lt?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_lte?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_not?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_not_contains?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  closureCriteria_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_starts_with?: InputMaybe<Scalars['String']['input']>;
  closureCriteria_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  closureInstructions?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_contains?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_ends_with?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_gt?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_gte?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_in?: InputMaybe<Array<Scalars['String']['input']>>;
  closureInstructions_lt?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_lte?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_not?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_not_contains?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  closureInstructions_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_starts_with?: InputMaybe<Scalars['String']['input']>;
  closureInstructions_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  createdBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdBlockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdBlockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdBlockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdTransactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  createdTransactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  createdTransactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  createdTransactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  createdTransactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  createdTransactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  createdTransactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  createdTransactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  createdTransactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  createdTransactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  creatorAddress?: InputMaybe<Scalars['Bytes']['input']>;
  creatorAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  creatorAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  creatorAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  creatorAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  creatorAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  creatorAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  creatorAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  creatorAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  creatorAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  creatorId?: InputMaybe<Scalars['String']['input']>;
  creatorId_contains?: InputMaybe<Scalars['String']['input']>;
  creatorId_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  creatorId_ends_with?: InputMaybe<Scalars['String']['input']>;
  creatorId_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creatorId_gt?: InputMaybe<Scalars['String']['input']>;
  creatorId_gte?: InputMaybe<Scalars['String']['input']>;
  creatorId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  creatorId_lt?: InputMaybe<Scalars['String']['input']>;
  creatorId_lte?: InputMaybe<Scalars['String']['input']>;
  creatorId_not?: InputMaybe<Scalars['String']['input']>;
  creatorId_not_contains?: InputMaybe<Scalars['String']['input']>;
  creatorId_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  creatorId_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  creatorId_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creatorId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  creatorId_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  creatorId_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creatorId_starts_with?: InputMaybe<Scalars['String']['input']>;
  creatorId_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creatorName?: InputMaybe<Scalars['String']['input']>;
  creatorName_contains?: InputMaybe<Scalars['String']['input']>;
  creatorName_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  creatorName_ends_with?: InputMaybe<Scalars['String']['input']>;
  creatorName_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creatorName_gt?: InputMaybe<Scalars['String']['input']>;
  creatorName_gte?: InputMaybe<Scalars['String']['input']>;
  creatorName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  creatorName_lt?: InputMaybe<Scalars['String']['input']>;
  creatorName_lte?: InputMaybe<Scalars['String']['input']>;
  creatorName_not?: InputMaybe<Scalars['String']['input']>;
  creatorName_not_contains?: InputMaybe<Scalars['String']['input']>;
  creatorName_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  creatorName_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  creatorName_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creatorName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  creatorName_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  creatorName_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creatorName_starts_with?: InputMaybe<Scalars['String']['input']>;
  creatorName_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  decisionDate?: InputMaybe<Scalars['BigInt']['input']>;
  decisionDate_gt?: InputMaybe<Scalars['BigInt']['input']>;
  decisionDate_gte?: InputMaybe<Scalars['BigInt']['input']>;
  decisionDate_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  decisionDate_lt?: InputMaybe<Scalars['BigInt']['input']>;
  decisionDate_lte?: InputMaybe<Scalars['BigInt']['input']>;
  decisionDate_not?: InputMaybe<Scalars['BigInt']['input']>;
  decisionDate_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gradedBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  gradedBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gradedBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gradedBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gradedBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gradedBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gradedBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  gradedBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gradedBlockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  gradedBlockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  gradedBlockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  gradedBlockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gradedBlockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  gradedBlockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  gradedBlockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  gradedBlockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  gradedTransactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  gradedTransactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  gradedTransactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  gradedTransactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  gradedTransactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  gradedTransactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  gradedTransactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  gradedTransactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  gradedTransactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  gradedTransactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['Bytes']['input']>;
  id_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_gt?: InputMaybe<Scalars['Bytes']['input']>;
  id_gte?: InputMaybe<Scalars['Bytes']['input']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id_lt?: InputMaybe<Scalars['Bytes']['input']>;
  id_lte?: InputMaybe<Scalars['Bytes']['input']>;
  id_not?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  imageUrl_contains?: InputMaybe<Scalars['String']['input']>;
  imageUrl_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  imageUrl_ends_with?: InputMaybe<Scalars['String']['input']>;
  imageUrl_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  imageUrl_gt?: InputMaybe<Scalars['String']['input']>;
  imageUrl_gte?: InputMaybe<Scalars['String']['input']>;
  imageUrl_in?: InputMaybe<Array<Scalars['String']['input']>>;
  imageUrl_lt?: InputMaybe<Scalars['String']['input']>;
  imageUrl_lte?: InputMaybe<Scalars['String']['input']>;
  imageUrl_not?: InputMaybe<Scalars['String']['input']>;
  imageUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  imageUrl_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  imageUrl_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  imageUrl_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  imageUrl_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  imageUrl_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  imageUrl_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  imageUrl_starts_with?: InputMaybe<Scalars['String']['input']>;
  imageUrl_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  isDraw?: InputMaybe<Scalars['Boolean']['input']>;
  isDraw_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isDraw_not?: InputMaybe<Scalars['Boolean']['input']>;
  isDraw_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  lastUpdatedBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastUpdatedBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastUpdatedBlockTimestamp?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedBlockTimestamp_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedBlockTimestamp_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedBlockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastUpdatedBlockTimestamp_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedBlockTimestamp_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedBlockTimestamp_not?: InputMaybe<Scalars['BigInt']['input']>;
  lastUpdatedBlockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lastUpdatedTransactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  lastUpdatedTransactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  lastUpdatedTransactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  lastUpdatedTransactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  lastUpdatedTransactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  lastUpdatedTransactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  lastUpdatedTransactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  lastUpdatedTransactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  lastUpdatedTransactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  lastUpdatedTransactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  options?: InputMaybe<Array<Scalars['String']['input']>>;
  options_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  options_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  options_not?: InputMaybe<Array<Scalars['String']['input']>>;
  options_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  options_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Pool_Filter>>>;
  poolIntId?: InputMaybe<Scalars['BigInt']['input']>;
  poolIntId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  poolIntId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  poolIntId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  poolIntId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  poolIntId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  poolIntId_not?: InputMaybe<Scalars['BigInt']['input']>;
  poolIntId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  question?: InputMaybe<Scalars['String']['input']>;
  question_contains?: InputMaybe<Scalars['String']['input']>;
  question_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  question_ends_with?: InputMaybe<Scalars['String']['input']>;
  question_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  question_gt?: InputMaybe<Scalars['String']['input']>;
  question_gte?: InputMaybe<Scalars['String']['input']>;
  question_in?: InputMaybe<Array<Scalars['String']['input']>>;
  question_lt?: InputMaybe<Scalars['String']['input']>;
  question_lte?: InputMaybe<Scalars['String']['input']>;
  question_not?: InputMaybe<Scalars['String']['input']>;
  question_not_contains?: InputMaybe<Scalars['String']['input']>;
  question_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  question_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  question_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  question_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  question_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  question_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  question_starts_with?: InputMaybe<Scalars['String']['input']>;
  question_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  selectedOption?: InputMaybe<Scalars['BigInt']['input']>;
  selectedOption_gt?: InputMaybe<Scalars['BigInt']['input']>;
  selectedOption_gte?: InputMaybe<Scalars['BigInt']['input']>;
  selectedOption_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  selectedOption_lt?: InputMaybe<Scalars['BigInt']['input']>;
  selectedOption_lte?: InputMaybe<Scalars['BigInt']['input']>;
  selectedOption_not?: InputMaybe<Scalars['BigInt']['input']>;
  selectedOption_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  status?: InputMaybe<PoolStatus>;
  status_in?: InputMaybe<Array<PoolStatus>>;
  status_not?: InputMaybe<PoolStatus>;
  status_not_in?: InputMaybe<Array<PoolStatus>>;
  totalBets?: InputMaybe<Scalars['BigInt']['input']>;
  totalBetsByOption?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalBetsByOption_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalBetsByOption_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalBetsByOption_not?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalBetsByOption_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalBetsByOption_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalBets_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalBets_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalBets_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalBets_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalBets_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalBets_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalBets_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Pool_OrderBy {
  Bets = 'bets',
  BetsCloseAt = 'betsCloseAt',
  Category = 'category',
  ClosureCriteria = 'closureCriteria',
  ClosureInstructions = 'closureInstructions',
  CreatedBlockNumber = 'createdBlockNumber',
  CreatedBlockTimestamp = 'createdBlockTimestamp',
  CreatedTransactionHash = 'createdTransactionHash',
  CreatorAddress = 'creatorAddress',
  CreatorId = 'creatorId',
  CreatorName = 'creatorName',
  DecisionDate = 'decisionDate',
  GradedBlockNumber = 'gradedBlockNumber',
  GradedBlockTimestamp = 'gradedBlockTimestamp',
  GradedTransactionHash = 'gradedTransactionHash',
  Id = 'id',
  ImageUrl = 'imageUrl',
  IsDraw = 'isDraw',
  LastUpdatedBlockNumber = 'lastUpdatedBlockNumber',
  LastUpdatedBlockTimestamp = 'lastUpdatedBlockTimestamp',
  LastUpdatedTransactionHash = 'lastUpdatedTransactionHash',
  Options = 'options',
  PoolIntId = 'poolIntId',
  Question = 'question',
  SelectedOption = 'selectedOption',
  Status = 'status',
  TotalBets = 'totalBets',
  TotalBetsByOption = 'totalBetsByOption'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  bet?: Maybe<Bet>;
  betCancelled?: Maybe<BetCancelled>;
  betCancelleds: Array<BetCancelled>;
  betPlaced?: Maybe<BetPlaced>;
  betPlaceds: Array<BetPlaced>;
  bets: Array<Bet>;
  pool?: Maybe<Pool>;
  poolClosed?: Maybe<PoolClosed>;
  poolCloseds: Array<PoolClosed>;
  poolCreated?: Maybe<PoolCreated>;
  poolCreateds: Array<PoolCreated>;
  pools: Array<Pool>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryBetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBetCancelledArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBetCancelledsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BetCancelled_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BetCancelled_Filter>;
};


export type QueryBetPlacedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBetPlacedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BetPlaced_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BetPlaced_Filter>;
};


export type QueryBetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Bet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Bet_Filter>;
};


export type QueryPoolArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPoolClosedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPoolClosedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PoolClosed_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolClosed_Filter>;
};


export type QueryPoolCreatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPoolCreatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PoolCreated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolCreated_Filter>;
};


export type QueryPoolsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Pool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Pool_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  bet?: Maybe<Bet>;
  betCancelled?: Maybe<BetCancelled>;
  betCancelleds: Array<BetCancelled>;
  betPlaced?: Maybe<BetPlaced>;
  betPlaceds: Array<BetPlaced>;
  bets: Array<Bet>;
  pool?: Maybe<Pool>;
  poolClosed?: Maybe<PoolClosed>;
  poolCloseds: Array<PoolClosed>;
  poolCreated?: Maybe<PoolCreated>;
  poolCreateds: Array<PoolCreated>;
  pools: Array<Pool>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionBetArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBetCancelledArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBetCancelledsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BetCancelled_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BetCancelled_Filter>;
};


export type SubscriptionBetPlacedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBetPlacedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BetPlaced_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<BetPlaced_Filter>;
};


export type SubscriptionBetsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Bet_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Bet_Filter>;
};


export type SubscriptionPoolArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPoolClosedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPoolClosedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PoolClosed_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolClosed_Filter>;
};


export type SubscriptionPoolCreatedArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPoolCreatedsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<PoolCreated_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolCreated_Filter>;
};


export type SubscriptionPoolsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Pool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Pool_Filter>;
};

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}
