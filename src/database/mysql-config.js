import mysql from "mysql2";

const dbPool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "test_chat_api",
  waitForConnections: true,
});

console.log("Database connection succesful.");

export default dbPool;
