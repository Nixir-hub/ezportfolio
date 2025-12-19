# EzPortfolio – Interactive Machine Learning Portfolio

## ⭐ Overview

**EzPortfolio** is an interactive, production-ready **machine learning portfolio application** built with **Django**, **React**, and **Docker**.  
It showcases full-stack engineering and ML integration through:

- real ML model training,
- live charts and visualizations,
- person detection in images,
- secure user authentication,
- multilingual UI,
- full Dockerized deployment with HTTPS (Nginx + Certbot).

The project serves as both a **learning tool** and a **professional hiring portfolio**.

---

## 🧱 Technology Stack

### **Backend (2 Services)**

#### **1. user-backend (Django REST Framework)**
Handles:
- user registration & login  
- email activation  
- password reset  
- REST API  
- portfolio endpoints  

#### **2. ml-backend (Django + ML Engine)**
Handles:
- regression & classification models  
- training pipelines  
- generating Matplotlib charts  
- person detection (OpenCV / YOLOv8)

**Languages & Libraries:**
- Python 3.11  
- NumPy, SciPy  
- Scikit-learn  
- OpenCV  
- Matplotlib  

---

### **Frontend**

- React 19  
- React Router DOM 6  
- Bootstrap 5  
- Axios  
- Multi-language dictionary (EN/PL)

---

### **Database**

- PostgreSQL (user accounts, portfolio metadata)

---

### **DevOps**

- Docker & Docker Compose  
- Nginx reverse proxy  
- HTTPS via Certbot & Let’s Encrypt  

---

## 🔥 Features

### **Machine Learning**
- Interactive regression & classification visualization  
- Real training with dynamically generated charts  
- Person detection in uploaded images  

### **User System**
- Registration with activation email  
- Login + password reset  
- Secure cookies (HTTP-only)

### **Portfolio**
- Multilingual UI  
- Responsive design  
- Personal user portfolio view  

### **Infrastructure**
- Four-container architecture (frontend, user-backend, ml-backend, PostgreSQL)  
- Production-ready HTTPS  
- Reverse proxy using Nginx  

---

## 🚀 Getting Started (Development)

### **Prerequisites**
- Python 3.11+
- Node.js and npm
- PostgreSQL
- *(Optional)* Docker

---

# EzPortfolio – Setup Guide

## 1️⃣ Download / Clone Repository

```bash
git clone https://github.com/Nixir-hub/EzPortfolio.git
cd EzPortfolio
```

---

## 2️⃣ Configure PostgreSQL

Create a new database:

```sql
CREATE DATABASE myportfolio_db;
```

Or via CLI:

```bash
psql -U postgres -c "CREATE DATABASE myportfolio_db";
```

Database credentials used in the app:

```yaml
USER: postgres
PASSWORD: 1234
DATABASE: myportfolio_db
```

> You can modify these settings in `settings.py` or in the Docker `.env` file.

---

## 3️⃣ Backend Setup

### Create virtual environment

```bash
python -m venv venv
```

### Activate environment

**Linux/macOS:**

```bash
source venv/bin/activate
```

**Windows:**

```bash
venv\Scripts\activate
```

### Install dependencies

```bash
pip install -r requirements.txt
```

### Apply migrations

```bash
python manage.py migrate
```

### Create admin user

```bash
python manage.py createsuperuser
```

---

## 4️⃣ Frontend Setup

```bash
cd frontend
npm install
```

---

## 5️⃣ Run Development Servers

### Backend

```bash
python manage.py runserver
```

➡ [http://localhost:8000](http://localhost:8000)

### Frontend

```bash
npm start
```

➡ [http://localhost:3000](http://localhost:3000)

---

## 🎯 Purpose

EzPortfolio is designed for:

* Recruiters evaluating full-stack and ML engineering skills
* Students learning full-stack ML systems
* Developers presenting portfolio-grade ML applications

> Not intended for commercial use without permission.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push the branch
5. Open a pull request

---

## 📄 License

This project is provided for educational and portfolio purposes.

---

## 📬 Contact

* **GitHub:** [https://github.com/Nixir-hub](https://github.com/Nixir-hub)
* **Email:** [ernestzdunczyk@gmail.com](mailto:ernestzdunczyk@gmail.com)

