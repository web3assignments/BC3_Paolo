// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

import './Patient.sol';

contract CoronaTest {
    
    constructor () {}
    
    function coronaTest(Patient memory _patient) public pure returns (bool result){
        Patient memory P = _patient;
        if (P.patientAge >= 18 && P.hasFever == true) {
            return true;
        } else {
            return false;
        }
    }
}
