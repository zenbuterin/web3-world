'use state'
import useVote from "@/context/voteFunctionalities";
import styles from "@/style/dvoting.module.css";
import VoteTheCandidate from "@/components/dvoting/votingroom/votingbutton";
//NOTE: voting room will take data from state if state is created from createRoom component
//NOTE: it takes data from smartcontract
export default function page() {
    return(<>
    <div className={styles.pageDvoting}>
        <VoteTheCandidate />
        <div className={styles.description}>
            <div className={styles.candidateBox}>
                <div className={styles.candidate}></div>
                <div className={styles.candidate}></div>
            </div>
            <div className={styles.dataVisual}></div>
        </div>
    </div>
    </>)
    }