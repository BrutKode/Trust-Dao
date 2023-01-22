import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";
import { SyncOutlined } from "@ant-design/icons";

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
    "font-size": "x-large",
    margin: "0px",
    padding: "0px",
    display: "flex",
  };

  const myBox = {
    marginTop: 64,
    border: "1px solid rgba(255,255,255,0.1)",
    "border-radius": "30px",
    padding: "5px",
    margin: "10px",
    background: "rgba(100, 100, 255, 0.1)",
  };

  return (
    <div style={myStyle}>
      {/*
         ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
       */}
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
          <Input style={{ width: "500px" }} addonBefore="Developer Address" disabled="true" value={user} />
        </div>
        <Divider style={{ border: "0px" }} />
        <Button
          style={{ marginTop: 8 }}
          onClick={async () => {
            /* look how you call setPurpose on your contract: */
            /* notice how you pass a call back for tx updates too */
            const result = tx(writeContracts.Trust.returnUserDev(user), update => {
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
          Check Developer!
        </Button>
      </div>
    </div>
  );
}
