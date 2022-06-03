const { ethers } = require("hardhat");
const fs = require("fs");
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  const Question = await ethers.getContractFactory("Question");
  // lockdata
  const Authenticator = await ethers.getContractFactory("Authenticator");
  const PCO = await ethers.getContractFactory("PCO");
  const Questionnaire = await ethers.getContractFactory("Questionnaire");
  const Subject = await ethers.getContractFactory("Subject");
  const Investigator = await ethers.getContractFactory("Investigator");
  const Site = await ethers.getContractFactory("Site");
  const Study = await ethers.getContractFactory("Study");

  // chronology
  const DropOutContract = await ethers.getContractFactory("DropOutContract");
  const EligibilityCheckContract = await ethers.getContractFactory(
    "EligibilityCheckContract"
  );
  const EndContract = await ethers.getContractFactory("EndContract");
  const LockDataContract = await ethers.getContractFactory("LockDataContract");
  const EConsentContract = await ethers.getContractFactory("EConsentContract");
  const RequestForDataContract = await ethers.getContractFactory(
    "RequestForDataContract"
  );
  const SubmitDataContract = await ethers.getContractFactory(
    "SubmitDataContract"
  );
  const ViewContract = await ethers.getContractFactory("ViewContract");

  // deploy lockdata contracts
  const authenticator = await Authenticator.deploy();
  const pco = await PCO.deploy(authenticator.address);
  const question = await Question.deploy(authenticator.address, pco.address);
  const questionnaire = await Questionnaire.deploy(
    authenticator.address,
    pco.address,
    question.address
  );
  const subject = await Subject.deploy(authenticator.address, pco.address);
  const investigator = await Investigator.deploy(authenticator.address);
  const site = await Site.deploy(authenticator.address);
  const study = await Study.deploy(authenticator.address);

  // deploy chronology contracts
  const dropOutContract = await DropOutContract.deploy();
  const eligibilityCheckContract = await EligibilityCheckContract.deploy();
  const endContract = await EndContract.deploy();
  const lockDataContract = await LockDataContract.deploy();
  const eConsentContract = await EConsentContract.deploy(
    eligibilityCheckContract.address
  );
  const requestForDataContract = await RequestForDataContract.deploy(
    eConsentContract.address,
    lockDataContract.address
  );
  const submitDataContract = await SubmitDataContract.deploy(
    eConsentContract.address
  );
  const viewContract = await ViewContract.deploy(
    requestForDataContract.address
  );

  fs.writeFileSync(
    "./config.json",
    JSON.stringify({
      Authenticator: {
        address: authenticator.address,
        abi: require("../build/contracts/Authenticator.json").abi,
        contractName: require("../build/contracts/Authenticator.json")
          .contractName,
      },
      PCO: {
        address: pco.address,
        abi: require("../build/contracts/PCO.json").abi,
        contractName: require("../build/contracts/PCO.json").contractName,
      },
      Question: {
        address: question.address,
        abi: require("../build/contracts/Question.json").abi,
        contractName: require("../build/contracts/Question.json").contractName,
      },
      Questionnaire: {
        address: questionnaire.address,
        abi: require("../build/contracts/Questionnaire.json").abi,
        contractName: require("../build/contracts/Questionnaire.json")
          .contractName,
      },
      Qubject: {
        address: subject.address,
        abi: require("../build/contracts/Subject.json").abi,
        contractName: require("../build/contracts/Subject.json").contractName,
      },
      Investigator: {
        address: investigator.address,
        abi: require("../build/contracts/Investigator.json").abi,
        contractName: require("../build/contracts/Investigator.json")
          .contractName,
      },
      Site: {
        address: site.address,
        abi: require("../build/contracts/Site.json").abi,
        contractName: require("../build/contracts/Site.json").contractName,
      },
      Study: {
        address: study.address,
        abi: require("../build/contracts/Study.json").abi,
        contractName: require("../build/contracts/Study.json").contractName,
      },
      DropOutContract: {
        address: dropOutContract.address,
        abi: require("../build/contracts/DropOutContract.json").abi,
        contractName: require("../build/contracts/DropOutContract.json")
          .contractName,
      },
      EligibilityCheckContract: {
        address: eligibilityCheckContract.address,
        abi: require("../build/contracts/EligibilityCheckContract.json").abi,
        contractName: require("../build/contracts/EligibilityCheckContract")
          .contractName,
      },
      EndContract: {
        address: endContract.address,
        abi: require("../build/contracts/EndContract.json").abi,
        contractName: require("../build/contracts/EndContract.json")
          .contractName,
      },
      LockDataContract: {
        address: lockDataContract.address,
        abi: require("../build/contracts/LockDataContract.json").abi,
        contractName: require("../build/contracts/LockDataContract.json")
          .contractName,
      },
      EConsentContract: {
        address: eConsentContract.address,
        abi: require("../build/contracts/EConsentContract.json").abi,
        contractName: require("../build/contracts/EConsentContract.json")
          .contractName,
      },
      RequestForDataContract: {
        address: requestForDataContract.address,
        abi: require("../build/contracts/RequestForDataContract.json").abi,
        contractName: require("../build/contracts/RequestForDataContract")
          .contractName,
      },
      SubmitDataContract: {
        address: submitDataContract.address,
        abi: require("../build/contracts/SubmitDataContract.json").abi,
        contractName: require("../build/contracts/SubmitDataContract.json")
          .contractName,
      },
      ViewContract: {
        address: viewContract.address,
        abi: require("../build/contracts/ViewContract.json").abi,
        contractName: require("../build/contracts/ViewContract.json")
          .contractName,
      },
    })
  );
  // log deploy contracts
  console.log("authenticator address:", authenticator.address);
  console.log("pco address:", pco.address);
  console.log("question address:", question.address);
  console.log("questionnaire address:", questionnaire.address);
  console.log("investigator address:", investigator.address);
  console.log("subject address:", subject.address);
  console.log("site address:", site.address);
  console.log("study address:", study.address);

  // log deploy chronology contracts

  console.log("dropOutContract address:", dropOutContract.address);
  console.log(
    "eligibilityCheckContract address:",
    eligibilityCheckContract.address
  );
  console.log("endContract address:", endContract.address);
  console.log("lockDataContract address:", lockDataContract.address);
  console.log("eConsentContract address:", eConsentContract.address);
  console.log(
    "requestForDataContract address:",
    requestForDataContract.address
  );
  console.log("submitDataContract address:", submitDataContract.address);
  console.log("viewContract address:", viewContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
