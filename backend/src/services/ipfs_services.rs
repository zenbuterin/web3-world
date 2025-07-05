use actix_web::test::ok_service;
use ethers::types::transaction::eip712::make_type_hash;
use ipfs_api_backend_actix::{response, IpfsApi, IpfsClient};
use serde::{Serialize, Deserialize, serde_json::to_string};
use core::sync;
use std::io::Cursor;



#[derive(Clone)]
pub struct IpfsService {
    client: IpfsClient,
}

impl IpfsService {
    pub fn new() -> Self {
        let client = IpfsClient::default();
        Self { client } 
    }

    pub fn new_with_custom_endpoint(host : &str, port: u16) -> Self {
        let client = IpfsClient::from_host_and_port(host, port);
        Self { client }
    }

    pub async fn store_json<T>(&self, data: &T) -> Result<String, Box<dyn std::error::Error>> where T: Serialize
    {
        let json_string = serde_json::to_string(data)?;
        let cursor = Cursor::new(json_string);

        match self.client.add(cursor).await {
            Ok(response) => Ok(response.hash),
            Err(err) => Err(Box::new(err))
        }

    }

    pub async fn get_json<T>(&self, hash: &str) -> Result<T, Box<dyn std::error::Error>>
        where T: for<'de> Deserialize<'de>
    {
        match self.client.cat(hash).await {
            Ok(response) => {
                let json_string = String::from_utf8(response)?;
                let data: T = serde_json::from_str(&json_string);
                Ok(data)
            }
            Err(err) => Err(Box::new(err))
        }
    }

    pub async get_bytes(&self, hash: &str) -> Result<Vec<u8>, Box<dyn std::error::Error>>
    {
        match self.client.cat(hash).await {
            Ok(response) => Ok(response),
            Err(err) => Err(Box::new(err))
        }
    }


    pub async fn store_bytes(&self, data: Vec<u8>) -> Result<String, Box<dyn std::error::Error>>
    {
        let cursor = Cursor::new(data);
        match self.client.add(hash).await {
            Ok(response) => Ok(response.hash),
            Err(e) => Err(Box::new(e))
        }
    }

    pubc async fn pin_hash(&self, hash: &str) -> Result<(), Box<dyn std::error::Error>>
    {
        match self.client.pin_add(hash, true).await {
            Ok(_) => Ok(()),
            Err(e) => Err(Box::new(e))
        }
    }

    pub async fn unpin_hash(&self, hash: &str) -> Result<(), Box<dyn std::error::Error>>
    {
        match self.client.pin_rm(hash, true).await {
            Ok(_) => Ok(()),
            Err(e) => Err(Box::new(e))
        }
    }

    pub async fn get_node_into(&self) -> Result<String, Box<dyn std::error::Error>>
    {
        match self.client.version().await {
             Ok(response) => Ok(response.version),
             Err(e) => Err(Box::new(e))
        }
    }




}
