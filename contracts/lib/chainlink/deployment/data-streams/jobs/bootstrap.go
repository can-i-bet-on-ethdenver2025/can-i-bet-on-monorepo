package jobs

import "github.com/pelletier/go-toml/v2"

var _ JobSpec = &BootstrapSpec{}

type BootstrapSpec struct {
	Base

	ContractID  string      `toml:"contractID"`
	DonID       uint64      `toml:"donID,omitempty"`
	Relay       RelayType   `toml:"relay"`
	RelayConfig RelayConfig `toml:"relayConfig"`
}

// RelayType is the type of relay set in the TOML.
type RelayType string

var (
	RelayTypeEVM    RelayType = "evm"
	RelayTypeSolana RelayType = "solana"
)

// RelayConfig is the configuration for the relay. This could change depending on the relay type.
type RelayConfig struct {
	ChainID   string `toml:"chainID"`
	FromBlock uint64 `toml:"fromBlock,omitempty"`
}

func (b *BootstrapSpec) MarshalTOML() ([]byte, error) {
	return toml.Marshal(b)
}
