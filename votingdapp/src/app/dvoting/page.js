import styles from "@/app/dvoting/votingroom/dvoting.module.css";
import CreateRoom from "../ui/dvoting/createRoom";


export default function page() {
    return (<>
    <div className={styles.enterRoomPage}>
        <h1>Enter Room</h1>
        <CreateRoom />
            <div>
                <label className={styles.head}>Enter The Room: </label>
                <input className={styles.value} placeholder="Room Code" type="number"></input>
                <input className={styles.value} type="name" placeholder="Frist Candidate Code"></input>
                <input className={styles.value} type="name" placeholder="Second Candidate Code"></input>
            </div>
    </div>
    </>)
}