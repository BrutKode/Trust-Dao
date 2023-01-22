pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/access/Ownable.sol"; 
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract Marshal is ERC20 {

  address public owner;

  constructor() payable ERC20("Marshal", "ML") {
    owner = msg.sender;
    _mint(owner, 1000 * 10 ** 18);
    console.log("Balance of owner: ", balanceOf(owner) / 10 ** 18);
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Only Authorised Personnel Are Allowed!");
    _;
  }

  function transferOwnership(address _newOwner) external onlyOwner {
    owner = _newOwner;
    _mint(owner, 1000 * 10 ** 18);
  }

  function addrContract() public view returns (address) {
    return address(this);
  }

}
