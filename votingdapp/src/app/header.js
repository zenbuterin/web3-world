"use client"
import dvotingstyle from "@/app/dvoting/votingroom/dvoting.module.css";
import signupstyle from "@/app/signup/signup.module.css"
// import walletstyle from  "@/app/wallet/wallet.module.css"
// import authorstyle from  "@/app/author/author.module.css"
// import swapstyle from  "@/app/swap/swap.module.css"
import ConnectToWallet from "./ui/walletConnect";
import { usePathname, useRouter } from "next/navigation";
import Link from 'next/link';
import { useEffect, useState } from "react";


export default function Header() {
        const [dropDown, setDropDown] = useState(false);
        const {instanceContract} = useWeb3State()
        const router = useRouter()
        const toggleDropDown = () => {
        setDropDown((status) => (status === false ? true : false));
    };

        //NOTE: pname is for dynamic css based on url page name 
        let styles = dvotingstyle;
        const pname = usePathname();



        //NOTE: dynamic style
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

        
    
    return (
        <>
        <div className={styles.innerBody}>
            <div className={styles.mainheader}>
            <div className={styles.logo}><h1>WEB3 WORLD</h1></div>
            <div className={styles.overlapButton}>
            <Link href="/wallet"><button className={styles.navigator}>Dvoting</button></Link>
            <Link href="/wallet"><button className={styles.navigator}>wallet</button></Link>
            <Link href="/swaptoken"><button className={styles.navigator}>Swap</button></Link>
            <Link href="/author"><button className={styles.navigator}>Author</button></Link>
            <Link href="/signup"><button className={styles.navigator}>Sign up (your character)</button></Link>
            {/*FIXME: style is not working right now */}
            <ConnectToWallet />
            </div>
            {/*NOTE: dropdown will appear when page in small screen */}
            <div className={styles.dropdownwrapper}>
            <button className={styles.mobileView} onClick={()=>{toggleDropDown()}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
    </svg>
            </button>
            {dropDown && (<div className={styles.dropdownview}>
              {/*ketika link dikunjungi maka componen akan muncul di div innerbody */}
                <p className={styles.navdropdown}><Link href="">Dvoting</Link></p>
                <p className={styles.navdropdown}><Link href="">Swap</Link></p>
                <p className={styles.navdropdown}><Link href="">Wallet</Link></p>
                <p className={styles.navdropdown}><Link href="">Author</Link></p>
                <ConnectToWallet />
            </div>)}
            </div>
            </div>
        </div>
        </>
        );
}
