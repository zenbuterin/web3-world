'use client'
import { useWeb3State } from "../lib/web3state";


export default function ConnectToWallet() {
    const {createInstance} = useWeb3State();
    return (
        <button onClick={()=> {createInstance()}}>Connect your wallet</button>
        )
}