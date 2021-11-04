pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

contract YourContract {

  string public purpose = "Building Unstoppable Apps!!!";

  constructor() {}

  function setPurpose(string memory newPurpose) public {
      purpose = newPurpose;
  }
}