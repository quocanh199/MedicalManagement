// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ISubject {
    function getSubjectAddress(uint256 tokenId) external view returns (address);
}
