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

## 📝 Dokumentasi Smart Contract: `VotingManager.sol`

### 📌 Ringkasan

`VotingManager` adalah smart contract untuk mengelola proses voting sederhana antara dua kandidat dalam satu ruangan (room). Setiap user hanya dapat memilih satu kandidat dalam satu room. Voting ditandai dengan `candidateCode` unik untuk setiap kandidat per room.

---

### 📦 Struktur Data

#### `Candidate`

```solidity
struct Candidate {
    address candidateAddress;
    uint candidateCode;
}
```

#### `Room`

```solidity
struct Room {
    address createdBy;
    address candidate1;
    address candidate2;
}
```

#### `Voter`

```solidity
struct Voter {
    mapping(uint => Candidate) voted;
}
```

---

### 🗂️ State Variables

| Nama             | Tipe                        | Deskripsi                             |
| ---------------- | --------------------------- | ------------------------------------- |
| `rooms`          | `mapping(uint => Room)`     | Menyimpan room berdasarkan `roomCode` |
| `voters`         | `mapping(address => Voter)` | Menyimpan data pemilihan tiap address |
| `numberOfVoters` | `mapping(uint => uint)`     | Total suara per `candidateCode`       |

---

### ⚙️ Fungsi Publik

#### `addRoom(uint roomCode, address candidate1, address candidate2)`

Membuat room baru berisi 2 kandidat.

* Tidak mencegah duplikasi `roomCode`.
* Emit: `roomAdded`

#### `vote(address candidateAddress, uint candidateCode, uint roomCode)`

Memilih salah satu kandidat dalam room.

* Validasi:

  * Alamat kandidat harus terdaftar dalam room.
  * Voter belum pernah memilih dalam room tersebut.
* Update:

  * Data pemilih
  * Jumlah suara
* Emit: `Voted`

#### `getRoomDetail(uint roomCode, uint candidate1Code, uint candidate2Code)`

Mengambil data room dan jumlah vote untuk kedua kandidat berdasarkan `candidateCode`.

---

### 📡 Events

| Event       | Parameter                                     | Deskripsi                          |
| ----------- | --------------------------------------------- | ---------------------------------- |
| `roomAdded` | `(roomCode, candidate1, candidate2)`          | Ditrigger saat room ditambahkan    |
| `Voted`     | `(voter, roomCode, candidate, candidateCode)` | Ditrigger saat user melakukan vote |

---

### ⚠️ Catatan & Potensi Pengembangan

* `roomCode` bisa ditimpa → perlu validasi unik di versi selanjutnya.
* Tidak ada pembatasan agar `candidate1 != candidate2`.
* `candidateCode` tidak dicek di smart contract untuk keunikan global.
* Belum ada fungsi seperti:

  * `getTotalVotes(candidateCode)`
  * `getWinner(roomCode)`
* Tidak ada batasan waktu voting atau penghapusan room.

