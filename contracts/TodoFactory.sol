// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "./TodoList.sol";

contract TodoFactory {
    mapping(address => address) private list;
    
    function createTodo() public {
        list[msg.sender] = address(new TodoList(msg.sender));
    }
    
    function getTodoByOwner() public view returns(address) {
        return list[msg.sender];
    }
}