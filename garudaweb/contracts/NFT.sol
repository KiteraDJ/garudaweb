// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("MyNFT", "NFT") {}

    function mintNFT(address recipient, string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId=_tokenIds.current();
        _mint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        return newTokenId;
    }
}