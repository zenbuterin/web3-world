use serde::{Deserialize, Serialize};
use validator::Validate;

#[derive(Serialize)]
pub struct Users {
    pub id: i32,
    pub email: String,
    pub password: String
}

#[derive(Deserialize, Validate)]
pub struct UsersInput {
    #[validate(email(message = "email tidak valid"))]
    pub email: String,
    #[validate(length(min = 8 , message="password minimal 8 elemen"))]
    pub password: String
}

#[derive(Deserialize)]
pub struct GetUsers {
    pub email: String
}

#[derive(sqlx::FromRow, Serialize,Deserialize, Validate)]
pub struct OffChainVotingData {
    //we use string, therefore we use bigint in smartcontract
    pub id: String,
    pub title: String,
    pub description: String
    
}
