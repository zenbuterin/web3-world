'use client'
import { useUIContext } from "../store/UIContext";
import { useWeb3State } from "../store/web3stateContext";
import { sortAddress } from "../store/sorterAddress";

//NOTE: this component is button for connect to wallet installed on browser
export default function ConnectToWallet() {
    const {address, createInstance} = useWeb3State()
    const style = useUIContext()
    
    return (
        <button onClick={()=> {createInstance()}} className={style.walletconnection}>{address ? sortAddress(address): "Connect wallet"}</button>
        )
}