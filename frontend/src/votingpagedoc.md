## Feature: dvoting
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
#### 4. `ProposalListCard` *(New)*
A container component that fetches and displays all proposals from the database:
* Manages `list` state containing array of `ProposalInfoTypes`
* Implements **automatic data refresh** every 10 seconds using `setInterval`
* Fetches proposal data via GET request to backend API
* Renders individual proposal cards using `ProposalCard` component

**State Management:**
```tsx
const [list, setList] = useState<ProposalInfoTypes[]>([])
```

**Data Fetching:**
```tsx
const fetchInformationProposalFromDb = async () => {
    await axios.get<ProposalInfoTypes[]>('http://127.0.0.1:8000/getInfoProposal')
        .then((data) => setList(data.data))
}
```

**Auto-refresh Mechanism:**
```tsx
useEffect(() => {
    const interval = setInterval(async() => {
        fetchInformationProposalFromDb()
    }, 10000);  // Refresh every 10 seconds
    return () => clearInterval(interval)
}, [])
```
---
#### 5. `ProposalCard` *(New)*
A presentational component that renders individual proposal information:
* Receives `ProposalInfoTypes` props: `id`, `title`, `description`
* Displays proposal data in a styled card layout
* Pure functional component with no internal state

**Props Interface:**
```tsx
export function ProposalCard ({id, title, description} : ProposalInfoTypes)
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

**Frontend → Backend (Create):**
```
axios.post() → Actix-Web Handler → SQLite Database
```

**Backend → Frontend (Read):**
```
SQLite Database → Actix-Web Handler → axios.get() → ProposalListCard
```
---
### 🗄️ Backend Integration
#### API Endpoints
**1. Create Proposal**: `POST /insertProposalInformation`

**Handler Function** (Actix-Web + SQLx):
```rust
pub async fn insert_id_description(
    pool: web::Data<SqlitePool>, 
    data: web::Json<OffChainVotingData>
) -> impl Responder
```

**2. Get Proposals**: `GET /getInfoProposal` *(New)*

Returns array of all proposals from database in `ProposalInfoTypes` format.

**Database Schema** (SQLite):
```sql
-- Insert operation
INSERT INTO proposalinformation (id, title, description) VALUES (?, ?, ?)

-- Select operation (implied for GET endpoint)
SELECT id, title, description FROM proposalinformation
```

**Data Structure** (`OffChainVotingData`):
- `id`: Proposal ID from smart contract (converted to string)
- `title`: User-provided proposal title
- `description`: User-provided proposal description

**Error Handling**:
- Success: `200 OK` with "data inserted" message or JSON array
- Error: `500 Internal Server Error` with detailed error message
---
### 🧠 Complete Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend UI   │    │ Smart Contract  │    │    Backend      │
│                 │    │                 │    │                 │
│ • Modal Form    │───▶│ • createProposal│    │ • Actix-Web     │
│ • User Input    │    │ • Event Logs    │    │ • SQLite DB     │
│ • Event Polling │◀───│ • proposalId    │    │ • CRUD Ops      │
│ • ProposalList  │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                                              ▲
         │              Database Sync                   │
         └──────────────────────────────────────────────┘
         ▲                                              │
         │              Proposal Display                │
         └──────────────────────────────────────────────┘
```

**Component Interaction:**
```
ProposalListCard ──GET──▶ Backend API ──▶ Database
     │                                        ▲
     │ (Auto-refresh                          │
     │  every 10s)                            │ 
     ▼                                        │
ProposalCard ◀──────────────────────────────  ┘
(Display individual                  (Fresh data)
 proposal data)
```
---
### ⚠️ Known Issues & Considerations
1. **Timing Vulnerability**: There's a potential race condition where `onPostTodb()` might execute before `notification` state is updated with the latest `proposalId`.
2. **Error Handling**: Frontend doesn't handle database insertion failures gracefully.
3. **Network Dependency**: System relies on localhost backend (development setup).
4. **Auto-refresh Performance**: 10-second intervals may cause unnecessary network requests; consider implementing WebSocket or Server-Sent Events for real-time updates.
5. **Type Conversion**: `bigint` to string conversion for database storage may need validation.
6. **Missing Key Props**: `ProposalCard` components in map function should have unique `key` props.
---
### ✅ Completed Features
- ✅ Smart contract interaction
- ✅ Event log retrieval
- ✅ Controlled form inputs
- ✅ Database integration (Create)
- ✅ Database integration (Read)
- ✅ Proposal list display
- ✅ Auto-refresh mechanism
- ✅ Full end-to-end data flow
- ✅ Type-safe component architecture
---
### 🔜 Future Improvements
* Add proper error handling for database operations
* Implement loading states during database sync and data fetching
* Add form validation for title and description
* Consider using `watchEvent` for real-time event listening
* Add retry mechanism for failed database insertions
* Implement proper state management (Redux/Zustand) for complex flows
* Add user feedback (success/error toasts)
* **Replace polling with WebSocket/SSE** for real-time proposal updates
* **Add pagination** for proposal list when dataset grows
* **Implement search/filter** functionality for proposals
* **Add unique keys** to ProposalCard components in map function
* **Optimize re-renders** with React.memo for ProposalCard
---
### 📝 Technical Notes
* **Event Retrieval**: Uses `findLast()` to get the most recent proposal, which works for single-user scenarios but may need refinement for concurrent users.
* **Database Choice**: SQLite is suitable for development; consider PostgreSQL for production.
* **State Management**: Current implementation uses multiple `useState` hooks; consider consolidating with `useReducer` for complex state transitions.
* **Type Safety**: Backend uses Rust's type system with `OffChainVotingData` DTO for data validation.
* **Data Synchronization**: 10-second polling ensures proposals appear automatically, but creates continuous network overhead.
* **Component Architecture**: Clear separation between container (`ProposalListCard`) and presentational (`ProposalCard`) components.
* **Memory Management**: `setInterval` is properly cleaned up in `useEffect` return function.
* **API Design**: RESTful endpoints follow standard conventions (GET for read, POST for create).
---