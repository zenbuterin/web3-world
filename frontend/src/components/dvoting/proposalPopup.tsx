'use client'
import { PopUpProposalTypes } from "@/types/popupProposalPropsTypes"
import CreateProposalFunction from "@/components/dvoting/createProposalfun"
import { useWeb3State } from "@/context/web3stateContext"
import { useEffect, useState } from "react"
import  { parseAbiItem, type  Address, WatchEventReturnType, WriteContractParameters } from "viem"
import abi from "@/app/MyContract.abi.json"

export function Modal({isOpen, close} : PopUpProposalTypes ) {
    const [proposalCreatedInfoFromChild, setProposalCreatedInfoFromChild] = useState<WriteContractParameters>()
    const [notification, setNotification] = useState<Array<bigint | Address>>([])
    const { publicClient } = useWeb3State() 

    //function to retrieve data change from child
    const handleDataChangeFromChild = (value: WriteContractParameters ) => {
        setProposalCreatedInfoFromChild(value)
    }

    const getEventProposalCreated = async () => {
        const logs = await publicClient!.getLogs({
            address: process.env.NEXT_PUBLIC_ADDRESS_CONTRACT as Address,
            event: parseAbiItem('event proposalCreated(address createdBy, uint indexed proposalId)')
        })

        const currentProposalId = logs.findLast((log) => log?.args.proposalId)?.args.proposalId!
        const currentProposalCreator = logs.findLast((log) => log?.args.proposalId)?.args.createdBy!
        setNotification([currentProposalId, currentProposalCreator])

        console.log(`current id of proposals: ${currentProposalId}\n current proposal creator: ${currentProposalCreator}`);
    }

    // TODO: ID, Title and Description need to save in database. sync to smartcontract.

    useEffect(() => {
        getEventProposalCreated();
    }, [proposalCreatedInfoFromChild])


    return (<div className={`popupProposal ${isOpen ? 'block' : 'hidden'}`}>
        <div className= {`inputTitleAndDescription bg-gray-800 text-gray-50 h-100 w-100`}>
            <input type="text" name="title" placeholder="What's your Proposal Title?"></input>
            <input type="text" name="description" placeholder="Add a description to your Proposal"></input>
        <CreateProposalFunction oncreate={handleDataChangeFromChild}/>
        <button className="bg-red-900 h-20 w-30 p-0.5" onClick={() => close()}>Back</button>
        </div>
        </div>)
}