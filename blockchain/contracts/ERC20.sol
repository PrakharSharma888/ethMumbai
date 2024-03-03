// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract MyToken is ERC20, ERC20Burnable{
    constructor(address initialOwner)
        ERC20("MyToken", "MTK")
    {}

    function mint(address to, uint256 amount) public{
        _mint(to, amount);
    }
}
