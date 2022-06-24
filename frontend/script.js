let contractInfo = {};
$.getJSON("config.json", (data) => {
  contractInfo = data;
});

// Site Script
const getAllSiteSC = async () => {
  window.web3 = new Web3(window.ethereum);
  const siteContract = new window.web3.eth.Contract(
    contractInfo.Site.abi,
    contractInfo.Site.address
  );
  const data = await siteContract.methods.getAllSite().call();
  return data;
};

const getSiteSC = async (siteId) => {
  window.web3 = new Web3(window.ethereum);
  const siteContract = new window.web3.eth.Contract(
    contractInfo.Site.abi,
    contractInfo.Site.address
  );
  const data = await siteContract.methods.getSite(siteId).call();
  return data;
};

const mintSite = async (name, siteAddress) => {
  window.web3 = new Web3(window.ethereum);
  const siteContract = new window.web3.eth.Contract(
    contractInfo.Site.abi,
    contractInfo.Site.address
  );
  const data = await siteContract.methods.mint(name, siteAddress).send({
    from: (await getCurrentAccounts())[0],
  });
  return data;
};

// Patient Script
const mintPatient = async (
  name,
  gender,
  dateOfBirth,
  patientAddress,
  phoneNumber,
  siteId
) => {
  window.web3 = new Web3(window.ethereum);
  const patientContract = new window.web3.eth.Contract(
    contractInfo.Patient.abi,
    contractInfo.Patient.address
  );
  const data = await patientContract.methods
    .mint(name, gender, dateOfBirth, patientAddress, phoneNumber, siteId)
    .send({
      from: (await getCurrentAccounts())[0],
    });

  return data;
};

const getPatientFromPhoneSC = async (phoneNumber) => {
  window.web3 = new Web3(window.ethereum);
  const patientContract = new window.web3.eth.Contract(
    contractInfo.Patient.abi,
    contractInfo.Patient.address
  );
  const data = await patientContract.methods
    .getPatientFromPhone(phoneNumber)
    .call();

  return data;
};

const getPatientSC = async (patientId) => {
  window.web3 = new Web3(window.ethereum);
  const patientContract = new window.web3.eth.Contract(
    contractInfo.Patient.abi,
    contractInfo.Patient.address
  );
  const data = await patientContract.methods.getPatient(patientId).call();

  return data;
};

// Visit Script
const mintVisit = async (patientId) => {
  window.web3 = new Web3(window.ethereum);
  const visitContract = new window.web3.eth.Contract(
    contractInfo.Visit.abi,
    contractInfo.Visit.address
  );
  const data = await visitContract.methods.mint(patientId).send({
    from: (await getCurrentAccounts())[0],
  });

  return data;
};

const getVisitSC = async (visitId) => {
  window.web3 = new Web3(window.ethereum);
  const visitContract = new window.web3.eth.Contract(
    contractInfo.Visit.abi,
    contractInfo.Visit.address
  );
  const data = await visitContract.methods.getVisit(visitId).call();

  return data;
};

// Test Result Script
const mintTestResult = async (name, result, visitId) => {
  window.web3 = new Web3(window.ethereum);
  const testResultContract = new window.web3.eth.Contract(
    contractInfo.TestResult.abi,
    contractInfo.TestResult.address
  );
  const data = await testResultContract.methods
    .mint(name, result, visitId)
    .send({
      from: (await getCurrentAccounts())[0],
    });

  return data;
};

const getTestResultSC = async (testId) => {
  window.web3 = new Web3(window.ethereum);
  const testResultContract = new window.web3.eth.Contract(
    contractInfo.TestResult.abi,
    contractInfo.TestResult.address
  );
  const data = await testResultContract.methods.getTestResult(testId).call();

  return data;
};

// Prescription Script
const mintPrescription = async (listId, visitId) => {
  window.web3 = new Web3(window.ethereum);
  const prescriptionContract = new window.web3.eth.Contract(
    contractInfo.Prescription.abi,
    contractInfo.Prescription.address
  );
  const data = await prescriptionContract.methods.mint(listId, visitId).send({
    from: (await getCurrentAccounts())[0],
  });

  return data;
};

const setPaidPrescriptionSC = async (prescriptionId) => {
  window.web3 = new Web3(window.ethereum);
  const prescriptionContract = new window.web3.eth.Contract(
    contractInfo.Prescription.abi,
    contractInfo.Prescription.address
  );
  const data = await prescriptionContract.methods
    .setPaidPrescription(prescriptionId)
    .send({
      from: (await getCurrentAccounts())[0],
    });

  return data;
};

const getPrescriptionSC = async (prescriptionId) => {
  window.web3 = new Web3(window.ethereum);
  const prescriptionContract = new window.web3.eth.Contract(
    contractInfo.Prescription.abi,
    contractInfo.Prescription.address
  );
  const data = await prescriptionContract.methods
    .getPrescription(prescriptionId)
    .call();

  return data;
};

// Medicine Script
const mintMedicine = async (name, amount) => {
  window.web3 = new Web3(window.ethereum);
  const medicineContract = new window.web3.eth.Contract(
    contractInfo.Medicine.abi,
    contractInfo.Medicine.address
  );
  const data = await medicineContract.methods.mint(name, amount).send({
    from: (await getCurrentAccounts())[0],
  });
  return data;
};

const updateMedicineSC = async (medicineId, name, amount) => {
  window.web3 = new Web3(window.ethereum);
  const medicineContract = new window.web3.eth.Contract(
    contractInfo.Medicine.abi,
    contractInfo.Medicine.address
  );
  const data = await medicineContract.methods
    .updateMedicine(medicineId, name, amount)
    .send({
      from: (await getCurrentAccounts())[0],
    });
  return data;
};

const getMedicineHistorySC = async (medicineId) => {
  window.web3 = new Web3(window.ethereum);
  const medicineContract = new window.web3.eth.Contract(
    contractInfo.Medicine.abi,
    contractInfo.Medicine.address
  );
  const data = await medicineContract.methods
    .getMedicineHistory(medicineId)
    .call();

  return data;
};

const getMedicineSC = async (medicineId) => {
  window.web3 = new Web3(window.ethereum);
  const medicineContract = new window.web3.eth.Contract(
    contractInfo.Medicine.abi,
    contractInfo.Medicine.address
  );
  const data = await medicineContract.methods.getMedicine(medicineId).call();

  return data;
};

// AUTHENTICATOR
const getCurrentAccounts = async () => {
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });
  return accounts;
};

const getUserRole = async () => {
  const myJson = await $.get(
    `http://localhost:8088/api/authenticator/CheckAuth/?userAddress=${userAddress}`
  );
  return myJson;
};

const getPublicKey = (privateKey) => {
  const wallet = Wallet.fromPrivateKey(privateKey);
  const publicKey = wallet.getPublicKeyString();
  return publicKey;
};

// window.web3 = new Web3(window.ethereum)
// new window.web3.eth.Contract()
const testWeb3 = async () => {
  window.web3 = new Web3(window.ethereum);
  const siteContract = new window.web3.eth.Contract(
    contractInfo.Site.abi,
    contractInfo.Site.address
  );
  const data = await siteContract.methods.mint("Vinmec", "Kontum").send({
    from: (await getCurrentAccounts())[0],
  });
  return data;
};
