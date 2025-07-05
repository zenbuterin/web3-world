use serde::{Serialize, Deserialize};


#[derive(Serialize, Deserialize)]
pub struct Proposals {
   pub proposal: Vec<Proposal>
}


#[derive(Serialize, Deserialize)]
pub struct Proposal {
    pub id: u64,
    pub title: String,
    pub description: String,
    pub options: Vec<ProposalOption>
}


#[derive(Serialize, Deserialize)]
struct ProposalOption {
    pub id: u64,
    pub description: String,
}
