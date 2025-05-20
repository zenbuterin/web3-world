import { useGenerateCandidateCode } from "@/app/lib/candidateCodeGenerator"
import useVote from "@/app/lib/voteFunctionalities"
import { useVoteState } from "@/app/lib/voteState"

export default function VoteTheCandidate({candidateNum}) {
        const generatedCode = useGenerateCandidateCode()
        
        // vote based on candidate num on display
        // const { handleVote } = useVote({})

        // if(candidateNum == 1) {
        //     handleVote()
            
        // }
        // else if(candidateNum == 2) {

        // }

    return (
        <div className={styles.option}>
            <button className={styles.voteButton}>Vote #01</button>
            <button className={styles.voteButton}>Vote #02</button>
        </div>
    )
    
}