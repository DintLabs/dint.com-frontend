import { createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import Swal from 'sweetalert2';
import { dispatch } from '../store';
import MarketplaceAddress from '../../contractsData/Marketplace-address.json';
import MarketplaceAbi from '../../contractsData/Marketplace.json';
import NFTAddress from '../../contractsData/NFT-address.json';
import NFTAbi from '../../contractsData/NFT.json';

const winEthereum = window.ethereum as any;

type IMarketPlaceState = {
  isLoading: boolean;
  account: any;
  nft: any;
  marketplace: any;
  error: any;
};

const initialState: IMarketPlaceState = {
  isLoading: false,
  account: null,
  nft: {},
  marketplace: {},
  error: false
};

const slice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSliceChanges(state, action) {
      return { ...state, ...action.payload };
    }
  }
});

// Reducer
export default slice.reducer;

export function checkConnectionForMarketPlace() {
  return async (dispatch: any) => {
    try {
      dispatch(slice.actions.startLoading());

      if (typeof winEthereum !== 'undefined') {
        winEthereum
          .request({ method: 'eth_accounts' })
          .then(handleAccountsChanged)
          .catch(console.error);
      } else {
        const isConfirmed = await Swal.fire({
          title: 'It will required a web3 wallet to use this area of our application',
          text: 'Click Here to Install ',
          html: '<a href="https://metamask.io" target="_blank">Click here to install</a>',
          icon: 'error',
          showCancelButton: true,
          cancelButtonColor: '#CBC9C9',
          cancelButtonText: 'Back'
        });

        if (!isConfirmed) {
          (window as any).objNavigate('/', { replace: true });
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

function handleAccountsChanged(accounts: any) {
  dispatch(slice.actions.setSliceChanges({ account: accounts[0] }));
  if (accounts.length !== 0) {
    winEthereum.on('accountsChanged', async (resAccounts: any) => {
      dispatch(slice.actions.setSliceChanges({ account: resAccounts[0] }));
      await web3Handler();
    });
    const provider = new ethers.providers.Web3Provider(winEthereum);
    const signer = provider.getSigner();
    loadContracts(signer);
  }
}

// MetaMask Login/Connect
const web3Handler = async () => {
  const accounts = await winEthereum.request({ method: 'eth_requestAccounts' });
  dispatch(slice.actions.setSliceChanges({ account: accounts[0] }));

  // Get provider from Metamask
  const provider = new ethers.providers.Web3Provider(winEthereum);
  // Set signer
  const signer = provider.getSigner();

  winEthereum.on('accountsChanged', async (responseAccounts: any) => {
    dispatch(slice.actions.setSliceChanges({ account: responseAccounts[0] }));

    await web3Handler();
  });
  loadContracts(signer);
};

const loadContracts = async (signer: ethers.Signer) => {
  // Get deployed copies of contracts
  const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
  const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
  dispatch(slice.actions.setSliceChanges({ nft, isLoading: false, marketplace }));
};
