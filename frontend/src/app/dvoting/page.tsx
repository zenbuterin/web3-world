'use client'
import { CreateProposalButton } from "@/components/dvoting/createProposalButton";
import { ProposalListCard } from "@/components/dvoting/proposalListCard";

//NOTE: this is /dvoting path
export default function page() {
    return (<>
    <div className="p-8 flex flex-row">  
        <ProposalListCard />
        <CreateProposalButton />
    </div>
    </>)
}
