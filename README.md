# Decentralized Voting

🚧 **Status: In Progress** 🚧

## Overview
Decentralized Voting adalah proyek eksplorasi dalam pengembangan Web3 yang bertujuan untuk menciptakan sistem pemungutan suara yang transparan dan tidak dapat dimanipulasi menggunakan teknologi blockchain. Karena ini adalah proyek belajar, fitur yang dikembangkan mungkin bervariasi dan bereksperimen dengan berbagai aspek Web3.

## Features (Planned & Ongoing)
- ✅ **Basic Voting System**: Pemilih dapat memilih kandidat melalui smart contract.
- 🚧 **Tokenization Feature**: Rencana menambahkan sistem tokenisasi untuk insentif dan akses kontrol.
- 🔍 **Experimental Web3 Features**: Beberapa fitur tambahan mungkin tidak langsung berhubungan dengan voting, tetapi tetap dalam konteks Web3.
- 🎯 **Smart Contract Deployment**: Menggunakan Hardhat untuk deployment dan testing smart contract.
- 🔗 **Frontend-Backend Integration**: Menggunakan Next.js sebagai frontend dan Actix Web sebagai backend untuk menghubungkan UI dengan blockchain.

## Tech Stack
- **Blockchain**: Ethereum (Solidity, Hardhat)
- **Backend**: Rust (Actix Web, SQLite untuk penyimpanan off-chain)
- **Frontend**: Next.js (React + TailwindCSS)
- **Smart Contract Interaction**: ethers.js, wagmi

## Installation & Setup
1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/decentralized-voting.git
   cd decentralized-voting
   ```
2. **Install dependencies**
   ```sh
   cd frontend && npm install
   cd ../backend && cargo build
   ```
3. **Run the development servers**
   - **Backend**: `cargo run`
   - **Frontend**: `npm run dev`
   - **Hardhat (Local Node)**: `npx hardhat node`

## Contributing
Karena ini adalah proyek pembelajaran, kontribusi dalam bentuk saran, perbaikan bug, atau eksperimen fitur Web3 lainnya sangat disambut!

## License
[MIT License](LICENSE)

---
✨ *This project is a learning experiment, expect random but interesting Web3 implementations!* 🚀

