import { ethers } from "ethers";
import { ABI } from "../../web3/model";
import apiClient from "./client";
// import Moralis from "moralis/dist/moralis.min.js";

// Moralis.start({ serverUrl, appId });
export const callMoralis = async ({ rpcURL, abi, params, method }) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "X-API-Key",
    "ENMoTIOsh9TMxrUlYdxLOjda5Oh65rddFdbEDzzSaGB4M6ZhhegBCAnTxhYCi9Ec"
  );
  myHeaders.append("Content-Type", "application/json");

  var raw = {};
  if (params) {
    raw["params"] = { ...params };
  }
  if (abi) {
    raw["abi"] = ABI[abi];
  }
  raw = JSON.stringify(raw);

  var requestOptions = {
    method: method,
    headers: myHeaders,
    redirect: "follow",
  };

  if (method === "POST" || method === "post") {
    requestOptions.body = raw;
  }

  return new Promise((resolve, reject) => {
    fetch(rpcURL, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Required");
        }
        return response.json();
      })
      .then((result) => resolve(result))
      .catch((error) => {
        console.error("error", error);
        reject();
        return;
      });
  });
};

export const getEVMTokenName = async (params) => {
  const { rpcURL, abi, Token_Address } = params;
  try {
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);
    const contract = new ethers.Contract(Token_Address, ABI[abi], provider);
    console.log("getpolygontokenname ==> ", contract);
    return await contract.name();
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getEVMTokenSymbol = async (params) => {
  const { rpcURL, abi, Token_Address } = params;
  try {
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);
    const contract = new ethers.Contract(Token_Address, ABI[abi], provider);
    return await contract.symbol();
  } catch (error) {
    console.error(error);
    return;
  }
};
export const getEVMTokenDecimal = async (params) => {
  const { rpcURL, abi, Token_Address } = params;
  try {
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);
    const contract = new ethers.Contract(Token_Address, ABI[abi], provider);
    return await contract.decimals();
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getEVMTokenBalance = async (params) => {
  const { rpcURL, abi, Token_Address, walletAddress } = params;
  try {
    const provider = new ethers.providers.JsonRpcProvider(rpcURL);
    const contract = new ethers.Contract(Token_Address, ABI[abi], provider);
    return await contract.balanceOf(walletAddress);
  } catch (error) {}
};
