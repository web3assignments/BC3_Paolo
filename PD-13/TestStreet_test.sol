pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;
import "remix_accounts.sol";
import "remix_tests.sol"; // this import is automatically injected by Remix.
import "../TestStreet.sol";

// File name has to end with '_test.sol', this file can contain more than one testSuite contracts
contract testSuite {

    TestStreet test;
    address owner;
    address acc0;
  
    
    function beforeAll() public {
        
        test = new TestStreet();
         owner = address(this);
    }
    
 function createPatientFailure() public {
        
     try test.createPatient("Paolo",-25,false)
        {
            Assert.ok(false, "" );
        } catch Error(string memory reason) {
            Assert.equal(reason,"invalid Age", "is failed ");
        }
        
    }
    
    function getZeroPatients() public {
    
     try test.getPatients()
        {
            Assert.ok(false, "" );
        } catch Error(string memory reason ) {
            Assert.equal(reason,"No patients available for lookup.", "is failed ");
        }
    }
    
    function checkSuccessCreatedPatient() public {
        
        try test.createPatient("Paolo",25,false)
        {
            Assert.ok(true, "" );
        } catch {Assert.ok(false, "Patient not created");}
        
    }
    
/// #sender: account-1
    function getPatient() public {
     
       try test.getPatient()
        {
            Assert.ok(true, "" );
        } catch Error(string memory reason) {
            Assert.ok(false, reason);
        }
    }
    
    function testInitialOwnerIsNotAcc0() public {
         Assert.notEqual(test.getOwner(), acc0, "Owner should not be acc0");
    }
}
