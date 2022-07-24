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
import { Helmet } from "react-helmet"
const Swal = require('sweetalert2');


const ShowTicketBtn = (props) => {
    let navigate = useNavigate();
    if (parseFloat(props.balance) > parseFloat(props.required)) {
        return (
            <>
                <Button variant="primary" onClick={() => navigate('/ticketcreate', { state: { eventid: props.detail.eventId, userid: auth.currentUser.uid } })}>Get Ticket</Button>
            </>
            )
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



    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.on('chainChanged', async function (chainId) {
            getmetamaskBalance()
        })
    }



    var App_URL = "dint.com"

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

    const getmetamaskBalance = async () => {
        if (window.mobileCheck() == true) {
            if (typeof window.ethereum !== 'undefined') {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts[0]) {
                    // const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
                    const provider = new ethers.providers.Web3Provider(window.ethereum)
                    if (provider.provider.chainId == "0x13881") {
                        setnetworkid("Polygon Test")
                    }
                    else if (provider.provider.chainId == "0x89") {
                        setnetworkid('Polygon')
                    }
                    else {
                        setnetworkid('polygon not connected')
                    }
                    const contract = new ethers.Contract("0x40763df31955cb3bad544cbed3e1953a9b063311", abicode, provider)
                    try {
                        console.log(contract)
                        const balanceInEth = await contract.balanceOf(accounts[0]);
                        const tokenname = await contract.name();
                        setTokenNameEvent(tokenname)
                        setUserBalanceEvent(parseFloat(ethers.utils.formatEther(balanceInEth)).toFixed(6))
                        window.isWallet = true;
                    }
                    catch (e) {
                        setTokenNameEvent('polygon Main not connected')
                        setUserBalanceEvent('polygon Main not connected')
                    }
                }
            }
            else {
                openMetaMaskUrl("https://metamask.app.link/dapp/" + App_URL);
            }
        }
        else {
            if (typeof window.ethereum !== 'undefined') {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts[0]) {
                    // const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
                    const provider = new ethers.providers.Web3Provider(window.ethereum)
                    if (provider.provider.chainId == "0x13881") {
                        setnetworkid("Polygon Test")
                    }
                    else if (provider.provider.chainId == "0x89") {
                        setnetworkid('Polygon')
                    }
                    else {
                        setnetworkid('polygon not connected')
                    }
                    const contract = new ethers.Contract("0x40763df31955cb3bad544cbed3e1953a9b063311", abicode, provider)
                    try {

                        console.log(contract)
                        const balanceInEth = await contract.balanceOf(accounts[0]);
                        const tokenname = await contract.name();
                        setTokenNameEvent(tokenname)
                        setUserBalanceEvent(parseFloat(ethers.utils.formatEther(balanceInEth)).toFixed(6))
                        window.isWallet = true;
                    }
                    catch (e) {
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
    }

    useEffect(() => {
        getmetamaskBalance()
        getEventsfirebase()
    }, [])


    return (
        <>
            <Helmet>
                <title>Events</title>
                <meta name="description" content="Dint Events, buy event tickets. Use your digital assets to create event tickets" />
            </Helmet>
            <NavbarHome isloggedin={props.islogin} logout={props.logout} isadmin={props.isAdmin} iseventpage={true} />
            <div id="events">
                <br /><br />
                <div className="container">
                    <div className="header">
                        <h1>Events</h1>

                    </div>
                </div>

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
                                            <h6>Date: {ev.eventDate} </h6>
                                            <h6>Start Time: {ev.eventStartTime} </h6>
                                            <h6>End Time:  {ev.eventEndTime} </h6>
                                            <h6>Venue: {ev.venueName} </h6>
                                            <h6>Network: <DisplaynetworkLogo networkName={ev.network} />  </h6>
                                            <h6>Token Name: {ev.tokenName} <DisplaycryptoLogo /> </h6>
                                            <h6>Balance Required: <b> {ev.balanceRequired} </b>  </h6>
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
