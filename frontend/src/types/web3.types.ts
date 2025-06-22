// File: types/web3.types.ts

import type { PublicClient, WalletClient, GetContractReturnType, Address,  } from "viem";
import type { SDKProvider } from "@metamask/sdk";
import type { ReactNode } from "react";
import type abi from "@/app/MyContract.abi.json";

// Contract Types
export type ContractType = GetContractReturnType<
    typeof abi, 
    PublicClient |
    WalletClient
>;

// Web3 State Types
export type Web3State = { 
    contract: ContractType | null;
    address: Address | null;
    providerEth: SDKProvider | undefined;
    createInstance: () => Promise<void>;
    walletClient: WalletClient | null | undefined;
    publicClient: PublicClient | null | undefined;
};

// Provider Props Type
export type Web3StateProviderProps = {
    children: ReactNode;
};

// MetaMask Request Types
export type MetaMaskRequestArgs = {
    method: string;
    params?: any[];
};

// Ethereum Provider Types
export interface EthereumProvider {
    request: (args: MetaMaskRequestArgs) => Promise<any>;
    on?: (event: string, handler: (...args: any[]) => void) => void;
    removeListener?: (event: string, handler: (...args: any[]) => void) => void;
    isMetaMask?: boolean;
}

// Error Types
export type Web3Error = {
    code?: number;
    message: string;
};

// Contract Method Types (contoh, sesuaikan dengan contract Anda)
export type ContractMethods = {
    // Contoh methods - sesuaikan dengan ABI
    balanceOf?: (address: string) => Promise<bigint>;
    transfer?: (to: string, amount: bigint) => Promise<any>;
    // Tambahkan method lain sesuai kebutuhan
};