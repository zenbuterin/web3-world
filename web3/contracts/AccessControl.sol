// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract VotingManager {
    event proposalCreated(uint indexed proposalId);
    event optionAdded(uint indexed proposalId, uint indexed optionId);
    event voted(uint indexed proposalId, uint indexed optionId, uint voteCount);

    struct Option {
        uint id;
        uint voteCount;
    }

    struct Proposal {
        uint id;
        mapping(uint => Option) options;
        uint optionCount;
    }

    uint private proposalCount;
    mapping(uint => Proposal) private proposals;

    function createdProposal() public {
        proposalCount++;
        Proposal storage proposal = proposals[proposalCount];
        proposal.id = proposalCount;
        emit proposalCreated(proposalCount);
    }

    function addOption(uint proposalId) public {
        Proposal storage proposal = proposals[proposalId];
        proposal.optionCount++;
        proposal.options[proposal.optionCount] = Option(proposal.optionCount, 0);
        emit optionAdded(proposalId, proposal.optionCount);
    }

    function vote(uint proposalId, uint optionId) public {
        Proposal storage proposal = proposals[proposalId];
        proposal.options[optionId].voteCount++;
        emit voted(proposalId, proposal.optionCount, proposal.options[optionId].voteCount);
    }
}
