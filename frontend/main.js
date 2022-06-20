const ethereumButton = $("#enableEthereumButton");
const signButton = $("#signButton");
const awardItemButton = $("#awardItemButton");
const showAccount = $("#showAccount");
const showBalance = $("#showBalance");
const showSignatureText = $("#showSignatureText");
const recoverText = $("#recoverText");
const messageInput = $("#messageInput");
const contractInfoText = $("#contractInfoText");
const tokenOwnerInput = $("#tokenOwnerInput");
const tokenURIInput = $("#tokenURIInput");
const tokenIdText = $("#tokenIdText");

var account = "";

async function getAccount() {
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  account = accounts[0];
  web3.eth.defaultAccount = account;
  showAccount.text(account);
  getBalance();
  getContract();
}

async function getBalance() {
  const balance = await ethereum.request({
    method: "eth_getBalance",
    params: [account, "latest"],
  });
  showBalance.text(parseInt(balance, 16));
}

async function sign() {
  const message = stringToHex(messageInput.val());
  const signature = await ethereum.request({
    method: "personal_sign",
    params: [message, account],
  });
  showSignatureText.text(message, signature);
  recover(message, signature);
}

async function recover(message, signature) {
  const recoverValue = await ethereum.request({
    method: "personal_ecRecover",
    params: [message, signature],
  });
  recoverText.text(recoverValue);
}

var contract;
const web3 = new Web3(ethereum);
function getContract() {
  $.get("/contract", function (data, status) {
    console.log("contract: ", data.address);
    web3.eth.Contract.defaultAccount = account;
    contract = new web3.eth.Contract(data.abi, data.address);
    contract.address = data.address;
    contract.abi = data.abi;
    getContractInfo();
  });
}

async function getContractInfo() {
  const name = await contract.methods.name().call();
  const symbol = await contract.methods.symbol().call();
  contractInfoText.text(name + " - " + symbol);
}

async function awardItem() {
  const tokenOwner = tokenOwnerInput.val();
  const tokenURI = tokenURIInput.val();
  console.log("award item, owner: " + tokenOwner + ", uri: " + tokenURI);
  const result = await contract.methods
    .awardItem(tokenOwner, tokenURI)
    .send({ from: account });
  const tokenId = result.events.Transfer.returnValues.tokenId;
  tokenIdText.text(tokenId);
}

(function () {
  if (typeof window.ethereum === "undefined") {
    return;
  }
  console.log("MetaMask is installed!");

  ethereumButton.on("click", () => {
    getAccount();
  });

  signButton.on("click", () => {
    sign();
  });

  awardItemButton.on("click", () => {
    awardItem();
  });
})();
