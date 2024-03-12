import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
  host: "127.0.0.1:3306",
  user: "Nagatacs",
  password: "Fer@123nando",
  database: "u907462928_Jadefy",
});

app.get("/", (req,res) => {
  res.json("This is backend")
})

app.get("/Projetos", (req,res) => {
  const q ="SELECT * FROM Projetos"
  db.query(q,(err,data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

app.listen(8800, () => {
  console.log("Connected to backend.");
}); 
