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
    return <div>
        <div className="w-100 h-40 bg-amber-700 text-amber-300">
        <AddOptionButton idProposal={id}/>
        <div>{id}</div>
        <div>{title}</div>
        </div>
        <div>{description}</div>
        {optionIdPerProposal.map((optionButton, index) => <VoteButton key={index} idProposal={id} idOption={optionButton}/>)}
    </div>
}