// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract VotingManager {
    event roomAdded(uint roomCode, address candidate1, address candidate2);
    event Voted(address voter, uint roomCode, address candidate, uint candidateCode);

    //entitas
    struct Candidate {
        address candidateAddress;
        uint candidateCode;
    }

    struct Room {
        address createdBy;
        address candidate1;
        address candidate2;
    }

    struct Voter {
        //uint adalah kode room;
        mapping (uint => Candidate) voted;
    }

    //keterkatian
    //uint adalah roomCode
    mapping(uint => Room) rooms;
    //satu address hanya memilih satu candidate dalam satu room
    mapping(address => Voter) voters;
    //jumlah voter per candidate
    mapping(uint => uint) numberOfVoters;

    //fungsi setter
    function addRoom(uint _roomCode, address _candidate1, address _candidate2) public {
        rooms[_roomCode] = Room(msg.sender, _candidate1, _candidate2);
        emit roomAdded(_roomCode, _candidate1, _candidate2);
    }

    function vote(address _candidateAddress, uint _candidateCode, uint _roomCode) public {
        Room memory room = rooms[_roomCode];
        require(_candidateAddress == room.candidate1 || _candidateAddress == room.candidate2, "Invalid candidate");
        require(voters[msg.sender].voted[_roomCode].candidateAddress == address(0), "Already voted");
        voters[msg.sender].voted[_roomCode] = Candidate(_candidateAddress, _candidateCode);
        //satu candidate code
        numberOfVoters[_candidateCode]++;
        emit Voted(msg.sender, _roomCode, _candidateAddress, _candidateCode);
    }

    //fungsi getter
    function getRoomDetail(uint _roomCode, uint _candidateCode) public view returns(Room memory, uint) {
        return (rooms[_roomCode], numberOfVoters[_candidateCode]);
    }
}
