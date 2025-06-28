'use client'
import { useState, useEffect } from "react"
import axios from "axios"
import type { ProposalInfoTypes } from "@/types/porposalInfoTypes"
import { ProposalCard } from "./proposalCard"
import { useWeb3State } from "@/context/web3stateContext";
import { parseAbiItem, type Address } from "viem";

export function ProposalListCard() {
    const [list, setList] = useState<ProposalInfoTypes[]>([])
    const [allOptions, setAllOptions] = useState<Map<bigint, bigint[]>>(new Map())
    const { publicClient } = useWeb3State();

    const fetchInformationProposalFromDb = async () => {
        try {
            const response = await axios.get<ProposalInfoTypes[]>('http://127.0.0.1:8000/getInfoProposal');
            setList(response.data);
            console.log('Proposals loaded:', response.data);
        } catch (error) {
            console.error('Error fetching proposals:', error);
        }
    }

    const fetchAllOptions = async () => {
        if (!publicClient) {
            console.log('PublicClient not available');
            return;
        }
        
        try {
            console.log('Fetching options from contract...');
            const logs = await publicClient.getLogs({
                address: process.env.NEXT_PUBLIC_ADDRESS_CONTRACT as Address,
                event: parseAbiItem('event optionAdded(address addedBy, uint indexed proposalId, uint indexed optionId)'),
                fromBlock: 0n, // Start from block 0
                toBlock: 'latest'
            });

            console.log('Raw logs:', logs);

            const optionsMap = new Map<bigint, bigint[]>();
            
            logs.forEach(log => {
                if (log.args.proposalId && log.args.optionId) {
                    const proposalId = log.args.proposalId;
                    const optionId = log.args.optionId;
                    
                    console.log(`Found option ${optionId} for proposal ${proposalId}`);
                    
                    if (!optionsMap.has(proposalId)) {
                        optionsMap.set(proposalId, []);
                    }
                    const currentOptions = optionsMap.get(proposalId)!;
                    if (!currentOptions.includes(optionId)) {
                        currentOptions.push(optionId);
                    }
                }
            });

            console.log('Options map:', optionsMap);
            setAllOptions(optionsMap);
        } catch (error) {
            console.error('Error fetching options:', error);
        }
    }

    useEffect(() => {
        console.log('ProposalListCard mounted, publicClient:', !!publicClient);
        
        // Initial fetch
        fetchInformationProposalFromDb();
        
        // Delay options fetch to ensure everything is ready
        const timer = setTimeout(() => {
            fetchAllOptions();
        }, 1000);

        // Setup interval for proposals
        const proposalInterval = setInterval(() => {
            fetchInformationProposalFromDb();
        }, 3000);

        // Setup interval for options (less frequent)
        const optionsInterval = setInterval(() => {
            fetchAllOptions();
        }, 10000);

        // Setup watcher for real-time option updates
        let unwatch: (() => void) | undefined;
        
        if (publicClient) {
            console.log('Setting up event watcher...');
            try {
                unwatch = publicClient.watchEvent({
                    address: process.env.NEXT_PUBLIC_ADDRESS_CONTRACT as Address,
                    event: parseAbiItem('event optionAdded(address addedBy, uint indexed proposalId, uint indexed optionId)'),
                    onLogs: (logs) => {
                        console.log('New option events:', logs);
                        logs.forEach(log => {
                            if (log.args.proposalId && log.args.optionId) {
                                const proposalId = log.args.proposalId;
                                const optionId = log.args.optionId;
                                
                                console.log(`New option ${optionId} added to proposal ${proposalId}`);
                                
                                setAllOptions(prev => {
                                    const newMap = new Map(prev);
                                    const existingOptions = newMap.get(proposalId) || [];
                                    
                                    if (!existingOptions.includes(optionId)) {
                                        newMap.set(proposalId, [...existingOptions, optionId]);
                                        console.log('Updated options map:', newMap);
                                    }
                                    
                                    return newMap;
                                });
                            }
                        });
                    }
                });
                console.log('Event watcher set up successfully');
            } catch (error) {
                console.error('Error setting up event watcher:', error);
            }
        }

        return () => {
            clearTimeout(timer);
            clearInterval(proposalInterval);
            clearInterval(optionsInterval);
            if (unwatch) {
                console.log('Cleaning up event watcher');
                unwatch();
            }
        }
    }, [publicClient])

    // Debug log when options change
    useEffect(() => {
        console.log('All options updated:', allOptions);
    }, [allOptions]);
    
    return <div className="flex flex-col bg-gray-200 border-3 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex-grow">
        {list.map((value, index) => {
            const options = allOptions.get(BigInt(value.id)) || [];
            console.log(`Proposal ${value.id} has options:`, options);
            return (
                <ProposalCard 
                    key={index} 
                    id={value.id} 
                    title={value.title} 
                    description={value.description}
                    options={options}
                />
            );
        })} 
    </div>
}
