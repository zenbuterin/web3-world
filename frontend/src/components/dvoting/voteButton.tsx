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
            console.log(`${request}`)
        }
        catch(err: any) {
            console.log(`error happen when vote: ${err}`)
        }
    }

    return <button onClick={handleVote} className="shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] duration-150 transition-shadow hover:bg-[#333c64] hover:text-white bg-white border-3 border-black mt-4 h-10 w-20 rounded-lg">Vote</button>

}
