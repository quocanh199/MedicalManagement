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
        string memory siteAddress
    ) public onlyAdministrator returns (uint256) {
        uint256 tokenId = super.mint(uri);
        _siteData[tokenId] = SiteStruct(name, siteAddress);

        return tokenId;
    }

    function updatePatientOfSite(uint256 siteId, uint256 patientId) public {
        _patientOfSite[siteId].push(patientId);
    }

    function getSite(uint256 siteId)
        public
        view
        returns (SiteStruct memory, uint256[] memory)
    {
        return (_siteData[siteId], _patientOfSite[siteId]);
    }
}
