'use client'
import { isAddress } from "ethers";
import { useState } from "react";

const { useWeb3State } = require("./web3state");

const {instanceContract, address, signer, provider} = useWeb3State();

export default function CreateRoom() {
    const [roomCode, setRoomCode] = useState(0);
    const [firstcan, setfirstcan] = useState("");
    const [secondcan, setsecondcan] = useState("");
    async function handleCreateRoom() {
        try {
            const tx = await instanceContract.addRoom()
            

        }
        catch(err) {

        }
    }

    return(
        <div>
                <label className={styles.head}>Create A Room: </label>
                <label>what is the room code?</label>
                <input className={styles.value} type="number" value={roomCode} onChange={(e) => setRoomCode(e.target.value)} placeholder="Room Code"></input>
                <label>who is the first candidate?</label>
                <input className={styles.value} type="name" value={firstcan} onChange={(e) => setfirstcan(e.target.value)}  placeholder="First Candidate (address)"></input>
                <label>who is the second candidate?</label>
                <input className={styles.value} type="name" value={secondcan} onChange={(e) => setsecondcan(e.target.value)}  placeholder="Second Candidate (address)"></input>
            </div>
    )
}