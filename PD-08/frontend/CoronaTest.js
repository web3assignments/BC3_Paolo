contract_address = "0x6fa2fbCE2B12513D78F3Dbb821362cD42cA3a8F4";
const abi = [
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor",
		"payable": true
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
		"inputs": [],
		"name": "infectedNumber",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [],
		"name": "priceOfUrl",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
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
		"name": "testPatient",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"type": "function",
		"constant": true
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
		"type": "function",
		"constant": true
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "result",
				"type": "string"
			}
		],
		"name": "__callback",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_myid",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "_result",
				"type": "string"
			},
			{
				"internalType": "bytes",
				"name": "_proof",
				"type": "bytes"
			}
		],
		"name": "__callback",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getInfectedNumber",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [],
		"name": "getInfected",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function",
		"payable": true
	},
	{
		"inputs": [],
		"name": "getInfectedNumberUint",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "input",
				"type": "bytes"
			}
		],
		"name": "convertToUint",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function",
		"constant": true
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
	contract.methods.createPatient(patientName, patientAge, hasFever).send({ from: accounts[0] }).then(x => console.log(x));

}
//testen oracle PD8
async function getInfected() {
	contract.methods.getInfected().send({ from: accounts[0] }).then(x => { console.log(x); return x });
}
async function getInfectedNumber() {
	var infectedNumber = await contract.methods.getInfectedNumber().call().then(x => { console.log(x); return x });
}

async function getInfectedNumberUint() {
	var getInfectedNumberUint = await contract.methods.getInfectedNumberUint().call().then(x => { console.log(x); return x });
	var infectedNumber = await contract.methods.getInfectedNumber().call().then(x => { console.log(x); return x });
	document.getElementById('OracleCorona').innerText = infectedNumber;
	document.getElementById('getInfectedNumberUint').innerText = getInfectedNumberUint;
}