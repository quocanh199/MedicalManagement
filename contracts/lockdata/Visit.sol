// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../utils/ERC721Base.sol";
import "../interface/ICheckPoint.sol";
import "../interface/IPatient.sol";

contract Visit is ERC721Base {
    address private patientAddress;
    // address of CheckPoint contract
    address private checkPointAddress;

    address private prescriptionAddress;

    address private testResultAddress;

    // mapping token id to Visit hash
    mapping(uint256 => uint256) private _visitCreatedTime;
    // mapping study id to its prescription
    mapping(uint256 => uint256) private _prescriptionOfVisit;
    // mapping study id to its test result
    mapping(uint256 => uint256[]) private _testResultOfVisit;

    constructor(address _authAddress, address _checkPointAddress)
        ERC721Base("Visit", "VST", _authAddress)
    {
        checkPointAddress = _checkPointAddress;
    }

    function mint(uint256 patientId)
        public
        onlyAdministrator
        returns (uint256)
    {
        uint256 tokenId = super.mint();
        _visitCreatedTime[tokenId] = block.timestamp;

        IPatient(patientAddress).updateVisitOfPatient(patientId, tokenId);
        // ICheckPoint(checkPointAddress).addCheckPoint(msg.sender);

        return tokenId;
    }

    function updatePrescriptionOfVisit(uint256 visitId, uint256 prescriptionId)
        public
    {
        _prescriptionOfVisit[visitId] = prescriptionId;
    }

    function updateTestResultOfVisit(uint256 visitId, uint256 testResultId)
        public
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

    function setPatientContractAddress(address _patientAddress)
        public
        onlyAdministrator
    {
        patientAddress = _patientAddress;
    }
}
