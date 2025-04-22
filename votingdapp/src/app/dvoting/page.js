import styles from "@/app/dvoting/votingroom/dvoting.module.css";
export default function enterRoomUI() {
    return (<>
    <div className={styles.enterRoomPage}>
        <h1>Enter Room</h1>
        <form method="POST">
            <div>
                <label className={styles.head}>Create A Room: </label>
                <input className={styles.value} type="number" placeholder="Room Code"></input>
                <input className={styles.value} type="number" placeholder="First Candidate"></input>
                <input className={styles.value} type="number" placeholder="Second Candidate"></input>
            </div>
            <div>
                <label className={styles.head}>Enter The Room: </label>
                <input className={styles.value} placeholder="Room Code" type="number"></input>
                <input className={styles.value} type="number" placeholder="Frist Candidate Code"></input>
                <input className={styles.value} type="number" placeholder="Second Candidate Code"></input>
            </div>
        </form>
    </div>
    </>)
}