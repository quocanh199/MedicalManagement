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

const contract = new web3.eth.Contract(Prescription.abi, Prescription.address);

const mint = async (req, res) => {
  try {
    const { privateKey, listId, visitId } = req.body;
    const data = contract.methods.mint(listId, visitId).encodeABI();
    const tokenId = await signTransaction(
      web3,
      data,
      Prescription.address,
      privateKey
    );
    res.json(onSuccess(tokenId));
  } catch (error) {
    console.error(error);
    res.json(onError(error));
  }
};

const setPaidPrescription = async (req, res) => {
  try {
    const { privateKey, prescriptionId } = req.body;
    const data = contract.methods
      .setPaidPrescription(prescriptionId)
      .encodeABI();
    await signTransaction(web3, data, Prescription.address, privateKey);
    res.json(onSuccess());
  } catch (error) {
    console.error(error);
    res.json(onError());
  }
};

const getPrescription = async (req, res) => {
  try {
    const prescriptionId = req.query.prescriptionId;
    const prescriptionData = await contract.methods
      .getPrescription(prescriptionId)
      .call();
    res.json(onSuccess(prescriptionData));
  } catch (error) {
    console.error(error);
    res.json(onError(error));
  }
};

module.exports = { mint, setPaidPrescription, getPrescription };
