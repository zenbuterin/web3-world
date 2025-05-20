import styles from "@/app/dvoting/votingroom/dvoting.module.css";
import CreateRoom from "../ui/dvoting/createRoom";
import EnterRoom from "../ui/dvoting/enterRoom";
import { VoteStateProvider } from "../lib/voteState";



export default function page() {
    return (<>
    <VoteStateProvider>
    <div className={styles.enterRoomPage}>
        <h1>Enter Room</h1>
        <CreateRoom />
        <EnterRoom />
    </div>
    </VoteStateProvider>
    </>)
}