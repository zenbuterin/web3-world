import { useGenerateCandidateCode } from "@/app/store/candidateCodeGenerator"
import useVote from "@/app/store/voteFunctionalities"
import { useVoteState } from "@/app/store/voteStateContext"


export default function VoteTheCandidate() {
    
    return (
        <div className={styles.option}>
            <button className={styles.voteButton}>Vote #01</button>
            <button className={styles.voteButton}>Vote #02</button>
        </div>
    )
    
}