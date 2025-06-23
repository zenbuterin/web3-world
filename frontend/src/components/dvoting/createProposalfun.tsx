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
    return (<button onClick={() => handleCreationProposal()} className="p-3 h-40 w-100 text-green-400 font-bold bg-green-800">Create Proposal now!</button>)

}