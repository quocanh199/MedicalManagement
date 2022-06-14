// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../utils/ERC721Base.sol";
import "../interface/IPatient.sol";

contract Subject is ERC721Base, IPatient {
    struct PatientStruct {
        string name;
        string gender;
        string dateOfBirth;
        string patientAddress;
        string phoneNumber;
        uint256 dateCreated;
        uint256 dateModified;
    }

    address private visitAddress;
    // mapping token id to Subject hash
    mapping(uint256 => PatientStruct) private _patientData;
    // mapping token id to list Questionnaire id of Subject
    mapping(uint256 => uint256[]) private _visitOfPatient;

    mapping(string => uint256) private _idOfPatient;

    modifier onlyVisitContract() {
        require(
            msg.sender == visitAddress,
            "Restriction for only Visit address"
        );
        _;
    }

    constructor(address _authAddress, address _visitAddress)
        ERC721Base("Subject", "SB", _authAddress)
    {
        visitAddress = _visitAddress;
    }

    function mint(
        string memory name,
        string memory gender,
        string memory dateOfBirth,
        string memory patientAddress,
        string memory phoneNumber
    ) public onlyAdministrator returns (uint256) {
        uint256 tokenId = super.mint();
        _patientData[tokenId] = PatientStruct(
            name,
            gender,
            dateOfBirth,
            patientAddress,
            phoneNumber,
            block.timestamp,
            block.timestamp
        );

        _idOfPatient[phoneNumber] = tokenId;

        return tokenId;
    }

    function updateVisitOfPatient(uint256 patientId, uint256 visitId)
        external
        override
        onlyVisitContract
    {
        require(_exists(patientId), "Update for nonexistent token");
        _visitOfPatient[patientId].push(visitId);
        _patientData[patientId].dateModified = block.timestamp;
    }

    function getPatientFromPhone(string memory _phone)
        public
        view
        returns (uint256)
    {
        return _idOfPatient[_phone];
    }

    function getPatient(uint256 patientId)
        public
        view
        returns (PatientStruct memory, uint256[] memory)
    {
        return (_patientData[patientId], _visitOfPatient[patientId]);
    }
}
