use actix_web::{web, App, HttpServer};
mod models;
mod handlers;
use std::env;
use dotenv::dotenv;
use actix_cors::Cors;
use sqlx::SqlitePool;
use handlers::log_in_handler::{get_user, insert_user};
use handlers::off_chain_voting_data::{insert_id_description, get_info_proposal};
 

#[actix_web::main]
async fn main() -> Result<(), std::io::Error> {
    dotenv().ok();

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
    })
    .bind("127.0.0.1:8000")?
    .run()
    .await
}

