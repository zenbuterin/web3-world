'use client'
import { captureOwnerStack } from "react";
import { useWeb3State } from "../lib/web3state";

//NOTE: this component is button for connect to wallet installed on browser
export default function ConnectToWallet() {
    const {address, createInstance} = useWeb3State()
    
    return (
        <button onClick={()=> {createInstance()}}>{address ? address : "Connect wallet"}</button>
        )
}