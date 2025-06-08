'use client'
import styles from "@/app/style/dvoting.module.css";
import CreateRoom from "../ui/dvoting/createRoom";
import EnterRoom from "../ui/dvoting/enterRoom";
import { VoteStateProvider } from "../store/voteStateContext";


//NOTE: this is /dvoting path
export default function page() {
    return (<>
    {/*NOTE: VoteStateProvider for createRoom and EnterRoom component can consume global vote state */}
    <VoteStateProvider>
    <div className={styles.enterRoomPage}>
        <h1>Enter Room</h1>
        <CreateRoom />
        <EnterRoom />
    </div>
    </VoteStateProvider>
    </>)
}