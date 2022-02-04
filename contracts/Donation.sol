//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Donation is Ownable {
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

  function withdrawal(uint256 _amount, address _withdrawAddress) external onlyOwner {
    payable(_withdrawAddress).transfer(_amount);
  }

  function getTotalAmount(address _address) public view returns (uint256) {
    return donations[_address];
  }

  function getDonaters() public view returns (address[] memory) {
    return donatersList;
  }
}