'use client'
import type { ProposalInfoTypes } from "@/types/porposalInfoTypes";
import { VoteButton } from "./voteButton";
import { useEffect, useState } from "react";
import { useWeb3State } from "@/context/web3stateContext";
import { parseAbiItem, type Address } from "viem";
import { AddOptionButton } from "./addOptionButton";

export function ProposalCard ({id, title, description} : ProposalInfoTypes) {
    const {publicClient} = useWeb3State();
    const [optionIdPerProposal, setOptionIdPerProposal] = useState<bigint[]>([])
    //FIXME: this is not working, vote button is not appearing, unless we create new option right know.
    //it doesn't return previous vote button
    useEffect(() => {
        const unwatch = publicClient?.watchEvent({
            address: process.env.NEXT_PUBLIC_ADDRESS_CONTRACT as Address,
            event: parseAbiItem('event optionAdded(address addedBy, uint indexed proposalId, uint indexed optionId)'),
            onLogs: (logs) => { for(const log of logs) {
                setOptionIdPerProposal(prev => [...prev, log.args.optionId!])
            }},
            args : {
                proposalId: id
            }
        //FIXME: there is vulnerability here
        })!
        
        return () => unwatch()

    }, [publicClient])
    return <div className="bg-white flex flex-row justify-between rounded-md m-1 border-2 border-black">
        <div className="flex flex-col m-3">
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        <p className="text-gray-300">{description}</p>
        </div>
        <div className="flex flex-row">
        {optionIdPerProposal.map((optionButton, index) => <VoteButton key={index} idProposal={id} idOption={optionButton}/>)}
        <AddOptionButton idProposal={id}/>
        </div>
    </div>
}
