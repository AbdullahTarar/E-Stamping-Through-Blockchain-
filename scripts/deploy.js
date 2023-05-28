const fs = require("fs");
const { ethers } = require("ethers");

async function main() {
  // Set up provider and signer
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8544");
  const privateKey = "0xb5e966b29e9e03ed0d920784bcd41b1c93661cd9df579992c6adc5ff9bd178f9";
  const signer = new ethers.Wallet(privateKey, provider);

  // Read the compiled contract code
  const contractCode = fs.readFileSync("./artifacts/contracts/dummy.sol/DummyContract.json");

  // Parse the contract JSON ABI and bytecode
  const parsedContract = JSON.parse(contractCode);
  const abi = parsedContract.abi;
  const bytecode = parsedContract.bytecode;

  // Deploy the contract
  const factory = new ethers.ContractFactory(abi, bytecode, signer);
  const contract = await factory.deploy();
  await contract.deployed();

  console.log("Contract deployed to address:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});