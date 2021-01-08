// // PD-9 OpenZeppelin Upgrade

// var CoronaTest = artifacts.require("CoronaTest");
// var TestStreet = artifacts.require("TestStreet");
// var { deployProxy } = require('@openzeppelin/truffle-upgrades');


// //!PD-9 selfdestruct error: https://zpl.in/upgrades/error-003 
// // unsafeAllowCustomTypes is needed because contracts use structs: https://docs.openzeppelin.com/upgrades-plugins/1.x/api-truffle-upgrades 
// module.exports = async function (deployer) {
//     const CoronaTestContract = await deployProxy(CoronaTest, { deployer, unsafeAllowCustomTypes: true });
//     const TestStreetContract = await deployProxy(TestStreet, { deployer, unsafeAllowCustomTypes: true });

//     console.log(`CoronaTest deployed at: ${CoronaTestContract.address}`);
//     console.log(`TestStreet deployed at: ${TestStreetContract.address}`);
// }

var CoronaTest = artifacts.require("CoronaTest");
var TestStreet = artifacts.require("TestStreet");

module.exports = async function (deployer) {

    await deployer.deploy(CoronaTest);
    await deployer.deploy(TestStreet);

    CT = await CoronaTest.deployed();
    TS = await TestStreet.deployed();

    console.log(`CoronaTest deployed at: ${CT.address}`);
    console.log(`TestStreet deployed at: ${TS.address}`);
}