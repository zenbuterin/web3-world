import { useWeb3State } from "@/context/web3stateContext";
import abi from "@/app/MyContract.abi.json"
import type { Address, WriteContractParameters } from "viem";

export default function CreateProposalFunction({oncreate, onPostTodb} : {oncreate : (value : WriteContractParameters) => void , onPostTodb: () => void}) {
    const {publicClient, walletClient} = useWeb3State()


    const handleCreationProposal = async () => {
        try{
            const {request} = await publicClient!.simulateContract({
                account : '0x4CB8154101f08f062Cf208175A428773D5C259cc' as Address,
                address: process.env.NEXT_PUBLIC_ADDRESS_CONTRACT as Address ,
                abi: abi,
                functionName: 'createProposal'
            })
            await walletClient?.writeContract(request)
            //FIXME: there is vulnerability here
            oncreate(request)
            console.log(`Proposal Created: ${request}`)
            onPostTodb()

        }
        catch(err: any) {
            console.log(err);
        }
    }
    return (<button onClick={() => handleCreationProposal()} className="p-3 mt-4 h-20 w-45 font-medium bg-white 
            hover:bg-gray-600 hover:text-gray-100 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] 
            active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] duration-150 transition-shadow rounded-lg active:bg-violet-950">Create Proposal now!</button>)

}
