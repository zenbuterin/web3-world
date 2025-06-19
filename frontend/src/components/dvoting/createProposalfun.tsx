import { useWeb3State } from "@/context/web3stateContext";

export default function CreateProposalFunction() {
    const {contract} = useWeb3State()

    const handleCreationProposal = async () => {
        const result = await contract.read.createProposal();
        console.log(`Proposal Created: ${result}`)
    }

    return <button onClick={() => handleCreationProposal()}>Create Proposal now</button>

}