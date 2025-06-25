import type { ProposalInfoTypes } from "@/types/porposalInfoTypes";
export function ProposalCard ({id, title, description} : ProposalInfoTypes) {
    return <div>
        <div className="w-100 h-40 bg-amber-700 text-amber-300">
        <div>{id}</div>
        <div>{title}</div>
        </div>
        <div>{description}</div>
    </div>
}