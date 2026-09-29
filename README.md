# 🩸 Blood Bank Management System

A full-stack web-based **Blood Bank Management System** developed to manage blood donors, blood stock, hospitals, blood requests, blood camps, and blood cross-matching through a centralized application.

## 📌 Project Overview

The Blood Bank Management System is designed to simplify and organize blood bank operations using a web-based application.

The system provides a user-friendly interface for managing donor information, monitoring available blood stock, handling blood requests, maintaining hospital information, organizing blood donation camps, and performing blood cross-matching.

The project follows a **full-stack architecture** with a React frontend, Node.js/Express backend, and MySQL database.

---

## 🎯 Objectives

* Manage donor information efficiently.
* Maintain and monitor available blood stock.
* Manage hospital details and blood requirements.
* Handle blood requests and their status.
* Maintain blood donation camp information.
* Perform and record blood cross-match results.
* Store application data in a centralized MySQL database.
* Provide a simple and organized interface for blood bank management.

---

## ✨ Features

### 👤 Donor Management

* Add donor information.
* View registered donors.
* Store details such as:

  * Donor ID
  * Name
  * Age
  * Gender
  * Blood Group
  * Phone
  * Email
  * Address
  * Last Donation Date

### 🩸 Blood Stock Management

* View available blood stock.
* Monitor blood groups and their availability.
* Manage blood stock information.

### 🏥 Hospital Management

* Add and manage hospital information.
* View registered hospitals.
* Maintain hospital-related details required for blood management.

### 📋 Blood Request Management

* Record blood requests.
* Track request status.
* Manage requests through different stages such as pending, fulfilled, or rejected.

### 🔬 Blood Cross-Matching

* Record blood cross-match information.
* Store donor and patient blood groups.
* Record the cross-match result and test date.

### ⛺ Blood Donation Camps

* Maintain information related to blood donation camps.
* Organize and manage camp details.

### 🔐 Login

* Provides a login interface for accessing the system.

---

## 🛠️ Technologies Used

### Frontend

* React.js
* JavaScript
* HTML
* CSS
* Vite

### Backend

* Node.js
* Express.js
* JavaScript

### Database

* MySQL

### Development Tools

* Visual Studio Code
* Git
* GitHub
* MySQL

---

## 🏗️ System Architecture

```text
                ┌─────────────────────┐
                │       User          │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │   React Frontend    │
                │      (Vite)         │
                └──────────┬──────────┘
                           │
                           │ API Requests
                           ▼
                ┌─────────────────────┐
                │ Node.js + Express   │
                │      Backend        │
                └──────────┬──────────┘
                           │
                           │ Database Queries
                           ▼
                ┌─────────────────────┐
                │       MySQL         │
                │      Database       │
                └─────────────────────┘
```

---

## 📁 Project Structure

```text
Blood-Bank-Management-System/
│
├── blood_bank_frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── BloodStock.jsx
│   │   │   ├── Camps.jsx
│   │   │   ├── CrossMatch.jsx
│   │   │   ├── DonorForm.jsx
│   │   │   ├── DonorList.jsx
│   │   │   ├── Hospitals.jsx
│   │   │   └── login.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── bloodbank backend/
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── blood bank sql.sql
├── blood bank management system abstract.docx
├── blood bank management system.pptx
└── .gitignore
```

---

## 🔄 Application Workflow

```text
Login
  │
  ▼
Dashboard
  │
  ├── Donor Management
  │       │
  │       └── Donor Information
  │
  ├── Blood Stock
  │       │
  │       └── Blood Availability
  │
  ├── Hospitals
  │       │
  │       └── Hospital Information
  │
  ├── Blood Requests
  │       │
  │       └── Request Status
  │
  ├── Blood Camps
  │       │
  │       └── Camp Information
  │
  └── Cross Match
          │
          └── Compatibility Result
```

---

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/vishnupriya-255/Blood-Bank-Management-System.git
```

Navigate into the project:

```bash
cd Blood-Bank-Management-System
```

---

### 2. Set Up the Database

Open MySQL or MySQL Workbench.

Create the required database and execute the SQL file provided in:

```text
blood bank sql.sql
```

The SQL file contains the database structure required by the application.

---

### 3. Set Up the Backend

Open a terminal and navigate to:

```bash
cd "bloodbank backend"
```

Install the required dependencies:

```bash
npm install
```

Start the backend server:

```bash
node server.js
```

The backend runs on the configured local server port.

---

### 4. Set Up the Frontend

Open another terminal and navigate to:

```bash
cd blood_bank_frontend
```

Install the frontend dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will provide a local URL, usually similar to:

```text
http://localhost:5173
```

Open the displayed URL in your browser.

---

## 🗄️ Database

The project uses **MySQL** for storing and managing application data.

The database handles information related to:

* Donors
* Blood stock
* Hospitals
* Blood requests
* Blood cross-matching
* Blood donation camps

The SQL database file is included in the repository as:

```text
blood bank sql.sql
```

---

## 🔌 Frontend–Backend Communication

The React frontend communicates with the Node.js/Express backend through API requests.

```text
React Frontend
      │
      │ HTTP Requests
      ▼
Express Backend
      │
      │ SQL Queries
      ▼
MySQL Database
      │
      │ Data
      ▼
Express Backend
      │
      │ Response
      ▼
React Frontend
```

---

## 🔒 Security and Repository Management

The project includes a `.gitignore` file to prevent unnecessary or sensitive files from being uploaded.

For example:

```text
node_modules/
.env
.env.local
dist/
build/
```

The `node_modules` folders are not stored in the repository because dependencies can be installed using:

```bash
npm install
```

---

## 🎓 Academic Project

This project was developed as a **college full-stack development project** to demonstrate the integration of:

* Frontend development
* Backend development
* REST API communication
* Database management
* CRUD operations
* Full-stack application architecture

---

## 👩‍💻 Developer

**Vishnupriya**

Computer Science Engineering
KL University Hyderabad

---

## 📄 Project Documentation

The repository also contains:

* **Project Abstract:** `blood bank management system abstract.docx`
* **Project Presentation:** `blood bank management system.pptx`
* **Database Script:** `blood bank sql.sql`

---

## 📜 License

This project was developed for academic and educational purposes.
