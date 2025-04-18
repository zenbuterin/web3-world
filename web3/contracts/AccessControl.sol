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
        uint roomCode;
        address createdBy;
        address candidate1;
        address candidate2;
    }

    struct Voter {
        //uint adalah kode room;
        mapping (uint => Candidate) voted;
    }

    //keterkatian
    Room[] rooms;
    //satu address hanya memilih satu candidate dalam satu room
    mapping(address => Voter) voters;
    uint index = 0;

    //fungsi setter
    function addRoom(uint _roomCode, address _candidate1, address _candidate2) public {
        rooms.push(Room(_roomCode, msg.sender, _candidate1, _candidate2));
        emit roomAdded(_roomCode, _candidate1, _candidate2);
    }

    function vote(address _candidateAddress, uint _candidateCode, uint _roomCode) public {
        voters[msg.sender].voted[_roomCode] = Candidate(_candidateAddress, _candidateCode);
        emit Voted(msg.sender, _roomCode, _candidateAddress, _candidateCode);
    }


    //fungsi getter
    function enterTheRoom(uint _roomCode) public {
        

    }

    function getCandidate() public {

    }
    
    function getVotersPerCandidate() public {

    }
    





    



}
