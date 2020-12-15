// SPDX-License-Identifier: MIT
pragma solidity 0.7.0;
pragma experimental ABIEncoderV2;

import './Patient.sol';
import './CoronaTest.sol';

contract TestStreet {
    
    event newPatient(uint id, string name, bool hasFever, address _address);
    event testResult(bool hasCorona, string name);
    mapping (address => Patient) addressToPatient;
    mapping(uint => address) patientToOwner; 
    mapping (address => uint) patientLookup;
    Patient[] patients;
    CoronaTest CT;
      
    constructor () {
    CT = new CoronaTest();
    }
    
 /*  function createPatient(string memory _name, uint _patientAge, bool hasFever) public {
    require(_patientAge >= 0, "invalid Age");    
    patients.push(Patient(_name, hasFever, _patientAge ));
    uint patientId = patients.length -1;
    emit newPatient(patientId, _name, testPatient(patients[patientId]));
    }*/
    
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
    
}