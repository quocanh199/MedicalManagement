// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../utils/ERC721Base.sol";
import "../interface/ICheckPoint.sol";
import "../interface/IPatient.sol";
import "../interface/IVisit.sol";
import "../enum/ContractType.sol";
import "../enum/AuthType.sol";

contract Visit is ERC721Base, IVisit {
    address private patientAddress;

    address private prescriptionAddress;

    address private testResultAddress;

    address private authAddress;
    // mapping token id to Visit hash
    mapping(uint256 => uint256) private _visitCreatedTime;
    // mapping study id to its prescription
    mapping(uint256 => uint256) private _prescriptionOfVisit;
    // mapping study id to its test result
    mapping(uint256 => uint256[]) private _testResultOfVisit;

    constructor(address _authAddress) ERC721Base("Visit", "VST", _authAddress) {
        authAddress = _authAddress;
    }

    function mint(uint256 patientId)
        public
        restrictRole(AuthType.Admin)
        returns (uint256)
    {
        uint256 tokenId = super.mint();
        _visitCreatedTime[tokenId] = block.timestamp;

        IPatient(patientAddress).updateVisitOfPatient(patientId, tokenId);
        // ICheckPoint(checkPointAddress).addCheckPoint(msg.sender);

        return tokenId;
    }

    function updatePrescriptionOfVisit(uint256 visitId, uint256 prescriptionId)
        external
        override
        restrictContract(ContractType.Prescription)
    {
        _prescriptionOfVisit[visitId] = prescriptionId;
    }

    function updateTestResultOfVisit(uint256 visitId, uint256 testResultId)
        external
        override
        restrictContract(ContractType.TestResult)
    {
        _testResultOfVisit[visitId].push(testResultId);
    }

    function getVisit(uint256 visitId)
        public
        view
        returns (
            uint256,
            uint256,
            uint256[] memory
        )
    {
        return (
            _visitCreatedTime[visitId],
            _prescriptionOfVisit[visitId],
            _testResultOfVisit[visitId]
        );
    }

    function getAddress() public restrictRole(AuthType.Admin) {
        patientAddress = IAuthenticator(authAddress).getContractAddress(
            ContractType.Patient
        );
        prescriptionAddress = IAuthenticator(authAddress).getContractAddress(
            ContractType.Prescription
        );
        testResultAddress = IAuthenticator(authAddress).getContractAddress(
            ContractType.TestResult
        );
    }
}
