// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../utils/ERC721Base.sol";
import "../interface/IMedicine.sol";

contract Prescription is ERC721Base {
    address private pcoAddress;

    address private medicineAddress;
    // mapping token id to Prescription hash
    mapping(uint256 => bytes32) private _prescriptionHash;
    // mapping token id to list Question id of Prescription
    mapping(uint256 => uint256[]) private _medicineOfPrescription;

    mapping(uint256 => bool) private _isPaid;

    constructor(address _authAddress, address _medicineAddress)
        ERC721Base("Prescription", "PSC", _authAddress)
    {
        medicineAddress = _medicineAddress;
    }

    function mint(
        bytes32 hashValue,
        string memory uri,
        string memory data,
        uint256[] memory listId
    ) public onlySubject returns (uint256) {
        require(
            keccak256(abi.encodePacked(data)) == hashValue,
            "Data Integrity fail"
        );
        uint256 tokenId = super.mint(uri);
        _prescriptionHash[tokenId] = hashValue;
        _medicineOfPrescription[tokenId] = listId;
        IMedicine(medicineAddress).setLockMedcine(listId, msg.sender);

        return tokenId;
    }

    function setPaidPrescription(uint256 medicineId) public {
        _isPaid[medicineId] = true;
    }
}
