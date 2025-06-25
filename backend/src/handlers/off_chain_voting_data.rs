use actix_web::{web, HttpResponse, Responder};
use sqlx::sqlite::SqlitePool;
use crate::models::user_dto::OffChainVotingData;


pub async fn insert_id_description(pool: web::Data<SqlitePool>, data: web::Json<OffChainVotingData>) -> impl Responder {
    let query = "INSERT INTO proposalinformation (id, title, description) VALUES (?, ?, ?) ";
    let result = sqlx::query(query).bind(&data.id).bind(&data.title).bind(&data.description).execute(pool.get_ref()).await;
    println!("query {:?}", result);

    match result {
        Ok(_) => HttpResponse::Ok().body("data inserted"),
        Err(err) => HttpResponse::InternalServerError().body(format!("error happend when insert data to database : {err}"))
        
    }
}

pub async fn get_info_proposal(pool: web::Data<SqlitePool>) -> impl Responder {
    let qry = "SELECT * FROM proposalinformation";
    let result: Result<Vec<OffChainVotingData>, sqlx::Error> = sqlx::query_as(qry).fetch_all(pool.get_ref()).await;

    match result {
        Ok(data) => HttpResponse::Ok().json(data),
        Err(err) => HttpResponse::InternalServerError().body(format!("error happend when get info proposal : {err}"))
    }
}
