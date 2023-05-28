import React, { useState, useEffect } from "react";
import Web3 from "web3";
import SearchAppBar from "./SearchAppBar";
import Licensepicture from "./Rectangle 2.png";

function TableHead() {
  return (
    <div className="tablehead">
      <h5>No.</h5>
      <h5 className="rowitem">Hash</h5>
      {/* <h5>To </h5>
      <h5>From</h5> */}
    </div>
  );
}

function TableRow(props) {
  return (
    <div className="tablerow">
      <span>{props.Id}</span>
      <span className="rowitem">{props.Hash}</span>
      {/* <span className="rowitem">{props.from}</span>
      <span className="rowitem">{props.to}</span> */}
    </div>
  );
}

function Page(props) {
  const rev = props.transactions.reverse();
  return (
    <>
      {rev.map((tx, index) => (
        <TableRow
          key={index}
          Id={index + 1}
          Hash={tx.hash}
          //   from={tx.from}
          //   to={tx.to}
        />
      ))}
    </>
  );
}

function LicenseDiv() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      const web3 = new Web3("http://localhost:7545"); // replace with your Ganache node URL
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

  //   return (
  //     <div>
  //       <table>
  //         <thead>
  //           <tr>
  //             <th>Hash</th>
  //             <th>From</th>
  //             <th>To</th>
  //             <th>Value</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //                    {" "}
  //           {transactions.map((tx) => (
  //             <tr key={tx.hash}>
  //               <td>{tx.hash}</td>
  //               <td> </td>
  //               <td>{tx.from}</td>
  //               <td> </td>
  //               <td>{tx.to}</td>
  //               <td> </td>
  //               <td>{tx.value}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  return (
    <div className="outerdiv">
      <SearchAppBar />
      <TableHead />
      <Page transactions={transactions.slice(-10)} />
    </div>
  );
}

export default LicenseDiv;
