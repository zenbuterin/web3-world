// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;


contract VotingManager {


    // enum yesOrNo { yes,no }
    // mapping (address => yesOrNo) options;
    mapping(address => uint) public voters;
    mapping(uint => Proposal) public createdProposal;
    mapping(address => mapping(uint => bool)) public hasVoted;
    mapping(address => bool) public authority;
    uint public timesOver;
    uint private jumlahVoter = 0;
    uint public jumlahProposal;
    event getProposal(uint _nomor, address _proposer, uint _jumlah);

    constructor() {
        authority[msg.sender] = true;
    }
    struct Proposal {
        string contentOfProposal;
        address proposer;
        uint jumlah;
    }

    function addAdmin(address _add) onlyAdmin public {
        authority[_add] = true;
    }

    function removeAdmin(address _add) onlyAdmin public {
        authority[_add] = false;
    }

    function createDeadLine(uint _periode) onlyAdmin public {
        timesOver = block.timestamp + _periode;
    }

    function registration(address _voter) public {
        voters[_voter] = jumlahVoter;
        jumlahVoter++;
    }

    function createProposal(string memory _content) onlyAdmin public {
        createdProposal[jumlahProposal] = Proposal({
            contentOfProposal: _content,
            proposer: msg.sender,
            jumlah: 0
        });
        jumlahProposal++;
    }

    function vote(address _voter, uint _nomorProposal) public {
        require(voters[_voter] <= jumlahVoter && hasVoted[_voter][_nomorProposal] == false, "kamu bukan voter teregistrasi ");
        require(block.timestamp <= timesOver, "Waktu Habis");
        createdProposal[_nomorProposal].jumlah += 1;
        hasVoted[_voter][_nomorProposal] = true;
    }

    function getVoting(uint _nomorProposal) public {
        require(block.timestamp >= timesOver, "Waktu Habis");
        emit getProposal(_nomorProposal, createdProposal[_nomorProposal].proposer, createdProposal[_nomorProposal].jumlah);
    }

    modifier onlyAdmin() {
        require(authority[msg.sender] == true, "kamu bukan atmin");
        _;
    } 

}