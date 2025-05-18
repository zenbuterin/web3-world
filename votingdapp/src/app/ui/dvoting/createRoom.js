'use client'
import { isAddress } from "ethers";
import { useEffect, useState } from "react";

import { useWeb3State } from "@/app/lib/web3state";


export default function CreateRoom() {
    const [roomCode, setRoomCode] = useState(0);
    const [firstcan, setfirstcan] = useState("");
    const [secondcan, setsecondcan] = useState("");
    const {instanceContract} = useWeb3State();
    async function handleCreateRoom() {
        const validfirstcan = isAddress(firstcan) ? firstcan : false;
        const validSecondcan = isAddress(secondcan) ? firstcan : false;
        try {
            if (validfirstcan && validSecondcan) {
                const tx = await instanceContract.addRoom(roomCode, firstcan, secondcan);
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

    useEffect(() => {
        instanceContract.on("roomAdded",(_roomCode, _candidate1, _candidate2) => {
                    console.log(`room code added: ${_roomCode}, included first candidate: ${_candidate1} & second Candidate: ${_candidate2}`)
                })
    }, [])

    return(
        <div>
                <label >Create A Room: </label>
                <label>what is the room code?</label>
                <input type="number" value={roomCode} onChange={(e) => setRoomCode(e.target.value)} placeholder="Room Code"></input>
                <label>who is the first candidate?</label>
                <input  type="text" value={firstcan} onChange={(e) => setfirstcan(e.target.value)}  placeholder="First Candidate (address)"></input>
                <label>who is the second candidate?</label>
                <input  type="text" value={secondcan} onChange={(e) => setsecondcan(e.target.value)}  placeholder="Second Candidate (address)"></input>
                <button onClick={() => {handleCreateRoom()}}>Process create</button>
            </div>
    )
}