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

const contract = new web3.eth.Contract(Site.abi, Site.address);

const mint = async (req, res) => {
  try {
    const { privateKey, name, siteAddress } = req.body;
    const data = contract.methods.mint(name, siteAddress).encodeABI();
    const tokenId = signTransaction(web3, data, Site.address, privateKey);
    res.json(onSuccess(tokenId));
  } catch (error) {
    console.error(error);
    res.json(onError(error));
  }
};

const getSite = async (req, res) => {
  try {
    const { siteId } = req.query.siteId;
    const siteData = contract.methods.getSite(siteId);
    res.json(onSuccess(siteData));
  } catch (error) {
    console.error(error);
    res.json(onError(error));
  }
};

module.exports = { mint, getSite };
