import Database from "better-sqlite3";

const db = new Database('./myAuth.db')

db.pragma('foreign_keys = ON')

// db.exec('DROP TABLE todos')

db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        todo TEXT NOT NULL,
        isDone BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        deadline DATETIME ,
        priority text DEFAULT 'Normal',
        FOREIGN KEY (user_id) REFERENCES user(id)
    )    
`)

export default db