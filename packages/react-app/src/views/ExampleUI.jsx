import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";
import { SyncOutlined } from "@ant-design/icons";

import Typewriter from "typewriter-effect";

import { Address, Balance, Events } from "../components";

export default function ExampleUI({
  purpose,
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
}) {
  const [developer, setDeveloper] = useState("loading...");
  const [amount, setAmount] = useState("loading...");
  const [user, setUser] = useState("loading...");

  const myStyle = {
    margin: "auto",
    "font-size": "x-large",
    display: "flex",
    "flex-direction": "column",
    "max-width": "650px",
    "justify-content": "center",
    "align-items": "center",
  };

  const myBox = {
    marginTop: 64,
    border: "1px solid rgba(255,255,255,0.1)",
    "border-radius": "30px",
    padding: "5px",
    margin: "10px",
    background: "linear-gradient(rgba(0, 255, 255, 0.3), rgba(100, 0, 255, 0.2))",
  };

  const myFont = {
    "margin-top": "20px",
    "font-family": "monospace",
    "font-size": "xxx-large",
  };

  return (
    <>
      <h1 style={myFont}>
        <strong>
          <Typewriter
            options={{
              strings: ["Welcome to the Trust DAO!", "A DAO which is trustworthy"],
              autoStart: true,
              loop: true,
            }}
          />
        </strong>
      </h1>
      <h3>
        Join Us by hiring your first developer, <br /> Pay for the work they are executing and have no worries, <br />{" "}
        Trust us and we will provide you with your requirements!
      </h3>
      <Divider />
      {/*
         ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
       */}
      <div style={myStyle}>
        <div style={myBox}>
          <h2>Hire a Developer!</h2>
          <h4>
            Your Address: <Address address={address} ensProvider={mainnetProvider} fontSize={16} />
          </h4>
          <Divider />
          <div style={{ margin: 8 }}>
            <Input
              style={{ width: "500px" }}
              addonBefore="Developer Address"
              onChange={e => {
                setDeveloper(e.target.value);
              }}
            />
            <Divider style={{ border: "0px" }} />
            <Input
              style={{ width: "500px" }}
              addonBefore="Amount"
              onChange={e => {
                setAmount(e.target.value);
              }}
            />
            <Divider style={{ border: "0px" }} />
            <Button
              style={{ marginTop: 8 }}
              onClick={async () => {
                /* look how you call setPurpose on your contract: */
                /* notice how you pass a call back for tx updates too */
                const result = tx(writeContracts.Trust.payForWork(developer, amount), update => {
                  console.log("📡 Transaction Update:", update);
                  if (update && (update.status === "confirmed" || update.status === 1)) {
                    console.log(" 🍾 Transaction " + update.hash + " finished!");
                    console.log(
                      " ⛽️ " +
                        update.gasUsed +
                        "/" +
                        (update.gasLimit || update.gas) +
                        " @ " +
                        parseFloat(update.gasPrice) / 1000000000 +
                        " gwei",
                    );
                  }
                });
                console.log("awaiting metamask/web3 confirm result...", result);
                console.log(await result);
              }}
            >
              Hire Developer!
            </Button>
          </div>
        </div>
        <div style={myBox}>
          <h2>Check Assigned Developer!</h2>
          <h4>
            Your Address: <Address address={address} ensProvider={mainnetProvider} fontSize={16} />
          </h4>
          <Divider />
          <div style={{ margin: 8 }}>
            <Input
              style={{ width: "500px" }}
              addonBefore="User Address"
              onChange={e => {
                setUser(e.target.value);
              }}
            />
            <Divider style={{ border: "0px" }} />
            <Input style={{ width: "500px" }} addonBefore="Developer Address" disabled="true" value={developer} />
          </div>
          <Divider style={{ border: "0px" }} />
          <Button
            style={{ marginTop: 8 }}
            onClick={async () => {
              /* look how you call setPurpose on your contract: */
              /* notice how you pass a call back for tx updates too */
              const result = readContracts.Trust.returnUserDev(user);
              console.log("awaiting metamask/web3 confirm result...", result);
              console.log(await result);
              setDeveloper(await result);
            }}
          >
            Check Developer!
          </Button>
        </div>
      </div>
    </>
  );
}
