const { onError, onSuccess } = require("../utils/utils");
const { signTransaction } = require("../utils/helper");
const {
  Medicine,
  Prescription,
  TestResult,
  Visit,
  Patient,
  Site,
} = require("../utils/config.json");
const Web3 = require("web3");

const web3 = new Web3("http://127.0.0.1:7545");

const contract = new web3.eth.Contract(Patient.abi, Patient.address);

const mint = async (req, res) => {
  try {
    const {
      privateKey,
      name,
      gender,
      dateOfBirth,
      patientAddress,
      phoneNumber,
      siteId,
    } = req.body;

    const data = contract.methods
      .mint(name, gender, dateOfBirth, patientAddress, phoneNumber, siteId)
      .encodeABI();
    const tokenId = await signTransaction(
      web3,
      data,
      Patient.address,
      privateKey
    );
    res.json(onSuccess(tokenId));
  } catch (error) {
    console.error(error);
    res.json(onError(error));
  }
};

const getPatientFromPhone = async (req, res) => {
  try {
    const phoneNumber = req.query.phoneNumber;
    const patientId = await contract.methods
      .getPatientFromPhone(phoneNumber)
      .call();
    res.json(onSuccess(patientId));
  } catch (error) {
    console.error(error);
    res.json(onError(error));
  }
};

const getPatient = async (req, res) => {
  try {
    const patientId = req.query.patientId;
    const patientData = await contract.methods.getPatient(patientId).call();
    res.json(onSuccess(patientData));
  } catch (error) {
    console.error(error);
    res.json(onError(error));
  }
};

module.exports = { mint, getPatientFromPhone, getPatient };
