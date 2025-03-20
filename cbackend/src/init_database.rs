use sqlx::{sqlite::SqlitePool, sqlite::SqliteQueryResult};

pub async fn create_table(database_url: &String) -> Result<SqliteQueryResult, sqlx::Error> {
    let pool = SqlitePool::connect(&database_url).await?;
    let qyr = "CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
    )";
    let result = sqlx::query(qyr).execute(&pool).await;
    pool.close().await;
    return result;
}
