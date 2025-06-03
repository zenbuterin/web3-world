'use client'
import ConnectToWallet from "./ui/walletConnect";
import Link from 'next/link';
import { useState } from "react";
// import style from "./main.module.css"
import { useUIContext } from "./lib/UIContext";



export default function Header() {
        const [dropDown, setDropDown] = useState(false)
        const toggleDropDown = () => {
        setDropDown((status) => (status === false ? true : false))}
        const style  = useUIContext()
    return (
        <>
        <div className={style.innerBody}>
            <div className={style.mainheader}>
            <div className={style.logo}><h1>WEB3 WORLD</h1></div>
            <div className={style.overlapButton}>
            <Link href="/dvoting"><button className={style.navigator}>Dvoting</button></Link>
            <Link href="/wallet"><button className={style.navigator}>wallet</button></Link>
            <Link href="/swaptoken"><button className={style.navigator}>Swap</button></Link>
            <Link href="/author"><button className={style.navigator}>Author</button></Link>
            <Link href="/signup"><button className={style.navigator}>Sign up (your character)</button></Link>
            {/*FIXME: style is not working right now */}
            <ConnectToWallet />
            </div>
            {/*NOTE: dropdown will appear when page in small screen */}
            <div className={style.dropdownwrapper}>
            <button className={style.mobileView} onClick={()=>{toggleDropDown()}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
    </svg>
            </button>
            {dropDown && (<div className={style.dropdownview}>
              {/*ketika link dikunjungi maka componen akan muncul di div innerbody */}
                <p className={style.navdropdown}><Link href="">Dvoting</Link></p>
                <p className={style.navdropdown}><Link href="">Swap</Link></p>
                <p className={style.navdropdown}><Link href="">Wallet</Link></p>
                <p className={style.navdropdown}><Link href="">Author</Link></p>
                <ConnectToWallet />
            </div>)}
            </div>
            </div>
        </div>
        </>
        );
}
