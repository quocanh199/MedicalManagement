const { ethers } = require("hardhat");
const CONFIG = require("../config.json");
async function main() {
  const PCO = await ethers.getContractFactory("PCO");
  const PCOAttach = await PCO.attach(CONFIG.pco.address);
  await PCOAttach.setQuestionContractAddress(CONFIG.question.address);
  await PCOAttach.setQuestionnaireContractAddress(CONFIG.questionnaire.address);
  await PCOAttach.setSubjectContractAddress(CONFIG.subject.address);
  await PCOAttach.setInvestigatorContractAddress(CONFIG.investigator.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
