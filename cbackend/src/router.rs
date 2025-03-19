use actix_web::{Responder, HttpResponse, web, post};
use serde::Serialize; 


#[derive(Serialize)]
pub struct Users {
    message: String,
    name: String,
    level: u64,
}

// #[derive(Serialize)]
// pub struct MessageText {
//     message: String,
//     number: u64,
// }

// #[get("/hello")]
// pub async fn hello() -> impl Responder {
//     HttpResponse::Ok().json(Message { message: "Hello from Rust backend!".to_string() })
// }


pub async fn start(name: web::Path<String>) -> impl Responder {
    let id = name.into_inner();
    HttpResponse::Ok().json(Users {message: "ayo mulai perjalanan!".to_string(), name: id, level: 1 })
}

// #[post("/signup")]
// pub async fn inputAcc() -> impl Responder {

//     HttpResponse::Ok().json(MessageText {message: "menunggu database".to_string(), number:  56 })
// }
