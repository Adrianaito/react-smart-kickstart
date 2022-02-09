// creates a instance of factory contract so we can import it in any other location
// and have access to the deployed factory contract
import web3 from "./web3";

// import the compiled contract
import CampaignFactory from "./build/CampaignFactory.json";

// create a contract instance
const contractInstance = new web3.eth.Contract(
  // pass the abi of the contract
  JSON.parse(CampaignFactory.interface),
  // pass the address of the contract
  "0x2fc6cD14BAdb4d9bC6C271F0bCfa9CBb91c35322"
);

export default contractInstance;
