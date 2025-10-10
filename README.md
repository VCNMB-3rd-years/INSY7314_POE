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

### 1. Authentication

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
```
## 2. Transaction Management

Customers can create transactions linked to their **customerId**.  
Each transaction includes **amount**, **swift code**, and **status** fields.

### 🧾 transactionModel.js
```js
const TransactionSchema = new mongoose.Schema({
  transactionId: { type: String, default: () => crypto.randomUUID() },
  status: { type: Boolean, default: false },
  recipientReference: String,
  customerReference: String,
  amount: Number,
  swiftCode: String,
  customerId: [{ type: String, ref: "customerModel" }]
});
```
# 3. Security Implementation

Handled by **Helmet**, **CORS**, and **HTTPS** setup.

```js
// backend/middlewares/securityMiddlewares.js
const cors = require('cors');
const helmet = require('helmet');

function securityMiddlewares(app) {
  app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }));

  app.use(helmet({
    hidePoweredBy: true,
    frameguard: { action: "deny" },
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        "frame-ancestors": ["'none'"],
      },
    },
  }));

  console.log("✅ Helmet and CORS security middleware applied.");
}

module.exports = securityMiddlewares;
```
# 4. Models

##  Customer Model

Stores all customer-related data and references to transactions.

```js
const CustomerSchema = new mongoose.Schema({
  customerId: { type: String, default: () => crypto.randomUUID() },
  customerName: String,
  email: String,
  phoneNumber: String,
  password: String,
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]
});
```
## Transaction Model

Handles individual transaction records.

```js
const TransactionSchema = new mongoose.Schema({
  transactionId: { type: String, default: () => crypto.randomUUID() },
  status: { type: Boolean, default: false },
  recipientReference: String,
  customerReference: String,
  amount: Number,
  swiftCode: String,
  customerId: [{ type: String, ref: "customerModel" }]
});
```
# 👥 Roles & Responsibilities

| Team Member | Role | Responsibilities |
|-------------|------|-----------------|
| Aliziwe | API ↔ Frontend Integration | Linked REST API endpoints to frontend components and handled data flow |
| Kuhle | API ↔ Frontend Integration | Implemented data binding and secure API calls between backend and UI |
| Hlumelo | Security Implementation | Developed `securityMiddlewares.js`, handled CORS, Helmet, and HTTPS configuration |
| Mihle | Frontend Development | Designed and implemented React-based UI, pages, and routing |
| Aphiwe | Frontend + DevSecOps | Implemented UX features, managed deployment pipelines, and enforced security best practices |

---

# ⚙️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/coinnect.git
cd coinnect
```

## 🧪 API Endpoints

| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | /v1/auth/register | Register new customer |
| POST   | /v1/auth/login | Authenticate and get JWT token |
| POST   | /v1/transaction/createTransaction | Create a new transaction |
| GET    | /v1/transaction/:customerId | Get all customer transactions |

---

## 🔒 Security Features

- **Helmet** → Prevents clickjacking & sets secure HTTP headers  
- **CORS** → Restricts allowed origins  
- **HTTPS** → Encrypted communication  
- **Rate Limiter** → Protects against brute-force attacks  
- **JWT** → Secure authentication layer
