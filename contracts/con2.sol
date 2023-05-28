
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Store {
    string[] public cids;

    function storeCid(string memory _cid) public {
        cids.push(_cid);
    }

    function getCidsLength() public view returns (uint256) {
    return cids.length;
    }

    function getCid(uint256 index) public view returns (string memory) {
        require(index < cids.length, "Index out of range");
        return cids[index];
    }
}