// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../interface/IPCO.sol";
import "./Authenticator.sol";

contract PCO is ERC20, IPCO, AuthenticatorHelper {
    uint256 private _awardQuestionValue;
    uint256 private _awardQuestionnaireValue;
    uint256 private _awardSubjectValue;
    uint256 private _awardInvestigatorValue;
    address private _ownerAddress;

    address private _questionContractAddress;
    address private _questionnaireContractAddress;
    address private _subjectContractAddress;
    address private _investigatorContractAddress;

    modifier onlyContract(LevelLock _levelLock) {
        address levelLockAddress;
        if (_levelLock == LevelLock.Question) {
            levelLockAddress = _questionContractAddress;
        } else if (_levelLock == LevelLock.Questionnaire) {
            levelLockAddress = _questionnaireContractAddress;
        } else if (_levelLock == LevelLock.Subject) {
            levelLockAddress = _subjectContractAddress;
        } else if (_levelLock == LevelLock.Investigator) {
            levelLockAddress = _investigatorContractAddress;
        }
        require(
            _msgSender() == levelLockAddress,
            "Sender not match to level lock contract"
        );
        _;
    }

    constructor(address _authAddress)
        ERC20("Pico", "PCO")
        AuthenticatorHelper(_authAddress)
    {
        _ownerAddress = _msgSender();
        _mint(_ownerAddress, 10000000000000000 ether);
        approve(address(this), totalSupply());
    }

    function setQuestionAwardValue(uint256 _value) public onlyAdministrator {
        _awardQuestionValue = _value;
    }

    function setQuestionnaireAwardValue(uint256 _value)
        public
        onlyAdministrator
    {
        _awardQuestionnaireValue = _value;
    }

    function setSubjectAwardValue(uint256 _value) public onlyAdministrator {
        _awardSubjectValue = _value;
    }

    function setInvestigatorAwardValue(uint256 _value)
        public
        onlyAdministrator
    {
        _awardInvestigatorValue = _value;
    }

    function setQuestionContractAddress(address _address)
        public
        onlyAdministrator
    {
        _questionContractAddress = _address;
    }

    function setQuestionnaireContractAddress(address _address)
        public
        onlyAdministrator
    {
        _questionnaireContractAddress = _address;
    }

    function setSubjectContractAddress(address _address)
        public
        onlyAdministrator
    {
        _subjectContractAddress = _address;
    }

    function setInvestigatorContractAddress(address _address)
        public
        onlyAdministrator
    {
        _investigatorContractAddress = _address;
    }

    function awardSubject(address sbAddress, LevelLock levelLock)
        external
        override
        onlyContract(levelLock)
    {
        require(sbAddress != address(this), "Cannot award yourself");

        if (LevelLock.Question == levelLock) {
            _approve(
                _ownerAddress,
                _questionContractAddress,
                _awardQuestionValue
            );
            transferFrom(_ownerAddress, sbAddress, _awardQuestionValue);
        } else if (LevelLock.Questionnaire == levelLock) {
            _approve(_ownerAddress, _msgSender(), _awardQuestionnaireValue);
            transferFrom(_ownerAddress, sbAddress, _awardQuestionnaireValue);
        } else if (LevelLock.Subject == levelLock) {
            _approve(_ownerAddress, _msgSender(), _awardSubjectValue);
            transferFrom(_ownerAddress, sbAddress, _awardSubjectValue);
        } else if (LevelLock.Investigator == levelLock) {
            _approve(_ownerAddress, _msgSender(), _awardInvestigatorValue);
            transferFrom(_ownerAddress, sbAddress, _awardInvestigatorValue);
        }
    }
}
