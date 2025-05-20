'use client'
import { createContext, useContext, useState } from "react";


const VoteContext = createContext(null)
export function VoteStateProvider({children}) {
    const [roomcode, setRoomcode] = useState(0)
    const [candidateaddress, setCandidateaddress] = useState([])
    const [candidatecode, setCandidatecode] = useState([])

    return (
        <VoteContext.Provider value={{roomcode, setRoomcode, candidateaddress, setCandidateaddress, candidatecode, setCandidatecode}}>
            {children}
        </VoteContext.Provider>
    )
}

export function useVoteState() {
    return useContext(VoteContext)
}