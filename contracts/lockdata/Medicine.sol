// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../utils/ERC721Base.sol";
import "../utils/PCO.sol";
import "../interface/IPCO.sol";
import "../interface/IMedicine.sol";
import "../enum/LevelLock.sol";

contract Medicine is ERC721Base, IMedicine {
    struct MedicineStruct {
        string name;
        uint256 amount;
    }
    // mappping Medicine root ID to its update history
    mapping(uint256 => uint256[]) _medicineHistory;
    // mapping token id to Medicine hash
    mapping(uint256 => MedicineStruct) private _medicineData;

    mapping(uint256 => bool) private _isMedicineHistory;

    mapping(uint256 => bool) private _isMedicineLocked;

    modifier _validMedicineList(
        uint256[] memory medicineIds,
        address senderAddress
    ) {
        for (uint256 i = 0; i < medicineIds.length; i++) {
            require(
                !_isMedicineLocked[medicineIds[i]],
                "Medicine is already locked"
            );
            require(
                ownerOf(medicineIds[i]) == senderAddress,
                "Not owner of Medicine"
            );
            require(
                !_isMedicineHistory[medicineIds[i]],
                "Cannot lock Medicine History"
            );
        }
        _;
    }

    constructor(address _authAddress)
        ERC721Base("Medicine", "MD", _authAddress)
    {}

    function mint(
        string memory name,
        uint256 amount,
        string memory uri
    ) public onlySubject returns (uint256) {
        uint256 tokenId = super.mint(uri);
        _medicineData[tokenId] = MedicineStruct(name, amount);
        _medicineHistory[tokenId].push(tokenId);
        _isMedicineHistory[tokenId] = false;

        return tokenId;
    }

    function updateMedicine(
        uint256 medicineId,
        string memory name,
        uint256 amount,
        string memory uri
    ) public onlySubject {
        require(
            !_isMedicineHistory[medicineId],
            "Cannot update Medicine History"
        );

        require(!_isMedicineLocked[medicineId], "Medicine is locked");

        require(
            ownerOf(medicineId) == _msgSender(),
            "Not the owner of the Medicine"
        );

        uint256 newMedicineId = super.mint(uri);
        _medicineData[newMedicineId] = MedicineStruct(name, amount);
        _medicineHistory[newMedicineId].push(newMedicineId);
        _isMedicineHistory[newMedicineId] = true;

        _medicineHistory[medicineId].push(newMedicineId);
    }

    function getMedicineHistory(uint256 medicineId)
        public
        view
        returns (uint256[] memory)
    {
        return _medicineHistory[medicineId];
    }

    function setLockMedicine(
        uint256[] memory medicineIds,
        address senderAddress
    ) external override _validMedicineList(medicineIds, senderAddress) {
        for (uint256 i = 0; i < medicineIds.length; i++) {
            _isMedicineLocked[medicineIds[i]] = true;
        }
    }

    function getMedicine(uint256 medicineId)
        public
        view
        returns (MedicineStruct memory)
    {
        return _medicineData[medicineId];
    }
}
