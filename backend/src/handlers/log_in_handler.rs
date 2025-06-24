use actix_web::{web, HttpResponse, Responder};
use sqlx::sqlite::SqlitePool;
use sqlx::Row;
use crate::models::user_dto::{Users, UsersInput, GetUsers};
use validator::Validate;

pub async fn insert_user(pool: web::Data<SqlitePool>, datauser: web::Json<UsersInput>) -> impl Responder {
    if let Err(error) = datauser.validate() {
        return HttpResponse::BadRequest().json(error);
    }
    let qyr = "INSERT INTO users (email, password) VALUES (?, ?)";
    let result = sqlx::query(qyr).bind(&datauser.email).bind(&datauser.password).execute(pool.get_ref()).await;
    println!("{:?}", result);
    
    match result {
        Ok(_) => HttpResponse::Ok().body("succes masok data ke database"),
        Err(er) => HttpResponse::InternalServerError().body(format!("error: {}", er))
    }
    
}

pub async fn get_user(
    pool: web::Data<SqlitePool>,
    data: web::Json<GetUsers>,
) -> impl Responder {
    let query = "SELECT id, email, password FROM users WHERE email = ?";
    
    let result = sqlx::query(query)
        .bind(&data.email) // Deref karena web::Path<String>
        .fetch_one(pool.get_ref())
        .await;

    match result {
        Ok(row) => {
            let user = Users {
                id: row.get("id"),
                email: row.get("email"),
                password: row.get("password"),
            };
            HttpResponse::Ok().json(user)
        }
        Err(_) => HttpResponse::InternalServerError().body("Server Bermasalah"),
    }
}