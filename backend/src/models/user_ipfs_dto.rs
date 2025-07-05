use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct IpfsResponse {
    pub hash: String,
    pub success: bool,
    pub message: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct JsonData {
    pub id: String,
    pub name: String,
    pub data: serde_json::Value,
    pub timestamp: i64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct StoreRequest {
    pub data: serde_json::value,
    pub pin: Option<bool>
}


#[derive(Debug, Serialize, Deserialize)]
pub struct RetrieveRequest {
    pub hash: String
}


