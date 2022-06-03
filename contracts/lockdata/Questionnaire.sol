// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../utils/ERC721Base.sol";
import "../interface/IPCO.sol";
import "../utils/PCO.sol";
import "../interface/IQuestion.sol";

contract Questionnaire is ERC721Base {
    address private pcoAddress;

    address private questionAddress;
    // mapping token id to Questionnaire hash
    mapping(uint256 => bytes32) private _questionnaireHash;
    // mapping token id to list Question id of Questionnaire
    mapping(uint256 => uint256[]) private _questionOfQuestionnaire;

    constructor(
        address _authAddress,
        address _pcoAddress,
        address _questionAddress
    ) ERC721Base("Questionnaire", "QSN", _authAddress) {
        pcoAddress = _pcoAddress;
        questionAddress = _questionAddress;
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
        _questionnaireHash[tokenId] = hashValue;
        _questionOfQuestionnaire[tokenId] = listId;
        IPCO(pcoAddress).awardSubject(msg.sender, LevelLock.Questionnaire);
        IQuestion(questionAddress).setLockQuestion(listId, msg.sender);

        return tokenId;
    }

    function checkDataIntegrity(uint256 questionaireId, bytes32 hashValue)
        public
        view
        returns (bool, uint256[] memory)
    {
        return (
            _questionnaireHash[questionaireId] == hashValue,
            _questionOfQuestionnaire[questionaireId]
        );
    }
}
