contract_address ="0xFCD530FDf6D77BD7D070152b414dA01104E5DAbe";
const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "hasFever",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "newPatient",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "hasCorona",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "testResult",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_patientName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_patientAge",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_hasFever",
				"type": "bool"
			}
		],
		"name": "createPatient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPatient",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "patientName",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "hasFever",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "patientAge",
						"type": "uint256"
					}
				],
				"internalType": "struct Patient",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPatients",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "patientName",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "hasFever",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "patientAge",
						"type": "uint256"
					}
				],
				"internalType": "struct Patient[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "testPatient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

var contract;
var accounts;

// Function from web3examples. responsible for loading the provider.
async function asyncloaded() {
    web3 = new Web3(Web3.givenProvider); // provider from metamask      
    var result = await web3.eth.requestAccounts().catch(x => console.log(x.message));
    console.log(`web3 is present: ${web3.version}`); // note: use ` (back quote)
    const network = await web3.eth.net.getId().catch((reason) => console.log(`Cannnot find network ${reason}`));
    if (typeof network === 'undefined' || network != 4) { console.log("Please select Rinkeby test network"); return; }
    console.log("Ethereum network: Rinkeby")
    accounts = await web3.eth.getAccounts();
    console.log(accounts[0]); // show current user.
    contract = new web3.eth.Contract(abi, contract_address);
}
window.addEventListener('load', asyncloaded);       

// Contract functions:
function createPatient() {
    var patientName = document.getElementById('patientName').value;
	var hasFever = document.getElementById('hasFever').value;
	var patientAge = document.getElementById('patientAge').value;
    contract.methods.createPatient(patientName,patientAge,hasFever).send({from: accounts[0]}).then(x => console.log(x));
}