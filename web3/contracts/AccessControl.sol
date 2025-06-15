// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract VotingManager {
    event proposalCreated(address createdBy, uint indexed proposalId);
    event optionAdded(address addedBy, uint indexed proposalId, uint indexed optionId);
    event voted(address voter, uint indexed proposalId, uint indexed optionId, uint voteCount);

    uint private proposalCount;
    mapping(address => bool) public authorized;
    mapping(uint => Proposal) private proposals;
    mapping(uint => mapping(address => bool)) public isVoted; 

    constructor() {
        authorized[msg.sender] = true;
    }

    struct Option {
        uint id;
        uint voteCount;
    }

    struct Proposal {
        uint id;
        mapping(uint => Option) options;
        uint optionCount;
    }

    function createProposal() public {
        require(authorized[msg.sender] == true, "You are not authorized");
        proposalCount++;
        Proposal storage proposal = proposals[proposalCount];
        proposal.id = proposalCount;
        emit proposalCreated(msg.sender, proposalCount);
    }

    function addOption(uint proposalId) public {
        require(authorized[msg.sender] == true, "You are not authorized");
        Proposal storage proposal = proposals[proposalId];
        proposal.optionCount++;
        proposal.options[proposal.optionCount] = Option(proposal.optionCount, 0);
        emit optionAdded(msg.sender, proposalId, proposal.optionCount);
    }

    function vote(uint proposalId, uint optionId) public {
        require(!isVoted[proposalId][msg.sender], "you have voted");
        require(proposalId > 0 && proposalId <= proposalCount, "Invalid proposal");
        Proposal storage proposal = proposals[proposalId];
        require(optionId > 0 && optionId <= proposal.optionCount, "Invalid option");
        proposal.options[optionId].voteCount++;
        isVoted[proposalId][msg.sender] = true;
        emit voted(msg.sender, proposalId, optionId, proposal.options[optionId].voteCount);
    }

    function getvoteCount(uint proposalId, uint optionId) public view returns (uint) {
        Proposal storage proposal = proposals[proposalId];
        return proposal.options[optionId].voteCount;
    }
}
