import React, { useState } from 'react';
import blockimg from './block.jpg'
import issueimg from './issued 2.jpg'
import approvedimg from './approved 3.jpg'
import vendorimg from './vendor 5.png'
import Web3 from "web3";
import StoreContract from "./Store.json";; // replace with your contract name and path

const contractAddress = "0xedF5c9Dca1E4d7ab65aaC5B8F7Aa73e95D5a840e"; // replace with your deployed contract address
const web3 = new Web3("http://localhost:7545");
const contract = new web3.eth.Contract(StoreContract.abi, contractAddress);


function Card(props) {
    console.log(props);
  return (
           <div >
           
           <div className='card_style'>
             <h2 className='card_title'>{props.title}</h2>
             <h6 className="card_text">{props.card_text}</h6>
              <h1 className="card_no">{props.cout_title}</h1>
              <h1 className="card_no">{props.count}</h1>
             <img className='card_img' src={props.imgsrc}/>
           </div>
             
             <div className='footer'>.</div>

           </div>
           
      
  )
}

function CardPlate(){
  const [totalblocks, settotalblocks] = useState(null);
  const [noCid, setnoCId] = useState(null);
  web3.eth.getBlockNumber((err, blockNumber) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Current block number: ${blockNumber}`);
      settotalblocks(blockNumber);
      
    }
  });
  contract.methods.getCidsLength().call().then((result) => {
    const id1  = result;
    setnoCId(id1);
 
  }).catch((error) => {
    console.error(error);
  });
  
    return(
        
        <div >
           <h1 className='Status'>Current Status</h1>
           <div className='CardPLate'>
           <Card title="Current Block" card_text="This is the current block in which the new approved stamps are being added" cout_title="Block No:" count={totalblocks} imgsrc= {blockimg} />
            <Card title="Issued Stamps" card_text="This is the total number of issued stamps that we have issued from the system" cout_title="Total No:" count={noCid} imgsrc= {issueimg} />
            <Card title="Approved stamps" card_text="This is the total number of approved stamps that we have stored in the system" cout_title="Total No:" count={noCid} imgsrc= {approvedimg} />
            <Card title="Vendor Count" card_text="This is the total number of vendors that are registered to provide services" cout_title="Vendors:" count="2000" imgsrc= {vendorimg} />
           </div>
            
            
        </div>
    )
}

export default CardPlate