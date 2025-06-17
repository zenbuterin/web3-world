'use client'
import abi from "@/app/MyContract.abi.json"
import { createPublicClient, createWalletClient, custom, getContract, http, type GetContractReturnType  } from 'viem'
import React,{ useContext, useState, createContext, useEffect, ReactNode } from "react";
import { ganacheChain } from "./customGanacheChain"
import { MetaMaskSDK } from "@metamask/sdk"
import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
    interface Window {
        ethereum?: any;
    }
}


let metamasksdk: MetaMaskSDK | null = null;
const WalletContext = createContext<any | null>(null)
//NOTE: this state provider used by all component that interact with smartcontract or wallet provider or network provider
export function Web3StateProvider({children} : {children: ReactNode}) {
    const [contract, setContract] = useState<any>()
    const [providerEth, setProvider] = useState<any>()
    const [address, setAddress]  = useState<string>("")
    const [walletClient, setWalletClient] = useState<any>()
    const [publicClient, setPublicCLient] = useState<any>()

    const createInstance = async () => {
        //provider metamask
    metamasksdk = new MetaMaskSDK({
    dappMetadata: {
        name: "Dapps utilities",
        url: window.location.href,
        },
    })
    await metamasksdk.init() //starting point for connect to metamask
    const ethereumprovider = metamasksdk.getProvider();
        try {
            
                if (window.ethereum) {
                    //for public action
                    const publicclient = createPublicClient({
                        chain: ganacheChain,
                        transport: http()
                    })
                    //for wallet action
                    const client = createWalletClient({
                        chain: ganacheChain,
                        transport: custom(window.ethereum)
                    })
                    //instance contract
                    const contract = getContract({
                        address: process.env.NEXT_PUBLIC_ADDRESS_CONTRACT as `0x${string}`,
                        abi: abi,
                        client: {public: publicclient, wallet: client}
                    })

                    const accounts: any = await ethereumprovider!.request({
                        method: "eth_requestAccounts",
                    });
                    setContract(contract);
                    //TODO: differentiate between signer and address
                    setProvider(ethereumprovider)
                    setPublicCLient(publicClient)
                    setWalletClient(walletClient)
                    setAddress(accounts[0])
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
        if (contract) {
            console.log("State instanceContract updated:", contract);
        }
    }, [contract]);


    

    return (
        <WalletContext.Provider value={{contract, address, providerEth, createInstance, walletClient, publicClient}}>
            {children}
        </WalletContext.Provider>
    )
}

export function useWeb3State () {
    return useContext(WalletContext);
}

