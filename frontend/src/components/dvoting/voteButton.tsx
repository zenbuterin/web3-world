import { useWeb3State } from "@/context/web3stateContext"
import type { Address } from "viem"
import abi from "@/app/MyContract.abi.json"

export function VoteButton({idProposal, idOption } : {idProposal : bigint, idOption: bigint }) {
    const {publicClient, walletClient} = useWeb3State()
    
    const handleVote = async () => {
        try{
            const {request} = await publicClient!.simulateContract({
                account: '0x4CB8154101f08f062Cf208175A428773D5C259cc' as Address,
                address: process.env.NEXT_PUBLIC_ADDRESS_CONTRACT as Address,
                abi: abi,
                functionName: 'vote',
                args: [idProposal, idOption]
            })
            await walletClient!.writeContract(request)
        }
        catch(err: any) {
            console.log(`error happen when vote: ${err}`)
        }
    }

    return <button onClick={handleVote}>Vote</button>
}