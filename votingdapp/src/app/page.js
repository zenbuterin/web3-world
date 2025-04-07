'use client'
import { useState } from "react";

function MyApp() {
  return(<>
  <div>
  <h1>Selamat Datang di Web3World.xyz</h1>
  <p>Web3World adalah platform eksperimental berbasis Web3 yang dibangun untuk menampung berbagai utilitas blockchain dalam satu ekosistem. Website ini sedang dalam tahap pengembangan dan akan terus berkembang seiring dengan bertambahnya fitur serta pengalaman dari developer-nya.</p>

  <h1>🗳️ DVoting</h1>
  <p>DVoting adalah sistem voting terdesentralisasi yang memanfaatkan smart contract untuk memastikan integritas dan transparansi suara tanpa bisa dimanipulasi. Cocok untuk organisasi, komunitas DAO, atau project governance.</p>

  <h1>🔄 Swap</h1>
  <p>Fitur ini akan memungkinkan pengguna untuk melakukan pertukaran token (token swap) secara langsung di platform tanpa harus keluar dari ekosistem Web3World. Menggunakan AMM (Automated Market Maker) atau integrasi DEX.</p>

  <h1>👛 Wallet</h1>
  <p>Wallet adalah halaman untuk koneksi dompet Web3 seperti MetaMask, Trust Wallet, atau WalletConnect. Pengguna bisa menghubungkan dan mengelola wallet mereka untuk berinteraksi dengan fitur lainnya di Web3World.</p>

  <h1>👨‍💻 Author</h1>
  <h1>👨‍💻 Author</h1>
  <p>Website ini dikembangkan secara mandiri oleh developer yang berdedikasi penuh terhadap dunia Web3 dan blockchain.</p>
  {/* <img src="/foto.jpeg" alt="Author"  /> */}
  <p>GitHub: <a href="https://github.com/zenbuterin" target="_blank" rel="noopener noreferrer">zenbuterin</a></p>
  <p>Info lebih lanjut mengenai latar belakang, visi pengembangan, dan filosofi Web3World akan tersedia di halaman khusus Author.</p>
</div>

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

