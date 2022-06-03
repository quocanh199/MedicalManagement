// Sources flattened with hardhat v2.9.5 https://hardhat.org

// File contracts/chronology/LockData.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ILockData {
    function getLockData(
        address subjectDID,
        address siteDID,
        address studyDID
    ) external view returns (bool);

    event LockData(bool indexed status);
}

contract LockDataContract is ILockData {
    // mapping subjectDID => (siteDID => (studyDID => lockDataStatus))
    mapping(address => mapping(address => mapping(address => bool)))
        private _lockDataStatus;

    constructor() {}

    function _lockData(
        address subjectDID,
        address siteDID,
        address studyDID,
        bool logicCheck,
        bool compareLockData
    ) public {
        _lockDataStatus[subjectDID][siteDID][studyDID] = (logicCheck &&
            compareLockData);
        emit LockData(_lockDataStatus[subjectDID][siteDID][studyDID]);
    }

    function getLockData(
        address subjectDID,
        address siteDID,
        address studyDID
    ) external view override returns (bool) {
        return _lockDataStatus[subjectDID][siteDID][studyDID];
    }
}


// File contracts/enum/EligibilityStatus.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

enum EligibilityStatus {
    NG,
    GO
}


// File contracts/enum/EConsentStatus.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

enum EConsentStatus {
    COMP,
    SSI
}


// File contracts/utils/ArrayHelper.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ArrayHelper {
    function removeArrayByValue(
        uint256 _valueToFindAndRemove,
        uint256[] memory _array
    ) internal pure returns (uint256[] memory) {
        uint256 idxFound = 0;
        bool isDeleted = false;
        for (uint256 i = 0; i < _array.length; i++)
            if (_array[i] == _valueToFindAndRemove) {
                delete _array[i];
                idxFound = i;
                isDeleted = true;
                break;
            }

        if (isDeleted) {
            for (uint256 i = idxFound; i < _array.length - 1; i++) {
                _array[i] = _array[i + 1];
            }
            assembly {
                mstore(_array, sub(mload(_array), 1))
            }
        }

        return _array;
    }

    function arrayComparision(bytes32[] memory array1, bytes32[] memory array2)
        public
        pure
        returns (bool)
    {
        if (array1.length != array2.length) {
            return false;
        } else {
            for (uint256 i = 0; i < array1.length; i++) {
                if (array1[i] != array2[i]) return false;
            }
            return true;
        }
    }

    function _checkInclude(string memory element, string[] memory arr)
        public
        pure
        returns (bool)
    {
        for (uint256 i = 0; i < arr.length; i++) {
            if (_compareStrings(element, arr[i])) {
                return true;
            }
        }
        return false;
    }

    function _compareStrings(string memory a, string memory b)
        public
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked(a)) ==
            keccak256(abi.encodePacked(b)));
    }
}


// File contracts/chronology/EligibilityCheck.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface IEligibilityCheck {
    event EligibilityCheck(EligibilityStatus status);

    function getEligibilityStatus(address subjectDID)
        external
        view
        returns (EligibilityStatus);
}

contract EligibilityCheckContract is IEligibilityCheck, ArrayHelper {
    mapping(address => EligibilityStatus) _eligibilityStatus;

    constructor() {}

    function _eligibilityCheck(
        string[] memory inclusion,
        string[] memory exclusion,
        address subjectDID,
        string[] memory subjectData
    ) public returns (EligibilityStatus) {
        for (uint256 i = 0; i < inclusion.length; i++) {
            if (!_checkInclude(inclusion[i], subjectData)) {
                _eligibilityStatus[subjectDID] = EligibilityStatus.NG;
                emit EligibilityCheck(_eligibilityStatus[subjectDID]);
                return EligibilityStatus.NG;
            }
        }
        for (uint256 i = 0; i < exclusion.length; i++) {
            if (_checkInclude(exclusion[i], subjectData)) {
                _eligibilityStatus[subjectDID] = EligibilityStatus.NG;
                emit EligibilityCheck(_eligibilityStatus[subjectDID]);
                return _eligibilityStatus[subjectDID];
            }
        }
        _eligibilityStatus[subjectDID] = EligibilityStatus.GO;
        emit EligibilityCheck(_eligibilityStatus[subjectDID]);
        return _eligibilityStatus[subjectDID];
    }

    function getEligibilityStatus(address subjectDID)
        external
        view
        override
        returns (EligibilityStatus)
    {
        return _eligibilityStatus[subjectDID];
    }
}


