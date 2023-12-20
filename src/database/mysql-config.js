import mysql from "mysql2";

const dbPool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "test_chat_api",
  waitForConnections: true,
});

console.log("Database connection succesful.");

export default dbPool;

/*
CREATE TABLE user(
  userId PRIMARY KEY VARCHAR(15) NOT NULL,
  username VARCHAR(15) NOT NULL,
  password VARCHAR(15) NOT NULL,
  photoIndex INT,
  isOnline TINYINT(1) NOT NULL DEFAULT 0,
  status VARCHAR(30) DEFAULT "Hello, Im using AChatt!",
  dateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)


Tabel User
+-------------+-------------+------+-----+-------------------------+-------------------+
| Field       | Type        | Null | Key | Default                 | Extra             |
+-------------+-------------+------+-----+-------------------------+-------------------+
| userId      | varchar(15) | NO   | PRI | NULL                    |                   |
| username    | varchar(15) | NO   |     | NULL                    |                   |
| password    | varchar(15) | NO   |     | NULL                    |                   |
| photoIndex  | int         | YES  |     | 0                       |                   |
| isOnline    | tinyint(1)  | NO   |     | 0                       |                   |
| status      | varchar(30) | YES  |     | Hello, Im using AChatt! |                   |
| dateCreated | timestamp   | YES  |     | CURRENT_TIMESTAMP       | DEFAULT_GENERATED |
+-------------+-------------+------+-----+-------------------------+-------------------+
*/
