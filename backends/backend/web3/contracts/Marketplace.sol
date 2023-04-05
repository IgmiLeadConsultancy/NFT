// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract MarketPlace is Pausable, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;

    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    address payable holder;
    uint256 listingFee;

    struct VaultItem {
        uint itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable holder;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => VaultItem) public idToVaultItem;

    event VaultItemCreated(
        uint indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address holder,
        uint256 price,
        bool sold
    );

    event MarketSale(
        address indexed nftContract,
        uint256 indexed tokenId,
        uint256 indexed price,
        address seller,
        address holder
    );

    constructor(uint256 _listingFee) {
        require(msg.sender != address(0), "Address cannot be the 0 address");
        require(_listingFee != 0, "Listing Fee cannot be zero");

        holder = payable(msg.sender);
        listingFee = _listingFee;
    }

    function getListingFee() public view returns (uint256) {
        return listingFee;
    }

    function changeListingFee(
        uint128 _listingFee
    ) public onlyOwner whenNotPaused {
        require(_listingFee != 0, "Listing Fee cannot be zero");
        listingFee = _listingFee;
    }

    function createVaultItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant whenNotPaused {
        require(price > 0, "Price cannot be zero");
        require(msg.value == listingFee, "Price cannot be listing fee");

        address owner = IERC721(nftContract).ownerOf(tokenId);
        require(owner == msg.sender);

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
        IERC721(nftContract).transferFrom(owner, address(this), tokenId);
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
    ) public payable nonReentrant whenNotPaused {
        uint price = idToVaultItem[itemId].price;
        uint tokenId = idToVaultItem[itemId].tokenId;
        require(
            msg.value == price,
            "Not enough balance to complete transaction"
        );

        idToVaultItem[itemId].seller.transfer(msg.value);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        idToVaultItem[itemId].holder = payable(msg.sender);
        idToVaultItem[itemId].sold = true;
        _itemsSold.increment();
        payable(holder).transfer(listingFee);

        emit MarketSale(
            nftContract,
            tokenId,
            price,
            idToVaultItem[itemId].seller,
            idToVaultItem[itemId].holder
        );
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

    function cancelSale(uint256 tokenId) public nonReentrant whenNotPaused {
        require(idToVaultItem[tokenId].seller == msg.sender, "NFT not yours");

        IERC721(idToVaultItem[tokenId].nftContract).transferFrom(
            address(this),
            msg.sender,
            tokenId
        );
        delete idToVaultItem[tokenId];
    }

    function pause() public onlyOwner whenNotPaused {
        _pause();
    }

    function unpause() public onlyOwner whenPaused {
        _unpause();
    }

    function withdraw() public payable onlyOwner {
        require(payable(msg.sender).send(address(this).balance));
    }
}
