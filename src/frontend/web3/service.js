import {
  getEVMTokenName,
  getEVMTokenSymbol,
  getEVMTokenDecimal,
  callMoralis,
  getEVMTokenBalance,
} from "../api/EVM";
import { getSolanaTokenDetails } from "../api/Solana";
import * as solanaServices from "../api/Solana";
import {
  FILTER_OWNER_NFT,
  FILTER_OWNER_NFT_EVM,
  FILTER_OWNER_SOL,
  IS_TOKEN,
} from "../utils";
import { ETHERIUM, POLYGON_MAINNET, SOLANA_MAINNET } from "./model";
import { convertBigNumberToDecimal,  toHex } from "./utils";

export const fetchTokenDetails = async (
  Network,
  Network_Standard,
  Token_Address
) => {
  var res = {};
  var req = {};
  if (!Token_Address) {
    return;
  }
  req.Token_Address = Token_Address;
  req.abi = Network_Standard;
  switch (Network) {
    case 1: {
      let details = await getSolanaTokenDetails(req);

      if (IS_TOKEN(Network_Standard)) {
        return {
          name: details?.name,
          symbol: details?.symbol,
          decimals: details?.decimals,
          icon: details?.logoURI,
        };
      } else {
        return { name: details?.name };
      }
    }
    case 2: {
      req.rpcURL = POLYGON_MAINNET.rpcURL;
      let name = await getEVMTokenName(req);
      if (IS_TOKEN(Network_Standard)) {
        let symbol = await getEVMTokenName(req);
        let decimals = await getEVMTokenDecimal(req);
        return { name: name, symbol: symbol, decimals: decimals };
      } else {
        return { name: name };
      }
    }
    case 3: {
      req.rpcURL = `${ETHERIUM.rpcURL}${Token_Address}/function?chain=${toHex(
        ETHERIUM.chainId
      )}&function_name=name`;
      req.method = "POST";

      let name = await callMoralis({ ...req });

      if (IS_TOKEN(Network_Standard)) {
        req.rpcURL = `${ETHERIUM.rpcURL}${Token_Address}/function?chain=${toHex(
          ETHERIUM.chainId
        )}&function_name=symbol`;
        let symbol = await callMoralis({ ...req });

        req.rpcURL = `${ETHERIUM.rpcURL}${Token_Address}/function?chain=${toHex(
          ETHERIUM.chainId
        )}&function_name=decimals`;
        let decimals = await callMoralis({ ...req });

        return { name: name, symbol: symbol, decimals: decimals };
      } else {
        return { name: name };
      }
    }
    default:
      break;
  }
  return res;
};

export const fetchTokenBalance = async ({
  Network,
  Network_Standard,
  Token_Address,
  tokenDecimal,
  walletAddress,
}) => {
  var res = {};
  var req = {};
  req.Token_Address = Token_Address;
  switch (Network) {
    case 1: {
      req.walletAddress = walletAddress;
      req.method = "GET";
      if (IS_TOKEN(Network_Standard)) {
        req.rpcURL = `${SOLANA_MAINNET.rpcURL}${Token_Address}/tokens`;
        const result = await solanaServices.callMoralis({ ...req });
        return result.filter((nft) =>
          FILTER_OWNER_SOL(nft, {
            owner_of: walletAddress,
          })
        ).length;
      } else {
        req.rpcURL = `${SOLANA_MAINNET.rpcURL}${Token_Address}/nft`;
        const result = await solanaServices.callMoralis({ ...req });
        return result.filter((nft) =>
          FILTER_OWNER_SOL(nft, {
            owner_of: walletAddress,
          })
        ).length;
      }
    }
    case 2:
      req.rpcURL = POLYGON_MAINNET.rpcURL;
      req.walletAddress = walletAddress;

      if (IS_TOKEN(Network_Standard)) {
        req.abi = Network_Standard;
        let result = await getEVMTokenBalance(req);

        return convertBigNumberToDecimal(result.toString(), tokenDecimal);
      } else {
        req.rpcURL = `${
          ETHERIUM.rpcURL
        }${walletAddress}/nft/${Token_Address}?chain=${toHex(
          POLYGON_MAINNET.chainId
        )}&format=decimal`;
        req.method = "GET";
        const { result } = await callMoralis({ ...req });
        return result.filter((nft) =>
          FILTER_OWNER_NFT_EVM(nft, {
            token_address: Token_Address,
            contract_type: Network_Standard,
            owner_of: walletAddress,
          })
        ).length;
      }

    case 3:
      if (IS_TOKEN(Network_Standard)) {
        req.rpcURL = `${ETHERIUM.rpcURL}${Token_Address}/function?chain=${toHex(
          ETHERIUM.chainId
        )}&function_name=balanceOf`;
        req.abi = Network_Standard;
        req.params = { _owner: walletAddress };
        req.method = "POST";

        let result = await callMoralis({ ...req });

        return convertBigNumberToDecimal(result.toString(), tokenDecimal);
      } else {
        req.rpcURL = `${
          ETHERIUM.rpcURL
        }${walletAddress}/nft/${Token_Address}?chain=${toHex(
          ETHERIUM.chainId
        )}&format=decimal`;
        req.method = "GET";

        const { result } = await callMoralis({ ...req });
        console.log("result", result);
        return result.filter((nft) =>
          FILTER_OWNER_NFT_EVM(nft, {
            token_address: Token_Address,
            contract_type: Network_Standard,
            owner_of: walletAddress,
          })
        ).length;
      }

    default:
      break;
  }
  return res;
};
