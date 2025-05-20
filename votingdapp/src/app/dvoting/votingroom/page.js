import styles from "@/app/dvoting/votingroom/dvoting.module.css";
import useVote from "@/app/lib/vote";

export default function Dvoting() {
    const candidateCode = useGenerateCandidateCode()
    const handleVote = useVote()
    return(<>
    <div className={styles.pageDvoting}>
        <div className={styles.option}>
            <button className={styles.voteButton}>Vote #01</button>
            <button className={styles.voteButton}>Vote #02</button>
        </div>
        <div className={styles.description}>
            <div className={styles.candidateBox}>
                <div className={styles.canddate}></div>
                <div className={styles.canddate}></div>
            </div>
            <div className={styles.dataVisual}></div>
            
        </div>
    </div>
    </>)
    }