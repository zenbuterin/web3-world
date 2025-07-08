// src/services/ipfs_service.rs
use ipfs_api_backend_actix::{IpfsApi, IpfsClient};
use serde::{Deserialize, Serialize};
use std::io::Cursor;
use std::sync::Arc;


pub struct IpfsService {
    client: Arc<IpfsClient>,
}

impl IpfsService {
    pub fn new() -> Self {
        // Default client menghubungkan ke localhost:5001
        let client = Arc::new(IpfsClient::default());
        Self { client }
    }

    //pub fn with_custom_endpoint(host: &str, port: u16) -> Self {
    //    let client = Arc(IpfsClient::from_host_and_port(host, port));
    //    Self { client }
    //}

     // Store JSON ke IPFS
    pub async fn store_json<T>(&self, data: &T) -> Result<String, Box<dyn std::error::Error>>
    where
        T: Serialize,
    {
        let json_string = serde_json::to_string(data)?;
        let cursor = Cursor::new(json_string);
        
        match self.client.add(cursor).await {
            Ok(response) => Ok(response.hash),
            Err(e) => Err(Box::new(e)),
        }
    }

    // Get JSON dari IPFS
    pub async fn get_json<T>(&self, hash: &str) -> Result<T, Box<dyn std::error::Error>>
    where
        T: for<'de> Deserialize<'de>,
    {
        match self.client.cat(hash).await? {
            Ok(response) => {
                let json_string = String::from_utf8(response)?;
                let data: T = serde_json::from_str(&json_string)?;
                Ok(data)
            }
            Err(e) => Err(Box::new(e)),
        }
    }

    // Store raw bytes
    pub async fn store_bytes(&self, data: Vec<u8>) -> Result<String, Box<dyn std::error::Error>> {
        let cursor = Cursor::new(data);
        
        match self.client.add(cursor).await {
            Ok(response) => Ok(response.hash),
            Err(e) => Err(Box::new(e)),
        }
    }

    // Get raw bytes
    pub async fn get_bytes(&self, hash: &str) -> Result<Vec<u8>, Box<dyn std::error::Error>> {
        match self.client.cat(hash).await {
            Ok(response) => Ok(response),
            Err(e) => Err(Box::new(e)),
        }
    }

    // Pin data untuk memastikan availability
    pub async fn pin_hash(&self, hash: &str) -> Result<(), Box<dyn std::error::Error>> {
        match self.client.pin_add(hash, true).await {
            Ok(_) => Ok(()),
            Err(e) => Err(Box::new(e)),
        }
    }

    // Unpin data
    pub async fn unpin_hash(&self, hash: &str) -> Result<(), Box<dyn std::error::Error>> {
        match self.client.pin_rm(hash, true).await {
            Ok(_) => Ok(()),
            Err(e) => Err(Box::new(e)),
        }
    }

    // Get IPFS node info
    pub async fn get_node_info(&self) -> Result<String, Box<dyn std::error::Error>> {
        match self.client.version().await {
            Ok(response) => Ok(response.version),
            Err(e) => Err(Box::new(e)),
        }
    }
}
