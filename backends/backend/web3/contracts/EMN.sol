// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.10;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

contract EMN is
    Initializable,
    OwnableUpgradeable,
    ERC721URIStorageUpgradeable,
    PausableUpgradeable
{
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter public _tokenIds;
    address contractAddress;
    uint256 cost;

    function initialize(
        address _marketContract,
        uint256 _cost
    ) public initializer {
        __ERC721_init("EMNMarket", "EMN");
        contractAddress = _marketContract;
        cost = _cost;
        __Ownable_init();
    }

    function setCost(uint256 _cost) public onlyOwner {
        cost = _cost;
    }

    function createNFT(
        string memory tokenURI
    ) public whenNotPaused returns (uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }

    function mintNFT(
        string memory tokenURI
    ) public payable whenNotPaused returns (uint) {
        require(msg.value == cost, "Need to send 0.075 ether!");

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        setApprovalForAll(contractAddress, true);
        return newItemId;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function withdraw() public payable onlyOwner {
        require(payable(msg.sender).send(address(this).balance));
    }
}
