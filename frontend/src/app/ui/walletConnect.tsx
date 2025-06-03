'use client'
import { useUIContext } from "../lib/UIContext";
import { useWeb3State } from "../lib/web3stateContext";

//NOTE: this component is button for connect to wallet installed on browser
export default function ConnectToWallet() {
    const {address, createInstance} = useWeb3State()
    const style = useUIContext()
    
    return (
        <button onClick={()=> {createInstance()}} className={style.walletconnection}>{address ? address : "Connect wallet"}</button>
        )
}