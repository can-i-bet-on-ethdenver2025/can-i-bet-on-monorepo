package ccipsolana

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"math/big"

	agbinary "github.com/gagliardetto/binary"
	"github.com/gagliardetto/solana-go"

	"github.com/smartcontractkit/chainlink-ccip/chains/solana/gobindings/ccip_offramp"
	cciptypes "github.com/smartcontractkit/chainlink-ccip/pkg/types/ccipocr3"
)

// CommitPluginCodecV1 is a codec for encoding and decoding commit plugin reports.
// Compatible with:
// - "OffRamp 1.6.0-dev"
type CommitPluginCodecV1 struct{}

func NewCommitPluginCodecV1() *CommitPluginCodecV1 {
	return &CommitPluginCodecV1{}
}

func (c *CommitPluginCodecV1) Encode(ctx context.Context, report cciptypes.CommitPluginReport) ([]byte, error) {
	var buf bytes.Buffer
	encoder := agbinary.NewBorshEncoder(&buf)
	combinedRoots := report.BlessedMerkleRoots
	combinedRoots = append(combinedRoots, report.UnblessedMerkleRoots...)
	if len(combinedRoots) != 1 {
		return nil, fmt.Errorf("unexpected merkle root length in report: %d", len(combinedRoots))
	}

	merkleRoot := combinedRoots[0]
	mr := &ccip_offramp.MerkleRoot{
		SourceChainSelector: uint64(merkleRoot.ChainSel),
		OnRampAddress:       merkleRoot.OnRampAddress,
		MinSeqNr:            uint64(merkleRoot.SeqNumsRange.Start()),
		MaxSeqNr:            uint64(merkleRoot.SeqNumsRange.End()),
		MerkleRoot:          merkleRoot.MerkleRoot,
	}

	tpu := make([]ccip_offramp.TokenPriceUpdate, 0, len(report.PriceUpdates.TokenPriceUpdates))
	for _, update := range report.PriceUpdates.TokenPriceUpdates {
		token, err := solana.PublicKeyFromBase58(string(update.TokenID))
		if err != nil {
			return nil, fmt.Errorf("invalid token address: %s, %w", update.TokenID, err)
		}
		if update.Price.IsEmpty() {
			return nil, fmt.Errorf("empty price for token: %s", update.TokenID)
		}
		tpu = append(tpu, ccip_offramp.TokenPriceUpdate{
			SourceToken: token,
			UsdPerToken: [28]uint8(encodeBigIntToFixedLengthLE(update.Price.Int, 28)),
		})
	}

	gpu := make([]ccip_offramp.GasPriceUpdate, 0, len(report.PriceUpdates.GasPriceUpdates))
	for _, update := range report.PriceUpdates.GasPriceUpdates {
		if update.GasPrice.IsEmpty() {
			return nil, fmt.Errorf("empty gas price for chain: %d", update.ChainSel)
		}

		gpu = append(gpu, ccip_offramp.GasPriceUpdate{
			DestChainSelector: uint64(update.ChainSel),
			UsdPerUnitGas:     [28]uint8(encodeBigIntToFixedLengthLE(update.GasPrice.Int, 28)),
		})
	}

	commit := ccip_offramp.CommitInput{
		MerkleRoot: mr,
		PriceUpdates: ccip_offramp.PriceUpdates{
			TokenPriceUpdates: tpu,
			GasPriceUpdates:   gpu,
		},
	}

	switch len(report.RMNSignatures) {
	case 0:
		if report.UnblessedMerkleRoots == nil {
			return nil, errors.New("No RMN signature included for the blessed root")
		}
	case 1:
		if report.BlessedMerkleRoots == nil {
			return nil, errors.New("RMN signature included without a blessed root")
		}
		// R part goes into leading 32 bytes, and S part goes into the trailing 32 bytes.
		var rmnSig64Array [64]uint8
		copy(rmnSig64Array[:32], report.RMNSignatures[0].R[:])
		copy(rmnSig64Array[32:], report.RMNSignatures[0].S[:])
		commit.RmnSignatures = [][64]uint8{rmnSig64Array}
	default:
		return nil, fmt.Errorf("Multiple RMNSignatures in report: %d", len(report.RMNSignatures))
	}

	err := commit.MarshalWithEncoder(encoder)
	if err != nil {
		return nil, err
	}

	return buf.Bytes(), nil
}

