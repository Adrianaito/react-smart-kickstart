const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

// get the pah of the build folder
const buildPath = path.resolve(__dirname, "build");
// remove the build folder
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");
const output = solc.compile(source, 1).contracts;

// check if directory exists, if not create it
fs.ensureDirSync(buildPath);
// loop over the output object and write each contract to a different file in build folder
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
