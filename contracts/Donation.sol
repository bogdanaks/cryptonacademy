//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.11;

contract Donation {
  mapping(address => uint256) public donations;
  mapping(address => bool) public donatersListExist;
  address[] public donatersList;

  function donate() external payable {
    require(msg.value > 0, "Not less than zero.");

    donations[msg.sender] += msg.value;

    if (!donatersListExist[msg.sender]) {
      donatersListExist[msg.sender] = true;
      donatersList.push(msg.sender);
    }
  }

  function withdrawal(uint256 _amount, address _withdrawAddress) external {
    //
  }

  function getTotalAmount() public view returns (uint256) {
    return donations[msg.sender];
  }

  function getDonaters() public view returns (address[] memory) {
    return donatersList;
  }
}