const { onError, onSuccess } = require("../utils/utils");
const { signTransaction } = require("../utils/helper");
const {
  Medicine,
  Prescription,
  TestResult,
  Visit,
  Patient,
  Site,
  Authenticator,
} = require("../utils/config.json");
const Web3 = require("web3");

const web3 = new Web3("http://127.0.0.1:7545");

const contract = new web3.eth.Contract(
  Authenticator.abi,
  Authenticator.address
);

const createDID = async (req, res) => {
  try {
    const { privateKey, authType } = req.body;
    const data = contract.methods.createDID(authType).encodeABI();
    await signTransaction(web3, data, Authenticator.address, privateKey);
    res.json(onSuccess());
  } catch (error) {
    console.error(error);
    res.json(onError(error));
  }
};

const checkAuth = async (req, res) => {
  try {
    const userAddress = req.query.userAddress;
    const data = await contract.methods.checkAuth(userAddress).call();
    res.json(onSuccess(data));
  } catch (error) {
    console.error(error);
    res.json(onError(error));
  }
};

module.exports = {
  createDID,
  checkAuth,
};
