import { useEffect } from "react";
import { useWeb3State } from "./web3stateContext";
import { isAddress } from "ethers";

export default function useVote({candidateAddress, randomGeneratedCode, roomCode} : {candidateAddress : string, randomGeneratedCode : number, roomCode: number}) {
    const { instanceContract } = useWeb3State()

    async function handleVote()  
    {
        const validAddress = isAddress(candidateAddress) ? candidateAddress : false;
        try {
            if(validAddress){ 
            const tx = await instanceContract.vote(candidateAddress, randomGeneratedCode, roomCode);
            await tx.wait()
            console.log("successful");
            }
            else {
                console.log("invalid input address")
            }
        }
        catch(err) {
            console.log("vote unsuccessful")
        }
    }

    // useEffect(() => {
        //TODO: use viem style
        // instanceContract.on("Voted", (_voter, _roomCode, _candidate, _candidateCode) => {
        //     console.log(`you are ${_voter} vote for ${_candidate} has candidate code: ${_candidateCode} at ${_roomCode} `)
    //     })
    // }, [])

    return { handleVote }
}