// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../utils/ERC721Base.sol";

contract Site is ERC721Base {
    // mapping token id to Site hash
    mapping(uint256 => bytes32) private _siteHash;
    // mapping token
    mapping(uint256 => uint256[]) private _subjectOfSite;

    mapping(uint256 => uint256[]) private _investigatorOfSite;

    constructor(address _authAddress) ERC721Base("Site", "ST", _authAddress) {}

    function mint(
        bytes32 hashValue,
        string memory uri,
        string memory data,
        uint256[] memory listSubjectOfSite,
        uint256[] memory listInvestigatorOfSite
    ) public onlyAdministrator returns (uint256) {
        require(
            keccak256(abi.encodePacked(data)) == hashValue,
            "Data Integrity fail"
        );
        uint256 tokenId = super.mint(uri);
        _siteHash[tokenId] = hashValue;
        _subjectOfSite[tokenId] = listSubjectOfSite;
        _investigatorOfSite[tokenId] = listInvestigatorOfSite;

        return tokenId;
    }

    function checkDataIntegrity(uint256 siteId, bytes32 hashValue)
        public
        view
        returns (
            bool,
            uint256[] memory,
            uint256[] memory
        )
    {
        return (
            _siteHash[siteId] == hashValue,
            _subjectOfSite[siteId],
            _investigatorOfSite[siteId]
        );
    }
}
