## Feature: Create Proposal Button (dVoting)

### 📌 Overview

This feature provides a user interface to create a proposal on-chain through a smart contract. It includes:

* A trigger button (`CreateProposalButton`)
* A modal dialog (`Modal`) that contains input fields and an action button to execute the smart contract method `createProposal()`
* A mechanism to retrieve and display event logs emitted by the contract for the latest proposal created.

> 📎 *Current implementation focuses on interacting with the smart contract only. Backend/database integration for proposal title and description is a planned next step.*

---

### 🧩 Component Breakdown

#### 1. `CreateProposalButton`

A trigger component rendered in the UI. It holds local state `modalOpen` to toggle the modal visibility.

```tsx
const [modalOpen , setModelOpen] = useState(false)
```

When clicked, it opens the modal:

```tsx
<Modal isOpen={modalOpen} close={() => setModelOpen(false)} />
```

---

#### 2. `Modal`

This component:

* Accepts `isOpen` and `close()` from parent.
* Renders UI input fields for `title` and `description`.
* Calls `CreateProposalFunction`, which interacts with the smart contract.
* Listens to `proposalCreated` event using `getLogs()` to extract `proposalId` and `createdBy` from the emitted logs.
* Stores extracted data into `notification` array.

```tsx
useEffect(() => {
    getEventProposalCreated();
}, [proposalCreatedInfoFromChild])
```

Here, `proposalCreatedInfoFromChild` is a local state that gets updated after contract interaction is simulated + executed. This triggers the `getEventProposalCreated()` side effect to fetch the latest logs.

---

#### 3. `CreateProposalFunction`

This child component:

* Uses viem's `simulateContract()` to build a contract call.
* Executes the call using `walletClient?.writeContract(request)`
* Notifies the parent (`Modal`) via a callback `oncreate()` with the `WriteContractParameters` result.

```tsx
oncreate(request);
```

This mechanism allows the parent to respond to a successful contract execution without requiring direct props drilling of all contract logic.

---

### 🔁 Interaction Flow

1. User clicks "Create Proposal" → `modalOpen` set to `true`.
2. `Modal` is rendered with inputs and a "Create" button.
3. User clicks "Create Proposal now!" → contract method `createProposal` is simulated and written.
4. Upon success, `oncreate()` passes the request data to parent.
5. Parent (`Modal`) updates internal state and runs `getLogs()` to fetch the latest `proposalCreated` event.
6. Result is stored in `notification`.

---

### 🧠 Data Flow Summary

* `CreateProposalFunction → Modal`: via callback `oncreate()`
* `Modal → Smart Contract`: via `publicClient.getLogs()`
* `Logs → UI`: currently logged in console; can later be rendered.

---

### 🔜 Future Integration Plan

* Sync `title` and `description` with backend database, together with `proposalId`.
* Display proposal list dynamically from combined on-chain + off-chain sources.
* Add real-time event listening (`watchEvent`) for more reactive UX (optional).
* Add form validation and user feedback (e.g. success/error toasts).

---

### 📝 Notes

* `getLogs()` is used instead of `watchEvent()` for now because we fetch logs **after** the event happens. This avoids having to maintain an active listener.
* Inputs for title and description are uncontrolled (not connected to `useState`). Future improvement may involve controlled inputs or form libraries like React Hook Form.

---

