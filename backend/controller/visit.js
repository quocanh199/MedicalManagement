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

const contract = new web3.eth.Contract(Visit.abi, Visit.address);

const mint = async (req, res) => {
  try {
    const { privateKey, patientId } = req.body;
    const data = contract.methods.mint(patientId).encodeABI();
    const tokenId = signTransaction(web3, data, Visit.address, privateKey);
    res.json(onSuccess(tokenId));
  } catch (error) {
    console.error(error);
    res.json(onError(error));
  }
};

const getVisit = async (req, res) => {
  try {
    const { visitId } = req.query.visitId;
    const visitData = contract.methods.getVisit(visitId).call();
    res.json(onSuccess(visitData));
  } catch (error) {
    console.error(error);
    res.json(onError(error));
  }
};

module.exports(mint, getVisit);
