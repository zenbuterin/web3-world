'use client'
import contractAbi from "@/app/abi";
import { ethers } from "ethers";
import React,{ useContext, useState, createContext, useEffect } from "react";

const WalletContext = createContext(null)
//NOTE: this state provider used by all component that interact with smartcontract or wallet provider or network provider
export function Web3StateProvider({children}) {
    const [instanceContract, setContract] = useState(null);
    const [signer, setSigner] = useState(null)
    const [provider, setProvider] = useState(null);
    const [address, setAddress] = useState("")
    
    const createInstance = async () => {
        try {
                if (window.ethereum ) {
                    const ethersProvider = new ethers.BrowserProvider(window.ethereum)
                    const signer = await ethersProvider.getSigner()
                    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_ADDRESS_CONTRACT, contractAbi, signer);
                    const address = signer.getAddress()
                    setContract(contract);
                    setSigner(signer)
                    setProvider(ethersProvider)
                    setAddress(address)

                    
                }
                else {
                    console.log("Install provider Web3 (Metamask)");
                }
            }
            catch(error) {
                if(error.code === 4001){
                    console.log("User rejected connection")
                }else {
                    console.log("Can't connect to Web3: ", error)
        
                }
                
            }
    }

    useEffect(() => {
        if (instanceContract) {
            console.log("State instanceContract updated:", instanceContract);
        }
    }, [instanceContract]);
    
    useEffect(() => {
        if (signer) {
            console.log("State signer updated:", signer);
        }
    }, [signer]);
    
    useEffect(() => {
        if (address) {
            console.log("State address updated:", address);
        }
    }, [address]);

    return (
        <WalletContext.Provider value={{instanceContract, signer, address, provider, createInstance}}>
            {children}
        </WalletContext.Provider>
    )
}

export function useWeb3State () {
    return useContext(WalletContext);
}

