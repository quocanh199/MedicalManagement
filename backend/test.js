const { mint, getMedicineHistory } = require("./controller/medicine");
const { Site } = require("./controller/site");
const { getPatient, mint } = require("./controller/patient");
const { mint, getVisit } = require("./controller/visit");
const { getTestResult, mint } = require("./controller/testResult");
const {
  getPrescription,
  mint,
  setPaidPrescription,
} = require("./controller/prescription");

const privateKey =
  "aa8b63ae8addb0d467233cf6353bde8a2b0bd279bab2854f7bc5dfe33cecad66";

// lockData(privateKey, "berberin", 3).then(console.log);

// getMedicineHistory(2).then(console.log);
