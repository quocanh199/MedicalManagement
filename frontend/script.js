// Site Script
const getListAllSite = async () => {
  const res = await $.get(`http://localhost:8088/api/site/getAll/`);
  return res;
};

const getSite = async (siteId) => {
  const res = await $.get(
    `http://localhost:8088/api/site/get?siteId=${siteId}`
  );
  return res;
};

const mintSite = async (privateKey, name, siteAddress) => {
  const res = await $.post(`http://localhost:8088/api/site/mint`, {
    privateKey,
    name,
    siteAddress,
  });
  return res;
};

// Patient Script
const mintPatient = async (
  privateKey,
  name,
  gender,
  dateOfBirth,
  patientAddress,
  phoneNumber,
  siteId
) => {
  const res = await $.post(`http://localhost:8088/api/patient/mint`, {
    privateKey,
    name,
    gender,
    dateOfBirth,
    patientAddress,
    phoneNumber,
    siteId,
  });

  return res;
};

const getIdPatient = async (phoneNumber) => {
  const res = await $.get(
    `http://localhost:8088/api/patient/getID?phoneNumber=${phoneNumber}`
  );
  return res;
};

const getPatient = async (patientId) => {
  const res = await $.get(
    `http://localhost:8088/api/patient/get?patientId=${patientId}`
  );
  return res;
};

// Visit Script
const mintVisit = async (privateKey, patientId) => {
  const res = await $.post(`http://localhost:8088/api/visit/mint/`, {
    privateKey,
    patientId,
  });
  return res;
};

const getVisit = async (visitId) => {
  const res = await $.get(
    `http://localhost:8088/api/visit/get?visitId=${visitId}`
  );
  return res;
};

// Test Result Script
const mintTestResult = async (privateKey, name, result, visitId) => {
  const res = await $.post(`http://localhost:8088/api/testResult/mint/`, {
    privateKey,
    name,
    result,
    visitId,
  });
  return res;
};

const getTestResult = async (testId) => {
  const res = await $.get(
    `http://localhost:8088/api/testResult/get?testId=${testId}`
  );
  return res;
};

// Prescription Script
const mintPrescription = async (privateKey, listId, visitId) => {
  const res = await $.post(`http://localhost:8088/api/prescription/mint/`, {
    privateKey,
    listId,
    visitId,
  });
  return res;
};

const setPaidPrescription = async (privateKey, prescriptionId) => {
  const res = await $.post(`http://localhost:8088/api/prescription/setPaid`, {
    privateKey,
    prescriptionId,
  });
  return res;
};

const getPrescription = async (prescriptionId) => {
  const res = await $.get(
    `http://localhost:8088/api/prescription/get?prescriptionId=${prescriptionId}`
  );
  return res;
};

// Medicine Script
const mintMedicine = async (privateKey, name, amount) => {
  const res = await $.post(`http://localhost:8088/api/medicine/mint`, {
    privateKey,
    name,
    amount,
  });
  return res;
};

const updateMedicineRequest = async (privateKey, medicineId, name, amount) => {
  const res = await $.post(`http://localhost:8088/api/medicine/update`, {
    privateKey,
    medicineId,
    name,
    amount,
  });
  return res;
};

const getHistoryMedicine = async (medicineId) => {
  const res = await $.get(
    `http://localhost:8088/api/medicine/getHistory?medicineId=${medicineId}`
  );
  return res;
};

const getMedicine = async (medicineId) => {
  const res = await $.get(
    `http://localhost:8088/api/medicine/get?medicineId=${medicineId}`
  );
  return res;
};
