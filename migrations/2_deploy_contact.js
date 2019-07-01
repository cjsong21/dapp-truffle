const MyContract = artifacts.require("./MyContract.sol");
const Coursetro = artifacts.require("./Coursetro.sol");

module.exports = function(deployer) { 
    deployer.deploy(MyContract); 
    deployer.deploy(Coursetro);
}