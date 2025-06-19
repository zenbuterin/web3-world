'use client'
import { PopUpProposalTypes } from "@/types/popupProposalPropsTypes"
import CreateProposalFunction from "@/components/dvoting/createProposalfun"
import { useEffect, useState } from "react"


export function Modal({isOpen, close } : PopUpProposalTypes ) {
    const [log, setLog] = useState()
    if(!isOpen) {
        return null
    }

    useEffect(() => {

    }, [])

    return <div className="popupProposal">
        <div className="inputTitleAndDescription">
            <input type="text" name="title" placeholder="What's your Proposal Title?"></input>
            <input type="text" name="description" placeholder="Add a description to your Proposal"></input>
        </div>
        <CreateProposalFunction/>
        <button onClick={() => close()}>Back</button>
        </div>

}