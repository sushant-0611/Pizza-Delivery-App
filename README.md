# 🍕 Pizza Delivery Application

A full-stack **MERN Pizza Delivery Platform** with User & Admin roles, custom pizza builder, Razorpay payment integration, real-time order tracking, and inventory management.

---

## 🚀 Features

## 👤 User Side

✅ User Registration with Email Verification
✅ JWT Based Authentication
✅ Forgot Password & Reset Password
✅ Browse Available Pizza Varieties
✅ Custom Pizza Builder

### Pizza Builder Flow

1. Choose Pizza Base
2. Choose Sauce
3. Choose Cheese
4. Select Multiple Vegetables
5. Order Summary
6. Checkout & Payment

✅ Cart Management
✅ COD Payment
✅ Razorpay Test Payment Integration
✅ Order History
✅ Real-time Order Status Tracking

---

# 👨‍💼 Admin Side

✅ Separate Admin Login Portal
✅ Admin Dashboard
✅ Manage Pizza Products
✅ Inventory Management

Inventory Categories:

* Pizza Bases
* Sauces
* Cheese
* Vegetables

✅ Automatic Stock Deduction After Order
✅ Manual Stock Update
✅ Low Stock Email Alerts
✅ Order Management System
✅ Real-time Order Status Update

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* React Router
* Bootstrap
* Axios
* Socket.IO Client

## Backend

* Node.js
* Express.js
* JWT Authentication
* Socket.IO
* Nodemailer
* Node Cron

## Database

* MongoDB Atlas
* Mongoose

## Payment

* Razorpay Test Mode

---

# 📂 Project Structure

```
Pizza-Delivery-App

│
├── client
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── admin
│   │   ├── context
│   │   └── services
│
│
└── server
    ├── controllers
    ├── models
    ├── routes
    ├── middleware
    ├── jobs
    ├── socket.js
    └── server.js
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/sushant-0611/Pizza-Delivery-App.git
```

---

# Backend Setup

Go to server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```
PORT=5000

MONGO_URI=your_mongodb_url

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:5173

RAZORPAY_KEY_ID=your_key

RAZORPAY_KEY_SECRET=your_secret

EMAIL_USER=your_email

EMAIL_PASS=your_password
```

Run server:

```bash
npm run dev
```

---

# Frontend Setup

Go to client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Run React application:

```bash
npm run dev
```

---

# 📸 Screenshots

## User Interface

### Home Page

![Home](screenshots/home.png)

### Pizza Builder

![Pizza Builder](screenshots/pizza-builder.png)

### Cart

![Cart](screenshots/cart.png)

### Checkout & Payment

![Checkout](screenshots/checkout.png)

### Order Tracking

![Orders](screenshots/orders.png)

---

# Admin Interface

### Admin Login

![Admin Login](screenshots/admin-login.png)

### Admin Dashboard

![Dashboard](screenshots/admin-dashboard.png)

### Inventory Management

![Inventory](screenshots/inventory.png)

### Order Management

![Orders](screenshots/admin-orders.png)

---

# 🔐 Security Features

* JWT Authentication
* Protected Routes
* Role Based Authorization
* Password Hashing using bcrypt
* Environment Variable Protection

---

# 🔄 Real-Time System

Socket.IO is used for real-time order updates.

Flow:

```
Admin Updates Order Status

          ↓

Socket.IO Event

          ↓

User Dashboard Updates Instantly
```

---

# 📦 Deployment

Frontend:

* Vercel

Backend:

* Render / Railway

Database:

* MongoDB Atlas

---

# 👨‍💻 Developer

**Sushant Jalindar Kakade**

B.Tech Computer Science Engineering

---

# ⭐ Project Highlights

This project demonstrates:

* Full Stack MERN Development
* Payment Gateway Integration
* Real-Time Communication
* Inventory Automation
* Role Based Access Control
* Production Level Architecture
