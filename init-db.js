
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } 
});

async function init() {
  console.log(" Connecting to database...");

  const query = `
    CREATE TABLE IF NOT EXISTS cloud_saves (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      username TEXT NOT NULL,
      save_json TEXT NOT NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
      CONSTRAINT unique_email_username UNIQUE (email, username)
    );
  `;

  try {
    await pool.query(query);
    console.log("Table cloud_saves created successfully!");
  } catch (err) {
    console.error("Error creating table:", err);
  } finally {
    pool.end();
  }
}

init();
