use actix_web::{web, App, HttpServer};
use actix_cors::Cors;
use init_database::create_table;
use registry::{get_user, insert_user};
use crate::router::start;
use sqlx::{sqlite::SqliteQueryResult, Sqlite, SqlitePool, migrate::MigrateDatabase};
use std::env;
mod registry;
mod router;
mod init_database;



#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let database_url = env::var("DB_URL").unwrap();
    if !Sqlite::database_exists(&database_url).await.unwrap_or(false) {
        Sqlite::create_database(&database_url).await.unwrap();
        match create_table(&database_url).await {
            Ok(_) => println!("database created succesfully"),
            Err(e) => panic!("{}", e)
        }
    }

    
    // let instances = SqlitePool::connect(&database_url).await.unwrap();
    // let qry = "INSERT INTO settings (description) VALUES($1)";
    // let result = sqlx::query(&qry).bind("testing").execute(&instances).await;

    // instances.close().await;
    // println!("{:?}", result);

    HttpServer::new(|| {
        App::new()
            .wrap(Cors::permissive())
            .route("/start/getUser", web::get().to(get_user))
            .route("/start/inputUser", web::post().to(insert_user))
    })
    .bind("127.0.0.1:8000")?
    .run()
    .await
}

