// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IVisit {
    function updatePrescriptionOfVisit(uint256 visitId, uint256 prescriptionId)
        external;

    function updateTestResultOfVisit(uint256 visitId, uint256 testResultId)
        external;
}
