'use client'
import { useState, useEffect } from "react";
import Web3 from "web3";
import styles from "./page.module.css";

const contractAddress = "0xe21f490c2f9C514285E2071938AD3295eb87F164";
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_nomor",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_proposer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_jumlah",
        "type": "uint256"
      }
    ],
    "name": "getProposal",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_add",
        "type": "address"
      }
    ],
    "name": "addAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "authority",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_periode",
        "type": "uint256"
      }
    ],
    "name": "createDeadLine",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_content",
        "type": "string"
      }
    ],
    "name": "createProposal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "createdProposal",
    "outputs": [
      {
        "internalType": "string",
        "name": "contentOfProposal",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "proposer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "jumlah",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_nomorProposal",
        "type": "uint256"
      }
    ],
    "name": "getVoting",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "hasVoted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "jumlahProposal",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_voter",
        "type": "address"
      }
    ],
    "name": "registration",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_add",
        "type": "address"
      }
    ],
    "name": "removeAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "timesOver",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_voter",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_nomorProposal",
        "type": "uint256"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "voters",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export default function Home() {
  const [accounts, setAccounts] = useState(null); // Untuk menyimpan alamat akun
  const [contract, setContract] = useState(null); // Untuk menyimpan contract instance
  const [web3, setWeb3] = useState(null); // Untuk menyimpan instance web3

  // Pastikan connectToMetaMask hanya dijalankan di client-side
  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance); // Set web3
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accountsList = await web3Instance.eth.getAccounts();
        setAccounts(accountsList); // Set accounts
        const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
        setContract(contractInstance); // Set contract instance
        console.log('Connected account:', accountsList[0]);
        console.log('Connected to :', contractAddress);
      } catch (error) {
        alert('Terjadi kesalahan: ' + error.message);
      }
    } else {
      alert('Install MetaMask terlebih dahulu');
    }
  };

  // Menggunakan useEffect untuk memeriksa client-side hanya


  return (
    <>
      <div className={styles.header}>
        <p className={styles.headerText}>Let's Vote</p>
        <div>
          <button className={styles.tombol} onClick={connectToMetaMask}>
            Click here to connect to MetaMask
          </button>
        </div>
        {accounts && <div>Connected Account: {accounts[0]}</div>}
      </div>
    </>
  );
}

