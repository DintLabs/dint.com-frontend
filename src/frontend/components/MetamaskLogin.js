import $ from 'jquery';
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import {  useNavigate } from "react-router-dom";
import Metamask_icon from "../material/metamask.svg"
import { ethers } from "ethers";
import { useState } from 'react';
import '../material//walletsSidebar.css'
import { useEffect } from 'react';
const Swal = require('sweetalert2');


const MetamaskLogin = () =>{

    const [walletConnected, SetWallet] = useState('')
    const [balance, setBalance] = useState('')
    
    let navigate = useNavigate();


    useEffect(async ()=>{
        const connected_account = await window.ethereum.request({method:'eth_accounts'});
        if(connected_account[0] !== 0 && connected_account[0] !== undefined )
          {
              connectMetamask();
          }
    },[])

    const openNav = () => {
        $('#mySidenav').css("width", "350px");
        $('#main').css("margin-left", '350px')
      }
      const closeNav = () => {
        $('#mySidenav').css("width", "0");
        $('#main').css("margin-left", '0')
      }


      
  const other_wallet_clicked = () => {
    Swal.fire({
      title: 'Sorry',
      text: 'Currently We Have Only Metamask, Other Wallets Are Coming Soon',
      icon: 'warning',
      confirmButtonText: 'Close',
    })
  }


 


  const connectMetamask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts[0]) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(accounts[0]);
        const balanceInEth = parseFloat(ethers.utils.formatEther(balance));
        SetWallet(accounts[0])
        setBalance(balanceInEth.toFixed(6))
        window.isWallet = true;
      }
      else {
        alert('connection problem')
      }
      // Get provider from Metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      // Set signer
      const signer = provider.getSigner()
      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      })
      window.ethereum.on('accountsChanged', async function (accounts) {
        await connectMetamask()
      })
    }
    else {
      Swal.fire({
        title: 'Error!',
        text: 'Metamask is not installed',
        icon: 'error',
        confirmButtonText: 'Close',
        footer: '<a href="https://metamask.io/">Click Here to Install Metamask </a>'
      })
    }
  }


    return(
        <>
        <button id="wallet_btn" onClick={openNav}> <MdOutlineAccountBalanceWallet size={35} /></button>
         {/*  Code of Sidebar */}
         <div id="mySidenav" className="sidenav">
                <button className="closebtn" onClick={closeNav}>×</button>
                {walletConnected ? <>
                    <div className="sidenav_child">
                    <div className="sidenav_top_div">
                    <CgProfile size={35} /> <div >{walletConnected.slice(0, 7) + '...' + walletConnected.slice(35, 42)}</div>
                    </div>
                    <div className="wallets_parent_div" id='balance_parent'>
                        <small>Account Balance</small>
                        <h4>{balance}</h4>
                    </div>
                    </div>
                </>
                :
                <div className="sidenav_child">
                  <div className="sidenav_top_div">
                    <CgProfile size={35} /> <div > <p>Connect Wallet</p></div>
                  </div>
                  <div className="wallets_parent_div">
                    <div className="wallets_div" onClick={connectMetamask}><img src={Metamask_icon}></img>  <p>Metamask</p></div>
                    <div className="wallets_div last_wallet" onClick={other_wallet_clicked}> <p>Other Wallets</p></div>
                  </div>
                </div>
                
                
                }
                
              </div>
              
              {/* Code of slidebar ends */}
        </>
    )
}


export default MetamaskLogin