// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IQuestion {
    function setLockQuestion(
        uint256[] memory questionIds,
        address senderAddress
    ) external;
}
