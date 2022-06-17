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

const contract = new web3.eth.Contract(TestResult.abi, TestResult.address);

const mint = async (req, res) => {
  try {
    const { privateKey, name, result, visitId } = req.body;
    const data = contract.methods.mint(name, result, visitId).encodeABI();
    const tokenId = await signTransaction(
      web3,
      data,
      TestResult.address,
      privateKey
    );
    res.json(onSuccess(tokenId));
  } catch (error) {
    console.error(error);
    res.json(onError(error));
  }
};

const getTestResult = async (res, req) => {
  try {
    const { testId } = req.query.testId;
    const testData = await contract.methods.getTestResult(testId).call();
    res.json(onSuccess(testData));
  } catch (error) {
    console.error(error);
    res.json(onError(error));
  }
};

module.exports = { mint, getTestResult };
