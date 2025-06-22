'use client'
import { useState } from "react"
import { Modal } from "./proposalPopup"

export function CreateProposalButton() {
    const [modalOpen , setModelOpen] = useState(false)
    
    return (<div className="modal ">
        <button className="p-1 bg-gray-600 text-white h-10 w-34" onClick={() => setModelOpen(true)}>Create Proposal</button>
        <Modal isOpen={modalOpen} close={() => setModelOpen(false)} />
        </div>)
}