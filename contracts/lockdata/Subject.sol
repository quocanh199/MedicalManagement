// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../utils/ERC721Base.sol";
import "../interface/IPCO.sol";
import "../interface/ISubject.sol";
import "../utils/PCO.sol";

contract Subject is ERC721Base, ISubject {
    mapping(uint256 => address) private _subjectAddress;
    // mapping token id to Subject hash
    mapping(uint256 => bytes32) private _subjectHash;
    // mapping token id to list Questionnaire id of Subject
    mapping(uint256 => uint256[]) private _questionnaireOfSubject;

    address private pcoAddress;

    constructor(address _authAddress, address _pcoAddress)
        ERC721Base("Subject", "SB", _authAddress)
    {
        pcoAddress = _pcoAddress;
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
        _subjectHash[tokenId] = hashValue;
        _questionnaireOfSubject[tokenId] = listId;

        IPCO(pcoAddress).awardSubject(msg.sender, LevelLock.Subject);
        _subjectAddress[tokenId] = msg.sender;

        return tokenId;
    }

    function checkDataIntegrity(uint256 subjectId, bytes32 hashValue)
        public
        view
        returns (bool, uint256[] memory)
    {
        return (
            _subjectHash[subjectId] == hashValue,
            _questionnaireOfSubject[subjectId]
        );
    }

    function getSubjectAddress(uint256 tokenId)
        external
        view
        override
        returns (address)
    {
        return _subjectAddress[tokenId];
    }
}
