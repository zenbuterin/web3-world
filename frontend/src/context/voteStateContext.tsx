'use client'
import { createContext, ReactNode, useContext, useState } from "react";



//NOTE: this state provider for vote functionalities
const VoteContext = createContext<any | null>(null)

export function VoteStateProvider({children} : {children: ReactNode}) {
    const [roomcode, setRoomcode] = useState<number>(0)
    const [candidateaddress, setCandidateaddress] = useState<String[]>([])
    const [candidatecode, setCandidatecode] = useState<String[]>([])
    

    return (
        <VoteContext.Provider value={{roomcode, setRoomcode, candidateaddress, setCandidateaddress, candidatecode, setCandidatecode}}>
            {children}
        </VoteContext.Provider>
    )
}

export function useVoteState() {
    return useContext(VoteContext)
}