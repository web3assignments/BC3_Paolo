// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;
pragma experimental ABIEncoderV2;

import './Patient.sol';

contract CoronaTest {
    
    constructor () {}
    
    function coronaTest(Patient memory _patient) public pure returns (bool result){
      require(keccak256(abi.encodePacked(_patient.patientName)) != keccak256(abi.encodePacked('')), "Patient not found");
        if (_patient.patientAge >= 18 && _patient.hasFever == true) {
            return true;
        } else {
            return false;
        }
    }
}
