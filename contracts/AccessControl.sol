// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract VotingManager {
    mapping(address => uint) public voters;
    mapping(uint => Proposal) public createdProposal;
    mapping(address => mapping(uint => bool)) public hasVoted;
    mapping(address => bool) public authority;
    uint public timesOver;
    uint private jumlahVoter;
    uint public jumlahProposal;
    
    event getProposal(uint _nomor, address _proposer, uint _jumlah);
    event getKnowAuthority(bool _status);
    event getKnowAdmin(address _addr);
    event getHasVoted(bool _status);

    constructor() {
        authority[msg.sender] = true;
    }

    struct Proposal {
        string contentOfProposal;
        address proposer;
        uint jumlah;
    }

    function getAuthority(address _addr) public {
        emit getKnowAuthority(authority[_addr]);
    }

    function addAdmin(address _addr) public onlyAdmin {
        require(voters[_addr] != 0, "Alamat ini bukan voter");
        authority[_addr] = true;
        emit getKnowAdmin(_addr);
    }

    function removeAdmin(address _addr) public onlyAdmin {
        require(voters[_addr] != 0, "Alamat ini bukan voter");
        authority[_addr] = false;
    }

    function createDeadLine(uint _periode) public onlyAdmin {
        timesOver = block.timestamp + _periode;
    }

    function registration(address _voter) public {
        require(voters[_voter] == 0, "Voter sudah terdaftar");
        jumlahVoter++;
        voters[_voter] = jumlahVoter; 
    }

    function createProposal(string memory _content) public onlyAdmin {
        createdProposal[jumlahProposal] = Proposal({
            contentOfProposal: _content,
            proposer: msg.sender,
            jumlah: 0
        });
        jumlahProposal++;
    }

    function vote(uint _nomorProposal) public {
        require(voters[msg.sender] != 0, "Anda bukan voter terdaftar");
        require(_nomorProposal < jumlahProposal, "Proposal tidak ditemukan");
        require(!hasVoted[msg.sender][_nomorProposal], "Anda sudah voting");
        require(block.timestamp <= timesOver, "Waktu Habis");

        createdProposal[_nomorProposal].jumlah += 1;
        hasVoted[msg.sender][_nomorProposal] = true;
    }

    function getVoting(uint _nomorProposal) public {
        require(block.timestamp >= timesOver, "Voting masih berlangsung");
        require(_nomorProposal < jumlahProposal, "Proposal tidak ditemukan");

        emit getProposal(_nomorProposal, createdProposal[_nomorProposal].proposer, createdProposal[_nomorProposal].jumlah);
    }

    function getKnowHasVoted(address _voter, uint _nomorProposal) public {
        require(_nomorProposal < jumlahProposal, "Proposal tidak ditemukan");

        bool hadVoted = hasVoted[_voter][_nomorProposal];
        emit getHasVoted(hadVoted);
    }

    modifier onlyAdmin() {
        require(authority[msg.sender], "Anda bukan admin");
        _;
    }
}
