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

  // mumbai
  // "0x4fA71491131f47810C34F27820c6155F6B7cc16F"

  // rinkeby
  "0x2b075EE2d95Bd9CBcAdAD283FDCbd0d08FDFEEEc"
);

export default contractInstance;
