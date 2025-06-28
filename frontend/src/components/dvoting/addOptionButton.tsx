import { useWeb3State } from "@/context/web3stateContext"
import type { Address } from "viem";
import abi from "@/app/MyContract.abi.json"

export function AddOptionButton({idProposal} : {idProposal : bigint}) {
    const {walletClient, publicClient} = useWeb3State();

    const handleAddingOption = async () => {
        try {
            const { request } = await publicClient!.simulateContract({
            account: '0x4CB8154101f08f062Cf208175A428773D5C259cc' as Address, 
            address: process.env.NEXT_PUBLIC_ADDRESS_CONTRACT as Address,
            abi: abi,
            functionName: 'addOption',
            //TODO: add suitable argument here
            args: [idProposal]
            })
            await walletClient?.writeContract(request)
        }
        catch(err: any) {
            console.log(`error happend when trying add option: ${err}`)
        }
    }

    
    return <button className="shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] duration-150 transition-shadow
    w-25 m-4 hover:bg-gray-600 hover:text-white border-2 bg-white border-black rounded-md cursor-pointer text-black" onClick={handleAddingOption} >Add Option</button>
}
