use actix_web::{web, App, HttpServer};
mod models;
mod handlers;
mod services;
use std::env;
use dotenv::dotenv;
use actix_cors::Cors;
use sqlx::SqlitePool;
use handlers::log_in_handler::{get_user, insert_user};
use handlers::off_chain_voting_data::{insert_id_description, get_info_proposal};
use services::ipfs_services::IpfsService;
use handlers::ipfs_data_handler; 
use std::sync::Arc;

#[actix_web::main]
async fn main() -> Result<(), std::io::Error> {
    dotenv().ok();

    //Initialize IPFS client services
    let ipfs_service = Arc::new(IpfsService::new());

    //testing connection
    match ipfs_service.get_node_info().await {
        Ok(version) => println!("Connected to IPFS node, version: {}", version),
        Err(e) => {
            eprintln!("Failed to connect IPFS node: {}", e);
            eprintln!("Make shure IPFS daemon is running on localhost:5001");
        }
    }

    println!("Starting server at http://localhost:8080");


    // Ambil DB_URL dan tambahkan prefix jika belum ada
    let mut database_url = env::var("DB_URL").expect("DB_URL not set");
    if !database_url.starts_with("sqlite://") {
        database_url = format!("sqlite://{}", database_url);
    }
    let db_path = database_url.trim_start_matches("sqlite://");

    println!("Using database at: {}", db_path);
    println!("Running at http://127.0.0.1:8000");

    // Buat koneksi ke database
    let pool = SqlitePool::connect(&database_url).await.expect("Failed to connect to database");


    // Jalankan HTTP server
    HttpServer::new(move || {
        App::new()
            .wrap(Cors::permissive())
            .app_data(web::Data::new(pool.clone())) // Share pool ke handler | shared handler
            .route("/getUser", web::get().to(get_user))
            .route("/inputUser", web::post().to(insert_user))
            .route("/insertProposalInformation", web::post().to(insert_id_description))
            .route("getInfoProposal", web::get().to(get_info_proposal))
            .service(
                web::scope("/ipfs")
                .app_data(web::Data::new(ipfs_service.clone()))
                .route("/store", web::post().to(ipfs_data_handler::store_json))
                .route("/get", web::post().to(ipfs_data_handler::get_json))
                .route("/raw/{hash}", web::get().to(ipfs_data_handler::get_raw_data))
                .route("/info", web::get().to(ipfs_data_handler::node_info))
            )
    })
    .bind("127.0.0.1:8000")?
    .run()
    .await
}

