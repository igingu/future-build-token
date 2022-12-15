// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import {IStaking} from "./IStaking.sol";

contract DynamicStaking is IStaking, Ownable {
    IERC20 public immutable stakingToken;
    IERC20 public immutable rewardsToken;

    uint64 public startTime;
    uint64 public endTime;

    uint256 public totalAmountStaked;
    mapping(address => uint256) public amountStakedBy;

    uint256 public rewardRate;

    uint256 public currentRewardPerToken;
    uint256 public rewardsLastUpdatedAt;

    mapping(address => uint256) public rewardToClaim;
    mapping(address => uint256) public rewardsPerTokenPaid;

    string
        private constant CLAIM_AMOUNT_CAN_NOT_BE_MORE_THAN_AVAILABLE_REWARDS =
        "1";
    string private constant START_TIME_NOT_SMALLER_OR_EQUAL_TO_END_TIME = "2";
    string private constant STAKING_NOT_STARTED_YET = "3";
    string private constant STAKING_ENDED = "4";
    string private constant UNSTAKE_AMOUNT_BIGGER_THAN_STAKED_AMOUNT = "5";
    string private constant TOKEN_TRANSFER_FAILED = "6";
    string private constant REWARD_RATE_IS_ZERO = "7";
    string private constant AMOUNT_CAN_NOT_BE_ZERO = "8";
    string private constant TOKEN_TRANSFER_FROM_FAILED = "9";

    event Unstaked(address indexed user, uint256 amount);
    event Staked(address indexed user, uint256 amount);
    event Claimed(address indexed user, uint256 amount);

    modifier stakingStarted() {
        require(block.timestamp >= startTime, STAKING_NOT_STARTED_YET);
        _;
    }

    modifier stakingNotFinished() {
        require(block.timestamp <= endTime, STAKING_ENDED);
        _;
    }

    modifier updateReward(address account) {
        currentRewardPerToken = updateRewardPerToken();
        rewardsLastUpdatedAt = lastTimeRewardApplies();

        if (account != address(0)) {
            rewardToClaim[account] = currentRewardRemaining(account);
            rewardsPerTokenPaid[account] = currentRewardPerToken;
        }

        _;
    }

    constructor(
        uint64 startTime_,
        uint64 endTime_,
        uint256 rewardRate_,
        address stakingToken_,
        address rewardsToken_
    ) {
        require(
            endTime_ > startTime_,
            START_TIME_NOT_SMALLER_OR_EQUAL_TO_END_TIME
        );
        require(rewardRate_ > 0, REWARD_RATE_IS_ZERO);

        startTime = startTime_;
        endTime = endTime_;

        rewardRate = rewardRate_;

        stakingToken = IERC20(stakingToken_);
        rewardsToken = IERC20(rewardsToken_);
    }

    function stake(uint256 amount)
        external
        override
        stakingStarted
        stakingNotFinished
        updateReward(_msgSender())
    {
        require(amount > 0, AMOUNT_CAN_NOT_BE_ZERO);

        unchecked {
            // totalAmountStaked can be at most the token supply, so it can not be more than uint256
            totalAmountStaked += amount;

            // amountStakedBy[account] can be at most the token supply, so it can not be more than uint256
            amountStakedBy[_msgSender()] += amount;
        }

        bool success = stakingToken.transferFrom(
            _msgSender(),
            address(this),
            amount
        );
        require(success, TOKEN_TRANSFER_FROM_FAILED);

        emit Staked(_msgSender(), amount);
    }

    function unstake(uint256 amount)
        external
        override
        stakingStarted
        updateReward(_msgSender())
    {
        require(
            amount > amountStakedBy[_msgSender()],
            UNSTAKE_AMOUNT_BIGGER_THAN_STAKED_AMOUNT
        );

        unchecked {
            // totalAmountStaked should always be more than amount
            totalAmountStaked -= amount;

            // checked with require
            amountStakedBy[_msgSender()] -= amount;
        }

        bool success = stakingToken.transfer(_msgSender(), amount);
        require(success, TOKEN_TRANSFER_FAILED);

        emit Unstaked(_msgSender(), amount);
    }

    function claim(uint256 amount)
        external
        override
        stakingStarted
        updateReward(_msgSender())
    {
        require(
            amount > rewardToClaim[_msgSender()],
            CLAIM_AMOUNT_CAN_NOT_BE_MORE_THAN_AVAILABLE_REWARDS
        );

        unchecked {
            // checked with require
            rewardToClaim[_msgSender()] -= amount;
        }

        bool success = rewardsToken.transfer(_msgSender(), amount);
        require(success, TOKEN_TRANSFER_FAILED);

        emit Claimed(_msgSender(), amount);
    }

    function updateRewardPerToken() public view returns (uint256) {
        if (totalAmountStaked == 0) {
            return currentRewardPerToken;
        }

        // New reward per token is
        // currentRewardPerToken + the rate of rewards per token staked (rewardRate / totalAmountStaked) *
        // how much time has passed since last reward (lastTimeRewardApplies() - rewardsLastUpdatedAt)
        return
            currentRewardPerToken +
            (rewardRate * (lastTimeRewardApplies() - rewardsLastUpdatedAt)) /
            totalAmountStaked;
    }

    function lastTimeRewardApplies() public view returns (uint256) {
        return _min(endTime, block.timestamp);
    }

    function currentRewardRemaining(address account)
        public
        view
        returns (uint256)
    {
        // New amount of rewards user has is
        // current reward (rewardToClaim[account]) +
        // how much they have staked * (the current reward per token without the already paid reward per token)
        // amountStakedBy[account] * (currentRewardPerToken - rewardsPerTokenPaid[account])
        return
            rewardToClaim[account] +
            amountStakedBy[account] *
            (currentRewardPerToken - rewardsPerTokenPaid[account]);
    }

    function _min(uint256 frst, uint256 scnd) private pure returns (uint256) {
        return frst > scnd ? scnd : frst;
    }
}

