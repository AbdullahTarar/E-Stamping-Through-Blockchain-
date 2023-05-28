import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import Stamp from './Stamp.js'
import { Link } from 'react-router-dom';

function MetamaskIntegration({ onAccountChange }) {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  async function connectWallet() {
    try {
      const provider = await detectEthereumProvider();
      if (provider) {
        await provider.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        console.log(accounts.length);
        console.log(accounts);
        setAccount(accounts[0]);
        const balance = await web3.eth.getBalance(accounts[0]);
        setBalance(web3.utils.fromWei(balance));
        setConnected(true);
      } else {
        alert('Please install Metamask to use this dApp.');
      }
    } catch (error) {
      alert('An error occurred while connecting to the wallet.');
      console.error(error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (connected) {
        const provider = await detectEthereumProvider();
        if (provider) {
          provider.on('accountsChanged', function (accounts) {
            setAccount(accounts[0]);
            onAccountChange(accounts[0]);
          });
          provider.on('chainChanged', function (chainId) {
            window.location.reload();
          });
        }
      }
    }
    fetchData();
  }, [connected]);

  return (
    <div>
      <h1>Metamask Wallet Integration</h1>
      <button onClick={connectWallet}>Connect to Metamask</button>
      {connected && (
        <div>
          <p>Connected to account: {account}</p>
          <p>Balance: {balance} ETH</p>
          <Link to={`/WriteStamp/${account}`}>Go to Write Stamp </Link>
          </div>
         
      )}
    </div>
  );
}

const Issue = () => {
  const [account, setAccount] = useState(null);

  const handleAccountChange = (newAccount) => {
    setAccount(newAccount);
  };

  return (
    <div className="Container">
      <div className="py-4">
        <MetamaskIntegration onAccountChange={handleAccountChange} />
      </div>
    </div>
  );
};

export default Issue;