// File contracts/chronology/EConsent.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;



interface IeConsent {
    function getEConsent(address subjectDID)
        external
        view
        returns (EConsentStatus);

    event eConsent(EConsentStatus status);
}

contract EConsentContract is IeConsent {
    address private _eligibilityAddress;

    // mapping(address => bool) _subjectSSISign;

    mapping(address => EConsentStatus) _eConsentStatus;

    constructor(address eligibilityAddress) {
        _eligibilityAddress = eligibilityAddress;
    }

    function checkEligibility(address subjectDID) private view returns (bool) {
        EligibilityStatus status = IEligibilityCheck(_eligibilityAddress)
            .getEligibilityStatus(subjectDID);
        if (status == EligibilityStatus.NG) return false;
        return true;
    }

    function _EConsent(address subjectDID, bool isSSISign) public {
        // _subjectSSISign[subjectDID] = isSSISign;
        _eConsentStatus[subjectDID] = (isSSISign)
            ? EConsentStatus.SSI
            : EConsentStatus.COMP;

        emit eConsent(_eConsentStatus[subjectDID]);
    }

    function getEConsent(address subjectDID)
        external
        view
        override
        returns (EConsentStatus)
    {
        return _eConsentStatus[subjectDID];
    }
}


// File contracts/enum/RequestForDataStatus.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

enum RequestForDataStatus {
    APPROVE,
    REQUEST,
    REJECT
}


// File contracts/chronology/RequestForData.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;




interface IRequestForData {
    function getRequestDataStatus(
        address subjectDID,
        address siteDID,
        address studyDID
    ) external view returns (RequestForDataStatus);

    event RequestForData(RequestForDataStatus status);
}

contract RequestForDataContract is IRequestForData {
    // mapping subjectDID => request for data status
    mapping(address => mapping(address => mapping(address => RequestForDataStatus)))
        private _requestForDataStatus;

    address private _eConsentAddress;
    address private _lockDataAddress;

    constructor(address eConsentAddress, address lockDataAddress) {
        _eConsentAddress = eConsentAddress;
        _lockDataAddress = lockDataAddress;
    }

    function _requestForData(
        address subjectDID,
        address siteDID,
        address studyDID
    ) public {
        bool lockDataStatus_ = ILockData(_lockDataAddress).getLockData(
            subjectDID,
            siteDID,
            studyDID
        );
        EConsentStatus eConsentStatus_ = IeConsent(_eConsentAddress)
            .getEConsent(subjectDID);
        if (lockDataStatus_) {
            _requestForDataStatus[subjectDID][siteDID][
                studyDID
            ] = (eConsentStatus_ == EConsentStatus.COMP)
                ? RequestForDataStatus.APPROVE
                : RequestForDataStatus.REQUEST;
        } else {
            _requestForDataStatus[subjectDID][siteDID][
                studyDID
            ] = RequestForDataStatus.REJECT;
        }
        emit RequestForData(
            _requestForDataStatus[subjectDID][siteDID][studyDID]
        );
    }

    function requestHandler(
        address subjectDID,
        address siteDID,
        address studyDID,
        bool isApprove
    ) public {
        require(
            _requestForDataStatus[subjectDID][siteDID][studyDID] ==
                RequestForDataStatus.REQUEST,
            "subject DID have no Request to be Approved"
        );
        _requestForDataStatus[subjectDID][siteDID][studyDID] = (isApprove)
            ? RequestForDataStatus.APPROVE
            : RequestForDataStatus.REJECT;

        emit RequestForData(
            _requestForDataStatus[subjectDID][siteDID][studyDID]
        );
    }

    function getRequestDataStatus(
        address subjectDID,
        address siteDID,
        address studyDID
    ) external view override returns (RequestForDataStatus) {
        return _requestForDataStatus[subjectDID][siteDID][studyDID];
    }
}


// File contracts/chronology/View.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface IView {
    event View(bool status);
}

contract ViewContract is IView {
    address private _requestForDataAddress;

    constructor(address requestForDataAddress) {
        _requestForDataAddress = requestForDataAddress;
    }

    function _view(
        address subjectDID,
        address siteDID,
        address studyDID
    ) public {
        emit View(
            (IRequestForData(_requestForDataAddress).getRequestDataStatus(
                subjectDID,
                siteDID,
                studyDID
            ) == RequestForDataStatus.APPROVE)
                ? true
                : false
        );
    }
}
