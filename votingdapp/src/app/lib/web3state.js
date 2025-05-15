import contractAbi from "@/app/abi";
import { ethers } from "ethers/lib.commonjs/ethers";
import React,{ useContext, useState, createContext, useState } from "react";

const StateContext = createContext()

export function Web3StateProvider({child}) {
    const [contract, setContract] = useState(null);
    
    const createInstance = async () => {
        if (window.ethereum) {
            const ethersProvider = new ethers.BrowserProvider(window.ethereum)
            const signer = await ethersProvider.getSigner()
            const contract = new ethers.Contract(process.env.ADDRESSCONTRACT, contractAbi, signer);
            setContract(contract)
            console.log("Connected to (account): ", signer)
        }
        else {
            console.log("Install provider Web3 (Metamask)");
        }
    }

    return (
        <StateContext.Provider value={{contract, createInstance}}>
            {child}
        </StateContext.Provider>
    )
}

export function useWeb3State () {
    useContext(StateContext);
}

