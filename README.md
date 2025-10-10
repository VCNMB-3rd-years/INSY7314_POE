# 💰 Coinnect

Coinnect is a **secure digital finance management web application** that allows customers to register, log in, and perform seamless transactions through a unified interface.  
It connects a **React-based frontend** with a **Node.js + Express backend** and a **MongoDB database**, ensuring smooth data flow, strict security measures, and modern web standards.

---

## 🚀 Overview

Coinnect enables users to:
- 🔐 **Register and authenticate** securely with JWT-based authentication.  
- 💳 **Create and manage transactions** (e.g., deposits, withdrawals, transfers).  
- 🧾 **Track customer details**, including personal information and transaction history.  
- 🛡️ **Ensure security** through HTTPS, Helmet, CORS, and other middlewares.  
- 🌐 **Communicate between API and frontend** through secure REST endpoints.  

---

## 🧩 Architecture

Coinnect follows a modular **MERN-style** architecture (MongoDB, Express, React, Node.js):

Frontend (React + Vite)
↓ REST API calls
Backend (Node.js + Express)
↓
MongoDB (Data persistence)

yaml
Copy code

Each layer communicates through **JSON over HTTPS**, using **JWT tokens** for authorization.

---

## 📦 Project Structure

backend/
├── app.js
├── routes/
│ ├── authRoute.js
│ ├── bankRoute.js
│ ├── customerRoute.js
│ └── transactionRoute.js
├── controllers/
├── models/
│ ├── customerModel.js
│ └── transactionModel.js
├── middlewares/
│ └── securityMiddlewares.js
└── services/
└── dbService.js

frontend/
├── src/
│ ├── pages/
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ ├── CustomerDashboard.jsx
│ │ └── CreateTransaction.jsx
│ ├── components/
│ └── api/
│ └── apiClient.js

yaml
Copy code

---

## 🧠 How It Works

### 1️⃣ Authentication

Coinnect uses JWT for secure authentication and session management.

```js
// Example: Login endpoint (Node.js)
router.post('/login', async (req, res) => {
  const user = await Customer.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ customerId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.status(200).json({ token, customerId: user._id });
});
