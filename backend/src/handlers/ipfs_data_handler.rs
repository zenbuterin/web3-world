use actix_web::{web, HttpResponse, Result};
use crate::services::ipfs_services::IpfsService;
use crate::models::user_ipfs_dto::*;
use uuid::Uuid;
use std::sync::Arc;

pub async fn store_json(
    ipfs_service: web::Data<Arc<IpfsService>>,
    req: web::Json<StoreRequest>,
) -> Result<HttpResponse> {
    let data = JsonData {
        id: Uuid::new_v4().to_string(),
        name: "stored_data".to_string(),
        data: req.data.clone(),
        timestamp: chrono::Utc::now().timestamp(),
    };

    match ipfs_service.store_json(&data).await {
        Ok(hash) => {
            if req.pin.unwrap_or(false) {
                if let Err(e) = ipfs_service.pin_hash(&hash).await {
                    eprintln!("Failed to pin hash {}: {}", hash, e);
                }

            }
            let response = IpfsResponse {
                hash,
                success : true,
                message: "Data stored successfully".to_string(),
            };
            Ok(HttpResponse::Ok().json(response))
        }
        Err(e) => {
            let response = IpfsResponse {
                hash: String::new(),
                success: false,
                message: format!("Failed tot store data: {}", e)
            };
            Ok(HttpResponse::InternalServerError().json(response))
        }
    }

}


pub async fn get_json(
    ipfs_service: web::Data<Arc<IpfsService>>,
    req: web::Json<RetrieveRequest>
    ) -> Result<HttpResponse> {
    match ipfs_service.get_json::<JsonData>(&req.hash).await {
        Ok(data) => Ok(HttpResponse::Ok().json(data)),
        Err(e) => {
            let response = IpfsResponse {
                hash: req.hash.clone(),
                success: false,
                message: format!("Failed to retrieve data: {}", e)
            };
            Ok(HttpResponse::NotFound().json(response))
        }
    }
}




pub async fn node_info(
    ipfs_service: web::Data<Arc<IpfsService>>
    ) -> Result<HttpResponse> {
    match ipfs_service.get_node_info().await {
        Ok(version) => Ok(HttpResponse::Ok().json(format!("IPFS version: {}", version))),
        Err(e) => Ok(HttpResponse::InternalServerError().json(format!("Error: {}", e)))
    }
}
