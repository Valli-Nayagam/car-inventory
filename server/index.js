const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const mysql = require('mysql2')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "carInventory"
});

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT*FROM InventoryManagement";
    db.query(sqlSelect, (err, results) => {
        res.send(results)
    })
})
app.post("/api/insert", (req, res) => {
    const carNo = req.body.carNo
    const carName = req.body.carName
    const Description = req.body.description
    const Colour = req.body.color
    const Price = req.body.price
    console.log(req.body);
    const sqlInsert = "INSERT INTO InventoryManagement (carNo,carName,Description,Colour,Price) VALUES (?,?,?,?,?);"
    db.query(sqlInsert, [carNo,carName, Description, Colour, Price], (err, results) => {
        console.log(results)
    })
});
app.post("/api/profile", (req, res) => {
    console.log(req.body);
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const phoneNo = req.body.phoneNo
    const sqlInsert = "INSERT INTO Profile (FirstName,LastName,Email,PhoneNumber) VALUES (?,?,?,?);"
    db.query(sqlInsert, [firstName, lastName, email, phoneNo], (err, results) => {
        console.log(results)
    })
});
app.delete("/api/delete/:carName", (req, res) => {
    const name = req.params.carName
    const sqlDelete = "DELETE FROM InventoryManagement WHERE carName = ?"
    db.query(sqlDelete, name, (err, results) => {
        if (err) console.log(err);
    })
})
app.put("/api/update", (req, res) => {
    console.log(req.body);
    const carName = req.body.carName
    const description = req.body.description
    const color = req.body.color
    const Price = req.body.price
    const carNo = req.body.carNo
    const sqlUpdate = "UPDATE InventoryManagement SET carName = ?, Description = ?, Colour = ?, Price = ? WHERE carNo = ?;"
    db.query(sqlUpdate, [carName, description, color, Price, carNo], (err, results) => {
        if (err) console.log(err);
    })
})

app.get('/', (req, res) => {
    const sqlInsert = "INSERT INTO InventoryManagement (carName,Description,Colour,Price) VALUES (?,?,?,?);"
    db.query(sqlInsert, (err, results) => {
        res.send('server');
    })
})
const PORT = 3001;
app.listen(PORT, () => {
    console.log('server');
})