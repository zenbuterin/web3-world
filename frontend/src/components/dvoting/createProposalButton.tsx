import { useWeb3State } from "@/context/web3stateContext"
import { useEffect  } from "react";
import { watchEvent } from "viem/_types/actions/public/watchEvent";
import {type GetContractReturnType } from "viem"

export default function () {
    const { walletClient, contract } = useWeb3State()
    const handleCreateProposal = async () => {
        //to communicate with smartcontract
        let proposal = await contract.write.createProposal();
    }

    

    //for notification on page
    useEffect(() => {
        const unwatch = contract.watche
    })

    return <button onClick={() => {handleCreateProposal()}}></button>
}
