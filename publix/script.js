

const contractAddress = "0x447EB66f0eC4C72aD2f5a487DC737d41F05E39e2"; // Ganti dengan alamat kontrak yang dideploy
const contractABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "launch",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "status",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];


//untuk melanjutkan ini, anda harus mensetting kembali akun yang dipakai di hardhat.config.js 
let web3;
let akun;
let contract
// Cek apakah Metamask ada di browser
document.getElementById("connectButton").onclick = async function () {
    if (window.ethereum) {
        try {
            web3 = new Web3(window.ethereum); //ini adalah instance dari provider
            await window.ethereum.request({method : 'eth_requestAccounts' }) //request yang digunakan untuk meminta akun
            akun = await web3.eth.getAccounts(); //berbicara dengan provider dengan get akun
            contract = new web3.eth.Contract(contractABI,contractAddress)
            const name = await contract.methods.name().call();
            const status = await contract.methods.status().call();
            document.getElementById("account").innerHTML = `connected account ${akun[0]}`
            document.getElementById("nama").innerHTML = `name : ${name}`;
            document.getElementById("status").innerHTML = `status : ${status}`;
            
        } catch (error) {
            console.log("eror ey", error);
            
        }

    }
    else {
        alert('install metamask cuy');
    }
}

document.getElementById()



