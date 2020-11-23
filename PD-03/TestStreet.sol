// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import './Patient.sol';
import './CoronaTest.sol';

contract TestStreet {
    
    event newPatient(uint id, string name, bool hasCorona);
    
    Patient[] patients;
    CoronaTest CT;
      
    constructor () {
    CT = new CoronaTest();
    }
    
    function createPatient(string memory _name, uint _patientAge, bool hasFever) public {
    require(_patientAge >= 0, "invalid Age");    
    patients.push(Patient(_name, hasFever, _patientAge ));
    uint patientId = patients.length -1;
    emit newPatient(patientId, _name, testPatient(patients[patientId]));
    }

    function testPatient(Patient memory _patient) private view returns (bool result) {
        return CT.coronaTest(_patient);
    }
}
