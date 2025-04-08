// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract VotingManager {

    struct Candidate {
        address candidateAddress;
        uint candidateCode;
        address[] voters;
    }

    struct Room {
        uint roomCode;
        address createdBy;
        Candidate[] candidates;
        mapping(address => bool) hasVoted;
    }

    mapping(uint => Room) public rooms;

    event RoomCreated(uint roomCode, address createdBy);
    event CandidateAdded(uint roomCode, address candidateAddress, uint candidateCode);
    event Voted(uint roomCode, uint candidateCode, address voter);
    event VoteRejected(address voter, string reason);

    function addRoom(uint _roomCode) external {
        Room storage room = rooms[_roomCode];
        require(room.roomCode == 0, "Room already exists");
        room.roomCode = _roomCode;
        room.createdBy = msg.sender;

        emit RoomCreated(_roomCode, msg.sender);
    }

    function addCandidate(uint _roomCode, address _candidateAddress, uint _candidateCode) external {
        Room storage room = rooms[_roomCode];
        require(room.roomCode != 0, "Room doesn't exist");

        // Candidate memory newCandidate = Candidate({
        //     candidateAddress: _candidateAddress,
        //     candidateCode: _candidateCode,
        //     voters: new address 
        // });

        room.candidates.push(newCandidate);

        emit CandidateAdded(_roomCode, _candidateAddress, _candidateCode);
    }

    function vote(uint _roomCode, uint _candidateCode) external {
        Room storage room = rooms[_roomCode];
        require(room.roomCode != 0, "Room doesn't exist");
        require(!room.hasVoted[msg.sender], "Already voted");

        bool found = false;
        for (uint i = 0; i < room.candidates.length; i++) {
            if (room.candidates[i].candidateCode == _candidateCode) {
                room.candidates[i].voters.push(msg.sender);
                room.hasVoted[msg.sender] = true;
                emit Voted(_roomCode, _candidateCode, msg.sender);
                found = true;
                break;
            }
        }

        if (!found) {
            emit VoteRejected(msg.sender, "Candidate not found in this room");
            revert("Candidate not found");
        }
    }

    function getCandidates(uint _roomCode) external view returns (Candidate[] memory) {
        return rooms[_roomCode].candidates;
    }

}
