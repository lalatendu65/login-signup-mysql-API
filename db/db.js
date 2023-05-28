const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
const dbConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
};

const connection = mysql.createConnection(dbConfig);
connection.connect((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Database connected!");
  }
});
module.exports=connection
