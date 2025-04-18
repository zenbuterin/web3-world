import styles from "@/app/dvoting/dvoting.module.css";
export default function enterRoomUI() {
    return (<>
    <div className={styles.enterRoomPage}>
        <h1>Enter Room</h1>
        <form method="POST">
            <div>
                <label className={styles.head}>Create Room: </label>
                <input className={styles.value} type="number"></input>
            </div>
        </form>
    </div>
    </>)
}