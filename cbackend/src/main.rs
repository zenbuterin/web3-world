use actix_web::{App, HttpServer};
use actix_cors::Cors;
use crate::router::hello;
mod signup;
mod router;


#[actix_web::main]
async fn main() -> std::io::Result<()> {

    // let url = "sqlite://database/user.db";
    // signup::create_table(&url).await;


    HttpServer::new(|| {
        App::new()
            .wrap(Cors::permissive())
            .service(hello)
    })
    .bind("127.0.0.1:8000")?
    .run()
    .await
}

