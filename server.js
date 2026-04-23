const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");


require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");


const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;






// =======================
// MIDDLEWARE
// =======================
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("public/uploads"));

// =======================
// MONGODB CONNECTION
// =======================
mongoose.connect(MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

//=======Schema===========
const Product = require("./models/Product");
const Repair = require("./models/Repair");




// =======================
// ROUTES (PAGES)
// =======================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/admin",  (req, res) => {
    res.sendFile(path.join(__dirname, "views", "admin.html"));
});


// =======================
// API ROUTES
// =======================

//  Products : Getting and Adding 


app.get("/api/products", async (req, res) => {
    try {
       const products = await Product.find().lean();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});

app.post("/api/products", async (req, res) => {

    const product = new Product(req.body);
    await product.save();

    res.send("Product Added");
});



//  DELETE PRODUCT
app.delete("/api/products/:id", async (req, res) => {

    await Product.findByIdAndDelete(req.params.id);

    res.send("Deleted");
});
// =======================
// REPAIR TRACKING SYSTEM
// =======================


//adding repair 
app.post("/api/repairs", async (req, res) => {

    const repair = new Repair(req.body);

    await repair.save();

    res.send("Repair Added");
});

//getting repair
app.get("/api/repairs", async (req, res) => {

    const repairs = await Repair.find();

    res.json(repairs);
});

//tracking
app.get("/api/repair/:id", async (req, res) => {

    const repair = await Repair.findOne({
        id: req.params.id.toUpperCase()
    });

    if(repair){
        res.json(repair);
    } else {
        res.status(404).send("Not Found");
    }
});


//deleting repair
app.delete("/api/repair/:id", async (req, res) => {

    await Repair.findOneAndDelete({
        id: req.params.id
    });

    res.send("Deleted");
});

//multer config


const storage = multer.memoryStorage(); // store in RAM

const upload = multer({
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

//api route for multer

app.post("/api/upload", upload.single("image"), async (req, res) => {
    try {
        const filename = Date.now() + ".jpg";

        await sharp(req.file.buffer)
            .resize(400, 400) // 🔥 AUTO RESIZE
            .jpeg({ quality: 80 })
            .toFile(`public/uploads/${filename}`);

        res.json({ imageUrl: `/uploads/${filename}` });

    } catch (err) {
        res.status(500).json({ error: "Image upload failed" });
    }
});


//auth 
const ADMIN_USER = "admin";
const ADMIN_PASS = "1234";

function checkAuth(req, res, next) {
    const auth = req.headers.authorization;

    if (!auth) {
        res.setHeader("WWW-Authenticate", "Basic");
        return res.status(401).send("Authentication required");
    }

    const [user, pass] = Buffer.from(auth.split(" ")[1], "base64")
        .toString()
        .split(":");

    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        next();
    } else {
        res.setHeader("WWW-Authenticate", "Basic");
        res.status(401).send("Invalid credentials");
    }
}

//admin login

app.get("/admin-login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "admin-login.html"));
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});