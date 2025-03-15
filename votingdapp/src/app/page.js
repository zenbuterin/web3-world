'use client'
import { useState } from "react";
import Web3 from "web3";
import styles from "./page.module.css";
import contractAbi from "./abi.json"
function MyApp() {
  const [web3provider, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [balanceethereum, setBalance] = useState(0);
  const [Registration, setRegistration] = useState(null);


  const connectToWeb3 = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const contractEth = new web3.eth.Contract(contractAbi, process.env.ADDRESSCONTRACT);
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("Connected Account:", accounts[0]);
        setWeb3(web3);
        setContract(contractEth);
        setAccount(accounts[0]);
      } else {
        console.log("Install provider Web3 (Metamask)");
      }
    } catch (error) {
      console.error("Error connecting to Web3:", error);
    }
  };

  return (
    <>
      <div className={styles.headerText}>
        <header>Hello, I'm a header</header>
      </div>
      <div>
        <button className={styles.tombol} onClick={connectToWeb3}>
          Connect to Metamask
        </button>
        {account && <p>Connected to: {account}</p>}
        {contract && <p>Contract address is: {contract.options.address}</p>}
        <GetBalance account={account} web3={web3provider} setBalance={setBalance} balanceethereum={balanceethereum} />
        <GetAuthority account={account} contract={contract} />
        <GetKnowJumlahVoter contract={contract} />
      </div>
    </>
  );
}

function GetBalance({ account, web3, setBalance, balanceethereum }) {
  async function handlecontract() {
    if (!web3 || !account) {
      console.error("Web3 or account is not available.");
      return;
    }
    try {
      const balanceEth = await web3.eth.getBalance(account);
      const balanceInEth = web3.utils.fromWei(balanceEth, "ether");
      setBalance(balanceInEth);
      console.log("Balance:", balanceInEth);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }

  return (
    <>
      <button className={styles.tombol} onClick={handlecontract}>
        Tekan ini untuk mengetahui jumlah ETH
      </button>
      {balanceethereum !== 0 && <p>{balanceethereum} ETH</p>}
    </>
  );
}

function GetAuthority({ contract, account }) { 
  const [status, setStatus] = useState(null);
  const getData = async () => {
    if (!contract || !account) {
      console.error("Contract atau account belum tersedia!");
      return;
    }

    try {
      // Kirim transaksi untuk memanggil fungsi di smart contract
      await contract.methods.getAuthority(account).send({ from: account });

      console.log("Sedang mengirim request...");

      // Dengarkan event dari smart contract
      contract.events.getKnowAuthority({ fromBlock: "latest" }).on("data", (event) => {
        const authorityStatus = event.returnValues[0]; // Ambil data dari event
        setStatus(authorityStatus);
        console.log("Status:", authorityStatus);
      });

    } catch (error) {
      console.error("Gagal mendapatkan data:", error);
    }
  };

  return (
    <>
      <button className="tombol" onClick={getData}>
        Tekan ini untuk mengetahui apakah kita admin atau bukan
      </button>
      {status && <p>Status: {status}</p>}
    </>
  );
}

function GetKnowJumlahVoter({contract}) {
  const [voters, setjumlahVoter] = useState(0);
  async function letKnow() {
    let result = await contract.methods.jumlahVoter().call();
    setjumlahVoter(result);
  }
  return (
    <>
    {voters && <div><p>voter berjumlah: {voters}</p></div>}
    </>
  )
}

function Registration({contract, account}) {
 
}

export default function Page() {
  return <MyApp />;
}