use actix_web::{web, App, HttpServer};
use std::env;
use dotenv::dotenv;
use actix_cors::Cors;
use registry::{get_user, insert_user};
use sqlx::SqlitePool;
mod registry;

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

    // Buat koneksi ke database
    let pool = SqlitePool::connect(&database_url).await.expect("Failed to connect to database");


    // Jalankan HTTP server
    HttpServer::new(move || {
        App::new()
            .wrap(Cors::permissive())
            .app_data(web::Data::new(pool.clone())) // Share pool ke handler
            .route("/getUser", web::get().to(get_user))
            .route("/inputUser", web::post().to(insert_user))
    })
    .bind("127.0.0.1:8000")?
    .run()
    .await
}

