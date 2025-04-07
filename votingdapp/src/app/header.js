"use client"
import dvotingstyle from "@/app/dvoting/dvoting.module.css";
import signupstyle from "@/app/signup/signup.module.css"
// import walletstyle from  "@/app/wallet/wallet.module.css"
// import authorstyle from  "@/app/author/author.module.css"
// import swapstyle from  "@/app/swap/swap.module.css"
// import login from  "@/app/login/login.module.css"

import { usePathname } from "next/navigation";
import { useState } from "react";
import contractAbi from "./abi.json"
import Web3 from "web3";
import Link from 'next/link';
export default function Header() {
        const [web3provider, setWeb3] = useState(null);
        const [contract, setContract] = useState(null);
        const [account, setAccount] = useState(null);
        const [balanceethereum, setBalance] = useState(0);
        const [dropDown, setDropDown] = useState(false);
        let styles = dvotingstyle;
        const pname = usePathname();
        
        
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

        //dynamic style
        if (pname.startsWith("/dvoting")) {
            styles = dvotingstyle;
        } else if (pname.startsWith("/signup")) {
            styles = signupstyle;
        }
        // else if (pname.startsWith("/wallet")) {
        //     styles = walletstyle;
        // }
        // else if (pname.startsWith("/swap")) {
        //     styles = swapstyle;

        // } else if (pname.startsWith("/author")) {
        //     styles = authorstyle;

        // }
        // else if (pname.startsWith("/login")) {
        //     styles = loginstyle;

        // }
    
    return (
        <>
        <div className={styles.innerBody}>
            <div className={styles.mainheader}>
            <div className={styles.logo}><h1>WEB3 WORLD</h1></div>
            <div className={styles.overlapButton}>
            <Link href="/dvoting"><button className={styles.navigator}>Dvoting</button></Link>
            <Link href="/wallet"><button className={styles.navigator}>wallet</button></Link>
            <Link href="/swaptoken"><button className={styles.navigator}>Swap</button></Link>
            <Link href="/author"><button className={styles.navigator}>Author</button></Link>
            <Link href="/signup"><button className={styles.navigator}>Sign up (your character)</button></Link>
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
                <p className={styles.navdropdown}><a href="">Swap</a></p>
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