'use state'
import { useVoteState } from "@/app/lib/voteStateContext";
import { useWeb3State } from "@/app/lib/web3stateContext";
import { useEffect, useState } from "react";
//enter room has quiet different logic, we will define after we finished with create logic
export default function EnterRoom() {
    const { instanceContract } = useWeb3State()
    const {setRoomcode, setCandidatecode} = useVoteState()
    const [roomCode, setRoomCode] = useState<number>(0);
    const [firstCanCode, setFirstCanCode] = useState<number>(0);
    const [secondCanCode, setSecondCanCode] = useState<number>(0)
    

    async function handleEnterRoom() {
            try {
                if (roomCode !== 0 && firstCanCode !== 0 && secondCanCode !== 0) {
                    //roomdetail display in votingroom
                    const [roomdetail, numberOfVoterFirstCan, numberOfVoterSecondCan] = await instanceContract.getRoomDetail(roomCode, firstCanCode, secondCanCode);
                    console.log(`Successful! \nDetail Room: ${roomdetail}\nNumber of Voter of first candidate: ${numberOfVoterFirstCan}\nNumber of Voter of second candidate: ${numberOfVoterSecondCan}`);
                }
                else {
                    console.log("input is not valid");
                }
            }
            catch(err) {
                console.log("error input is not valid or fail to enter room", err)
            }
        }

        //useEffect for global state
        useEffect(() => {
            setCandidatecode([setFirstCanCode, setSecondCanCode])
        }, [setFirstCanCode, setSecondCanCode])

        useEffect(() => {
            setRoomcode(roomCode)
        }, [roomCode])

        

    return (
        <div>
                <label >Enter A Room: </label>
                <label>what is the room code?</label>
                <input type="number" value={roomCode} onChange={(e) => setRoomCode(Number(e.target.value))} placeholder="Room Code"></input>
                <label>who is the first candidate (candidate code) ?</label>
                <input  type="number" value={firstCanCode} onChange={(e) => setFirstCanCode(Number(e.target.value))}  placeholder="First Candidate (address)"></input>
                <label>who is the second candidate (candidate code) ?</label>
                <input  type="number" value={secondCanCode} onChange={(e) => setSecondCanCode(Number(e.target.value))}  placeholder="Second Candidate (address)"></input>
                <button onClick={() => {handleEnterRoom()}}>Process enter</button>
            </div>
    )
    

    
}