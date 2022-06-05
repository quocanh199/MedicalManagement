// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "../interface/IAuthenticator.sol";

contract Authenticator is IAuthenticator {
    mapping(address => bool) private _subject;
    mapping(address => bool) private _administrator;
    mapping(address => bool) private _investigator;

    constructor() {
        _administrator[msg.sender] = true;
    }

    function createDID(address _address, AuthType authType) external {
        require(_address != address(0), "Address zero is not allowed");
        require(
            _administrator[msg.sender] == true,
            "Address is not administrator"
        );
        if (_subject[_address] && authType != AuthType.SB)
            _subject[_address] = false;
        if (_administrator[_address] && authType != AuthType.AD)
            _administrator[_address] = false;
        if (_investigator[_address] && authType != AuthType.IV)
            _investigator[_address] = false;

        if (authType == AuthType.SB) _subject[_address] = true;
        else if (authType == AuthType.AD) _administrator[_address] = true;
        else if (authType == AuthType.IV) _investigator[_address] = true;
    }

    function checkAuth(address _address)
        external
        view
        override
        returns (AuthType)
    {
        require(_address != address(0), "Address zero is not allowed");
        if (_subject[_address]) return AuthType.SB;
        else if (_administrator[_address]) return AuthType.AD;
        else if (_investigator[_address]) return AuthType.IV;
        else return AuthType.NONE;
    }
}

contract AuthenticatorHelper {
    IAuthenticator private _IAuth;

    constructor(address _authenticator) {
        require(_authenticator != address(0), "Address zero is not allowed");
        _IAuth = IAuthenticator(_authenticator);
    }

    modifier onlyInvestigator() {
        require(
            _IAuth.checkAuth(msg.sender) == AuthType.IV,
            "Only investigator can call this function"
        );
        _;
    }

    modifier onlySubject() {
        require(
            _IAuth.checkAuth(msg.sender) == AuthType.SB,
            "Only subject can call this function"
        );
        _;
    }

    modifier onlyAdministrator() {
        require(
            _IAuth.checkAuth(msg.sender) == AuthType.AD,
            "Only administrator can call this function"
        );
        _;
    }
}
