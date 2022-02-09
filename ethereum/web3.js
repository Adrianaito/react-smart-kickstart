// creates a new instance of web3 and handles the case where the user has not metamask
// or the case we're on the server
import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/44788ccbfc184aba9f6d8b6ec2564e9e"
  );
  web3 = new Web3(provider);
}

export default web3;
