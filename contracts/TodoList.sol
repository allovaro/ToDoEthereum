// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract TodoList {
    address public owner;
    struct Task {
        uint id;
        uint data;
        string content;
        bool done;
    }
    uint lastTaskId;
    uint[] taskIds;
    mapping(uint => Task) tasks;

    constructor(address _owner) {
        owner = _owner;
        lastTaskId = 0;
    }

    event TaskCreated(uint _id, uint _date, string _content, bool _done);

    modifier onlyOwner {
        require(msg.sender  == owner, "Only owner can call this function");
        _;
    }

    modifier taskExist(uint id) {
        require(tasks[id].id != 0, "Task doesn't exist");
        _;
    }

    function createTask(string memory _task) public onlyOwner {
        lastTaskId += 1;
        tasks[lastTaskId] = Task(lastTaskId, block.timestamp, _task, false);
        taskIds.push(lastTaskId);
        emit TaskCreated(lastTaskId, block.timestamp, _task, false);
    }

    function doneUndoneTask(uint _id) public onlyOwner taskExist(_id) {
        tasks[_id].done = !tasks[_id].done;
    }

    function getLastTaskId() public view returns(uint) {
        return lastTaskId;
    }

    function getTaskIds() public view returns(uint[] memory) {
        return taskIds;
    }

    function getTask(uint _id) public view onlyOwner taskExist(_id)
    returns(
        uint,
        uint,
        string memory,
        bool
    ) {
        return(
            _id,
            tasks[_id].data,
            tasks[_id].content,
            tasks[_id].done
        );
    }
}
