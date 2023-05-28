const express=require("express")
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
const connection=require("./db/db")
const Userroutes=require("./routes/userroutes")
const Productroutes=require("./routes/productroutes")
const dotenv=require("dotenv")
dotenv.config()

// database connection
connection

// define routes
app.use("/user",Userroutes);
app.use("/product",Productroutes);




app.listen(process.env.PORT, () => {
  console.log(`server listen at ${process.env.PORT}`);
});