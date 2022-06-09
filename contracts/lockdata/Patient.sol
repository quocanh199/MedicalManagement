// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../utils/ERC721Base.sol";

contract Subject is ERC721Base {
    struct PatientStruct {
        string name;
        string gender;
        string dateOfBirth;
        string patientAddress;
        string phoneNumber;
        uint256 dateCreated;
        uint256 dateModified;
    }
    // mapping token id to Subject hash
    mapping(uint256 => PatientStruct) private _patientData;
    // mapping token id to list Questionnaire id of Subject
    mapping(uint256 => uint256[]) private _visitOfPatient;

    constructor(address _authAddress)
        ERC721Base("Subject", "SB", _authAddress)
    {}

    function mint(
        string memory name,
        string memory gender,
        string memory dateOfBirth,
        string memory patientAddress,
        string memory phoneNumber,
        string memory uri
    ) public onlySubject returns (uint256) {
        uint256 tokenId = super.mint(uri);
        _patientData[tokenId] = PatientStruct(
            name,
            gender,
            dateOfBirth,
            patientAddress,
            phoneNumber,
            block.timestamp,
            block.timestamp
        );
        return tokenId;
    }

    function updateVisitOfPatient(uint256 patientId, uint256 visitId) public {
        // code for check existence token

        _visitOfPatient[patientId].push(visitId);
        _patientData[patientId].dateModified = block.timestamp;
    }

    function getPatient(uint256 patientId)
        public
        view
        returns (PatientStruct memory, uint256[] memory)
    {
        return (_patientData[patientId], _visitOfPatient[patientId]);
    }
}
