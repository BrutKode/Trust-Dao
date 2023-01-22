//SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Trust {

    uint256 pot;
    address owner;
    IERC20 token;

    event employ(address developer, uint amount);

    constructor(address _token) {
        owner = msg.sender;
        token = IERC20(_token);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorised Access!");
        _;
    }

    modifier requireAllowance() {
        require(token.allowance(msg.sender, address(this)) > 0, "Allowance Null");
        _;
    }

    function transferOwnership(address _newOwner) external onlyOwner {
        owner = _newOwner;
    }

    mapping(address => uint) balances;
    mapping(address => bool) allowances;
    mapping(address => address) user2dev;

    function totalPotSupply() external view returns (uint256) {
        return pot;
    }

    function viewDevBalance(address _dev) external view returns (uint256) {
        return balances[_dev];
    }

    function isClaimable(address _dev) external view returns (bool) {
        return allowances[_dev];
    }

    function returnUserDev(address _user) external view returns (address) {
        return user2dev[_user];
    }

    function payForWork(address _dev, uint256 amount) external requireAllowance {
        token.transferFrom(msg.sender, address(this), amount);
        balances[_dev] += amount;
        pot += amount;
        user2dev[msg.sender] = _dev;
        emit employ(_dev, amount);
    }

    function claim() external {
        require(allowances[msg.sender] == true, "Not Approved!");
        pot -= balances[msg.sender];
        token.transfer(msg.sender, balances[msg.sender]);
        balances[msg.sender] = 0;
    }

    function approveDev(address _dev) external {
        require(_dev == user2dev[msg.sender], "Not Assigned dev!");
        allowances[_dev] = true;
    }

    function half(address _dev) external {
        require(_dev == user2dev[msg.sender], "Dev out of bounds!");
        uint256 amount = balances[_dev];
        pot -= amount;
        token.transfer(_dev, amount/2);
        token.transfer(msg.sender, amount/2);
        balances[_dev] = 0;
    }

    function superFunc(address _to, address _dev, uint256 amount) external onlyOwner {
        token.transfer(_to, amount);
        balances[_dev] -= amount;
        pot -= amount;
    }

}
