// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../utils/ERC721Base.sol";
import "../interface/IMedicine.sol";

contract Prescription is ERC721Base {
    struct PrescriptionStruct {
        bool isPaid;
        uint256 dateCreated;
    }

    // address of Medicine Contract
    address private medicineAddress;
    // mapping token id to Prescription hash
    mapping(uint256 => PrescriptionStruct) private _prescriptionData;
    // mapping token id to list Question id of Prescription
    mapping(uint256 => uint256[]) private _medicineOfPrescription;

    constructor(address _authAddress, address _medicineAddress)
        ERC721Base("Prescription", "PSC", _authAddress)
    {
        medicineAddress = _medicineAddress;
    }

    function mint(string memory uri, uint256[] memory listId)
        public
        onlySubject
        returns (uint256)
    {
        uint256 tokenId = super.mint(uri);
        _prescriptionData[tokenId] = PrescriptionStruct(false, block.timestamp);
        _medicineOfPrescription[tokenId] = listId;
        IMedicine(medicineAddress).setLockMedicine(listId, msg.sender);

        return tokenId;
    }

    function setPaidPrescription(uint256 prescriptionId) public {
        _prescriptionData[prescriptionId].isPaid = true;
    }

    function getPrescription(uint256 prescriptionId)
        public
        view
        returns (PrescriptionStruct memory, uint256[] memory)
    {
        return (
            _prescriptionData[prescriptionId],
            _medicineOfPrescription[prescriptionId]
        );
    }
}
