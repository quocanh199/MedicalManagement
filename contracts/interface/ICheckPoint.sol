// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "../enum/LevelLock.sol";

interface ICheckPoint {
    function addCheckPoint(address sbAddress) external;
}
