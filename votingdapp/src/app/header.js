"use client"
import styles from "./page.module.css"; 
import { useState } from "react";
import contractAbi from "./abi.json"
import Web3 from "web3";
export default function Header() {
        const [web3provider, setWeb3] = useState(null);
        const [contract, setContract] = useState(null);
        const [account, setAccount] = useState(null);
        const [balanceethereum, setBalance] = useState(0);
        const [dropDown, setDropDown] = useState(false);
        
        
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
        <div className={styles.innerBody}>
            <div className={styles.header}>
            <div className={styles.logo}><h1>WEB3 WORLD</h1></div>
            <div className={styles.overlapButton}>
            <button className={styles.navigator}>Dvoting</button>
            <button className={styles.navigator}>Swap Token</button>
            <button className={styles.navigator}>Wallet</button>
            <button className={styles.navigator}>Author</button>
            <button className={styles.walletconnection} onClick={connectToWeb3}>Connect Wallet</button>
            </div>
            <div className={styles.dropdownwrapper}>
            <button className={styles.mobileView} onClick={() => {setDropDown(!dropDown); console.log("clicked")}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
    </svg>
            </button>
            {dropDown && (<div className={styles.dropdownview}>
              {/*ketika link dikunjungi maka componen akan muncul di div innerbody */}
                <p className={styles.navdropdown}><a href="">Dvoting</a></p>
                <p className={styles.navdropdown}><a href="">Swap Token</a></p>
                <p className={styles.navdropdown}><a href="">Wallet</a></p>
                <p className={styles.navdropdown}><a href="">Author</a></p>
                <button className={styles.walletconnectiondropdown} onClick={connectToWeb3}><a href="">Connect to Wallet</a></button>
            </div>)}
            </div>
            </div>
        </div>
        </>
        );

}