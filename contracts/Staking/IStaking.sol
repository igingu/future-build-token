// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IStaking {
  function stake(uint256 amount) external;

  function unstake(uint256 amount) external;

  function claim(uint256 amount) external;
}
