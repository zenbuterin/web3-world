'use client'
import { useState } from "react";
import styles from "./page.module.css";
function MyApp() {
  return(<>
  <p>ini digunakan untuk signing jika belum, dan kosong jika sudah **coming soon**</p>
  </>)
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


export default function Page() {
  return <MyApp />;
}

