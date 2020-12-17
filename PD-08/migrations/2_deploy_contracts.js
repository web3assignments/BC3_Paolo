
var CoronaTest = artifacts.require("CoronaTest");
var TestStreet = artifacts.require("TestStreet");

module.exports = async function(deployer) {

    await deployer.deploy(CoronaTest);
    await deployer.deploy(TestStreet);

    CT = await CoronaTest.deployed();
    TS = await TestStreet.deployed();

    console.log(`CoronaTest deployed at: ${CT.address}`);
    console.log(`TestStreet deployed at: ${TS.address}`);
}