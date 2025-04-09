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
        Candidate[] candidates;
    }

    struct Voter {
        address voterAddress;
        mapping (uint => Candidate) voted;
    }

    //keterkatian
    Room[] rooms;
    Voter[] voters;


}
