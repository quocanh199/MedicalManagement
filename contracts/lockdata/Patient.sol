// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../utils/ERC721Base.sol";
import "../interface/IPatient.sol";
import "../interface/ISite.sol";
import "../enum/AuthType.sol";
import "../enum/ContractType.sol";

contract Patient is ERC721Base, IPatient {
    struct PatientStruct {
        string name;
        string gender;
        string dateOfBirth;
        string patientAddress;
        string phoneNumber;
        uint256 dateCreated;
        uint256 dateModified;
    }

    address private authAddress;
    address private visitAddress;
    address private siteAddress;
    // mapping token id to Subject hash
    mapping(uint256 => PatientStruct) private _patientData;
    // mapping token id to list Questionnaire id of Subject
    mapping(uint256 => uint256[]) private _visitOfPatient;

    mapping(string => uint256) private _idOfPatient;

    constructor(address _authAddress)
        ERC721Base("Patient", "PT", _authAddress)
    {
        authAddress = _authAddress;
    }

    function mint(
        string memory name,
        string memory gender,
        string memory dateOfBirth,
        string memory patientAddress,
        string memory phoneNumber,
        uint256 siteId
    ) public restrictRole(AuthType.Admin) returns (uint256) {
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
        ISite(siteAddress).updatePatientOfSite(siteId, tokenId);
        return tokenId;
    }

    function updateVisitOfPatient(uint256 patientId, uint256 visitId)
        external
        override
        restrictContract(ContractType.Visit)
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

    function getAddress() public restrictRole(AuthType.Admin) {
        siteAddress = Authenticator(authAddress).getContractAddress(
            ContractType.Site
        );
    }
}
