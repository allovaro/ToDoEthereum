// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract TodoList {
    address public owner;
    struct Task {
        uint date;
        string content;
        bool done;
    }
    Task[] tasks;

    constructor(address _owner) {
        owner = _owner;
    }

    event TaskCreated(uint _date, string _content, bool _done);

    modifier onlyOwner {
        require(msg.sender  == owner, "Only owner can call this function");
        _;
    }

    modifier taskExist(uint id) {
        require(id < tasks.length, "Task doesn't exist");
        _;
    }

    function createTask(string memory _task) public onlyOwner {
        tasks.push(Task(block.timestamp, _task, false));
        emit TaskCreated(block.timestamp, _task, false);
    }
    
    function deleteTask(uint _id) public onlyOwner {
        tasks[_id] = tasks[tasks.length - 1];
        tasks.pop();
    }

    function doneUndoneTask(uint _id) public onlyOwner taskExist(_id) {
        tasks[_id].done = !tasks[_id].done;
    }

    function getLastTaskId() public view returns(uint) {
        return tasks.length - 1;
    }

    function getTask(uint _id) public view onlyOwner taskExist(_id)
    returns(
        uint,
        string memory,
        bool
    ) {
        return(
            tasks[_id].date,
            tasks[_id].content,
            tasks[_id].done
        );
    }
}
