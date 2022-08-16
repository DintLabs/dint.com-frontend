export const hasWallet = async () => (window as any).phantom?.solana?.isPhantom;

// eslint-disable-next-line consistent-return
export const getProvider = () => {
  if ('phantom' in window) {
    const provider = (window as any).phantom?.solana;

    if (provider?.isPhantom) {
      return provider;
    }
  } else {
    window.open('https://phantom.app/', '_blank');
  }
};
