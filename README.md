# E-Stamping through Blockchain

This project aims to implement E-Stamping using Blockchain technology. It provides a decentralized and tamper-proof platform for stamping digital documents and verifying their authenticity.

## Technologies Used

- Front-end: React
- Smart Contract Language: Solidity
- Development Framework: Truffle
- Blockchain Network: Ganache
- Wallet Integration: MetaMask
- Decentralized Storage: IPFS

## Prerequisites

Before running the project, ensure that you have the following installed:

- Node.js
- Truffle (`npm install -g truffle`)
- Ganache (https://www.trufflesuite.com/ganache)
- MetaMask browser extension (https://metamask.io/)
- IPFS (https://ipfs.io/)

## Setup

1. Clone the repository:

   ```bash
   https://github.com/AbdullahTarar/E-Stamping-Through-Blockchain-
   cd e-stamping
2. Install the dependencies:
   ```bash
    npm install
3. Start Ganache and configure MetaMask:
    -  Open Ganache and create a new workspace.
    -    In the Truffle project directory, update the truffle-config.js file with the network configurations.
    -   Import an account from Ganache into MetaMask using the seed phrase.
    -    Connect MetaMask to Ganache by adding a network manually. Use the following details:
    -    Network Name: Ganache
    -    New RPC URL: http://localhost:7545
    -    Chain ID: 1337


4. Start the IPFS daemon:
    -   Install IPFS by following the instructions at https://ipfs.io/docs/install/.
        Run the IPFS daemon:
        ```bash
        ipfs daemon
5. Compile and deploy the smart contract:
   ```bash
    truffle compile
    truffle migrate --network ganache
5. Start the React development server:
   ```bash
   npm run start
Access the application in your browser at http://localhost:3000.
# Usage
- Connect MetaMask to the Ganache network.
- Use the web interface to perform E-Stamping of digital documents.
- Verify the authenticity of stamped documents by checking the blockchain records.
