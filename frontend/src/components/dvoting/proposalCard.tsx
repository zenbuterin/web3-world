'use client'
import type { ProposalInfoTypes } from "@/types/porposalInfoTypes";
import { VoteButton } from "./voteButton";
import { AddOptionButton } from "./addOptionButton";
import { useEffect } from "react";
import { VoterCount } from "./VoterCount";

interface ProposalCardProps extends ProposalInfoTypes {
    options: bigint[];
}

export function ProposalCard ({id, title, description, options} : ProposalCardProps) {

    
    // Debug log
    useEffect(() => {
        console.log(`ProposalCard ${id} received options:`, options);
    }, [id, options]);

    return <div className="bg-white flex flex-row justify-between rounded-md m-1 border-2 border-black"
    role="button" onClick={handleNavigate} onKeyDown={(e) => {if (e.key == 'Enter' || e.key == ' ') {handleNavigate()}} }>
        <div className="flex flex-col m-3">
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        <p className="text-gray-300">{description}</p>
        {options.map((optionId) => {
          return <VoterCount key={`${id}-${optionId}`} proposalId={BigInt(id)} optionId={optionId} />
        })}
        </div>
        <div className="flex flex-row">
        <div className="flex flex-col">
        <div>
        {options.length > 0 ? (
            options.map((optionId, index) => {
                console.log(`Rendering VoteButton for proposal ${id}, option ${optionId}`);
                return <VoteButton key={`${id}-${optionId}`} idProposal={BigInt(id)} idOption={optionId}/>
            })
        ) : (
            <span className="text-gray-400 text-sm mr-2">No options yet</span>
        )}
        </div>
        </div>
        <AddOptionButton idProposal={BigInt(id)}/>
        </div>
    </div>
}
