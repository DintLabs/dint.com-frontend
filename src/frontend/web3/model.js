import { ERC_1155, ERC_20, ERC_721 } from "./abi";

export const NETWORK_STANDARD = {
  ERC_721: "ERC 721",
  ERC_1155: "ERC 1155",
  ERC_20: "ERC 20",
};

export const SOLANA_MAINNET = {
  uniqueId: 1,
  name: "Solana",
  rpcURL: "https://solana-gateway.moralis.io/account/mainnet/",
  chainId: 101,
  SYMBOL: "SOL",
  DECIMALS: 18,
};

export const POLYGON_MAINNET = {
  uniqueId: 2,
  name: "Polygon",
  rpcURL: "https://polygon-rpc.com/",
  chainId: 137,
  SYMBOL: "MATIC",
  DECIMALS: 18,
};

export const ETHERIUM = {
  uniqueId: 3,
  name: "Etherum",
  rpcURL: "https://deep-index.moralis.io/api/v2/",
  chainId: 1,
  SYMBOL: "ETH",
  DECIMALS: 18,
};

export const NETWORKS = Object.freeze({
  1: SOLANA_MAINNET,
  2: POLYGON_MAINNET,
  3: ETHERIUM,
});

export const ABI = {
  TOKEN_721: ERC_721,
  TOKEN_1155: ERC_1155,
  ERC_20: ERC_20,
};
