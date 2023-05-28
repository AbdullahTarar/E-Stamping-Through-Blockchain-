import React, { useState, useEffect } from "react";
import vector from "./Vector.png";
import tick from "./Check_fill.png";
import clock from "./Time.png";
import Web3 from "web3";
import StoreContract from "./Store.json"; // replace with your contract name and path

const provider = new Web3.providers.HttpProvider("http://localhost:7545");
const web3 = new Web3(provider);
const txHash =
  "0xde4f2a2c000a15a6b7459faaa8effddbc29e58fa4f6ae095d54a1596c2ad9ccd";
const contractAddress = "0xedF5c9Dca1E4d7ab65aaC5B8F7Aa73e95D5a840e"; // replace with your deployed contract address
const contract = new web3.eth.Contract(StoreContract.abi, contractAddress);

function InfoRow(props) {
  let icon = null;

  let infoClassName = "";

  if (props.infotitle === "Block") {
    icon = <img className="icon" src={tick} alt="Tick icon" />;
  } else if (props.infotitle === "Timestamp") {
    icon = <img className="icon" src={clock} alt="Clock icon" />;
  } else if (props.infotitle === "Status") {
    if (props.info === "Success") {
      infoClassName = "status-infosuccess";
    } else {
      infoClassName = "status-infopending";
    }
  }
  return (
    <>
      <div className="inforow">
        <div className="wholeinfotitle">
          <img className="vector" src={vector} />
          <p className="infotitle">{props.infotitle}</p>
        </div>
        <span className="info"></span>
        <span>{icon}</span>
        <span className={infoClassName}>{props.info}</span>
      </div>
    </>
  );
}

function VerifyData({ searchText }) {
  const [txInfo, setTxInfo] = useState([]);
  const [Cid, setCId] = useState("");
  // const [idNumber2, setIdNumber2] = useState('');
  // const [stampValue, setStampValue] = useState('');
  // console.log(txInfo);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      // replace with your Ganache node URL
      const latestBlockNumber = await web3.eth.getBlockNumber();
      let allTransactions = [];

      // Iterate through all the blocks starting from block number 0
      for (let i = 0; i <= latestBlockNumber; i++) {
        const block = await web3.eth.getBlock(i);

        if (block && block.transactions.length > 0) {
          const txs = block.transactions;
          const txDetails = await Promise.all(
            txs.map(async (txHash) => {
              const tx = await web3.eth.getTransaction(txHash);
              return {
                hash: tx.hash,
                from: tx.from,
                to: tx.to,
                value: web3.utils.fromWei(tx.value, "ether"),
              };
            })
          );

          allTransactions = allTransactions.concat(txDetails);
        }
      }

      setTransactions(allTransactions);
    }

    fetchTransactions();
  }, []);
  const tx = transactions.find((tx) => tx.hash === searchText);
  var index = transactions.findIndex((tx) => tx.hash === searchText);
  if (index == -1) {
    index = transactions.length - 1;
  }

  console.log(index);
  if (tx) {
    web3.eth
      .getTransactionReceipt(tx.hash)
      .then((receipt) => {
        const blockNumber = receipt.blockNumber;
        var status;
        if (receipt.status == true) {
          status = "Success";
        } else {
          status = "Pending";
        }

        const block = web3.eth.getBlock(blockNumber);

        contract.methods
          .getCid(index - 1)
          .call()
          .then((result) => {
            const id1 = result;
            setCId(id1);
          })
          .catch((error) => {
            console.error(error);
          });

        web3.eth.getBlock(blockNumber, (error, block) => {
          const timestamp = block.timestamp;
          // console.log(`timestamp//: ${timestamp}`);
          var contentlink = "https://ipfs.io/ipfs/" + Cid;
          // console.log(contentlink);

          var date = new Date(timestamp * 1000);
          date = date.toUTCString();
          setTxInfo([blockNumber, status, date, Cid, contentlink]);

          // here you go
        });
      })
      .catch((error) => {
        console.error(error);
      });

    return (
      <>
        <div className="stampinfo">
          <div className="line"></div>
          <InfoRow infotitle="Stamp ID" info={tx.hash} />
          <InfoRow infotitle="Status" info={txInfo[1]} />
          <InfoRow infotitle="Block" info={txInfo[0]} />
          <InfoRow infotitle="Timestamp" info={txInfo[2]} />
          <div className="line"></div>
          <InfoRow infotitle="CID" info={txInfo[3]} />
          <div className="line"></div>
          <InfoRow infotitle="Address:" info={tx.from} />
          <InfoRow
            infotitle="Content"
            info=<a className="rowitem" href={txInfo[4]}>
              {" "}
              Click here to see Stamp Content
            </a>
          />
          <div className="line"></div>
        </div>
      </>
    );
  } else {
    return null;
  }
}

export default VerifyData;
