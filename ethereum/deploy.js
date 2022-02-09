const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  "bid dignity flavor explain choose review junior replace bullet always another urge",
  "https://rinkeby.infura.io/v3/44788ccbfc184aba9f6d8b6ec2564e9e"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);
  // Pass the abi to the contract object
  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    // Assign the bytecode to the data property of the deploy method
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  // Call provider.engine.stop() to prevent deployment from hanging in the terminal
  provider.engine.stop();
};
deploy();
