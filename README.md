# 🚀 Harsh Mobiles – Smart Retail Management System

> A modern full-stack web application built for a **local mobile shop**  to manage products and streamline repair tracking digitally.

---

## 🌐 Live Demo

🔗 https://harsh-mobiles.onrender.com

---

## ✨ Overview

Harsh Mobiles is a **real-world solution** designed to digitize operations of local mobile shops.

It helps shop owners:
- Manage inventory efficiently
- Track repair devices using unique IDs
- Improve customer experience with transparency

---

## 🧠 Core Features

### 🛍️ Product Management
- Add mobiles & electronics from admin panel
- Dynamic product listing on homepage
- Delete products easily

### 🔧 Repair Tracking System (RTS) ⭐
- Unique ID assigned to each repair
- Customers can track repair status instantly
- Reduces manual communication

### 🧑‍💻 Admin Dashboard
- Add products & repair entries
- View all repairs
- Manage inventory in real-time

---

## 💎 Unique Selling Point (USP)

> The **Repair Tracking System** allows customers to check their device status using a unique ID ,  bringing digital convenience to offline shops.

---

## 🛠️ Tech Stack

| Layer       | Technology Used        |
|------------|----------------------|
| Frontend   | HTML, CSS, JavaScript |
| Backend    | Node.js, Express.js   |
| Database   | JSON (MongoDB integration in progress) |
| Hosting    | Render               |

---

## 📂 Project Structure


project/
│── public/
│ ├── css/
│ ├── js/
│ ├── images/
│
│── views/
│ ├── index.html
│ ├── admin.html
│
│── data/
│ ├── mobiles.json
│ ├── electronics.json
│ ├── repairs.json
│
│── server.js
│── package.json
│── .gitignore
│── README.md


---

## ⚙️ Getting Started (Local Setup)

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Saransh2006/Harsh_Mobiles.git

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables
Create a .env file in root:
PORT=4000
MONGO=your_mongodb_connection_string

4️⃣ Run Server
node server.js

5️⃣ Open in Browser
http://localhost:4000

🔐 Security Note
.env is excluded using .gitignore
Sensitive credentials are not exposed
Database connection handled securely

📈 Future Roadmap

🔐 Admin Authentication (Login system)
🗄️ MongoDB full integration
🔍 Product Search & Filters
💳 Payment Gateway Integration
📦 Order Management System
📱 Progressive Web App (PWA)
🎯 Problem It Solves

Local mobile shops often:

Track repairs manually ❌
Lack customer transparency ❌
Have no digital system ❌

👉 This project provides a simple, scalable digital solution

🧑‍💻 Author

Saransh Mangal
CSE Student | Developer | Builder

⭐ Final Note

This project is built with a product mindset, focusing on solving real-world problems instead of just fulfilling academic requirements.

If you found this useful, consider ⭐ starring the repo.