// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import {IStaking} from "./IStaking.sol";

contract DiscreteStaking is IStaking, Ownable {
    IERC20 public immutable stakingToken;
    IERC20 public immutable rewardsToken;

    constructor(address _stakingToken, address _rewardsToken) {
        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_rewardsToken);
    }

    function stake(uint256 amount) external override {}

    function unstake(uint256 amount) external override {}

    function claim(uint256 amount) external override {}
}
