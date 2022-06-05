// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IMedicine {
    function setLockMedicine(
        uint256[] memory medicineIds,
        address senderAddress
    ) external;
}
