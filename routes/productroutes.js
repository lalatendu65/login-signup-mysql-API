const express = require("express");
const connection = require("../db/db");
const Productroutes=express.Router()
const auth=require("../middlware/auth");

// post product 
Productroutes.post("/createcar",auth,(req,res)=>{
    const { productId } = req;
    const { carname, carmodel, carcolour, enginetype } = req.body;
    // insert data into database
    const sql =
      "INSERT INTO productinfo (productId,carname,carmodel,carcolour,enginetype) VALUES (?,?,?,?,?)";
    connection.query(
      sql,
      [productId, carname, carmodel, carcolour, enginetype],
      (error, results) => {
        if (error) {
          return res.status(500).json({ error: "error inserting data" });
        }
        return res.status(200).json({ message: "car created sucessfully" });
      }
    );
});

Productroutes.get("/allcar",auth,(req,res)=>{
    const sql = "SELECT * FROM productinfo";
    connection.query(sql, (error, results) => {
      if (error) {
        return res.status(500).json({ error: "error inserting data" });
      }
      return res.status(200).json({ results: results });
    });
});

module.exports=Productroutes

