'use client'
import { isAddress } from "ethers";
import { useEffect, useState } from "react";
import { watchContractEvent } from "viem/_types/actions/public/watchContractEvent";
import { useWeb3State } from "@/context/web3stateContext";
import { useVoteState } from "@/context/voteStateContext";
import { ParseAbiItem } from "viem";




export default function CreateRoom() {
    const [roomCode, setRoomCode] = useState<number>(0);
    const [firstcan, setfirstcan] = useState<string>("");
    const [secondcan, setsecondcan] = useState<string>("");
    //for set global state
    const {setRoomcode, setCandidateaddress} = useVoteState();
    //jika contract == null, maka akan terjadi error jika langsung di akses url dvoting
    const {contract, publicClient} = useWeb3State();
    async function handleCreateRoom() {
        const validfirstcan = isAddress(firstcan) ? firstcan : false;
        const validSecondcan = isAddress(secondcan) ? firstcan : false;

        try {
            if (validfirstcan && validSecondcan) {
                const tx = await contract.addRoom(roomCode, firstcan, secondcan);
                await tx.wait()
                console.log("successful");
            }
            else {
                console.log("input is not valid");
            }
        }
        catch(err) {
            console.log("error input is not valid or fail to add room", err)

        }
    }

    // useEffect(() => {
    //     const unwatch = publicClient.watchContractEvent({
    //         address: 
    //         onlogs: logs => console.log(logs)
    //     })
    // }, [])
    //its for global state
    useEffect(() => {
        setRoomcode(roomCode)
    }, [roomCode])

    useEffect(() => {
        setCandidateaddress([firstcan, secondcan])
    }, [firstcan, secondcan])
    
    

    return(
        <div>
                <label >Create A Room: </label>
                <label>what is the room code?</label>
                <input type="number" value={roomCode} onChange={(e) => setRoomCode(Number(e.target.value))} placeholder="Room Code"></input>
                <label>who is the first candidate?</label>
                <input  type="text" value={firstcan} onChange={(e) => setfirstcan(e.target.value)}  placeholder="First Candidate (address)"></input>
                <label>who is the second candidate?</label>
                <input  type="text" value={secondcan} onChange={(e) => setsecondcan(e.target.value)}  placeholder="Second Candidate (address)"></input>
                <button onClick={() => {handleCreateRoom()}}>Process create</button>
            </div>
    )
}