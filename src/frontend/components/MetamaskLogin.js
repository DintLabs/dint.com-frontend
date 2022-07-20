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


  window.mobileCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  };

  function openMetaMaskUrl(url) {
    const a = document.createElement("a");
    a.href = url;
    a.target = "_self";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }



  const connectMetamask = async () => {
    var App_URL = "dint.com"

    if (window.mobileCheck() == true) {
      openMetaMaskUrl("https://metamask.app.link/dapp/"+App_URL);
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

      <div className='profile_hide_mobile'>
        <button id="wallet_btn" onClick={openNav}> <MdOutlineAccountBalanceWallet size={35} /> </button>
      </div>
      <div className='profile_hide_pc'>

        <li className='no_effect_li' style={{ marginLeft: "10px" }}>
          <p style={{ color: "#433f39", marginTop: "30px", fontSize: "20px" }} onClick={connectMetamask}>Wallet</p>
        </li>
      </div>
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