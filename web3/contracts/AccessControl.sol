// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract VotingManager {

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



}
