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

const contract = new web3.eth.Contract(Medicine.abi, Medicine.address);

const mint = async (req, res) => {
  try {
    const { privateKey, name, amount } = req.body;
    const data = contract.methods.mint(name, amount).encodeABI();
    const tokenId = await signTransaction(
      web3,
      data,
      Medicine.address,
      privateKey
    );
    res.json(onSuccess(tokenId));
  } catch (error) {
    console.error(error);
    res.json(onError(error));
  }
};

const updateMedicine = async (req, res) => {
  try {
    const { privateKey, medicineId, name, amount } = req.body;
    const data = contract.methods
      .updateMedicine(medicineId, name, amount)
      .encodeABI();
    await signTransaction(web3, data, Medicine.address, privateKey);
    res.json(onSuccess());
  } catch (error) {
    console.error(error);
    res.json(onError(error));
  }
};

const getMedicineHistory = async (req, res) => {
  try {
    const medicineId = req.query.medicineId;
    const medicineData = await contract.methods
      .getMedicineHistory(medicineId)
      .call();
    res.json(onSuccess(medicineData));
  } catch (error) {
    console.error(error);
    res.json(onError(error));
  }
};

const getMedicine = async (req, res) => {
  try {
    const medicineId = req.query.medicineId;
    const medicineData = await contract.methods.getMedicine(medicineId).call();
    res.json(onSuccess(medicineData));
  } catch (error) {
    console.error(error);
    res.json(onError(error));
  }
};

module.exports = {
  lockData: mint,
  updateMedicine,
  getMedicineHistory,
  getMedicine,
};
