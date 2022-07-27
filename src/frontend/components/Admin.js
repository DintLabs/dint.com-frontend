import "../material/admin.css";
import $ from "jquery";
import React from "react";
import { get, getDatabase, ref, set, update, child } from "firebase/database";
import { db } from "./Firebase";
import { useEffect, useState } from "react";
import { Tabs, Tab, Form, Button, Table } from "react-bootstrap";
import mainlogo from "../material/white.png";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import polygonlogo from "../material/polygon_logo.svg";
import solanalogo from "../material/solana_logo.svg";
import { auth } from "./Firebase";
import { NETWORKS, token_type } from "../web3/model";
import { IS_TOKEN, OPTIONS_NETWORK_STAD } from "../utils";
import { fetchTokenDetails } from "../web3/service";

const DisplaynetworkLogo = (props) => {
  if (props.networkName == "Polygon") {
    return (
      <>
        <img
          src={polygonlogo}
          alt=""
          height={"17px"}
          style={{ marginBottom: "2px" }}
        />
      </>
    );
  } else if (props.networkName == "Solana") {
    return (
      <>
        <img
          src={solanalogo}
          alt=""
          height={"17px"}
          style={{ marginBottom: "2px" }}
        />
      </>
    );
  } else {
    return (
      <>
        <p>token</p>
      </>
    );
  }
};

