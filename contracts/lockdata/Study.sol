// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../utils/ERC721Base.sol";

contract Study is ERC721Base {
    // mapping token id to Study hash
    mapping(uint256 => bytes32) private _studyHash;
    // mapping study id to its site
    mapping(uint256 => uint256[]) private _siteOfStudy;

    constructor(address _authAddress)
        ERC721Base("Study", "STD", _authAddress)
    {}

    function mint(
        bytes32 hashValue,
        string memory uri,
        string memory data,
        uint256[] memory listSiteOfStudy
    ) public onlyAdministrator returns (uint256) {
        require(
            keccak256(abi.encodePacked(data)) == hashValue,
            "Data Integrity fail"
        );
        uint256 tokenId = super.mint(uri);
        _studyHash[tokenId] = hashValue;
        _siteOfStudy[tokenId] = listSiteOfStudy;

        return tokenId;
    }

    function checkDataIntegrity(uint256 studyId, bytes32 hashValue)
        public
        view
        returns (bool, uint256[] memory)
    {
        return (_studyHash[studyId] == hashValue, _siteOfStudy[studyId]);
    }
}
