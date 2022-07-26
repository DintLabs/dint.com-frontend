export const hasWallet = async () => {
    return window.phantom?.solana?.isPhantom
};

export const getProvider = () => {
    if ('phantom' in window) {
      const provider = window.phantom?.solana;
  
      if (provider?.isPhantom) {
        return provider;
      }
    }
  
    window.open('https://phantom.app/', '_blank');
};