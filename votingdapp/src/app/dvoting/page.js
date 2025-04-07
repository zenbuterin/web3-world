import styles from "@/app/dvoting/dvoting.module.css";

export default function Dvoting() {
    return(<>
    <div className={styles.pageDvoting}>
        <div className={styles.option}>
            <div className={styles.info}>
            <p>Roomname/roomnum</p>
        </div>
        <div className={styles.addNcandidate}>
                <div><button className={styles.back}>Back</button></div>
            </div>
            </div>
        <div className={styles.description}>
        {/* photo dan description dari candidate */}
        </div>
    </div>
    </>)
    }