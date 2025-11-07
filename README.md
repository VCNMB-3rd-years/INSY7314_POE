# 💰 Coinnect

Coinnect is a secure digital finance management web application that allows customers to register, log in, and perform seamless transactions through a unified interface.  
It connects a **React-based frontend** with a **Node.js + Express backend** and a **MongoDB database**, ensuring smooth data flow, strict security measures, and modern web standards.

---

## 🚀 Overview

Coinnect enables users to:

* 🔐 Register and authenticate securely with JWT-based authentication.
* 💳 Create and manage transactions (deposits, withdrawals, transfers).
* 🧾 Track customer details, including personal data and transaction history.
* 🛡️ Maintain security through HTTPS, Helmet, CORS, and layered middleware.
* 🌐 Communicate between API and frontend via secure REST endpoints.

---

## 🧩 Architecture

Coinnect follows a modular **MERN-style architecture** (MongoDB, Express, React, Node.js):

```
Frontend (React + Vite)
↓  (REST API calls)
Backend (Node.js + Express)
↓
MongoDB (Data persistence)
```

Each layer communicates using **JSON over HTTPS**, with **JWT tokens** for authorization and session management.

---

## 📦 Project Structure

```
backend/
├── app.js
├── server.js
├── routes/
│   ├── authRoute.js
│   ├── bankRoute.js
│   ├── customerRoute.js
│   ├── adminRoute.js
│   └── transactionRoute.js
├── controllers/
│   ├── authController.js
│   ├── bankController.js
│   ├── customerController.js
│   ├── adminController.js
│   └── transactionController.js
├── models/
│   ├── customerModel.js
│   └── transactionModel.js
├── middlewares/
│   ├── authMiddleware.js
│   ├── securityMiddleware.js
│   └── validateRequest.js
├── schemas/
│   ├── authSchemas.js
│   ├── bankSchemas.js
│   ├── customerSchemas.js
│   ├── adminSchema.js
│   └── transactionSchemas.js
└── services/
    └── dbService.js

frontend/
├── src/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── CustomerDashboard.jsx
│   │   └── CreateTransaction.jsx
│   ├── components/
│   └── api/
│       └── apiClient.js
```

---

## 🧠 How It Works

### 1. Authentication

Coinnect uses **JWT** for secure authentication and session handling.

```javascript
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

---

### 2. Transaction Management

Customers can create transactions linked to their `customerId`.  
Each transaction includes fields for **amount**, **SWIFT code**, and **status**.

---

### 3. Role-Based Access & Management

The system includes three distinct roles, all managed via `authController.js`:

#### Customer Role
* Register and log in.
* Create new transactions.
* View personal transaction history.
* Update own profile information.

#### Employee Role
* Log in via `authController.js`.
* Manage and verify transaction queues.
* View pending and verified transactions.
* Approve or deny transactions.

#### Admin Role
* Full access to employee, bank, and customer management.
* Create, read, update, and delete employees and banks.
* Manage all customer accounts and data.

---

### 4. Data Validation (Schemas)

Validation is handled through the `validateRequest` middleware, combining:

* **Joi Schemas** – For sensitive models (Admin, Employee):
  * Enforces strong password rules:  
    `^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$`
  * Prevents privilege escalation with `Joi.forbidden()` for the `role` field.
* **Custom Schemas** – Lightweight type and pattern validation for other models.

---

### 5. Models

**Customer Model**

```javascript
const CustomerSchema = new mongoose.Schema({
  customerId: { type: String, default: () => crypto.randomUUID() },
  customerName: String,
  email: String,
  phoneNumber: String,
  password: String,
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }]
});
```

**Transaction Model**

```javascript
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

---

## 👥 Roles & Responsibilities

| Team Member | Role | Responsibilities |
| :--- | :--- | :--- |
| Aliziwe | API ↔ Frontend Integration | Linked REST API endpoints to frontend components and handled data flow |
| Kuhle | API ↔ Frontend Integration | Implemented data binding and secure API calls between backend and UI |
| Hlumelo | Security Implementation | Developed `securityMiddleware.js`, managed CORS, Helmet, and HTTPS setup |
| Mihle | Frontend Development | Designed and implemented the React-based UI and routing |
| Aphiwe | Frontend + DevSecOps | Handled UX, deployment pipelines, and enforced security best practices |

---

## ⚙️ Setup & Installation

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/<your-username>/coinnect.git
cd coinnect/backend

# Install backend dependencies
npm install
```

---

### 2. Environment Setup

Create a `.env` file inside the `backend/` directory:

```ini
# .env.example
# Server Configuration
API_PORT=3000
NODE_ENV=development

# Database Configuration
CONN_STRING=mongodb+srv://<user>:<password>@<cluster_url>/SecurePaymentsDB?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=aVerySecureSecretKey!ChangeThis!
JWT_EXPIRES_IN=1h

# Bcrypt Configuration
BCRYPT_SALT_ROUNDS=12

# Default admin for first-time setup
SUPERADMIN_USERNAME=superadmin
SUPERADMIN_PASSWORD=ReplaceWithAStrong!Pass1
```

---

### 3. Local SSL (for HTTPS)

The backend is configured to run **HTTPS-only**.  
Generate the following files using a tool like **mkcert**, and place them in the `backend/` root:

```
localhost+2-key.pem
localhost+2.pem
```

---

### 4. Running the Application

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm run prod

# Run tests
npm test
```

---

## 🧪 API Endpoints

