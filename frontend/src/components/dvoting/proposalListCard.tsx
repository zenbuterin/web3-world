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
        }, 10000);

        return () => clearInterval(interval)
    }, [])
    return <div className="w-120 h-fit bg-blue-600 text-amber-50">
        {list.map((value) => <ProposalCard id={value.id} title={value.title} description={value.description}/>)}
    </div>
}