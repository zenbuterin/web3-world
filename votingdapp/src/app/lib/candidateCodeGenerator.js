function useGenerateCandidateCode() {
    const candidateCode = Math.floor(1000 + Math.random() * 9000);

    return candidateCode;
}