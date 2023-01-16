const { expect, assert } = require("chai");
const truffleAssert = require('truffle-assertions');

const YourContract = artifacts.require("YourContract");

contract("My Dapp", function () {
  let myContract;
  // quick fix to let gas reporter fetch data from gas station & coinmarketcap
  before((done) => {
    setTimeout(done, 2000);
  });

  contract("YourContract", function () {
    it("Should deploy YourContract", async function () {
      myContract = await YourContract.deployed();
    });

    contract("setPurpose()", function () {
      it("Should be able to set a new purpose", async function () {
        const newPurpose = "Test Purpose";

        await myContract.setPurpose(newPurpose);
        expect(await myContract.purpose()).to.equal(newPurpose);
      });

      it("Should emit a SetPurpose event ", async function () {
        const newPurpose = "Another Test Purpose";
        truffleAssert.eventEmitted(await myContract.setPurpose(newPurpose), "SetPurpose");
      });
    });
  });
});
