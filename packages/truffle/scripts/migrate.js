const { execSync } = require("child_process");
const args = " " + process.argv.slice(2).join(" ");
const execOption = { stdio: "inherit" };

const main = async () => {
  // get network from command line arguments; set to localhost if not passed
  let migrateCommand;
  // put together cmd for migrate
  const formatArgs = args.includes("network") ? args : "--network localhost";

  if (args.includes("network")) {
    migrateCommand = 'truffle migrate' + args;
  } else {
    migrateCommand = 'truffle migrate' + args + ' --network localhost';
  }
  // run migrate command
  execSync(migrateCommand, execOption);

  // format properly for scaffold-eth using same network
  let formatCommand;
  formatCommand = 'node scripts/scaffoldFormat.js ' + formatArgs;

  // run format command
  execSync(formatCommand, execOption);
}
main();
