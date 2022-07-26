import detectEthereumProvider from "@metamask/detect-provider";

export const hasWallet = async () => {
  if (await detectEthereumProvider()) {
    return true;
  } else return false;
};

export const getChainId = async () => {
  const provider = await detectEthereumProvider();
  if (provider) {
    return await provider.request({
      method: "eth_chainId",
    });
  } else {
    return null;
  }
};

export const getConnectedAccounts = async () => {
  try {
    return await window.ethereum.request({ method: "eth_requestAccounts" });
  } catch (_) {
    return null;
  }
};
