'use client'
import { useState, useEffect } from "react"
import axios from "axios"
import type { ProposalInfoTypes } from "@/types/porposalInfoTypes"
import { ProposalCard } from "./proposalCard"

export function ProposalListCard() {
    const [list, setList] = useState<ProposalInfoTypes[]>([])
    const fetchInformationProposalFromDb = async () => {
        await axios.get<ProposalInfoTypes[]>('http://127.0.0.1:8000/getInfoProposal').then((data) => setList(data.data))

        return list;
    }
    useEffect(() => {
        const interval = setInterval(async() => {
            fetchInformationProposalFromDb()
        }, 3000);

        return () => clearInterval(interval)
    }, [])
    
    return <div className="flex flex-col bg-gray-200 border-3 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex-grow">
        {list.map((value, index) => <ProposalCard key={index} id={value.id} title={value.title} description={value.description}/>)} 
    </div>
}
