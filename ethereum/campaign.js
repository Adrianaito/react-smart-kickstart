// creates a instance of factory contract so we can import it in any other location
// and have access to the deployed factory contract
import web3 from "./web3";

// import the compiled contract
import Campaign from "./build/Campaign.json";

// create a contract instance
export default (address) => {
  return new web3.eth.Contract(
    // pass the abi of the contract
    JSON.parse(Campaign.interface),
    // pass the address of the contract
    address
  );
};