| Method | Endpoint | Description | Role(s) |
| :--- | :--- | :--- | :--- |
| **Auth (/v1/auth)** | | | |
| POST | /register | Register a new customer or employee | Public |
| POST | /login | Authenticate and get JWT | Public |
| POST | /test-password | Test a bcrypt hash | Public |
| GET | /logout | Log out (invalidate token) | Authenticated |
| **Admin (/v1/admin)** | | | |
| GET | /getEmployees | List all employees | Admin |
| GET | /:id | Get employee by ID | Admin |
| POST | /createEmployee | Create employee account | Admin |
| PUT | /:id | Update employee | Admin |
| DELETE | /:id | Delete employee | Admin |
| **Bank (/v1/bank)** | | | |
| GET | /getBanks | List all banks | Authenticated ⚠️ |
| GET | /:id | Get bank details | Authenticated ⚠️ |
| POST | /createBank | Create bank entry | Employee |
| PUT | /:id | Update bank details | Employee |
| DELETE | /:id | Delete bank | Employee |
| **Customer (/v1/customer)** | | | |
| GET | /getCustomers | List all customers | Authenticated ⚠️ |
| GET | /:id | Get customer details | Authenticated ⚠️ |
| PUT | /:id | Update customer | Authenticated ⚠️ |
| DELETE | /:id | Delete customer | Authenticated ⚠️ |
| **Employee (/v1/employee)** | | | |
| GET | /getPendingTransactions | View pending transactions | Employee, Admin |
| GET | /getVerifiedTransactions | View approved/denied transactions | Employee, Admin |
| GET | /:id | Get transaction by ID | Employee, Admin |
| PUT | /:id | Approve or deny transaction | Employee |
| **Transaction (/v1/transaction)** | | | |
| GET | /getTransactions | Get all transactions | Employee, Admin |
| GET | /customer/:customerId | Get transactions for customer | Customer, Employee, Admin |
| GET | /:id | Get single transaction | Customer (own), Employee, Admin |
| POST | /createTransaction | Create transaction | Customer |
| PUT | /:id | Update transaction status | Employee |
| DELETE | /:id | Delete transaction | Employee |

---

## 🏁 Testing

The backend includes a comprehensive testing suite powered by:

* **Jest** – Test runner.
* **Supertest** – HTTP endpoint testing.
* **MongoDB Memory Server** – In-memory database for isolated tests.

```bash
npm test
```

---

## 🔒 Security Features

Coinnect employs a **multi-layered security model**, including:

* **HTTPS-only server**
* **Password hashing** with bcrypt (12 salt rounds)
* **Hybrid input validation** using Joi + custom schemas
* **Helmet** for HTTP header security
* **CSRF protection** via `csurf`
* **Rate limiting** for login, registration, and general API access
* **NoSQL injection defense** using `mongo-sanitize`
* **JWT-based authentication**
* **Role-based access control (RBAC)**
* **Payload size limiting (20kb max)**
* **Secure cache control** with `Cache-Control: no-store`

---

## 💡 Developer Notes & Observations

* **⚠️ Critical:** `/v1/customer` and `/v1/bank` GET routes lack `authorizeRole` protection.
  * Add `authorizeRole(['admin', 'employee'])` to restrict access.
* **Bank role logic:** Employees can manage banks but Admins cannot. Confirm if intended.
* **Strong controller-level validation:**  
  `/v1/transaction/:id` correctly validates access — replicate this for `/v1/customer/:id`.

---

## 📚 Reference List

* Ali, H., 2024. *How to Defend Against Server-Side Request Forgery.* freeCodeCamp.org.  
  https://www.freecodecamp.org/news/defending-against-ssrf-attacks/
* Charity, D.T., 2024. *How to Hash Passwords with bcrypt in Node.js.* freeCodeCamp.org.  
  https://www.freecodecamp.org/news/how-to-hash-passwords-with-bcrypt-in-nodejs/
* Çoban, A.T., 2024. *RBAC (Role-Based Access Control) in Node.js.* Medium.  
  https://alitalhacoban.medium.com/rbac-role-based-access-control-in-node-js-d8e5a2d5e67c
* Cybersecurity, T., 2024. *What is Cache-Control and How HTTP Cache Headers Work.* Imperva.  
  https://www.imperva.com/learn/performance/cache-control/
* Das, A., 2025. *Top 6 Methods for Managing Sessions in Node.js.* Medium.  
  https://article.arunangshudas.com/top-6-methods-for-managing-sessions-in-node-js-d44615a35ec6
* Helmet.js, 2025a. *GitHub - helmetjs/helmet.*  
  https://github.com/helmetjs/helmet
* Helmet.js, 2025b. *Helmet Documentation.*  
  https://helmetjs.github.io/
* mdn, 2025. *Client-side Form Validation.* Mozilla Developer Network.  
  https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation
* MeRahulAhire, 2020. *httpOnly-cookie-React-Node.* GitHub.  
  https://github.com/MeRahulAhire/httpOnly-cookie-React-Node/blob/master/server.js
* npm, 2025. *Helmet Package.* npm.  
  https://www.npmjs.com/package/helmet
* TechRide with PK, 2025. *Implement Security using TLS/SSL Connection.* YouTube.  
  https://www.youtube.com/watch?v=zvWwCrNVZlI
* Zanini, A., 2023. *Using Helmet in Node.js to Secure Your Application.* LogRocket Blog.  
  https://blog.logrocket.com/using-helmet-node-js-secure-application/
* Zanini, A., 2024. *How to Implement Rate Limiting in Express for Node.js.* AppSignal.  
  https://www.appsignal.com/
