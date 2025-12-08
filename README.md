# EzPortfolio - Interactive Machine Learning Portfolio

## Project Overview
EzPortfolio is an **educational, interactive machine learning portfolio** project built using **Django** for the backend and **React** for the frontend.  
It showcases machine learning models, visualizations, and human detection in an engaging and user-friendly manner.  

**This project is for educational purposes only.**

## Technology Stack

### Backend (Django)
- **User Backend**: Handles authentication, user management, portfolio data  
- **ML Backend**: Handles image processing, human detection, and ML models  
- **Python 3.11**  
- **Django 3.11**  
- **PostgreSQL**: Database (via `psycopg2`)

### Frontend (React)
- **React 19**  
- **React Router DOM 6**  
- **Bootstrap 5**  
- **Axios**: For API requests  
- **JavaScript**

### Machine Learning / Data Processing
- **NumPy**  
- **SciPy**  
- **Scikit-learn**  
- **OpenCV (cv2)**  
- **Matplotlib**  

## Features
- **Interactive ML Charts**: Explore data and model predictions dynamically  
- **User Authentication**: Secure registration, login, password reset  
- **Personalized Portfolio**: Each user has a dedicated portfolio page  
- **Language Switching**: Multiple languages support (enhanced UX)  
- **Human Detection**: Detects people on uploaded images using ML  
- **Downloadable Results**: Users can download processed images locally  

## Getting Started

### Prerequisites
- Python 3.11  
- PostgreSQL ([Download](https://www.postgresql.org/))  
- Node.js and npm ([Download](https://nodejs.org/))  

### Clone Repository
```bash
git clone <repository_url>
cd ezportfolio
```

---

## Backend Setup

### 1. User Backend
```bash
cd backend-user
python -m venv venv
# Linux/macOS
source venv/bin/activate
# Windows
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver 8000
```

### 2. ML Backend
```bash
cd backend-ml
python -m venv venv
# Linux/macOS
source venv/bin/activate
# Windows
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8001
```

---

## Frontend Setup
```bash
cd frontend
npm install
npm start
```

**Access the application:**
- Frontend: [http://localhost:3000](http://localhost:3000)  
- User backend: `localhost:8000`  
- ML backend: `localhost:8001`  

---

## Database Setup (PostgreSQL)
1. Create a database, e.g., `ezportfolio_db`  
2. Create a user, e.g., username: `postgres`, password: `1234`  
3. Update `settings.py` of each backend with your DB credentials  

---

## Usage
- Upload images in the ML section to detect people  
- Visualize ML model charts in the portfolio  
- Download processed images locally  
- User accounts are stored in the user backend only  

---

## Contributing
We welcome contributions!  
1. Fork the repository  
2. Create a new branch for your feature or bugfix  
3. Commit changes with clear messages  
4. Push branch to your fork  
5. Open a pull request to the main repository  

---

## License
This project is for **educational purposes only**.  
[Specify your license if needed, e.g., MIT License]

---

## Acknowledgements
- Django, React, Bootstrap, Axios  
- NumPy, SciPy, Scikit-learn, OpenCV, Matplotlib  

---

## Contact
- Email: ernestzdunczyk@gmail.com  
- Feel free to reach out for questions or collaboration  

---

**Note:** This portfolio contains **two separate Django backends**; ensure both are running for full functionality.  
Frontend communicates with ML backend for image detection and with user backend for authentication and portfolio data.
