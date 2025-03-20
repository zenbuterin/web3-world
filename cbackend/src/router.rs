use actix_web::{Responder, HttpResponse, web, post};
use serde::Serialize; 


#[derive(Serialize)]
pub struct Users {
    message: String,
    name: String,
    level: u64,
}

pub async fn start(name: web::Path<String>) -> impl Responder {
    let id = name.into_inner();
    HttpResponse::Ok().json(Users {message: "ayo mulai perjalanan!".to_string(), name: id, level: 1 })
}
