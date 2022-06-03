const CONFIG = require("../config.json");
const { exec } = require("child_process");
const request = require("request");
const Web3 = require("web3");
const fs = require("fs");
const verifyRequest = async (
  addressHash,
  name,
  contractSourceCode,
  constructorArguments = ""
) => {
  console.log("Verify contract", addressHash, name, constructorArguments);
  return new Promise((resolve, reject) => {
    request(
      {
        method: "POST",
        url: "http://18.183.195.77:26000/verify_smart_contract/contract_verifications",
        headers: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "Accept-Language": "en-US,en;q=0.9,vi;q=0.8",
          "Cache-Control": "max-age=0",
          Connection: "keep-alive",
          "Content-Type": "application/x-www-form-urlencoded",
          Origin: "http://18.183.195.77:26000",
          "Upgrade-Insecure-Requests": "1",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36",
        },
        form: {
          "smart_contract[address_hash]": addressHash,
          "smart_contract[name]": name,
          "smart_contract[nightly_builds]": "false",
          "smart_contract[compiler_version]": "v0.8.1+commit.df193b15",
          "smart_contract[evm_version]": "default",
          "smart_contract[optimization]": "true",
          "smart_contract[optimization_runs]": "200",
          "smart_contract[contract_source_code]": contractSourceCode,
          "smart_contract[autodetect_constructor_args]": "false",
          "smart_contract[constructor_arguments]": constructorArguments,
          "external_libraries[library1_name]": "",
          "external_libraries[library1_address]": "",
          "external_libraries[library2_name]": "",
          "external_libraries[library2_address]": "",
          "external_libraries[library3_name]": "",
          "external_libraries[library3_address]": "",
          "external_libraries[library4_name]": "",
          "external_libraries[library4_address]": "",
          "external_libraries[library5_name]": "",
          "smart_contract[library5_address]": "",
        },
      },
      function (error, response) {
        if (error) console.log("Error", addressHash, name);
        else resolve(response.body);
      }
    );
  });
};

const flattenContract = async (contractPath) => {
  return new Promise((resolve, reject) => {
    exec(
      `./node_modules/.bin/hardhat flatten ${contractPath} > ./test/test.sol`,
      (error, stdout, stderr) => {
        const str = fs.readFileSync("./test/test.sol").toString();
        const removeSPDX = str
          .split("// SPDX-License-Identifier: MIT")
          .join("")
          .split("pragma solidity ^0.8.0;")
          .join("")
          .split("pragma solidity ^0.8.1;")
          .join("");
        const idxStart = removeSPDX.indexOf(
          "// Sources flattened with hardhat"
        );
        const processedStr = `// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n${removeSPDX.substring(
          idxStart,
          removeSPDX.length
        )}`;
        resolve(processedStr);
      }
    );
  });
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const Authenticator = "contracts/utils/Authenticator.sol";
  const PCO = "contracts/utils/PCO.sol";
  const Question = "contracts/lockdata/Question.sol";
  const Questionnaire = "contracts/lockdata/Questionnaire.sol";
  const Subject = "contracts/lockdata/Subject.sol";
  const Investigator = "contracts/lockdata/Investigator.sol";
  const Site = "contracts/lockdata/Site.sol";
  const Study = "contracts/lockdata/Study.sol";
  const DropOut = "contracts/chronology/DropOut.sol";
  const EligibilityCheck = "contracts/chronology/EligibilityCheck.sol";
  const End = "contracts/chronology/End.sol";
  const LockData = "contracts/chronology/LockData.sol";
  const EConsent = "contracts/chronology/EConsent.sol";
  const RequestForData = "contracts/chronology/RequestForData.sol";
  const SubmitData = "contracts/chronology/SubmitData.sol";
  const View = "contracts/chronology/View.sol";
  const listContract = [
    {
      path: Authenticator,
      ...CONFIG.authenticator,
      input: [],
    },
    {
      path: PCO,
      ...CONFIG.pco,
      input: [CONFIG.authenticator.address],
    },
    {
      path: Question,
      ...CONFIG.question,
      input: [CONFIG.authenticator.address, CONFIG.pco.address],
    },
    {
      path: Questionnaire,
      ...CONFIG.questionnaire,
      input: [
        CONFIG.authenticator.address,
        CONFIG.pco.address,
        CONFIG.question.address,
      ],
    },
    {
      path: Subject,
      ...CONFIG.subject,
      input: [CONFIG.authenticator.address, CONFIG.pco.address],
    },
    {
      path: Investigator,
      ...CONFIG.investigator,
      input: [CONFIG.authenticator.address],
    },
    {
      path: Site,
      ...CONFIG.site,
      input: [CONFIG.authenticator.address],
    },
    {
      path: Study,
      ...CONFIG.study,
      input: [CONFIG.authenticator.address],
    },
    {
      path: DropOut,
      ...CONFIG.dropOutContract,
      input: [],
    },
    {
      path: EligibilityCheck,
      ...CONFIG.eligibilityCheckContract,
      input: [],
    },
    {
      path: End,
      ...CONFIG.endContract,
      input: [],
    },
    {
      path: LockData,
      ...CONFIG.lockDataContract,
      input: [],
    },
    {
      path: EConsent,
      ...CONFIG.eConsentContract,
      input: [CONFIG.eligibilityCheckContract.address],
    },
    {
      path: RequestForData,
      ...CONFIG.requestForDataContract,
      input: [CONFIG.eConsentContract.address, CONFIG.lockDataContract.address],
    },
    {
      path: SubmitData,
      ...CONFIG.submitDataContract,
      input: [CONFIG.eConsentContract.address],
    },
    {
      path: View,
      ...CONFIG.viewContract,
      input: [CONFIG.requestForDataContract.address],
    },
  ];

  for (let i = 0; i < listContract.length; i++) {
    const contract = listContract[i];
    const contractSourceCode = await flattenContract(contract.path);
    const web3 = new Web3();
    const abiParams = web3.eth.abi
      .encodeParameters(contract.abi[0].inputs, contract.input)
      .replace("0x", "");
    await verifyRequest(
      contract.address,
      contract.contractName,
      contractSourceCode,
      abiParams
    );

    await delay(3000);
  }
}

main();
