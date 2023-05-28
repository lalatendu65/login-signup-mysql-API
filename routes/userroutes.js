const express = require("express");

const Userroutes = express.Router();
const connection=require("../db/db")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const SCREAT_KEY = process.env.KEY;

// resgister the user 
Userroutes.post("/signup",(req,res)=>{
    const { username, email, password } = req.body;
    // Check if the user already exists
    const checkUserQuery = "SELECT * FROM userinfo WHERE username = ?";
    connection.query(checkUserQuery, [email], (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Error checking user" });
      }
      if (results.length > 0) {
        return res.status(409).json({ error: "User already exists" });
      }
      // Encrypt the password
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({ error: "Error encrypting password" });
        }
        // Insert the new user
        const createUserQuery ="INSERT INTO userinfo (username, email,password) VALUES (?, ?,?)";
        connection.query( createUserQuery,[username, email, hash],(error, result) => {
            if (error) {
              return res.status(500).json({ message: "error creating user", error });
            }
            return res.status(201).json({ message: "user creted sucessfully" });
          }
        );
      });
    });


});

Userroutes.post("/login",(req,res)=>{
    const { email, password } = req.body;
    // Retrieve the user from the database
    const getUserQuery = "SELECT * FROM userinfo WHERE email = ?";
    connection.query(getUserQuery, [email], (error, results) => {
      if (error) {
        return res.status(500).json({ error: "error retrieving user" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "user not found" });
      }
      const user = results[0];
      // Compare the password
      bcrypt.compare(password, user.password, (error, match) => {
        if (error) {
          return res.status(500).json({ error: "error comparing passwords" });
        }
        if (!match) {
          return res.status(401).json({ error: "incorrect password" });
        }
        // Generate a token
        const token = jwt.sign({ email: user.email, id: user.id }, SCREAT_KEY);
        return res.status(200).json({ token: token, message: "login sucessfully" });
      });
    });
});

module.exports=Userroutes;