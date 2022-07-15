import Footer from './Footer'
import "../material/Event.css"
import NavbarHome from './NavbarHome'
import { useNavigate } from 'react-router-dom';
import { get, getDatabase, ref, child } from "firebase/database";
import { auth, db } from "./Firebase";
import { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { ethers } from "ethers";
import polygonlogo from "../material/polygon_logo.svg"
import solanalogo from "../material/solana_logo.svg"
import dint from "../material/dintcoin_logo.png"
const Swal = require('sweetalert2');


const ShowTicketBtn = (props) => {
    let navigate = useNavigate();
    if (parseFloat(props.balance) > parseFloat(props.required)) {
        return (
            <>
                <Button variant="primary" onClick={() => navigate('/ticketcreate', { state: { eventid: props.detail.eventId, userid: auth.currentUser.uid } })}>Get Ticket</Button>
            </>)
    }
    else {
        return (
            <>
                <Button variant="primary" onClick={() => alert('Buy Clicked')}>Buy Token</Button>
            </>)
    }
}

const DisplaynetworkLogo = (props) => {
    if (props.networkName == "Polygon") {
        return (<>
            <img src={polygonlogo} alt="" height={"17px"} style={{ marginBottom: "2px" }} />
        </>)
    }
    else if (props.networkName == "Solana") {
        return (<>
            <img src={solanalogo} alt="" height={"17px"} style={{ marginBottom: "2px" }} />
        </>)
    } else {
        return (<>
            <p>token</p>
        </>)
    }
}

const DisplaycryptoLogo = (props) => {
    return (<>
        <img src={dint} alt="" height={"22px"} style={{ marginBottom: "2px" }} />
    </>)
}



const Events = (props) => {
    let navigate = useNavigate();

    const [eventsdata, setEventdata] = useState([])
    const [userBalanceEvent, setUserBalanceEvent] = useState('wallet not connected')
    const [tokenNameEvent, setTokenNameEvent] = useState('wallet not connected')
    const [networkid, setnetworkid] = useState('wallet not connected')


    const abicode = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_amount", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "creationBlock", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_newController", "type": "address" }], "name": "changeController", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_blockNumber", "type": "uint256" }], "name": "balanceOfAt", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "version", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_cloneTokenName", "type": "string" }, { "name": "_cloneDecimalUnits", "type": "uint8" }, { "name": "_cloneTokenSymbol", "type": "string" }, { "name": "_snapshotBlock", "type": "uint256" }, { "name": "_transfersEnabled", "type": "bool" }], "name": "createCloneToken", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "parentToken", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_amount", "type": "uint256" }], "name": "generateTokens", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_blockNumber", "type": "uint256" }], "name": "totalSupplyAt", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "transfersEnabled", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "parentSnapShotBlock", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_amount", "type": "uint256" }, { "name": "_extraData", "type": "bytes" }], "name": "approveAndCall", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_amount", "type": "uint256" }], "name": "destroyTokens", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_token", "type": "address" }], "name": "claimTokens", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "tokenFactory", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_transfersEnabled", "type": "bool" }], "name": "enableTransfers", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "controller", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "_tokenFactory", "type": "address" }, { "name": "_parentToken", "type": "address" }, { "name": "_parentSnapShotBlock", "type": "uint256" }, { "name": "_tokenName", "type": "string" }, { "name": "_decimalUnits", "type": "uint8" }, { "name": "_tokenSymbol", "type": "string" }, { "name": "_transfersEnabled", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_token", "type": "address" }, { "indexed": true, "name": "_controller", "type": "address" }, { "indexed": false, "name": "_amount", "type": "uint256" }], "name": "ClaimedTokens", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_amount", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_cloneToken", "type": "address" }, { "indexed": false, "name": "_snapshotBlock", "type": "uint256" }], "name": "NewCloneToken", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_amount", "type": "uint256" }], "name": "Approval", "type": "event" }]


    const getEventsfirebase = () => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `events/`)).then((snapshot) => {
            if (snapshot.exists()) {
                var events = Object.keys(snapshot.val())
                var eventarray = [];
                for (var i = 0; i < events.length; i++) {
                    eventarray.push(snapshot.val()[events[i]])
                }
                setEventdata(eventarray)
            } else {
                console.log("No data available");
            }

        }).catch((error) => {
            console.error(error);
        });
    }


    window.ethereum.on('chainChanged', async function (chainId) {
        getmetamaskBalance()
    })


    const getmetamaskBalance = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts[0]) {
                
                // const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                if(provider.provider.chainId == "0x13881")
                {
                    setnetworkid("Polygon Test" )
                }
                else if(provider.provider.chainId == "0x89")
                {
                    setnetworkid('Polygon')
                }
                else{
                    setnetworkid('polygon not connected')
                }
                const contract = new ethers.Contract("0x40763df31955cb3bad544cbed3e1953a9b063311", abicode, provider)
                try{

    
                const balanceInEth = await contract.balanceOf(accounts[0]);
                console.log(balanceInEth)

                const tokenname = await contract.name();
                setTokenNameEvent(tokenname)
                setUserBalanceEvent(parseFloat(ethers.utils.formatEther(balanceInEth)).toFixed(6))
                window.isWallet = true;
                }
                catch(e)
                {
                    setTokenNameEvent('polygon Main not connected')
                    setUserBalanceEvent('polygon Main not connected')
                }
            }
        }
        else {
            Swal.fire({
                title: 'It will required a web3 wallet to use this area of our application',
                text: "Click Here to Install ",
                html: '<a href="https://metamask.io" target="_blank">Click here to install</a>',
                icon: 'error',
                showCancelButton: true,
                cancelButtonColor: '#CBC9C9',
                cancelButtonText: 'Back'
            }).then((result) => {
                if (result.isConfirmed) {

                }
                else {
                    navigate('/', { replace: true })
                }
            })
        }


    }

  



    useEffect(() => {
        getmetamaskBalance()
        getEventsfirebase()
    }, [])


    return (
        <>
            <NavbarHome isloggedin={props.islogin} logout={props.logout} isadmin={props.isAdmin} iseventpage={true} />
            <div id="events">
                <br /><br />
                <center><h4>Network : {networkid}</h4></center>
                <center><h4>Token Name : {tokenNameEvent}</h4></center>
                <center><h4>Wallet Balance : {userBalanceEvent} <img src={dint} alt="" height={"22px"} style={{ marginBottom: "2px" }} /> </h4></center>
                <br /><br />
                <Container>
                    <Row xs={1} md={3} className="g-4">
                        {eventsdata.map((ev, index) => (
                            <>
                                <Col>
                                    <Card>
                                        <Card.Img variant="top" src={ev.eventPhoto} style={{ height: '200px' }} />
                                        <Card.Body>
                                            <Card.Title><b>{ev.eventName}</b></Card.Title>
                                            <Card.Text>
                                                {ev.eventDescription}
                                            </Card.Text>
                                            <hr></hr>
                                            <h6>Date  : {ev.eventDate} </h6>
                                            <h6>Start Time  : {ev.eventStartTime} </h6>
                                            <h6>End Time    :  {ev.eventEndTime} </h6>
                                            <h6>Venue : {ev.venueName} </h6>
                                            <h6>Network : <DisplaynetworkLogo networkName={ev.network} />  </h6>
                                            <h6>Tokens Required: <b>{ev.balanceRequired} </b> {ev.tokenName} <DisplaycryptoLogo /> </h6>
                                            <br />
                                            <ShowTicketBtn balance={userBalanceEvent} required={ev.balanceRequired} detail={ev} />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </>
                        ))
                        }
                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    )
}


export default Events;