func (c *CommitPluginCodecV1) Decode(ctx context.Context, bytes []byte) (cciptypes.CommitPluginReport, error) {
	decoder := agbinary.NewBorshDecoder(bytes)
	commitReport := ccip_offramp.CommitInput{}
	err := commitReport.UnmarshalWithDecoder(decoder)
	if err != nil {
		return cciptypes.CommitPluginReport{}, err
	}

	merkleRoots := []cciptypes.MerkleRootChain{
		{
			ChainSel:      cciptypes.ChainSelector(commitReport.MerkleRoot.SourceChainSelector),
			OnRampAddress: commitReport.MerkleRoot.OnRampAddress,
			SeqNumsRange: cciptypes.NewSeqNumRange(
				cciptypes.SeqNum(commitReport.MerkleRoot.MinSeqNr),
				cciptypes.SeqNum(commitReport.MerkleRoot.MaxSeqNr),
			),
			MerkleRoot: commitReport.MerkleRoot.MerkleRoot,
		},
	}

	tokenPriceUpdates := make([]cciptypes.TokenPrice, 0, len(commitReport.PriceUpdates.TokenPriceUpdates))
	for _, update := range commitReport.PriceUpdates.TokenPriceUpdates {
		tokenPriceUpdates = append(tokenPriceUpdates, cciptypes.TokenPrice{
			TokenID: cciptypes.UnknownEncodedAddress(update.SourceToken.String()),
			Price:   decodeLEToBigInt(update.UsdPerToken[:]),
		})
	}

	gasPriceUpdates := make([]cciptypes.GasPriceChain, 0, len(commitReport.PriceUpdates.GasPriceUpdates))
	for _, update := range commitReport.PriceUpdates.GasPriceUpdates {
		gasPriceUpdates = append(gasPriceUpdates, cciptypes.GasPriceChain{
			GasPrice: decodeLEToBigInt(update.UsdPerUnitGas[:]),
			ChainSel: cciptypes.ChainSelector(update.DestChainSelector),
		})
	}

	commitPluginReport := cciptypes.CommitPluginReport{
		PriceUpdates: cciptypes.PriceUpdates{
			TokenPriceUpdates: tokenPriceUpdates,
			GasPriceUpdates:   gasPriceUpdates,
		},
	}

	if len(commitReport.RmnSignatures) == 0 {
		commitPluginReport.UnblessedMerkleRoots = merkleRoots
	} else {
		commitPluginReport.BlessedMerkleRoots = merkleRoots
		rmnSigs := make([]cciptypes.RMNECDSASignature, 0, len(commitReport.RmnSignatures))
		for _, sig := range commitReport.RmnSignatures {
			// Leading 32 bytes are the R part, and trailing 32 bytes are the S part
			var r [32]byte
			copy(r[:], sig[:32])
			var s [32]byte
			copy(s[:], sig[32:])
			rmnSigs = append(rmnSigs, cciptypes.RMNECDSASignature{
				R: r,
				S: s,
			})
		}
		commitPluginReport.RMNSignatures = rmnSigs
	}

	return commitPluginReport, nil
}

func encodeBigIntToFixedLengthLE(bi *big.Int, length int) []byte {
	// Create a fixed-length byte array
	paddedBytes := make([]byte, length)

	// Use FillBytes to fill the array with big-endian data, zero-padded
	bi.FillBytes(paddedBytes)

	// Reverse the array for little-endian encoding
	for i, j := 0, len(paddedBytes)-1; i < j; i, j = i+1, j-1 {
		paddedBytes[i], paddedBytes[j] = paddedBytes[j], paddedBytes[i]
	}

	return paddedBytes
}

func decodeLEToBigInt(data []byte) cciptypes.BigInt {
	// Reverse the byte array to convert it from little-endian to big-endian
	for i, j := 0, len(data)-1; i < j; i, j = i+1, j-1 {
		data[i], data[j] = data[j], data[i]
	}

	// Use big.Int.SetBytes to construct the big.Int
	bi := new(big.Int).SetBytes(data)
	if bi.Int64() == 0 {
		return cciptypes.NewBigInt(big.NewInt(0))
	}

	return cciptypes.NewBigInt(bi)
}

// Ensure CommitPluginCodec implements the CommitPluginCodec interface
var _ cciptypes.CommitPluginCodec = (*CommitPluginCodecV1)(nil)
