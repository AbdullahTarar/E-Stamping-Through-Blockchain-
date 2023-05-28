import React, { useState } from "react";
import {create } from 'ipfs-http-client';
import "./stamp.css";
import Web3 from "web3";
import { Link } from 'react-router-dom';
import StoreContract from "./Store.json";; // replace with your contract name and path
const contractAddress = "0xedF5c9Dca1E4d7ab65aaC5B8F7Aa73e95D5a840e"; // replace with your deployed contract address
const web3 = new Web3("http://localhost:7545");
const contract = new web3.eth.Contract(StoreContract.abi, contractAddress);

const Stamp = () => {
  const acc = window.location.pathname.split('/')[2];
  console.log(acc);


  const [name1, setName1] = useState("");
  const [idNumber1, setIdNumber1] = useState("");
  const [name2, setName2] = useState("");
  const [idNumber2, setIdNumber2] = useState("");
  const [stampValue, setStampValue] = useState("");
  const [stampPurpose, setStampPurpose] = useState("");
  const [stampContent, setStampContent] = useState("");
  

  const ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' });
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(typeof(idNumber1), typeof(idNumber1),typeof(stampValue) ,typeof(stampContent));
  
    // Create a JSON object with the form data
    const formData = {
      name1,
      idNumber1,
      name2,
      idNumber2,
      stampValue,
      stampPurpose,
      stampContent
    };
  
    // Convert the JSON object to a string
    const formDataString = JSON.stringify(formData);
    // console.log(`Form Data from frontend ${formDataString}`)
    // Add the form data to IPFS
    const result = await ipfs.add(formDataString);
  
    // Get the CID (content identifier) of the added data
    const cid = result.cid.toString();
    // console.log(cid);
  
    console.log(`The account sent from Metamask : ${acc}`)
    // Store the CID on the blockchain
     await contract.methods.storeCid(cid).send({ from: acc, gas: 1000000 });
    alert("The stamp has been submitted successfully !")

    // Get the CID of the form data from the blockchain
   // Get the CID of the form data from the blockchain
const ciid = await contract.methods.getCid(0).call();

// Get the form data from IPFS
// console.log(`CIID:  ${ciid}`);
let asyncitr = ipfs.cat(ciid)
let chunks=[];
for await (const itr of asyncitr) {
  chunks.push(itr)
}
const concatenated = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
let offset = 0;
for (const chunk of chunks) {
  concatenated.set(chunk, offset);
  offset += chunk.length;
}
const decoder = new TextDecoder('utf-8');
const st = decoder.decode(concatenated);
// console.log(st);
  };





  return (
    
  
    <div className="stamp-container">
      <form onSubmit={handleSubmit} className="stamp-form">
      <div className="personalinfo">
      
      <div className="party">
          <h1>Party1</h1>
          <label>
              Name:
              <input
                className="formpersonalinput"
                type="text"
                value={name1}
                onChange={(event) => setName1(event.target.value)}
              />
            </label>
            <label>
              ID Card Number:
              <input
                className="formpersonalinput"
                type="text"
                value={idNumber1}
                onChange={(event) => setIdNumber1(event.target.value)}
              />
            </label>
      </div>
      <div className="formline"></div>
      <div className="party">
            <h1>Party2</h1>
            <label>
                Name:
                <input
                  className="formpersonalinput"
                  type="text"
                  value={name2}
                  onChange={(event) => setName2(event.target.value)}
                />
              </label>
              <label>
                ID Card Number:
                <input
                  className="formpersonalinput"
                  type="text"
                  value={idNumber2}
                  onChange={(event) => setIdNumber2(event.target.value)}
                />
              </label>
      </div>
      </div>
        
        <label>
          Stamp Value:
          <input
            type="text"
            value={stampValue}
            onChange={(event) => setStampValue(event.target.value)}
          />
        </label>
        <label>
          Stamp Purpose:
          <input
            type="text"
            value={stampPurpose}
            onChange={(event) => setStampPurpose(event.target.value)}
          />
        </label>
        <label>
          Stamp Content:
          <textarea
            value={stampContent}
            onChange={(event) => setStampContent(event.target.value)}
            className="contentinput"
            rows="5"
            cols="50"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Stamp;
