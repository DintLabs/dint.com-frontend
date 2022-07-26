import { ETHERIUM, POLYGON_MAINNET, SOLANA_MAINNET } from "../web3/model";

export const OPTIONS_NETWORK_STAD = {
  ERC_20: {
    name: "TOKEN",
    key: "ERC_20",
    networks: [POLYGON_MAINNET.uniqueId, ETHERIUM.uniqueId],
  },
  TOKEN_721: {
    name: "TOKEN 721",
    key: "ERC_721",
    networks: [POLYGON_MAINNET.uniqueId, ETHERIUM.uniqueId],
  },
  TOKEN_1155: {
    name: "TOKEN 1155",
    key: "ERC_1155",
    networks: [POLYGON_MAINNET.uniqueId, ETHERIUM.uniqueId],
  },
  NFT: {
    name: "NFT",
    key: "NFT",
    networks: [SOLANA_MAINNET.uniqueId],
  },
  SPL: {
    name: "TOKEN",
    key: "SPL",
    networks: [SOLANA_MAINNET.uniqueId],
  },
};

export const IS_TOKEN = (networkStandard) => {
  return ["ERC_20", "SPL"].includes(networkStandard);
};

export const IS_NFT = (networkStandard) => {
  return ["NFT", "ERC_721", "ERC_1155"].includes(networkStandard);
};

const CONTRACT_TYPE_MORALIS = {
  TOKEN_1155: "ERC1155",
  TOKEN_721: "ERC721",
};
export const FILTER_OWNER_NFT = (
  nfts,
  { token_address, contract_type, owner_of }
) =>
  nfts.token_address === token_address &&
  nfts.contract_type === CONTRACT_TYPE_MORALIS[contract_type] &&
  nfts.owner_of === owner_of;
