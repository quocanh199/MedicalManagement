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
