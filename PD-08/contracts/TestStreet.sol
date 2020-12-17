// SPDX-License-Identifier: MIT
pragma solidity 0.7.0;
pragma experimental ABIEncoderV2;
import './provableAPI.sol';
import './Patient.sol';
import './CoronaTest.sol';

contract TestStreet is usingProvable{
    event newPatient(uint id, string name, bool hasFever, address _address);
    event testResult(bool hasCorona, string name);
    mapping (address => Patient) addressToPatient;
    mapping(uint => address) patientToOwner; 
    mapping (address => uint) patientLookup;
    Patient[] patients;
    CoronaTest CT;
      
   bytes public infectedNumber;
   uint256 public priceOfUrl;
      
    constructor() payable{
    CT = new CoronaTest();
    }
       
   function createPatient(string memory _patientName, uint _patientAge, bool _hasFever) public {
   require(_patientAge >= 0, "invalid Age"); 
   Patient memory p = addressToPatient[msg.sender];
   p.patientName = _patientName;
   p.patientAge =_patientAge;
   p.hasFever = _hasFever;
   patients.push(p);
   uint id = patients.length -1;
   patientToOwner[id] = msg.sender;
   emit newPatient(id, _patientName, _hasFever, msg.sender); 
}

   function testPatient() public {
    Patient memory p = getPatient();
     testPatient(p);
    }

   function testPatient(Patient memory _patient) internal returns (bool result) {
        require((patients.length > 0), "No patient available for lookup.");
        emit testResult(CT.coronaTest(_patient), _patient.patientName);
        return CT.coronaTest(_patient);
    }

     function getPatients() view public returns(Patient[] memory) {
       require((patients.length > 0), "No patients available for lookup.");
        return patients;
    }

     function getPatient() public view returns (Patient memory) {
        require((patients.length > 0), "No patient available for lookup."); 
        return patients[patientLookup[msg.sender]];
    }
    
      function __callback(bytes32, /* myid prevent warning*/string memory result) public override {
        if (msg.sender != provable_cbAddress()) revert();
        infectedNumber = bytes(result);
    }

    function getInfectedNumber()public view returns(bytes memory){
        return infectedNumber;
    }

    function getInfected() public payable {
        priceOfUrl = provable_getPrice("URL");
        require(    
            address(this).balance >= priceOfUrl,"please add some ETH to cover for the query fee");
        provable_query(
            "URL",
            "json(https://api.apify.com/v2/key-value-stores/vqnEUe7VtKNMqGqFF/records/LATEST?disableRedirect=true).infectedByRegion[0].infectedCount"
        );
    }
    function getInfectedNumberUint() public view returns (uint) {
        return convertToUint(infectedNumber);
    }

    function convertToUint(bytes memory input) public pure returns (uint) { 
        uint res=0;
        for (uint i=0;i<input.length;i++) 
        res = (res<<8) + uint(uint8(input[i]));
        return res;
    }
}