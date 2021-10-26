var TodoFactory = artifacts.require("./TodoFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(TodoFactory);
};
