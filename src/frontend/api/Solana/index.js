import { ABI } from "../../web3/model";

export const getSolanaTokenDetails = (params) => {
  const { Token_Address } = params;

  return new Promise((resolve, reject) => {
    try {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      fetch(
        "https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json",
        requestOptions
      )
        .then((response) => response.json())
        .then((tokenList) => {
          // console.log("tokenList", typeof tokenList.tokens);
          var solanatokenname = tokenList.tokens.find(
            (element) => element.address === Token_Address
          );
          return resolve(solanatokenname);
        });
    } catch (error) {
      console.error(error);
      reject(null);
      return;
    }
  });
};

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
