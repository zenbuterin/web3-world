'use client'
import { useState } from "react"
import { Modal } from "./proposalPopup"

export function CreateProposalButton() {
    const [modalOpen , setModelOpen] = useState(false)
    
    return (<div className="flex flex-col h-full">
        <button className="border-black border-3 w-20 text-black bg-white hover:bg-[#333c64] hover:text-white rounded-lg h-40 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
        active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] duration-150 transition-shadow ml-3" onClick={() => setModelOpen(true)}>Create Proposal</button>
        <Modal isOpen={modalOpen} close={() => setModelOpen(false)} />
        </div>)
}
