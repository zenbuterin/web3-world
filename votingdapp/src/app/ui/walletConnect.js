'use client'
import { ethers } from "ethers";
import contractAbi from "@/app/abi";


export default function ConnectToWallet() {

    const connectToWeb3 = async () => {
    try {
        if (window.ethereum) {
            const ethersProvider = new ethers.BrowserProvider(window.ethereum)
            const signer = await ethersProvider.getSigner()
            const contract = new ethers.Contract(signer, contractAbi, ethersProvider)
            console.log("Connected to (account): ", signer)
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

    return <button onClick={connectToWeb3}>Connect your wallet</button>
}