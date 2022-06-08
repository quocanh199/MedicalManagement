// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../utils/ERC721Base.sol";

contract Site is ERC721Base {
    struct SiteStruct {
        string name;
        string siteAddress;
    }
    // mapping token id to Site hash
    mapping(uint256 => SiteStruct) private _siteData;
    // mapping token
    mapping(uint256 => uint256[]) private _patientOfSite;

    constructor(address _authAddress) ERC721Base("Site", "ST", _authAddress) {}

    function mint(
        string memory uri,
        string memory name,
        string memory siteAddress,
        uint256[] memory listPatientOfSite
    ) public onlyAdministrator returns (uint256) {
        uint256 tokenId = super.mint(uri);
        _siteData[tokenId] = SiteStruct(name, siteAddress);
        _patientOfSite[tokenId] = listPatientOfSite;

        return tokenId;
    }

    function getSite(uint256 tokenId) public view returns (SiteStruct memory) {
        return _siteData[tokenId];
    }
}
