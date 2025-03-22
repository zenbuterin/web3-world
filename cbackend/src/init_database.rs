use sqlx::{sqlite::SqlitePool, sqlite::SqliteQueryResult};

pub async fn create_table(pool: &SqlitePool) -> Result<SqliteQueryResult, sqlx::Error> {
    let qyr = "CREATE TABLE IF NOT EXIST users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
    )";
    let result = sqlx::query(qyr).execute(pool).await;
    return result;
}
