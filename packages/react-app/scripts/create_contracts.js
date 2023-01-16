const fs = require("fs");

if (!fs.existsSync("./src/contracts/deployed_contracts.json")) {
  try {
    fs.writeFileSync("./src/contracts/deployed_contracts.json", JSON.stringify({}));

    console.log("src/contracts/deployed_contracts.json created.");
  } catch (error) {
    console.log(error);
  }
}
