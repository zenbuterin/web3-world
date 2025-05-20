'use state'
import { useWeb3State } from "@/app/lib/web3state";

export default function EnterRoom() {
    const { instanceContract } = useWeb3State()
    const [roomCode, setRoomCode] = useState(0);
    const [firstCanCode, setFirstCanCode] = useState(0);
    const [secondCanCode, setSecondCanCode] = useState(0)

    async function handleEnterRoom() {
            try {
                if (roomCode !== 0 && firstCanCode !== 0 && secondCanCode !== 0) {
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


    return (
        <div>
                <label >Enter A Room: </label>
                <label>what is the room code?</label>
                <input type="number" value={roomCode} onChange={(e) => setRoomCode(e.target.value)} placeholder="Room Code"></input>
                <label>who is the first candidate (candidate code) ?</label>
                <input  type="number" value={firstCanCode} onChange={(e) => setFirstCanCode(e.target.value)}  placeholder="First Candidate (address)"></input>
                <label>who is the second candidate (candidate code) ?</label>
                <input  type="number" value={secondCanCode} onChange={(e) => setSecondCanCode(e.target.value)}  placeholder="Second Candidate (address)"></input>
                <button onClick={() => {handleEnterRoom()}}>Process enter</button>
            </div>
    )
    

    
}