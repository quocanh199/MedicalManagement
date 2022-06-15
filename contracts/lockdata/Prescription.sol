// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../utils/ERC721Base.sol";
import "../interface/IMedicine.sol";
import "../interface/IVisit.sol";
import "../interface/IAuthenticator.sol";
import "../enum/AuthType.sol";
import "../enum/ContractType.sol";

contract Prescription is ERC721Base {
    struct PrescriptionStruct {
        bool isPaid;
        uint256 dateCreated;
    }
    // address of Visit Contract
    address private visitAddress;

    // address of Medicine Contract
    address private medicineAddress;

    // address of Authentication Contract
    address private authAddress;

    // mapping token id to Prescription hash
    mapping(uint256 => PrescriptionStruct) private _prescriptionData;
    // mapping token id to list Question id of Prescription
    mapping(uint256 => uint256[]) private _medicineOfPrescription;

    constructor(address _authAddress)
        ERC721Base("Prescription", "PSC", _authAddress)
    {
        authAddress = _authAddress;
    }

    function mint(uint256[] memory listId, uint256 visitId)
        public
        restrictRole(AuthType.Doctor)
        returns (uint256)
    {
        uint256 tokenId = super.mint();
        _prescriptionData[tokenId] = PrescriptionStruct(false, block.timestamp);
        _medicineOfPrescription[tokenId] = listId;
        IMedicine(medicineAddress).setLockMedicine(listId, msg.sender);
        IVisit(visitAddress).updatePrescriptionOfVisit(visitId, tokenId);

        return tokenId;
    }

    function setPaidPrescription(uint256 prescriptionId)
        public
        restrictRole(AuthType.Pharma)
    {
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

    function getAddress() public restrictRole(AuthType.Admin) {
        medicineAddress = IAuthenticator(authAddress).getContractAddress(
            ContractType.Medicine
        );
        visitAddress = IAuthenticator(authAddress).getContractAddress(
            ContractType.Visit
        );
    }
}
