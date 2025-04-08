// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract VotingManager {
    //event untuk log
    event RoomCreated(uint roomCode, address createdBy);
    event CandidateAdded(uint roomCode, address candidateId, address addedBy);
    event SomeoneEnterTheRoom(address guest);
    event Voted(string roomCode, address candidateId, address voter);

        //struct yang merepresentasikan Room
    struct Room {
        uint code; 
        address createdBy;  
    }
    
    struct CandidateInRoom {
        Candidate[] candidates;
    }



    //struct yang merepresentasikan Candidate
    struct Candidate {
        address candidateId;
        uint candidateUniqCode;         
        address[] voters; 
        
    }

    struct Vote {
        mapping(address => bool) hasVoted;
        bool exists; 
    }

    //inisialisasi
    Room[] rooms;
    Candidate[] candidateList;


    //setter function
    // function createRoom(uint room_code) public {
    //     rooms.push(Room(room_code, msg.sender));
    //     emit RoomCreated(room_code, msg.sender);
    // }

    // function addCandidate(address _candidateId, uint _candidateUniqCode) public {

    // }

    // function vote() public {

    // }

    // //getter function
    // function enterRoom(uint room_code) public {

    // }

    // function getVoters() public {

    // }

    // function getNumberVotersPerCandidate() public {
    //}

    //function getNumberAllVoters() public {
    //}
    




    


}
