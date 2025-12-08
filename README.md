# EzPortfolio - Interactive Machine Learning Portfolio

## Project Overview

EzPortfolio is an **educational and hiring-focused interactive machine learning portfolio** project built using Django for the backend and React for the frontend. It showcases machine learning models, visualizations, and human detection in an engaging and user-friendly manner.

This project serves both as a **learning tool** and as a **professional portfolio** to demonstrate full-stack development, machine learning, and interactive visualization skills to potential employers.

## Technology Stack

### Backend

* **Django (3.11.9)**: Backend framework for user management, API endpoints, and database interaction.
* **Python (3.11.9)**: Programming language for backend logic.
* **Machine Learning Libraries**:

  * NumPy
  * SciPy
  * Scikit-learn
  * OpenCV (cv2)
  * Matplotlib

**Note:** There are **two Django backends**:

1. `user-backend` – Handles user registration, authentication, and portfolio pages.
2. `ml-backend` – Handles machine learning computations, human detection, and chart data.

### Frontend

* **React (19.2.0)**: JavaScript library for UI development.
* **JavaScript**
* **React Router DOM (6.30.2)**
* **Bootstrap (5.3.8)**
* **Axios (1.13.2)**

### Database

* **PostgreSQL**: Relational database for storing user and portfolio data.

## Features

* **Interactive ML Charts**: Explore data and model predictions dynamically.
* **User Authentication**: Registration, login, password reset.
* **Personalized Portfolio**: Each user has a portfolio page to showcase projects.
* **Language Switching**: Multi-language support.
* **Human Detection**: Demonstrates human detection using ML models.

## Getting Started

### Prerequisites

* Python 3.11.x
* PostgreSQL
* Node.js & npm

### Installation

#### Clone the repository

```bash
git clone <repository_url>
cd ezportfolio
```

#### Set up PostgreSQL

* Create a database: `myportfolio_db`
* Create a user: `postgres` with password `1234` (adjust in `settings.py` if needed)

#### Backend Setup

```bash
# Create virtual environment
python -m venv venv
# Activate environment
# Linux/macOS
source venv/bin/activate
# Windows
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

#### Frontend Setup

```bash
cd frontend
npm install
```

### Running the Application

#### Backend

```bash
python manage.py runserver
```

* Access at [http://localhost:8000](http://localhost:8000)

#### Frontend

```bash
npm start
```

* Access at [http://localhost:3000](http://localhost:3000)

## Educational / Hiring Purpose

This project is intended for **educational purposes and as a portfolio for hiring**.
It is not for commercial use without prior permission.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Make changes and commit with clear messages
4. Push to your fork (`git push origin feature-name`)
5. Create a pull request to the main repository

## License

This project is provided for **educational and portfolio purposes**.

## Acknowledgements

* Django, React, Bootstrap
* NumPy, SciPy, Scikit-learn, OpenCV, Matplotlib
* Axios

## Contact

* [GitHub Profile](https://github.com/Nixir-hub)
* Email: [ernestzdunczyk@gmail.com](mailto:ernestzdunczyk@gmail.com)