const Admin = () => {
  let navigate = useNavigate();
  const [eventslist, setEventsData] = useState([]);
  const [SelectedeventNameFirebase, setSelectedEventNameFirebase] =
    useState("");
  const [show, setShow] = useState(false);
  const [tokenName, setTokenName] = useState("");
  const [edittokenName, setEditTokenName] = useState("");

  const [addEventForm, setEvent] = useState({
    network: 1,
    tokenIcon: "",
  });
  const [editEventForm, setEditFormEvent] = useState({
    network: 1,
    tokenIcon: "",
  });

  const onChangeEditForm = (e) => {
    if (e.target.id === "networkedit") {
      setEditFormEvent({
        ...editEventForm,
        network: parseInt(e.target.value),
      });
    } else if (e.target.id === "token_typeedit") {
      setEditFormEvent({
        ...editEventForm,
        token_type: e.target.value,
      });
    } else if (e.target.id === "tokenIconedit") {
      setEditFormEvent({
        ...editEventForm,
        tokenIcon: e.target.value,
      });
    }
  };

  React.useEffect(() => {
    if ($("#addressedit").val().length > 0) getpolygontokennameforEdit();
  }, [
    editEventForm && editEventForm.network,
    editEventForm && editEventForm.token_type,
  ]);

  const onChange = (e) => {
    if (e.target.id === "network") {
      setEvent({
        ...addEventForm,
        network: parseInt(e.target.value),
      });
    } else if (e.target.id === "token_type") {
      setEvent({
        ...addEventForm,
        token_type: e.target.value,
      });
    } else if (e.target.id === "tokenIcon") {
      setEvent({
        ...addEventForm,
        tokenIcon: e.target.value,
      });
    }
  };

  React.useEffect(() => {
    if ($("#address").val().length > 0) getpolygontokenname();
  }, [
    addEventForm && addEventForm.network,
    addEventForm && addEventForm.token_type,
  ]);

  const handleClose = () => setShow(false);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  const abicode = [
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [{ name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_spender", type: "address" },
        { name: "_amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ name: "success", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "creationBlock",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_from", type: "address" },
        { name: "_to", type: "address" },
        { name: "_amount", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ name: "success", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [{ name: "", type: "uint8" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "_newController", type: "address" }],
      name: "changeController",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { name: "_owner", type: "address" },
        { name: "_blockNumber", type: "uint256" },
      ],
      name: "balanceOfAt",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "version",
      outputs: [{ name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_cloneTokenName", type: "string" },
        { name: "_cloneDecimalUnits", type: "uint8" },
        { name: "_cloneTokenSymbol", type: "string" },
        { name: "_snapshotBlock", type: "uint256" },
        { name: "_transfersEnabled", type: "bool" },
      ],
      name: "createCloneToken",
      outputs: [{ name: "", type: "address" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "parentToken",
      outputs: [{ name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_owner", type: "address" },
        { name: "_amount", type: "uint256" },
      ],
      name: "generateTokens",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [{ name: "", type: "string" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [{ name: "_blockNumber", type: "uint256" }],
      name: "totalSupplyAt",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_to", type: "address" },
        { name: "_amount", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ name: "success", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "transfersEnabled",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "parentSnapShotBlock",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_spender", type: "address" },
        { name: "_amount", type: "uint256" },
        { name: "_extraData", type: "bytes" },
      ],
      name: "approveAndCall",
      outputs: [{ name: "success", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        { name: "_owner", type: "address" },
        { name: "_amount", type: "uint256" },
      ],
      name: "destroyTokens",
      outputs: [{ name: "", type: "bool" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        { name: "_owner", type: "address" },
        { name: "_spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ name: "remaining", type: "uint256" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "_token", type: "address" }],
      name: "claimTokens",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "tokenFactory",
      outputs: [{ name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [{ name: "_transfersEnabled", type: "bool" }],
      name: "enableTransfers",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "controller",
      outputs: [{ name: "", type: "address" }],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { name: "_tokenFactory", type: "address" },
        { name: "_parentToken", type: "address" },
        { name: "_parentSnapShotBlock", type: "uint256" },
        { name: "_tokenName", type: "string" },
        { name: "_decimalUnits", type: "uint8" },
        { name: "_tokenSymbol", type: "string" },
        { name: "_transfersEnabled", type: "bool" },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor",
    },
    { payable: true, stateMutability: "payable", type: "fallback" },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_token", type: "address" },
        { indexed: true, name: "_controller", type: "address" },
        { indexed: false, name: "_amount", type: "uint256" },
      ],
      name: "ClaimedTokens",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_from", type: "address" },
        { indexed: true, name: "_to", type: "address" },
        { indexed: false, name: "_amount", type: "uint256" },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_cloneToken", type: "address" },
        { indexed: false, name: "_snapshotBlock", type: "uint256" },
      ],
      name: "NewCloneToken",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: "_owner", type: "address" },
        { indexed: true, name: "_spender", type: "address" },
        { indexed: false, name: "_amount", type: "uint256" },
      ],
      name: "Approval",
      type: "event",
    },
  ];

  const getpolygontokenname = () => {
    fetchTokenDetails(
      addEventForm.network,
      addEventForm.token_type,
      $("#address").val()
    )
      .then((token_details) => {
        console.log("getpolygontokenname", token_details);
        if (!token_details || !token_details.name) {
          setTokenName("");
          setEvent({
            ...addEventForm,
            tokenSymbol: "",
            tokenDecimal: null,
            tokenIcon: "",
          });
        } else {
          setTokenName(token_details.name);
          if (IS_TOKEN(addEventForm.token_type)) {
            setEvent({
              ...addEventForm,
              tokenSymbol: token_details.symbol,
              tokenDecimal: token_details.decimals,
              tokenIcon: "",
            });
            if (token_details.icon) {
              setEvent({
                ...addEventForm,
                tokenSymbol: token_details.symbol,
                tokenDecimal: token_details.decimals,
                tokenIcon: token_details.icon,
              });
            }
          }
        }
      })
      .catch((error) => {
        setTokenName("");
        setEvent({
          ...addEventForm,
          tokenSymbol: "",
          tokenDecimal: "",
          tokenIcon: "",
        });
      });
  };

  const getpolygontokennameforEdit = () => {
    fetchTokenDetails(
      editEventForm.network,
      editEventForm.token_type,
      $("#addressedit").val()
    )
      .then((token_details) => {
        console.log("token_details", token_details);
        if (!token_details || !token_details.name) {
          setEditTokenName("");
          setEditFormEvent({
            ...editEventForm,
            tokenSymbol: "",
            tokenDecimal: null,
            tokenIcon: "",
          });
        } else {
          setEditTokenName(token_details.name);
          if (IS_TOKEN(editEventForm.token_type)) {
            setEditFormEvent({
              ...editEventForm,
              tokenSymbol: token_details.symbol,
              tokenDecimal: token_details.decimals,
              tokenIcon: "",
            });
            if (token_details.icon) {
              setEditFormEvent({
                ...editEventForm,
                tokenSymbol: token_details.symbol,
                tokenDecimal: token_details.decimals,
                tokenIcon: token_details.icon,
              });
            }
          }
        }
      })
      .catch((error) => {
        setEditTokenName("");
        setEditFormEvent({
          ...editEventForm,
          tokenSymbol: "",
          tokenDecimal: "",
          tokenIcon: "",
        });
      });
  };
  const createEvent = () => {
    console.log("balanceRequired");
    const ename = $("#eventName").val();
    const vanueDropdown = $("#vanueDropdown").val();
    const edesc = $("#eventdescription").val();
    const edate = $("#eventDate").val();
    const starttime = $("#startTime").val();
    const endtime = $("#endTime").val();
    const network = $("#network").val();
    const address = $("#address").val();
    const balanceRequired = $("#balanceRequired").val();
    const EventFrequency = $("#EventFrequency").val();
    const eventid = Math.floor(Math.random() * 100000 + 999999);
    const tokenName = $("#tokenname").val();
    const tokenType = $("#token_type").val();

    const tokenData = {
      tokenName: tokenName,
      tokenType: tokenType,
    };

    if (IS_TOKEN(tokenType)) {
      tokenData.tokenSymbol = addEventForm.tokenSymbol;
      tokenData.tokenDecimal = addEventForm.tokenDecimal;
      tokenData.tokenIcon = addEventForm.tokenIcon;
    }
    // const
    if (
      ename !== "" ||
      vanueDropdown !== "" ||
      edesc !== "" ||
      edate !== "" ||
      starttime !== "" ||
      endtime !== ""
    ) {
      var eventData = {
        eventId: eventid,
        eventName: ename,
        venueName: vanueDropdown,
        eventDescription: edesc,
        eventDate: edate,
        eventStartTime: starttime,
        eventEndTime: endtime,
        eventPhoto:
          "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        eventdateCreated: yyyy + "-" + mm + "-" + dd,
        network: network,
        tokenaddress: address,
        balanceRequired: balanceRequired ? balanceRequired : 1,
        EventFrequency: EventFrequency,
        ...tokenData,
      };

      set(ref(db, `events/${ename}`), eventData)
        .then(() => {
          alert("Event Saved Success");
          getEvents();
        })
        .catch((e) => {
          console.error(e);
          alert("Error in event Save");
        });
    } else alert("please fill all fields");
  };

  const getEvents = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `events/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          var events = Object.keys(snapshot.val());
          var dataarray = [];
          for (var i = 0; i < events.length; i++) {
            dataarray.push(snapshot.val()[events[i]]);
          }
          setEventsData(dataarray);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createVanue = () => {
    const addvenuename = $("#addvenuename").val();
    const addvanueaddress = $("#addvanueAddress").val();
    const addvanuegmap = $("#addvanueGmap").val();

    if (addvenuename !== "" || addvanueaddress !== "") {
      var venueData = {
        venueName: addvenuename,
        venueAddress: addvanueaddress,
        venueGmap: addvanuegmap,
        venuedateCreated: yyyy + "-" + mm + "-" + dd,
      };
      set(ref(db, `venues/${addvenuename}`), venueData)
        .then(() => {
          alert("Vanue Saved Success");
          getVanues();
          $("#addvenuename").val("");
          $("#addvanueAddress").val("");
        })
        .catch((e) => {
          alert("Error in Vanue Save", e);
        });
    } else {
      alert("please fill all fields in vanue form");
    }
  };

  const getVanues = () => {
    $("#vanuetable_body").html("");
    $("#vanueDropdown").html("");
    $("#vanueDropdownedit").html("");

    const dbRef = ref(getDatabase());
    get(child(dbRef, `venues/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          var vanues = Object.keys(snapshot.val());

          for (var j = 0; j < vanues.length; j++) {
            $("#vanuetable_body").append(
              `<tr> <td>${j + 1}</td><td>${
                snapshot.val()[vanues[j]].venueName
              }</td><td>${snapshot.val()[vanues[j]].venueAddress}</td> <td>${
                snapshot.val()[vanues[j]].venueGmap
              }</td> </tr>`
            );

            $("#vanueDropdown").append(
              ` <option value="${snapshot.val()[vanues[j]].venueName}">${
                snapshot.val()[vanues[j]].venueName
              }</option>`
            );

            $("#vanueDropdownedit").append(
              ` <option value="${snapshot.val()[vanues[j]].venueName}">${
                snapshot.val()[vanues[j]].venueName
              }</option>`
            );
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editEventShow = (data) => {
    $("#event_edit_div").css("display", "block");
    $("#eventNameedit").val(data.eventName);
    setEditTokenName(data.tokenName);
    setSelectedEventNameFirebase(data.eventName);
    $("#vanueDropdownedit").val(data.venueName);
    $("#eventdescriptionedit").val(data.eventDescription);
    $("#eventDateedit").val(data.eventDate);
    $("#startTimeedit").val(data.eventStartTime);
    $("#endTimeedit").val(data.eventEndTime);
    $("#networkedit").val(data.network);
    $("#token_typeedit").val(data.tokenType);

    $("#addressedit").val(data.tokenaddress);
    $("#EventFrequencyedit").val(data.EventFrequency);
    $("#balanceRequirededit").val(data.balanceRequired);

    setEditFormEvent({
      ...editEventForm,
      network: parseInt(data.network),
      token_type: data.tokenType,
      tokenIcon: data.tokenIcon,
    });

    setShow(true);
  };

  const eventEdit = () => {
    const updatedename = $("#eventNameedit").val();
    const updatedvanue = $("#vanueDropdownedit").val();
    const updatededesc = $("#eventdescriptionedit").val();
    const updatededate = $("#eventDateedit").val();
    const updatedstarttime = $("#startTimeedit").val();
    const updatedendtime = $("#endTimeedit").val();
    const updatenetwork = $("#networkedit").val();
    const updateaddress = $("#addressedit").val();
    const updatebalancerequired = $("#balanceRequirededit").val();
    const updateEventFrequency = $("#EventFrequencyedit").val();

    const tokenName = $("#tokennameedit").val();
    const tokenType = $("#token_typeedit").val();

    const tokenData = {
      tokenName: tokenName,
      tokenType: tokenType,
    };

    if (IS_TOKEN(tokenType)) {
      tokenData.tokenSymbol = editEventForm.tokenSymbol;
      tokenData.tokenDecimal = editEventForm.tokenDecimal;
      tokenData.tokenIcon = editEventForm.tokenIcon;
    }

    console.log("update", tokenData);
    update(ref(db, "events/" + SelectedeventNameFirebase), {
      eventName: updatedename,
      venueName: updatedvanue,
      eventDescription: updatededesc,
      eventDate: updatededate,
      eventStartTime: updatedstarttime,
      eventEndTime: updatedendtime,
      network: updatenetwork,
      tokenaddress: updateaddress,
      balanceRequired: updatebalancerequired,
      EventFrequency: updateEventFrequency,

      ...tokenData,
    })
      .then(() => {
        alert("update success");
        getEvents();
        closeEventEdit();
      })
      .catch((error) => {
        alert("error in update" + error);
      });
  };

  const closeEventEdit = () => {
    $("#event_edit_div").css("display", "none");
  };

  const adminLogout = () => {
    auth
      .signOut()
      .then(() => {
        alert("logout success");
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const geteditTokenName = async () => {
    getpolygontokennameforEdit();
  };

  const adminLogoClicked = () => {
    navigate("/");
  };

  useEffect(() => {
    getEvents();
    getVanues();
  }, []);

  return (
    <>
      <div id="navbarAdmin">
        <div id="navbarAdminChild">
          <div>
            <img
              id="admin_logo_img"
              src={mainlogo}
              height={"40px"}
              onClick={adminLogoClicked}
            ></img>
          </div>
          <div>
            <button id="adminLogoutBtn" onClick={adminLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div id="admin_form_parent">
        <div id="admin_form_child">
          <center>
            <h1>Event Management</h1>
          </center>

          <Tabs
            defaultActiveKey="eventshow"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="eventshow" title="Event List">
              <div className="wallet_info_div">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th> Name</th>
                      <th> Venue</th>
                      <th> Description</th>
                      <th> Date</th>
                      <th> Start Time </th>
                      <th> End Time</th>
                      <th> Created At</th>
                      <th> Balance Required</th>
                      <th> Image</th>
                      <th> Edit </th>
                    </tr>
                  </thead>
                  <tbody id="eventtable_body">
                    {eventslist.map((data, index) => (
                      <>
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td> {data.eventName}</td>
                          <td> {data.venueName}</td>
                          <td> {data.eventDescription}</td>
                          <td> {data.eventDate}</td>
                          <td> {data.eventStartTime}</td>
                          <td> {data.eventEndTime}</td>
                          <td> {data.eventdateCreated}</td>
                          <td>
                            {data.balanceRequired}&nbsp;{data.tokenName}{" "}
                            <DisplaynetworkLogo networkName={data.network} />
                          </td>
                          <td>
                            <img
                              src={data.eventPhoto}
                              style={{ height: "80px", width: "80px" }}
                            />
                          </td>
                          <td>
                            <Button
                              variant="primary"
                              onClick={() => editEventShow(data)}
                            >
                              Edit
                            </Button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </Table>

                {/* Edit Event Page */}
                <div
                  style={{ display: "none", marginTop: "50px" }}
                  id="event_edit_div"
                >
                  <Button
                    variant="danger"
                    onClick={closeEventEdit}
                    className="mb-3"
                  >
                    Close
                  </Button>
                  <div>
                    <Form.Group className="mb-3">
                      <Form.Label>Event Name</Form.Label>
                      <Form.Control
                        type="text"
                        id="eventNameedit"
                        placeholder="Event Name Here"
                      />
                    </Form.Group>

                    <Form.Label>Select Venue</Form.Label>
                    <Form.Select
                      className="mb-3"
                      aria-label="Default select example"
                      id="vanueDropdownedit"
                    ></Form.Select>

                    <Form.Group className="mb-3">
                      <Form.Label>Event Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        id="eventdescriptionedit"
                        placeholder="Description"
                        rows={3}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Event Date</Form.Label>
                      <Form.Control id="eventDateedit" type="date" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Start Time</Form.Label>
                      <Form.Control type="time" id="startTimeedit" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>End Time</Form.Label>
                      <Form.Control type="time" id="endTimeedit" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Event Frequency</Form.Label>
                      <Form.Select
                        className="mb-3"
                        aria-label="Default select example"
                        id="EventFrequencyedit"
                      >
                        <option>Once</option>
                        <option>Year</option>
                        <option>Monthly</option>
                        <option>Weekly</option>
                        <option>Quarterly</option>
                      </Form.Select>
                    </Form.Group>

                    <h4>Settings</h4>
                    <Form.Group className="mb-3">
                      <Form.Label>Network</Form.Label>
                      <Form.Select
                        className="mb-3"
                        aria-label="Default select example"
                        id="networkedit"
                        onChange={onChangeEditForm}
                        // value={editEventForm.network}
                      >
                        {/* <option>Solana</option> */}
                        {Object.entries(NETWORKS).map((item) => {
                          return (
                            <option value={item[0]}>{item[1].name}</option>
                          );
                        })}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Type</Form.Label>
                      <Form.Select
                        className="mb-3"
                        aria-label="Default select example"
                        id="token_typeedit"
                        onChange={onChangeEditForm}
                        vaule={editEventForm.token_type}
                      >
                        <option value={""}>Select Type</option>
                        {Object.entries(OPTIONS_NETWORK_STAD).map((item) => {
                          if (editEventForm && editEventForm.network) {
                            if (
                              item[1].networks.includes(editEventForm.network)
                            ) {
                              return (
                                <option value={item[0]}>{item[1].name}</option>
                              );
                            }
                          }
                        })}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Token Address</Form.Label>
                      <Form.Control
                        type="text"
                        id="addressedit"
                        onChange={geteditTokenName}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Token Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={edittokenName}
                        id="tokennameedit"
                        disabled={edittokenName.length > 0 ? true : false}
                      />
                    </Form.Group>
                    {console.log("editEventForm ", editEventForm)}

                    {IS_TOKEN(editEventForm.token_type) && (
                      <>
                        <Form.Group className="mb-3">
                          <Form.Label>Token Symbol</Form.Label>
                          <Form.Control
                            type="text"
                            disabled={IS_TOKEN(editEventForm.token_type)}
                            id="tokenSymboledit"
                            value={editEventForm.tokenSymbol}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Token Decimal</Form.Label>
                          <Form.Control
                            type="number"
                            disabled={IS_TOKEN(editEventForm.token_type)}
                            id="tokenDecimaledit"
                            value={editEventForm.tokenDecimal}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Token Icon</Form.Label>

                          <div className="d-flex text-center">
                            <img
                              src={editEventForm.tokenIcon}
                              alt={editEventForm.tokenSymbol}
                              className="tokenIcon m-2"
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = "/images/logo.png";
                              }}
                            />
                            <Form.Control
                              onChange={onChangeEditForm}
                              type="text"
                              id="tokenIconedit"
                              value={editEventForm.tokenIcon}
                              className="ml-2"
                            />
                          </div>
                        </Form.Group>
                      </>
                    )}
                    <Form.Group className="mb-3">
                      <Form.Label>Balance Required</Form.Label>
                      <Form.Control
                        type="number"
                        min={1}
                        id="balanceRequirededit"
                      />
                    </Form.Group>

                    <Button variant="primary" onClick={eventEdit}>
                      Update event
                    </Button>
                  </div>

                </div>
              </div>
            </Tab>

            <Tab eventKey="eventadd" title="Add Events">
              <h1>Add Event</h1>
              <Form.Group className="mb-3">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  type="text"
                  id="eventName"
                  placeholder="Event Name Here"
                />
              </Form.Group>

              <Form.Label>Select Venue</Form.Label>
              <Form.Select
                className="mb-3"
                aria-label="Default select example"
                id="vanueDropdown"
              ></Form.Select>

              <Form.Group className="mb-3">
                <Form.Label>Event Description</Form.Label>
                <Form.Control
                  as="textarea"
                  id="eventdescription"
                  placeholder="Description"
                  rows={3}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Event Date</Form.Label>
                <Form.Control id="eventDate" type="date" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Start Time</Form.Label>
                <Form.Control type="time" id="startTime" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>End Time</Form.Label>
                <Form.Control type="time" id="endTime" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Event Frequency</Form.Label>
                <Form.Select
                  className="mb-3"
                  aria-label="Default select example"
                  id="EventFrequency"
                >
                  <option>Once</option>
                  <option>Year</option>
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Quarterly</option>
                </Form.Select>
              </Form.Group>

              <br />
              <h4>Settings</h4>
              {/* settings */}
              <Form.Group className="mb-3">
                <Form.Label>Network</Form.Label>
                <Form.Select
                  className="mb-3"
                  aria-label="Default select example"
                  id="network"
                  onChange={onChange}
                >
                  {Object.entries(NETWORKS).map((item) => {
                    return (
                      <option defaultValue value={item[0]}>
                        {item[1].name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>

              {/* settings */}
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  className="mb-3"
                  aria-label="Default select example"
                  id="token_type"
                  onChange={onChange}
                >
                  <option defaultValue value={""}>
                    Select Type
                  </option>
                  {Object.entries(OPTIONS_NETWORK_STAD).map((item) => {
                    if (addEventForm && addEventForm.network) {
                      if (item[1].networks.includes(addEventForm.network)) {
                        return (
                          <option defaultValue value={item[0]}>
                            {item[1].name}
                          </option>
                        );
                      }
                    }
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Token Address</Form.Label>
                <Form.Control
                  type="text"
                  id="address"
                  onChange={getpolygontokenname}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Token Name</Form.Label>
                <Form.Control
                  type="text"
                  disabled={tokenName.length > 0 ? true : false}
                  value={tokenName}
                  id="tokenname"
                  onChange={setTokenName}
                />
              </Form.Group>

              {IS_TOKEN(addEventForm.token_type) && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Token Symbol</Form.Label>
                    <Form.Control
                      type="text"
                      disabled={IS_TOKEN(addEventForm.token_type)}
                      id="tokenSymbol"
                      value={addEventForm.tokenSymbol}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Token Decimal</Form.Label>
                    <Form.Control
                      type="number"
                      disabled={IS_TOKEN(addEventForm.token_type)}
                      id="tokenDecimal"
                      value={addEventForm.tokenDecimal}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Token Icon</Form.Label>

                    <div className="d-flex text-center">
                      <img
                        src={addEventForm.tokenIcon}
                        alt={addEventForm.tokenSymbol}
                        className="tokenIcon m-2"
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = "/images/logo.png";
                        }}
                      />
                      <Form.Control
                        value={addEventForm.tokenIcon}
                        type="text"
                        id="tokenIcon"
                        onChange={onChange}
                        className="ml-2"
                      />
                    </div>
                  </Form.Group>
                </>
              )}
              <Form.Group className="mb-3">
                <Form.Label>Balance Required</Form.Label>
                <Form.Control
                  disabled={!IS_TOKEN(addEventForm.token_type)}
                  type="number"
                  min={1}
                  id="balanceRequired"
                  defaultValue={1}
                />
              </Form.Group>

              <Button variant="primary" onClick={createEvent}>
                Submit
              </Button>
            </Tab>

            <Tab eventKey="vanueadd" title="Add Venue">
              <h1>Add Venue</h1>
              <Form.Group className="mb-3">
                <Form.Label>Venue Name</Form.Label>
                <Form.Control
                  type="text"
                  id="addvenuename"
                  placeholder="Venue Name Here"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  id="addvanueAddress"
                  placeholder="Address Here"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address Link (Optional)</Form.Label>
                <Form.Control
                  type="text"
                  id="addvanueGmap"
                  placeholder="Add Google map Link Here"
                />
              </Form.Group>

              <Button variant="primary" onClick={createVanue}>
                Submit
              </Button>
            </Tab>

            <Tab eventKey="vanueshow" title="Venue List">
              <h1>Show Venue</h1>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th> Venue Name</th>
                    <th> Venue Address</th>
                    <th> Google Map</th>
                  </tr>
                </thead>
                <tbody id="vanuetable_body"></tbody>
              </Table>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};
export default Admin;
