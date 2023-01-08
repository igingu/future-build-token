// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FutureBuildToken is ERC20 {
  string constant TOKEN_NAME = "FutureBuildToken";
  string constant TOKEN_SYMBOL = "FTRTKN";
  uint8 constant DECIMALS = 21;

  uint256 constant INITIAL_SUPPLY_IN_TOKENS = 10**8;
  uint256 constant INITIAL_SUPPLY_IN_UNITS =
    INITIAL_SUPPLY_IN_TOKENS * (10**DECIMALS);

  constructor() ERC20(TOKEN_NAME, TOKEN_SYMBOL) {
    _mint(msg.sender, INITIAL_SUPPLY_IN_UNITS);
  }

  function decimals() public view virtual override returns (uint8) {
    return DECIMALS;
  }
}
