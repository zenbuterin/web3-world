use actix_web::{web, HttpResponse, Responder, ResponseError};
use serde::{Deserialize, Serialize};
use sqlx::sqlite::{SqlitePool, SqliteQueryResult};
use sqlx::Row;


#[derive(Serialize)]
pub struct Users {
    id: i32,
    email: String,
    password: String
}

#[derive(Deserialize)]
pub struct UsersInput {
    email: String,
    password: String
}

pub async fn insert_user(pool: web::Data<SqlitePool>, datauser: web::Json<UsersInput>) -> impl Responder {
    let qyr = "INSERT INTO users (email, password) VALUES (?, ?)";
    let result = sqlx::query(qyr).bind(datauser.email.clone()).bind(datauser.password.clone()).execute(pool.get_ref()).await;
    println!("{:?}", result);
    
    match result {
        Ok(_) => HttpResponse::Ok().body("succes masok data ke database"),
        Err(er) => HttpResponse::InternalServerError().body(format!("error: {}", er))
    }
    
}

async fn get_user(
    pool: web::Data<SqlitePool>,
    email: web::Path<String>,
) -> impl Responder {
    let query = "SELECT id, email, password FROM users WHERE email = ?";
    
    let result = sqlx::query(query)
        .bind(&*email) // Deref karena web::Path<String>
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
        Err(_) => HttpResponse::NotFound().body("User not found"),
    }
}