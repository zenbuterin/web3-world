'use client'
import { useState } from "react"
import { Modal } from "./proposalPopup"

export function CreateProposalButton() {
    const [modalOpen , setModelOpen] = useState(false)
    
    return <div className="modal">
        <Modal isOpen={modalOpen} close={() => setModelOpen(false)} />
    </div>
}