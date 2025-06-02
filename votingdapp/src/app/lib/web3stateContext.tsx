'use client'
import abi from "@/app/MyContract.abi.json"
import { createPublicClient, createWalletClient, custom, getContract, http } from 'viem'
import React,{ useContext, useState, createContext, useEffect, ReactNode } from "react";
import { ganacheChain } from "./customGanacheChain"
import { MetaMaskSDK } from "@metamask/sdk"



const WalletContext = createContext<any | null>(null)
//NOTE: this state provider used by all component that interact with smartcontract or wallet provider or network provider
export function Web3StateProvider({children} : {children: ReactNode}) {
    const [instanceContract, setContract] = useState<any>();
    const [providerEth, setProvider] = useState<any>();
    const [address, setAddress]  = useState<any>("")
    //provider metamask
    const metamasksdk = new MetaMaskSDK({
    dappMetadata: {
        name: "Dapps utilities",
        url: window.location.href,
        },
    })
    const ethereumprovider: any = metamasksdk.getProvider();
    
    const createInstance = async () => {
        try {
                if (ethereumprovider) {
                    //for public action
                    const publicClient = createPublicClient({
                        chain: ganacheChain,
                        transport: http()
                    })
                    //for wallet action
                    const client = createWalletClient({
                        chain: ganacheChain,
                        transport: custom(ethereumprovider!)
                    })
                    //instance contract
                    const contract: any = getContract({
                        address: process.env.NEXT_PUBLIC_ADDRESS_CONTRACT as `0x${string}`,
                        abi: abi,
                        client: {public: publicClient, wallet: client}
                    })
                    
                    const [address] = await client.getAddresses();
                    setContract(contract);
                    //TODO: differentiate between signer and address
                    setProvider(ethereumprovider)
                    setAddress(address) 
                }
                else {
                    console.log("Install provider Web3 (Metamask)");
                }
            }
            catch(error: any) {
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
        if (address) {
            console.log("State address updated:", address);
        }
    }, [address]);

    return (
        <WalletContext.Provider value={{instanceContract, address, providerEth, createInstance}}>
            {children}
        </WalletContext.Provider>
    )
}

export function useWeb3State () {
    return useContext(WalletContext);
}

