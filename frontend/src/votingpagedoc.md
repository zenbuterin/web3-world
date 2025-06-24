## Feature: Create Proposal Button (dVoting)
### 📌 Overview
This feature provides a user interface to create a proposal on-chain through a smart contract. It includes:
* A trigger button (`CreateProposalButton`)
* A modal dialog (`Modal`) that contains input fields and an action button to execute the smart contract method `createProposal()`
* A mechanism to retrieve and display event logs emitted by the contract for the latest proposal created.
* **Database integration** to sync on-chain proposal ID with off-chain metadata (title and description).

> 🔄 *Current implementation now includes full end-to-end integration: Smart Contract → Event Logs → Database Storage.*
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
#### 2. `Modal` *(Updated)*
This component has been enhanced with database integration capabilities:
* Accepts `isOpen` and `close()` from parent.
* **NEW**: Uses controlled inputs with `titleAndDescription` state to capture user input.
* Calls `CreateProposalFunction`, which interacts with the smart contract.
* Listens to `proposalCreated` event using `getLogs()` to extract `proposalId` and `createdBy` from the emitted logs.
* **NEW**: Performs database synchronization via `handlePostDataToDB()`.

**Key State Management:**
```tsx
const [titleAndDescription, setTitleAndDescription] = useState({ title: "", description: "" })
const [notification, setNotification] = useState<Array<bigint | Address>>([])
```

**Input Handling:**
```tsx
const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleAndDescription((prev) => ({
        ...prev,
        [e.target.name] : e.target.value
    }))
}
```

**Database Integration:**
```tsx
const handlePostDataToDB = async () => {
    const result = await axios.post("http://127.0.0.1:8000/insertProposalInformation", {
        "id": notification[0].toString(),
        "title": titleAndDescription.title,
        "description": titleAndDescription.description
    })
}
```
---
#### 3. `CreateProposalFunction` *(Updated)*
This child component now handles dual callback mechanism:
* Uses viem's `simulateContract()` to build a contract call.
* Executes the call using `walletClient?.writeContract(request)`
* **NEW**: Accepts two callbacks: `oncreate()` and `onPostTodb()`
* Notifies the parent via both callbacks sequentially after successful contract execution.

**Execution Flow:**
```tsx
await walletClient?.writeContract(request)
oncreate(request)      // Triggers parent state update
onPostTodb()           // Triggers database sync
```
---
### 🔁 Updated Interaction Flow
1. User clicks "Create Proposal" → `modalOpen` set to `true`.
2. `Modal` is rendered with **controlled inputs** for title and description.
3. User fills in proposal details and clicks "Create Proposal now!".
4. **Smart Contract Phase**: 
   - Contract method `createProposal` is simulated and executed.
   - Upon success, `oncreate()` callback triggers parent state update.
5. **Event Retrieval Phase**:
   - `getEventProposalCreated()` runs via useEffect dependency.
   - Latest `proposalCreated` event is fetched using `getLogs()`.
   - `proposalId` and `createdBy` are extracted and stored in `notification`.
6. **Database Sync Phase**:
   - `onPostTodb()` callback triggers `handlePostDataToDB()`.
   - POST request sent to backend with: `id`, `title`, `description`.
   - Backend stores the combined on-chain + off-chain data.
---
### 🔄 Data Flow Summary
**Frontend → Smart Contract:**
```
User Input → simulateContract() → writeContract() → Event Emitted
```

**Smart Contract → Frontend:**
```
Event Logs → getLogs() → notification state → Database API Call
```

**Frontend → Backend:**
```
axios.post() → Actix-Web Handler → SQLite Database
```
---
### 🗄️ Backend Integration
#### API Endpoint: `insert_id_description`
**URL**: `POST /insertProposalInformation`

**Handler Function** (Actix-Web + SQLx):
```rust
pub async fn insert_id_description(
    pool: web::Data<SqlitePool>, 
    data: web::Json<OffChainVotingData>
) -> impl Responder
```

**Database Schema** (SQLite):
```sql
INSERT INTO proposalinformation (id, title, description) VALUES (?, ?, ?)
```

**Data Structure** (`OffChainVotingData`):
- `id`: Proposal ID from smart contract (converted to string)
- `title`: User-provided proposal title
- `description`: User-provided proposal description

**Error Handling**:
- Success: `200 OK` with "data inserted" message
- Error: `500 Internal Server Error` with detailed error message
---
### 🧠 Complete Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend UI   │    │ Smart Contract  │    │    Backend      │
│                 │    │                 │    │                 │
│ • Modal Form    │───▶│ • createProposal│    │ • Actix-Web     │
│ • User Input    │    │ • Event Logs    │    │ • SQLite DB     │
│ • Event Polling │◀───│ • proposalId    │    │ • Data Sync     │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                                              ▲
         │              Database Sync                   │
         └──────────────────────────────────────────────┘
```
---
### ⚠️ Known Issues & Considerations
1. **Timing Vulnerability**: There's a potential race condition where `onPostTodb()` might execute before `notification` state is updated with the latest `proposalId`.
2. **Error Handling**: Frontend doesn't handle database insertion failures gracefully.
3. **Network Dependency**: System relies on localhost backend (development setup).
---
### ✅ Completed Features
- ✅ Smart contract interaction
- ✅ Event log retrieval
- ✅ Controlled form inputs
- ✅ Database integration
- ✅ Full end-to-end data flow
---
### 🔜 Future Improvements
* Add proper error handling for database operations
* Implement loading states during database sync
* Add form validation for title and description
* Consider using `watchEvent` for real-time event listening
* Add retry mechanism for failed database insertions
* Implement proper state management (Redux/Zustand) for complex flows
* Add user feedback (success/error toasts)
---
### 📝 Technical Notes
* **Event Retrieval**: Uses `findLast()` to get the most recent proposal, which works for single-user scenarios but may need refinement for concurrent users.
* **Database Choice**: SQLite is suitable for development; consider PostgreSQL for production.
* **State Management**: Current implementation uses multiple `useState` hooks; consider consolidating with `useReducer` for complex state transitions.
* **Type Safety**: Backend uses Rust's type system with `OffChainVotingData` DTO for data validation.
---