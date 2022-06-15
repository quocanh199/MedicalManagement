// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../utils/ERC721Base.sol";
import "../interface/IVisit.sol";
import "../enum/ContractType.sol";
import "../enum/AuthType.sol";

contract TestResult is ERC721Base {
    address private visitAddress;
    address private authAddress;

    struct TestStruct {
        string name;
        string result;
        uint256 timeCreated;
    }
    // mapping token id to Subject hash
    mapping(uint256 => TestStruct) private _testResult;

    constructor(address _authAddress)
        ERC721Base("TestResult", "TR", _authAddress)
    {
        authAddress = _authAddress;
    }

    function mint(
        string memory name,
        string memory result,
        uint256 visitId
    ) public restrictRole(AuthType.Doctor) returns (uint256) {
        uint256 tokenId = super.mint();
        _testResult[tokenId] = TestStruct(name, result, block.timestamp);
        IVisit(visitAddress).updateTestResultOfVisit(visitId, tokenId);
        return tokenId;
    }

    function getTestResult(uint256 testId)
        public
        view
        returns (TestStruct memory)
    {
        return _testResult[testId];
    }

    function getAddress() public {
        visitAddress = IAuthenticator(authAddress).getContractAddress(
            ContractType.Visit
        );
    }
}
