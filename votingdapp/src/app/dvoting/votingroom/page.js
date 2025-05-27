'use state'
import styles from "@/app/dvoting/votingroom/dvoting.module.css";
import VoteTheCandidate from "@/app/ui/dvoting/votingroom/votingRoom";
//NOTE: voting room will take data from state if state is created from createRoom component
//NOTE: it takes data from smartcontract
export default function Dvoting() {
    return(<>
    <div className={styles.pageDvoting}>
        <VoteTheCandidate />
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