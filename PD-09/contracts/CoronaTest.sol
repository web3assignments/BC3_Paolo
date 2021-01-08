// SPDX-License-Identifier: MIT
/// Based on https://solidity.readthedocs.io/en/develop/natspec-format.html
pragma solidity 0.8.0;
import "./Patient.sol";
import "./Initializable.sol";

/// @title Logic of a Covid-19 test
/// @author P. Sanchez github@17038634

contract CoronaTest is Initializable {
    function initialize() public initializer {}

    /// @dev Logic of the function to test a patient
    function coronaTest(Patient memory _patient)
        public
        pure
        returns (bool result)
    {
        require(
            keccak256(abi.encodePacked(_patient.patientName)) !=
                keccak256(abi.encodePacked("")),
            "Patient not found"
        );
        if (_patient.patientAge >= 18 && _patient.hasFever == true) {
            return true;
        } else {
            return false;
        }
    }
}
