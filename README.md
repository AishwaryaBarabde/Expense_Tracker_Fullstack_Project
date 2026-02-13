<img width="1893" height="882" alt="Screenshot 2026-02-12 161647" src="https://github.com/user-attachments/assets/24c71606-37ca-4e05-a86b-d40ab41d2d6c" /># 💰 Expense Tracker Full Stack Application

A full-stack Expense Tracker web application that allows users to record, manage, and analyze daily expenses with monthly insights and visualizations.

---

## 🚀 Tech Stack

**Frontend**

* React.js
* Axios
* CSS

**Backend**

* Python Flask (REST APIs)
* SQLAlchemy
* Flask-CORS

**Database**

* PostgreSQL

**Visualization**

* Matplotlib


## Features

* Add new expense
* Edit expense
* Delete expense
* View all expenses
* Monthly summary
* Category-wise spending chart


---

## Project Structure

expense_tracker/
├── backend/
├── frontend/
└── README.md


---

## Setup Instructions

Follow these steps to run the project locally.

---

### 1. Clone the Repository
bash:
git clone https://github.com/YOUR_USERNAME/Expense_Tracker_Fullstack_Project.git
cd Expense_Tracker_Fullstack_Project


---

### 2. Backend Setup (Flask)

**Step 1: Navigate to backend**
bash:
cd backend


**Step 2: Create virtual environment**
bash:
python -m venv venv
venv\Scripts\activate


**Step 3: Install dependencies**
bash:
pip install -r requirements.txt



### 3. PostgreSQL Database Setup

**Step 1: Create database**

Open PostgreSQL and run:
sql
CREATE DATABASE expense_tracker;

**Step 2: Update database URI**

In `backend/config.py` update:
python
SQLALCHEMY_DATABASE_URI = "postgresql://postgres:YOUR_PASSWORD@localhost/expense_tracker"

---

### 🔹 4. Run Backend Server
bash:
python app.py

Backend runs at:
http://127.0.0.1:5000


---

### 🔹 5. Frontend Setup (React)

Open a new terminal.

**Step 1: Navigate to frontend**
bash: 
cd frontend


**Step 2: Install dependencies**
bash: 
npm install


**Step 3: Start React app**
bash:
npm start


Frontend runs at:
http://localhost:3000


---

## 📊 API Endpoints

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| POST   | /api/expenses     | Add expense      |
| GET    | /api/expenses     | Get all expenses |
| PUT    | /api/expenses/:id | Update expense   |
| DELETE | /api/expenses/:id | Delete expense   |
| GET    | /api/summary      | Monthly summary  |

---

## Assumptions

* Single user system (no authentication)
* Categories are user-defined
* Local PostgreSQL instance is used

---

## 📸 Screenshots

<img width="1893" height="882" alt="Screenshot 2026-02-12 161647" src="https://github.com/user-attachments/assets/557bd940-55a9-4c79-8d45-e359b5514543" />
<img width="1657" height="880" alt="image" src="https://github.com/user-attachments/assets/a7548ca2-6ce1-43d7-aeef-a07aaecc72b7" />




---

## 👩‍💻 Author

**Aishwarya Barabde**
Electronics & Telecommunication Engineer
Aspiring Data Analyst / Power BI Developer
