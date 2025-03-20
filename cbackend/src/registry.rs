use sqlx::sqlite::SqlitePool;


#[derive(Debug, sqlx::FromRow)]
pub struct Users {
    id: i32,
    email: String,
    password: String
}

pub async fn insert_user(pool: &SqlitePool, email: String, password: String) -> Result<(), sqlx::Error> {
    let qyr = "INSERT INTO users (email, password) VALUES (?, ?)";
    let result = sqlx::query(qyr).bind(email).bind(password).execute(pool).await?;
    println!("{:?}", result);
    Ok(())
    
}

pub async fn get_user(pool: &SqlitePool, email: String) -> Result<Users, sqlx::Error> {
    sqlx::query_as::<_, Users>("SELECT * FROM users WHERE email = ?").bind(email).fetch_one(pool).await
}