# 🗳️ Web3 Utility Hub

🚧 **Status: In Progress** | 🔬 Learning & Experimentation Project

## 📖 Overview

ini adalah **personal website** yang dirancang sebagai *hub* berbagai utilitas Web3, dari smart contract sederhana hingga integrasi backend blockchain. Proyek ini berfungsi sebagai ladang eksplorasi fitur-fitur Web3 modern, integrasi frontend-backend, serta best practice dalam pengembangan sistem terdesentralisasi.

Fitur utama dan eksperimen akan terus bertambah seiring perjalanan belajar dan riset teknologi blockchain.

---

## ⚙️ Features (Planned & In Progress)

- ✅ **Basic Voting System**  
  Smart contract voting sederhana di mana pengguna dapat memilih kandidat menggunakan akun wallet mereka.

- 🚧 **Tokenization & Access Control**  
  Eksperimen sistem insentif berbasis token untuk mengatur hak akses dan reward.

- 🛠️ **Smart Contract Deployment & Testing**  
  Deployment menggunakan Hardhat dan testing dengan jaringan lokal (Hardhat Node/Ganache).

- 🌐 **Frontend ↔ Backend Integration**  
  Menghubungkan Next.js dan Actix Web (Rust) sebagai backend API layer serta SQLite sebagai penyimpanan off-chain.

- 🧪 **Web3 Utility Playground**  
  Eksperimen random Web3: ENS lookup, wallet connection, chain switching, Decentralized Micro-savings, Dinvoices tracking
  Defi budgeting tools atau IPFS pinning.

---

## 🧱 Tech Stack

| Layer        | Stack                                      |
|--------------|--------------------------------------------|
| Blockchain   | Solidity, Hardhat, Ganache (optional)      |
| Frontend     | Next.js (TypeScript, React, TailwindCSS)   |
| Backend      | Rust (Actix Web), SQLite                   |
| Smart Contract Interaction | ethers.js, wagmi, viem        |
| Tooling      | dotenv, TurboPack, tsconfig-paths, etc.    |

---

## 🚀 Installation & Setup

### 1️⃣ Clone Repository

```sh
git clone https://github.com/zenbuterin/DVoting.git
cd DVoting
````

### 2️⃣ Install Dependencies

#### Frontend

```sh
cd frontend
npm install
```

#### Backend

```sh
cd ../backend
cargo build
```

---

## 🔗 Smart Contract Setup

### 📦 Install Hardhat & Dependencies

```sh
cd web3
npm install
```

### ▶️ Jalankan Jaringan Lokal (Hardhat Node atau Ganache)

**Option 1 – Hardhat Node**

```sh
npx hardhat node
```

**Option 2 – Ganache CLI (optional)**

```sh
npm install -g ganache
ganache --chain.chainId 1337
```

### 🚀 Deploy Smart Contract ke Jaringan Lokal

```sh
npx hardhat run scripts/deploy.ts --network localhost
```

---

## 🖥️ Jalankan Aplikasi

### Backend API (Actix Web)

```sh
cd backend
cargo run
```

### Frontend Dev Server (Next.js)

```sh
cd frontend
npm run dev
```

---

## 🔐 Environment Variables

Pastikan `.env` disiapkan di setiap layer proyek:

### Contoh `.env` di Frontend

```
NEXT_PUBLIC_RPC_URL=http://localhost:8545
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

### Contoh `.env` di Backend

```
DATABASE_URL=sqlite://voting.db
NODE_ENV=development
```



---

## 🤝 Contributing

Ini adalah proyek personal untuk eksplorasi. Kamu bisa ikut:

* Memberi saran fitur
* Memperbaiki bug
* Mencoba eksperimen Web3 lainnya (ENS, NFT, IPFS, zk, dsb)

---

## 📄 License

[MIT License](LICENSE)

---

## ✨ Catatan Akhir

> Proyek ini adalah kombinasi antara sistem voting, Web3 playground, dan backend API. Tidak semuanya akan stabil atau ideal — karena ini adalah perjalanan belajar menuju arsitektur Web3 yang lebih stable.

