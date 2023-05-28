const MyContract = artifacts.require("Store");

module.exports = function(deployer) {
  deployer.deploy(MyContract);
};