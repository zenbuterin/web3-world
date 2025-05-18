import styles from "@/app/dvoting/votingroom/dvoting.module.css";
import CreateRoom from "../ui/dvoting/createRoom";


export default function page() {
    return (<>
    <div className={styles.enterRoomPage}>
        <h1>Enter Room</h1>
        <CreateRoom />
        <enterRoom />
    </div>
    </>)
}