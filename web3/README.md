# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```


# VotingManager Smart Contract

A minimal and gas-efficient on-chain voting contract designed for governance or decision-making protocols. Authorized accounts can create proposals and add options. Public users can cast a single vote per proposal.


## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Contract Interface](#contract-interface)
  - [State Variables](#state-variables)
  - [Structs](#structs)
  - [Events](#events)
- [Functions](#functions)
  - [`constructor`](#constructor)
  - [`createProposal`](#createproposal)
  - [`addOption`](#addoption)
  - [`vote`](#vote)
  - [`getVoteCount`](#getvotecount)
- [Usage](#usage)
- [Security Considerations](#security-considerations)
- [Extension Recommendations](#extension-recommendations)
- [License](#license)

---

## Overview

This contract enables a simple proposal-based voting system. It can be used as a base layer for DAO governance, token-based polls, or internal decision workflows. The design focuses on clarity, simplicity, and extensibility.

---

## Features

- Access control for administrative functions.
- Single-vote enforcement per address per proposal.
- Mapping-based data structures for optimal gas efficiency.
- Standard event emissions for frontend and off-chain indexing.

---

## Contract Interface

### State Variables

```solidity
mapping(address => bool) public authorized;
uint private proposalCount;
mapping(uint => Proposal) private proposals;
mapping(uint => mapping(address => bool)) public isVoted;
````

* `authorized`: Maintains a list of accounts that can manage proposals and options.
* `proposalCount`: Counter for the number of proposals created.
* `proposals`: Stores all proposals using an incremental `proposalId`.
* `isVoted`: Prevents double voting per address per proposal.

---

### Structs

```solidity
struct Option {
    uint id;
    uint voteCount;
}

struct Proposal {
    uint id;
    mapping(uint => Option) options;
    uint optionCount;
}
```

* `Option`: Represents a single voting option with an ID and vote count.
* `Proposal`: Represents a voting proposal and contains a dynamic list of options.

---

### Events

```solidity
event proposalCreated(address createdBy, uint indexed proposalId);
event optionAdded(address addedBy, uint indexed proposalId, uint indexed optionId);
event voted(address voter, uint indexed proposalId, uint indexed optionId, uint voteCount);
```

---

## Functions

### `constructor()`

```solidity
constructor()
```

Initializes the contract and grants the deploying address authorization.

---

### `createProposal()`

```solidity
function createProposal() external;
```

Creates a new proposal. Only callable by authorized addresses.

---

### `addOption(uint proposalId)`

```solidity
function addOption(uint proposalId) external;
```

Adds an option to a proposal. Only callable by authorized addresses.

---

### `vote(uint proposalId, uint optionId)`

```solidity
function vote(uint proposalId, uint optionId) external;
```

Casts a vote for an option in a proposal. Each address may vote only once per proposal.

---

### `getVoteCount(uint proposalId, uint optionId)`

```solidity
function getVoteCount(uint proposalId, uint optionId) external view returns (uint);
```

Returns the number of votes received by the specified option.

---

## Usage

Example flow (in JavaScript using Ethers.js):

```js
const VotingManager = await ethers.getContractFactory("VotingManager");
const voting = await VotingManager.deploy();

await voting.createProposal();
await voting.addOption(1);
await voting.vote(1, 1);
const count = await voting.getVoteCount(1, 1);
console.log(`Votes for option 1: ${count}`);
```

---

## Security Considerations

* Only authorized users can create proposals or options.
* Votes are final and cannot be changed or revoked.
* No reentrancy vectors exist due to lack of external calls after state mutation.
* No expiration or quorum mechanisms are currently implemented.

---

## Extension Recommendations

Future improvements may include:

* **Proposal Metadata**: Add string/URI for proposal title/description.
* **Voting Deadlines**: Add timestamps for start/end periods.
* **Admin Management**: Functions to add/remove authorized accounts.
* **Vote Weighting**: Token-based or NFT-based voting power.
* **Off-Chain Integration**: Use The Graph to query vote history and analytics.

---

## License

This project is open-sourced under the [MIT License](LICENSE).

