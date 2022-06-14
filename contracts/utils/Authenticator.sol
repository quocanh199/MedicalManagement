// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "../interface/IAuthenticator.sol";

contract Authenticator is IAuthenticator {
    mapping(address => AuthType) private _role;

    mapping(address => ContractType) private _contractType;
    mapping(ContractType => address) private _contractAddress;

    constructor() {
        _role[msg.sender] = AuthType.AD;
    }

    function createDID(address _address, AuthType authType) external {
        require(
            _role[msg.sender] == AuthType.AD,
            "Address is not administrator"
        );

        require(_address != address(0), "Address zero is not allowed");

        _role[_address] = authType;
    }

    function checkAuth(address _address)
        external
        view
        override
        returns (AuthType)
    {
        require(_address != address(0), "Address zero is not allowed");

        return _role[_address];
    }

    function getContractType(address _address)
        external
        view
        override
        returns (ContractType)
    {
        return _contractType[_address];
    }

    function getContractAddress(ContractType _type)
        external
        view
        override
        returns (address)
    {
        return _contractAddress[_type];
    }

    function setContractType(address _address, ContractType _type)
        external
        override
    {
        require(
            _role[msg.sender] == AuthType.AD,
            "Address is not administrator"
        );
        require(_address != address(0), "Address zero is not allowed");

        address oldAddress = _contractAddress[_type];
        _contractType[oldAddress] = ContractType.NONE;

        _contractAddress[_type] = _address;
        _contractType[_address] = _type;
    }
}

contract AuthenticatorHelper {
    IAuthenticator private _IAuth;

    constructor(address _authenticator) {
        require(_authenticator != address(0), "Address zero is not allowed");
        _IAuth = IAuthenticator(_authenticator);
    }

    // modifier onlyInvestigator() {
    //     require(
    //         _IAuth.checkAuth(msg.sender) == AuthType.IV,
    //         "Only investigator can call this function"
    //     );
    //     _;
    // }

    // modifier onlySubject() {
    //     require(
    //         _IAuth.checkAuth(msg.sender) == AuthType.SB,
    //         "Only subject can call this function"
    //     );
    //     _;
    // }

    // modifier onlyAdministrator() {
    //     require(
    //         _IAuth.checkAuth(msg.sender) == AuthType.AD,
    //         "Only administrator can call this function"
    //     );
    //     _;
    // }

    // modifier onlyDoctor() {
    //     require(
    //         _IAuth.checkAuth(msg.sender) == AuthType.DT,
    //         "Restriction for only Doctor"
    //     );
    //     _;
    // }

    modifier restrictRole(AuthType _type) {
        require(
            _IAuth.checkAuth(address(this)) == _type,
            "Restriction for only permitted role"
        );
        _;
    }

    modifier restrictContract(ContractType _type) {
        require(
            _IAuth.getContractType(address(this)) == _type,
            "Restriction for only permitted contract"
        );
        _;
    }
}
