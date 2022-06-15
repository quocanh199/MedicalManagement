// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ISite {
    function updatePatientOfSite(uint256 siteId, uint256 patientId) external;
}
