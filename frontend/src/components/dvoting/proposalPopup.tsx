'use client'
import { PopUpProposalTypes } from "@/types/popupProposalPropsTypes"
import CreateProposalFunction from "@/components/dvoting/createProposalfun"
import { useWeb3State } from "@/context/web3stateContext"
import { useEffect, useState } from "react"
import  { parseAbiItem, type  Address, WatchEventReturnType, WriteContractParameters } from "viem"
import axios from "axios"


export function Modal({isOpen, close} : PopUpProposalTypes ) {
    const [proposalCreatedInfoFromChild, setProposalCreatedInfoFromChild] = useState<WriteContractParameters>()
    const [notification, setNotification] = useState<Array<bigint | Address>>([])
    const [titleAndDescription, setTitleAndDescription] = useState({ title: "", description: "" })
    const { publicClient } = useWeb3State() 

    //function to retrieve data change from child
    const handleDataChangeFromChild = (value: WriteContractParameters ) => {
        setProposalCreatedInfoFromChild(value)
    }

    // TODO: ID, Title and Description need to save in database. sync to smartcontract.
    const handlePostDataToDB = async () => {
        try {
            const result = await axios.post("http://127.0.0.1:8000/insertProposalInformation",
                {
                    "id": notification[0],
                    "title": titleAndDescription.title,
                    "description": titleAndDescription.description
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            console.log(`post data successful ${result}`)
        }
        catch(err) {
            console.error("error happend when input data to database ")
        }
    }
    
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {

        setTitleAndDescription((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))

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

    



    useEffect(() => {
        getEventProposalCreated();
    }, [proposalCreatedInfoFromChild])


    return (<div className={`popupProposal ${isOpen ? 'block' : 'hidden'}`}>
        <div className= {`inputTitleAndDescription bg-gray-800 text-gray-50 h-100 w-100`}>
            <label>Proposal Title</label>
            <input type="text" name="title" placeholder="What's your Proposal Title?" onChange={handleChangeInput}></input>
            <label>Description for Proposal</label>
            <input type="text" name="description" placeholder="Add a description to your Proposal" onChange={handleChangeInput}></input>
        <CreateProposalFunction oncreate={handleDataChangeFromChild} onPostTodb={handlePostDataToDB} />
        <button className="bg-red-900 h-20 w-30 p-0.5" onClick={() => close()}>Back</button>
        </div>
        </div>)
}