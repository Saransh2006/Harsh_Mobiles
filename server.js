const express = require("express");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

const mongoose = require("mongoose");

// =======================
// MONGODB CONNECTION
// =======================
mongoose.connect(process.env.MONGO)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// =======================
// MIDDLEWARE
// =======================
app.use(express.json());
app.use(express.static("public"));

// =======================
// ROUTES (PAGES)
// =======================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "admin.html"));
});


// =======================
// API ROUTES
// =======================


// 🔹 GET MOBILES
app.get("/api/mobiles", (req, res) => {

    const filePath = path.join(__dirname, "data", "mobiles.json");

    const data = fs.readFileSync(filePath);
    res.json(JSON.parse(data));
});


// 🔹 ADD MOBILE
app.post("/api/mobiles", (req, res) => {

    const filePath = path.join(__dirname, "data", "mobiles.json");

    const newProduct = req.body;

    const data = fs.readFileSync(filePath);
    const mobiles = JSON.parse(data);

    mobiles.push(newProduct);

    fs.writeFileSync(filePath, JSON.stringify(mobiles, null, 2));

    res.send("Mobile Added");
});


// 🔹 GET ELECTRONICS
app.get("/api/electronics", (req, res) => {

    const filePath = path.join(__dirname, "data", "electronics.json");

    const data = fs.readFileSync(filePath);
    res.json(JSON.parse(data));
});


// 🔹 ADD ELECTRONICS
app.post("/api/electronics", (req, res) => {

    const filePath = path.join(__dirname, "data", "electronics.json");

    const newProduct = req.body;

    const data = fs.readFileSync(filePath);
    const electronics = JSON.parse(data);

    electronics.push(newProduct);

    fs.writeFileSync(filePath, JSON.stringify(electronics, null, 2));

    res.send("Electronics Added");
});


// 🔹 DELETE PRODUCT
app.delete("/api/:category/:index", (req, res) => {

    const { category, index } = req.params;

    const filePath = path.join(__dirname, "data", `${category}.json`);

    const data = fs.readFileSync(filePath);
    const items = JSON.parse(data);

    items.splice(index, 1);

    fs.writeFileSync(filePath, JSON.stringify(items, null, 2));

    res.send("Deleted Successfully");
});


// =======================
// 🔥 REPAIR TRACKING SYSTEM
// =======================


// 🔹 ADD REPAIR
app.post("/api/repairs", (req, res) => {

    const filePath = path.join(__dirname, "data", "repairs.json");

    const newRepair = req.body;

    const data = fs.readFileSync(filePath);
    const repairs = JSON.parse(data);

    repairs.push(newRepair);

    fs.writeFileSync(filePath, JSON.stringify(repairs, null, 2));

    res.send("Repair Added");
});


// 🔹 GET ALL REPAIRS (FOR ADMIN)
app.get("/api/repairs", (req, res) => {

    const filePath = path.join(__dirname, "data", "repairs.json");

    const data = fs.readFileSync(filePath);
    res.json(JSON.parse(data));
});


// 🔹 GET REPAIR BY ID (FOR USER)
app.get("/api/repair/:id", (req, res) => {

    const filePath = path.join(__dirname, "data", "repairs.json");

    const repairId = req.params.id.trim().toUpperCase();

    const data = fs.readFileSync(filePath);
    const repairs = JSON.parse(data);

    const found = repairs.find(r => 
        r.id.trim().toUpperCase() === repairId
    );

    if(found){
        res.json(found);
    } else {
        res.status(404).json({ message: "Not Found" });
    }
});

// 🔹 DELETE REPAIR
app.delete("/api/repairs/:index", (req, res) => {

    const filePath = path.join(__dirname, "data", "repairs.json");

    const index = req.params.index;

    const data = fs.readFileSync(filePath);
    const repairs = JSON.parse(data);

    repairs.splice(index, 1); // remove repair

    fs.writeFileSync(filePath, JSON.stringify(repairs, null, 2));

    res.send("Repair Deleted");
});


// =======================
// START SERVER
// =======================

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});