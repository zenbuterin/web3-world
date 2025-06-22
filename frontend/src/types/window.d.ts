import type { MetaMaskInpageProvider } from '@metamask/providers';
// Window Ethereum Declaration
declare global {
    interface Window {
        ethereum?: MetaMaskInpageProvider;
    }
}

export {}