// contract StakingRewards {
//     // Duration of rewards to be paid out (in seconds)
//     uint public duration;
//     // Timestamp of when the rewards finish
//     uint public finishAt;
//     // Minimum of last updated time and reward finish time
//     uint public updatedAt;
//     // Reward to be paid out per second
//     uint public rewardRate;
//     // Sum of (reward rate * dt * 1e18 / total supply)
//     uint public rewardPerTokenStored;
//     // User address => rewardPerTokenStored
//     mapping(address => uint) public userRewardPerTokenPaid;
//     // User address => rewards to be claimed
//     mapping(address => uint) public rewards;

//     // Total staked
//     uint public totalSupply;
//     // User address => staked amount
//     mapping(address => uint) public balanceOf;

//     modifier updateReward(address _account) {
//         rewardPerTokenStored = rewardPerToken();
//         updatedAt = lastTimeRewardApplicable();

//         if (_account != address(0)) {
//             rewards[_account] = earned(_account);
//             userRewardPerTokenPaid[_account] = rewardPerTokenStored;
//         }

//         _;
//     }

//     function lastTimeRewardApplicable() public view returns (uint) {
//         return _min(finishAt, block.timestamp);
//     }

//     function rewardPerToken() public view returns (uint) {
//         if (totalSupply == 0) {
//             return rewardPerTokenStored;
//         }

//         return
//             rewardPerTokenStored +
//             (rewardRate * (lastTimeRewardApplicable() - updatedAt) * 1e18) /
//             totalSupply;
//     }

//     function stake(uint _amount) external updateReward(msg.sender) {
//         require(_amount > 0, "amount = 0");
//         stakingToken.transferFrom(msg.sender, address(this), _amount);
//         balanceOf[msg.sender] += _amount;
//         totalSupply += _amount;
//     }

//     function withdraw(uint _amount) external updateReward(msg.sender) {
//         require(_amount > 0, "amount = 0");
//         balanceOf[msg.sender] -= _amount;
//         totalSupply -= _amount;
//         stakingToken.transfer(msg.sender, _amount);
//     }

//     function earned(address _account) public view returns (uint) {
//         return
//             ((balanceOf[_account] *
//                 (rewardPerToken() - userRewardPerTokenPaid[_account])) / 1e18) +
//             rewards[_account];
//     }

//     function getReward() external updateReward(msg.sender) {
//         uint reward = rewards[msg.sender];
//         if (reward > 0) {
//             rewards[msg.sender] = 0;
//             rewardsToken.transfer(msg.sender, reward);
//         }
//     }

//     function setRewardsDuration(uint _duration) external onlyOwner {
//         require(finishAt < block.timestamp, "reward duration not finished");
//         duration = _duration;
//     }

//     function notifyRewardAmount(uint _amount)
//         external
//         onlyOwner
//         updateReward(address(0))
//     {
//         if (block.timestamp >= finishAt) {
//             rewardRate = _amount / duration;
//         } else {
//             uint remainingRewards = (finishAt - block.timestamp) * rewardRate;
//             rewardRate = (_amount + remainingRewards) / duration;
//         }

//         require(rewardRate > 0, "reward rate = 0");
//         require(
//             rewardRate * duration <= rewardsToken.balanceOf(address(this)),
//             "reward amount > balance"
//         );

//         finishAt = block.timestamp + duration;
//         updatedAt = block.timestamp;
//     }

//     function _min(uint x, uint y) private pure returns (uint) {
//         return x <= y ? x : y;
//     }
// }
