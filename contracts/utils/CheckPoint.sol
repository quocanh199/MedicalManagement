// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../interface/ICheckPoint.sol";
import "./Authenticator.sol";

contract PCO is ERC20, ICheckPoint, AuthenticatorHelper {
    address private _ownerAddress;
    address private _visitContractAddress;

    modifier onlyContract() {
        require(
            _msgSender() == _visitContractAddress,
            "Sender is not Visit contract"
        );
        _;
    }

    constructor(address _authAddress)
        ERC20("CheckPoint", "CKP")
        AuthenticatorHelper(_authAddress)
    {
        _ownerAddress = _msgSender();
        _mint(_ownerAddress, 10000000000000000 ether);
        approve(address(this), totalSupply());
    }

    function setVisitContractAddress(address _address)
        public
        restrictRole(AuthType.AD)
    {
        _visitContractAddress = _address;
    }

    function addCheckPoint(address sbAddress) external override onlyContract {
        require(sbAddress != address(this), "Cannot award yourself");
        _approve(_ownerAddress, _visitContractAddress, 1);
        transferFrom(_ownerAddress, sbAddress, 1);
    }
}
