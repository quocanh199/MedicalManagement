// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../utils/ERC721Base.sol";
import "../interface/ISite.sol";

contract Site is ERC721Base, ISite {
    struct SiteStruct {
        string name;
        string siteAddress;
    }

    address private authAddress;
    // mapping token id to Site hash
    mapping(uint256 => SiteStruct) private _siteData;
    // mapping token
    mapping(uint256 => uint256[]) private _patientOfSite;

    constructor(address _authAddress) ERC721Base("Site", "ST", _authAddress) {
        authAddress = _authAddress;
    }

    function mint(string memory name, string memory siteAddress)
        public
        restrictRole(AuthType.Admin)
        returns (uint256)
    {
        uint256 tokenId = super.mint();
        _siteData[tokenId] = SiteStruct(name, siteAddress);

        return tokenId;
    }

    function updatePatientOfSite(uint256 siteId, uint256 patientId)
        external
        override
        restrictContract(ContractType.Patient)
    {
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
