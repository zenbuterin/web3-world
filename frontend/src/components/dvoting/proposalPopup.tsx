'use client'
import { PopUpProposalTypes } from "@/types/popupProposalPropsTypes"
import CreateProposalFunction from "@/components/dvoting/createProposalfun"
import { useWeb3State } from "@/context/web3stateContext"
import { useEffect, useState } from "react"
import  { parseAbiItem, type  Address, WatchEventReturnType, WriteContractParameters } from "viem"
import axios from "axios"


export function Modal({isOpen, close} : PopUpProposalTypes ) {
    const [proposalCreatedInfoFromChild, setProposalCreatedInfoFromChild] = useState<WriteContractParameters>()
    const [notification, setNotification] = useState<Array<bigint | Address >>([])
    const [titleAndDescription, setTitleAndDescription] = useState({ title: "", description: "" })
    const { publicClient } = useWeb3State() 
    //function to retrieve data change from child
    const handleDataChangeFromChild = (value: WriteContractParameters ) => {
        setProposalCreatedInfoFromChild(value)
    }

    // TODO: ID, Title and Description need to save in database. sync to smartcontract.
    const handlePostDataToDB = async () => {
        try {
            // Fix: Check if notification[0] exists before using it
            if (!notification[0]) {
                console.error("Proposal ID not available")
                return
            }

            const result = await axios.post("http://127.0.0.1:8000/insertProposalInformation",
                {
                    "id": notification[0].toString(),
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
            // Fix: Show actual error details
            console.error("error happend when input data to database ", err)
        }
    }
    
    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {

        setTitleAndDescription((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))

    }

    const getEventProposalCreated = async () => {
        try {
            // Fix: Check if publicClient exists
            if (!publicClient) {
                console.log("publicClient not available yet")
                return
            }

            // Fix: Check if contract address exists
            if (!process.env.NEXT_PUBLIC_ADDRESS_CONTRACT) {
                console.error("Contract address not defined")
                return
            }

            const logs = await publicClient.getLogs({
                address: process.env.NEXT_PUBLIC_ADDRESS_CONTRACT as Address,
                event: parseAbiItem('event proposalCreated(address createdBy, uint indexed proposalId)')
            })

            // Fix: Check if logs exist and have data
            if (logs.length === 0) {
                console.log("No proposal events found")
                return
            }

            const lastLog = logs.findLast((log) => log.args?.proposalId !== undefined)
            
            // Fix: Check if lastLog exists and has the required data
            if (lastLog && lastLog.args?.proposalId !== undefined && lastLog.args?.createdBy !== undefined) {
                const currentProposalId = lastLog.args.proposalId
                const currentProposalCreator = lastLog.args.createdBy
                setNotification([currentProposalId, currentProposalCreator])
                console.log(`current id of proposals: ${currentProposalId}\n current proposal creator: ${currentProposalCreator}`);
            } else {
                console.log("No valid proposal data found in logs")
            }
        } catch (err) {
            console.error("Error fetching proposal events:", err)
        }
    }

    useEffect(() => {
        // Fix: Only call when publicClient is available
        if (publicClient) {
            getEventProposalCreated();
        }
    }, [proposalCreatedInfoFromChild, publicClient])


    return (<div className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 bg-black/50 z-50 flex items-center
            justify-center`}>
        <div className= "p-8 h-100 w-100 bg-white border-4 rounded-xl">
            <h1 className="font-bold text-xl">What you need to do?</h1>
              <div className="mt-5">
                <label>Proposal Title</label>
                  <input className="border-b-3" type="text" name="title" placeholder="What's your Proposal Title?" onChange={handleChangeInput}></input>
                  </div>
                  <div className="mt-3">
                  <label>Description for Proposal</label>
                  <input className="border-b-3" type="text" name="description" placeholder="Add a description to your Proposal" onChange={handleChangeInput}></input>
                  </div>
                  <div className="flex flex-col">
                  <CreateProposalFunction oncreate={handleDataChangeFromChild} onPostTodb={handlePostDataToDB} />
                <button className="shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] duration-150 transition-shadow hover:bg-gray-600 hover:text-white bg-white border-3 border-black mt-4 h-10 w-20 rounded-lg" onClick={() => close()}>Back</button>
              </div>
          </div>
        </div>)
}
