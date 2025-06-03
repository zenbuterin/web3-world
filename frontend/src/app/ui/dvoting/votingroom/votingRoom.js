import { useGenerateCandidateCode } from "@/app/lib/candidateCodeGenerator"
import useVote from "@/app/lib/voteFunctionalities"
import { useVoteState } from "@/app/lib/voteStateContext"

export default function VoteTheCandidate({candidateNum}) {
    
    return (
        <div className={styles.option}>
            <button className={styles.voteButton}>Vote #01</button>
            <button className={styles.voteButton}>Vote #02</button>
        </div>
    )
    
}