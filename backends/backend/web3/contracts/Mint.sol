// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract Mint is Ownable, ERC721URIStorage, Pausable {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;
    address contractAddress;
    uint256 cost;

    constructor(address _marketContract, uint256 _cost) ERC721("Mint", "EMN") {
        contractAddress = _marketContract;
        cost = _cost;
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
