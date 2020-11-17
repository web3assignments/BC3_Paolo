pragma solidity >=0.7.0;
pragma experimental ABIEncoderV2;

contract CoronaSystem {
       
  struct Patient {
        uint patientId;
        string patientName;
        bool hasFever;
        uint patientAge;
    }
  
 Patient[] patientArray;
 
  function makePatient(uint patientId, string memory patientName, uint patientAge, bool hasFever) public {
    patientArray.push(Patient(patientId, patientName, hasFever, patientAge));
}
  
  
 function coronaTest(Patient memory _patient) public returns (string memory){
     string memory hasCorona;
   if (_patient.patientAge >=18 && _patient.hasFever == true)
     hasCorona = "U have Corona";
    else
   hasCorona = "U don't have Corona";
    }
}
