//NOTE: this function to generate code for votingroom component purpose (smartcontract will contain this "code")
export function useGenerateCandidateCode() {
    const candidateCode = Math.floor(1000 + Math.random() * 9000);

    return candidateCode;
}