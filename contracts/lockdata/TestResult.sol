// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../utils/ERC721Base.sol";

contract TestResult is ERC721Base {
    struct TestStruct {
        string name;
        string result;
        uint256 timeCreated;
    }
    // mapping token id to Subject hash
    mapping(uint256 => TestStruct) private _testResult;

    constructor(address _authAddress)
        ERC721Base("TestResult", "TR", _authAddress)
    {}

    function mint(string memory name, string memory result)
        public
        onlyInvestigator
        returns (uint256)
    {
        uint256 tokenId = super.mint(name);
        _testResult[tokenId] = TestStruct(name, result, block.timestamp);
        return tokenId;
    }

    function getTestResult(uint256 testId)
        public
        view
        returns (TestStruct memory)
    {
        return _testResult[testId];
    }
}
