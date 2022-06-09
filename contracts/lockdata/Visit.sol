// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../utils/ERC721Base.sol";
import "../interface/ICheckPoint.sol";

contract Visit is ERC721Base {
    struct VisitStruct {
        uint256 timeCreated;
        uint256 fee;
    }
    // address of CheckPoint contract
    address private checkPointAddress;
    // mapping token id to Visit hash
    mapping(uint256 => VisitStruct) private _visitData;
    // mapping study id to its prescription
    mapping(uint256 => uint256) private _prescriptionOfVisit;
    // mapping study id to its test result
    mapping(uint256 => uint256[]) private _testResultOfVisit;

    constructor(address _authAddress, address _checkPointAddress)
        ERC721Base("Visit", "VST", _authAddress)
    {
        checkPointAddress = _checkPointAddress;
    }

    function mint(
        uint256 fee,
        string memory uri,
        uint256 listPrescriptionOfVisit,
        uint256[] memory listTestResultOfVisit
    ) public onlyAdministrator returns (uint256) {
        uint256 tokenId = super.mint(uri);
        _visitData[tokenId] = VisitStruct(block.timestamp, fee);

        _prescriptionOfVisit[tokenId] = _prescriptionOfVisit[
            tokenId
        ] = listPrescriptionOfVisit;

        _testResultOfVisit[tokenId] = _testResultOfVisit[
            tokenId
        ] = listTestResultOfVisit;

        ICheckPoint(checkPointAddress).addCheckPoint(msg.sender);

        return tokenId;
    }

    function getVisit(uint256 visitId)
        public
        view
        returns (
            VisitStruct memory,
            uint256,
            uint256[] memory
        )
    {
        return (
            _visitData[visitId],
            _prescriptionOfVisit[visitId],
            _testResultOfVisit[visitId]
        );
    }
}
