import $ from 'jquery';
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import Metamask_icon from "../material/metamask.svg"
import { ethers } from "ethers";
import { useState } from 'react';
import '../material//walletsSidebar.css'
import { useEffect } from 'react';
import dint from "../material/dintcoin_logo.png";


const Swal = require('sweetalert2');
const abicode = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_amount", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "creationBlock", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_newController", "type": "address" }], "name": "changeController", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_blockNumber", "type": "uint256" }], "name": "balanceOfAt", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "version", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_cloneTokenName", "type": "string" }, { "name": "_cloneDecimalUnits", "type": "uint8" }, { "name": "_cloneTokenSymbol", "type": "string" }, { "name": "_snapshotBlock", "type": "uint256" }, { "name": "_transfersEnabled", "type": "bool" }], "name": "createCloneToken", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "parentToken", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_amount", "type": "uint256" }], "name": "generateTokens", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_blockNumber", "type": "uint256" }], "name": "totalSupplyAt", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "transfersEnabled", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "parentSnapShotBlock", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_amount", "type": "uint256" }, { "name": "_extraData", "type": "bytes" }], "name": "approveAndCall", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_amount", "type": "uint256" }], "name": "destroyTokens", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_token", "type": "address" }], "name": "claimTokens", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "tokenFactory", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_transfersEnabled", "type": "bool" }], "name": "enableTransfers", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "controller", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "_tokenFactory", "type": "address" }, { "name": "_parentToken", "type": "address" }, { "name": "_parentSnapShotBlock", "type": "uint256" }, { "name": "_tokenName", "type": "string" }, { "name": "_decimalUnits", "type": "uint8" }, { "name": "_tokenSymbol", "type": "string" }, { "name": "_transfersEnabled", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_token", "type": "address" }, { "indexed": true, "name": "_controller", "type": "address" }, { "indexed": false, "name": "_amount", "type": "uint256" }], "name": "ClaimedTokens", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_amount", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_cloneToken", "type": "address" }, { "indexed": false, "name": "_snapshotBlock", "type": "uint256" }], "name": "NewCloneToken", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_amount", "type": "uint256" }], "name": "Approval", "type": "event" }]

const MetamaskLogin = () => {

  const [walletConnected, SetWallet] = useState('')
  const [balance, setBalance] = useState('')

  let navigate = useNavigate();


  

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
        const provider = new ethers.providers.Web3Provider(window.ethereum)
       
        const contract = new ethers.Contract("0x40763df31955cb3bad544cbed3e1953a9b063311", abicode, provider)
        const balanceInEth = await contract.balanceOf(accounts[0]);
        SetWallet(accounts[0])
        setBalance(parseFloat(ethers.utils.formatEther(balanceInEth)).toFixed(6))
        window.isWallet = true;
      }
      else {
        alert('connection problem')
      }
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



  if (typeof window.ethereum !== 'undefined') {
    window.ethereum.on('chainChanged', async (chainId) => {
      await connectMetamask()
    })
    window.ethereum.on('accountsChanged', async function (accounts) {
      await connectMetamask()
    })
  }


  useEffect(async () => {
    const connected_account = await window.ethereum.request({ method: 'eth_accounts' });
    if (connected_account[0] !== 0 && connected_account[0] !== undefined) {
      connectMetamask();
    }
  }, [])

  return (
    <>
      <button id="wallet_btn" onClick={openNav}> <MdOutlineAccountBalanceWallet size={35} /></button>
      {/*  Code of Sidebar */}
      <div id="mySidenav" className="sidenav">
        <button className="closebtn" onClick={closeNav}>×</button>
        {walletConnected ? <>
          <div className="sidenav_child">
            <div className="sidenav_top_div">
              <CgProfile size={35} /> <div >{walletConnected.slice(0, 7) + '...' + walletConnected.slice(35, 42)} </div>
            </div>
            <div className="wallets_parent_div" id='balance_parent'>
              <small>Account Balance</small>
              <h4>{balance} <img src={dint} alt="" height={"27px"} style={{ marginBottom: "2px" }} /></h4>
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