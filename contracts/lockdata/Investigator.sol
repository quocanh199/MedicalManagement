// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../utils/ERC721Base.sol";
import "../interface/IPCO.sol";
import "../interface/ISubject.sol";
import "../utils/PCO.sol";

contract Investigator is ERC721Base {
    // mapping token id to Subject hash
    mapping(uint256 => bytes32) private _investigatorHash;
    // mapping token id to list Questionnaire id of Subject
    mapping(uint256 => uint256[]) private _questionnaireOfInvestigator;

    // address private pcoAddress;

    constructor(address _authAddress)
        ERC721Base("Investigator", "IV", _authAddress)
    {
        // pcoAddress = _pcoAddress;
    }

    function mint(
        bytes32 hashValue,
        string memory uri,
        string memory data,
        uint256[] memory listId
    ) public onlyInvestigator returns (uint256) {
        require(
            keccak256(abi.encodePacked(data)) == hashValue,
            "Data Integrity fail"
        );
        uint256 tokenId = super.mint(uri);
        _investigatorHash[tokenId] = hashValue;
        _questionnaireOfInvestigator[tokenId] = listId;
        return tokenId;
    }

    function checkDataIntegrity(uint256 subjectId, bytes32 hashValue)
        public
        view
        returns (bool, uint256[] memory)
    {
        return (
            _investigatorHash[subjectId] == hashValue,
            _questionnaireOfInvestigator[subjectId]
        );
    }
}
