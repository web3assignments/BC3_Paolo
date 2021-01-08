## `TestStreet`





### `onlyOwner()`






### `createPatient(string _patientName, uint256 _patientAge, bool _hasFever)` (public)



Function to create a new patient

### `testPatient()` (public)



Function to test the patient of Covid-19

### `testPatient(struct Patient _patient) → bool result` (internal)





### `getPatients() → struct Patient[]` (public)



Function to get the list of the patients


### `getPatient() → struct Patient` (public)



Function to get an specific patient


### `__callback(bytes32, string result)` (public)





### `getInfectedNumber() → bytes` (public)





### `getInfected()` (public)





### `getInfectedNumberUint() → uint256` (public)





### `convertToUint(bytes input) → uint256` (public)






### `newPatient(uint256 id, string name, bool hasFever, address _address)`



Emits the result of the new created patient

### `testResult(bool hasCorona, string name)`



Emits the result of the Covid-19 test made by the patient

