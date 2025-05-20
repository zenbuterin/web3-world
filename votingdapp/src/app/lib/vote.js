import { Web3StateProvider } from "./web3state";
import { isAddress } from "ethers";

export default function useVote(randomGeneratedCode) {
    const { instanceContract } = Web3StateProvider()

    async function handleVote(candidateAddress, candidateCode, roomCode) 
    
    {
        const validAddress = isAddress(candidateAddress) ? candidateAddress : false;
        try {
            if(validAddress && candidateCode == Number(randomGeneratedCode) ){ 
            const tx = await instanceContract.vote(candidateAddress, candidateCode, roomCode);
            await tx.wait()
            console.log("successful");
            }
            
        }
        catch(err) {
            console.log("")

        }
    }


    
}