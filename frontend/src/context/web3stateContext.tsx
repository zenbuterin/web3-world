'use client'


import type {
    Web3State,
    Web3StateProviderProps,
    ContractType,
    Web3Error,
} from "@/types/web3.types.ts";

// Import libraries
import abi from "@/app/MyContract.abi.json";
import { createPublicClient, createWalletClient, custom, getContract, http } from 'viem';
import type { PublicClient, WalletClient, Address } from "viem";
import React, { useContext, useState, createContext, useEffect } from "react";
import { ganacheChain } from "./customGanacheChain";
import { MetaMaskSDK, type SDKProvider } from "@metamask/sdk";

let metamasksdk: MetaMaskSDK | null = null;
export const WalletContext = createContext<Web3State | null>(null);

export function Web3StateProvider({ children }: Web3StateProviderProps) {
    const [contract, setContract] = useState<ContractType | null>(null);
    const [providerEth, setProvider] = useState<SDKProvider | undefined>(undefined);
    const [address, setAddress] = useState<Address | null>(null);
    const [walletClient, setWalletClient] = useState<WalletClient | null | undefined>(undefined);
    const [publicClient, setPublicClient] = useState<PublicClient | null | undefined>(undefined);


    const createInstance = async (): Promise<void> => {
        try {
            // Provider metamask
            metamasksdk = new MetaMaskSDK({
                dappMetadata: {
                    name: "Dapps utilities",
                    url: window.location.href,
                },
            });

            await metamasksdk.init();
            const ethereumProvider = metamasksdk.getProvider();

            if (window.ethereum && ethereumProvider) {
                // For public action
                const publicClient: PublicClient = createPublicClient({
                    chain: ganacheChain,
                    transport: http()
                });

                // For wallet action
                const walletClient: WalletClient = createWalletClient({
                    chain: ganacheChain,
                    transport: custom(window.ethereum)
                });

                // Contract address validation
                const contractAddress = process.env.NEXT_PUBLIC_ADDRESS_CONTRACT as Address
                if (!contractAddress) {
                    throw new Error("Contract address not found in environment variables");
                }

                // Instance contract
                const contractInstance: ContractType = getContract({
                    address: contractAddress,
                    abi: abi,
                    client: { public: publicClient, wallet: walletClient }
                }) 

                // Request accounts
                const accounts = await ethereumProvider.request({
                    method: "eth_requestAccounts",
                }) as string[];

                setContract(contractInstance);
                sessionStorage.setItem("contractInstance", contractInstance as any )
                setProvider(ethereumProvider);
                sessionStorage.setItem("ethereumProvider", ethereumProvider as any)
                setPublicClient(publicClient);  
                sessionStorage.setItem("publicClient", publicClient as any)
                setWalletClient(walletClient);  
                sessionStorage.setItem("walletClient", walletClient as any)
                //TODO: this address need to adjustment
                setAddress(accounts[0] as Address);
                sessionStorage.setItem("address", accounts[0] as Address)

            } else {
                throw new Error("MetaMask not installed or not available");
            }
        } catch (error: unknown) {
            const web3Error = error as Web3Error;
            const errorMessage = web3Error.message || "Unknown error occurred";

            if (web3Error.code === 4001) {
                console.log("User rejected connection");
            } else {
                console.log("Can't connect to Web3: ", errorMessage);
            }
        }
    };

    useEffect(() => {
      const contractInstance = sessionStorage.getItem("contractInstance")
      const ethereumProvider = sessionStorage.getItem("ethereumProvider")
      const publicClient = sessionStorage.getItem("publicClient")
      const walletClient = sessionStorage.getItem("walletClient")
      const address = sessionStorage.getItem("address")
        if (contractInstance && ethereumProvider && publicClient && walletClient && address) {
            console.log("State instanceContract updated:", contract);
            createInstance();
        }
    }, []);



    return (
        <WalletContext.Provider value={{contract, address, providerEth, createInstance, walletClient, publicClient
        }}>
            {children}
        </WalletContext.Provider>
    );
}

// Hook yang safe - return Web3State tanpa null
export function useWeb3State() {
    const context = useContext<Web3State | null>(WalletContext);
    
    if (!context) {
        throw new Error('useWeb3State must be used within Web3StateProvider');
    }
    return context;
}
