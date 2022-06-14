// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IPatient {
    function updateVisitOfPatient(uint256 patientId, uint256 visitId)
        external
}
