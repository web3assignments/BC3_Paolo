// SPDX-License-Identifier: MIT
/// Based on https://solidity.readthedocs.io/en/develop/natspec-format.html
pragma solidity 0.8.0;

/// @title A Covid-19 teststreet simulator for patients
/// @author P. Sanchez github@17038634
/// @notice The logic behind te contract is only for example purposes and cannot be used to diagnose

pragma experimental ABIEncoderV2;
import "./provableAPI.sol";
import "./Patient.sol";
import "./CoronaTest.sol";
import "./Initializable.sol";

contract TestStreet is usingProvable, Initializable {
    /// @dev Emits the result of the new created patient
    event newPatient(uint256 id, string name, bool hasFever, address _address);
    /// @dev Emits the result of the Covid-19 test made by the patient
    event testResult(bool hasCorona, string name);
    mapping(address => Patient) addressToPatient;
    mapping(uint256 => address) patientToOwner;
    mapping(address => uint256) patientLookup;
    Patient[] patients;
    CoronaTest CT;
    address owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Must be owner");
        _;
    }
    modifier minAmount(uint256 _amount) {
        require(msg.value >= _amount, "Not enough ETH send");
        _;
    }

    bytes public infectedNumber;
    uint256 public priceOfUrl;

    function initialize() public initializer {
        CT = new CoronaTest();
        owner = address(0x616dAC0287cE79A3A53756205B993F09C92752D9);
    }

    /// @dev Function to create a new patient
    function createPatient(
        string memory _patientName,
        uint256 _patientAge,
        bool _hasFever
    ) public payable minAmount(50000000000000000) {
        require(_patientAge >= 0, "invalid Age");
        Patient memory p = addressToPatient[msg.sender];
        p.patientName = _patientName;
        p.patientAge = _patientAge;
        p.hasFever = _hasFever;
        patients.push(p);
        uint256 id = patients.length - 1;
        patientToOwner[id] = msg.sender;
        emit newPatient(id, _patientName, _hasFever, msg.sender);
    }

    /// @dev Function to test the patient of Covid-19
    function testPatient() public {
        Patient memory p = getPatient();
        testPatient(p);
    }

    function testPatient(Patient memory _patient)
        internal
        returns (bool result)
    {
        require((patients.length > 0), "No patient available for lookup.");
        emit testResult(CT.coronaTest(_patient), _patient.patientName);
        return CT.coronaTest(_patient);
    }

    /// @dev Function to get the list of the patients
    /// @return A list of Patients
    function getPatients() public view returns (Patient[] memory) {
        require((patients.length > 0), "No patients available for lookup.");
        return patients;
    }

    /// @dev Function to get an specific patient
    /// @return The specific looked up patient
    function getPatient() public view returns (Patient memory) {
        require((patients.length > 0), "No patient available for lookup.");
        return patients[patientLookup[msg.sender]];
    }

    function __callback(
        bytes32,
        /* myid prevent warning*/
        string memory result
    ) public override {
        if (msg.sender != provable_cbAddress()) revert();
        infectedNumber = bytes(result);
    }

    function getInfectedNumber() public view returns (bytes memory) {
        return infectedNumber;
    }

    function getInfected() public payable {
        priceOfUrl = provable_getPrice("URL");
        require(
            address(this).balance >= priceOfUrl,
            "please add some ETH to cover for the query fee"
        );
        provable_query(
            "URL",
            "json(https://api.apify.com/v2/key-value-stores/vqnEUe7VtKNMqGqFF/records/LATEST?disableRedirect=true).infectedByRegion[0].infectedCount"
        );
    }

    function getInfectedNumberUint() public view returns (uint256) {
        return convertToUint(infectedNumber);
    }

    function convertToUint(bytes memory input) public pure returns (uint256) {
        uint256 res = 0;
        for (uint256 i = 0; i < input.length; i++)
            res = (res << 8) + uint256(uint8(input[i]));
        return res;
    }

    /*
    /// @dev Function to destroy the contract
    function destroy() public onlyOwner{
        selfdestruct(payable (owner));
    }*/
}
