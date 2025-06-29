import { useWeb3State } from "@/context/web3stateContext";
import { useEffect, useState } from "react";
import { readContract, ReadContractErrorType, ReadContractReturnType } from "viem/_types/actions/public/readContract";
import { Address } from "viem";
import abi from "@/app/MyContract.abi.json"
export function VoterCount({proposalId, optionId} : {proposalId: bigint, optionId : bigint}) {
  const [voterCount, setVoterCount] = useState<bigint>(0n)
  const {publicClient} = useWeb3State()

  const getCount = async () => {
    const count = await publicClient!.readContract({
      address: process.env.NEXT_PUBLIC_ADDRESS_CONTRACT as Address,
      abi: abi,
      functionName: "getvoteCount",
      args: [proposalId, optionId],
    })
    console.log(`count yang didapat dari proposal id: ${proposalId} dan optionId: ${optionId} adalah =${count}`)
    if (typeof count == 'bigint') {
      setVoterCount(count)
    }
    else {
      console.log("types is wrong")
    }
  }
  useEffect(()=>{
    const interval = setInterval(() => {
      getCount();
    },20000 )

    return () => clearInterval(interval)

  },[])

  return <div><span>{Number(voterCount)}</span></div>
}
