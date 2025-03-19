use actix_web::{web, App, HttpServer};
use actix_cors::Cors;
use crate::router::start;
mod registry;
mod router;
mod init_database;


#[actix_web::main]
async fn main() -> std::io::Result<()> {

    // let url = "sqlite://database/user.db";
    // signup::create_table(&url).await;


    HttpServer::new(|| {
        App::new()
            .wrap(Cors::permissive())
            .route("/start/{id}", web::get().to(start))
    })
    .bind("127.0.0.1:8000")?
    .run()
    .await
}

