import { useGenerateCandidateCode } from "@/app/store/candidateCodeGenerator"
import { useUIContext } from "@/app/store/UIContext"
import useVote from "@/app/store/voteFunctionalities"
import { useVoteState } from "@/app/store/voteStateContext"


export default function VoteTheCandidate() {
    const styles = useUIContext();
    
    return (
        <div className={styles.option}>
            <button className={styles.voteButton}>Vote #01</button>
            <button className={styles.voteButton}>Vote #02</button>
        </div>
    )
    
}