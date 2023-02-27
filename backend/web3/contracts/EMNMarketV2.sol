// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

contract EMNMarketV2 is
    Initializable,
    PausableUpgradeable,
    OwnableUpgradeable,
    ReentrancyGuardUpgradeable
{
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter private _itemIds;
    CountersUpgradeable.Counter private _itemsSold;

    address payable holder;
    uint256 listingFee;
    uint256 mintingFee;

    struct VaultItem {
        uint itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable holder;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => VaultItem) private idToVaultItem;

    event VaultItemCreated(
        uint indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address holder,
        uint256 price,
        bool sold
    );

    function initialize(
        uint128 _listingFee,
        uint128 _mintingFee
    ) public initializer {
        require(msg.sender != address(0), "Address cannot be the 0 address");
        require(_listingFee != 0, "Listing Fee cannot be zero");
        require(_mintingFee != 0, "Minting Fee cannot be zero");

        holder = payable(msg.sender);
        listingFee = _listingFee;
        mintingFee = _mintingFee;
        __Ownable_init();
    }

    function getListingFee() public view returns (uint256) {
        return listingFee;
    }

    function changeListingFee(uint128 _listingFee) public onlyOwner {
        require(_listingFee != 0, "Listing Fee cannot be zero");
        listingFee = _listingFee;
    }

    function changeMintingFee(uint128 _mintingFee) public onlyOwner {
        require(_mintingFee != 0, "Listing Fee cannot be zero");
        mintingFee = _mintingFee;
    }

    function createVaultItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant whenNotPaused {
        require(price > 0, "Price cannot be zero");
        require(msg.value == listingFee, "Price cannot be listing fee");

        _itemIds.increment();
        uint256 itemId = _itemIds.current();
        idToVaultItem[itemId] = VaultItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false
        );
        IERC721Upgradeable(nftContract).transferFrom(
            msg.sender,
            address(this),
            tokenId
        );
        emit VaultItemCreated(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );
    }

    function EMNMarketSale(
        address nftContract,
        uint256 itemId
    ) public payable nonReentrant {
        uint price = idToVaultItem[itemId].price;
        uint tokenId = idToVaultItem[itemId].tokenId;
        require(
            msg.value == price,
            "Not enough balance to complete transaction"
        );

        idToVaultItem[itemId].seller.transfer(msg.value);
        IERC721Upgradeable(nftContract).transferFrom(
            address(this),
            msg.sender,
            tokenId
        );
        idToVaultItem[itemId].holder = payable(msg.sender);
        idToVaultItem[itemId].sold = true;
        _itemsSold.increment();
        payable(holder).transfer(listingFee);
    }

    function getAvailableNft() public view returns (VaultItem[] memory) {
        uint itemCount = _itemIds.current();
        uint unsoldItemCount = _itemIds.current() - _itemsSold.current();
        uint currentIndex = 0;

        VaultItem[] memory items = new VaultItem[](unsoldItemCount);
        for (uint i = 0; i < itemCount; i++) {
            if (idToVaultItem[i + 1].holder == address(0)) {
                uint currentId = i + 1;
                VaultItem storage currentItem = idToVaultItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function getMyNft() public view returns (VaultItem[] memory) {
        uint totalItemCount = _itemIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToVaultItem[i + 1].holder == msg.sender) {
                itemCount += 1;
            }
        }

        VaultItem[] memory items = new VaultItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToVaultItem[i + 1].holder == msg.sender) {
                uint currentId = i + 1;
                VaultItem storage currentItem = idToVaultItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function getMyMarketNfts() public view returns (VaultItem[] memory) {
        uint totalItemCount = _itemIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToVaultItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        VaultItem[] memory items = new VaultItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToVaultItem[i + 1].seller == msg.sender) {
                uint currentId = i + 1;
                VaultItem storage currentItem = idToVaultItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function withdraw() public payable onlyOwner {
        require(payable(msg.sender).send(address(this).balance));
    }
}
