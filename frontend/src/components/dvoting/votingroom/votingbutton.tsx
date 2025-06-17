import { useGenerateCandidateCode } from "@/lib/candidateCodeGenerator"
import { useUIContext } from "@/context/UIContext"
import useVote from "@/context/voteFunctionalities"
import { useVoteState } from "@/context/voteStateContext"


export default function VoteTheCandidate() {
    const styles = useUIContext();
    
    return (
        <div className={styles.option}>
            <button className={styles.voteButton}>Vote #01</button>
            <button className={styles.voteButton}>Vote #02</button>
        </div>
    )
    
}