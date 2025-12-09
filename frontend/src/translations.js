const translations = {
  en: {
    // Navigation
    home: 'Home',
    login: 'Login',
    logout: 'Logout',
    register: 'Sign up',
    
    // Common
    profil: 'Profil',
    welcome: 'Welcome',
    email: 'Email',
    password: 'Password',
    oldPassword: 'Old password',
    newPassword: 'New password',
    username: 'Username',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    changePassword: 'Change password',
    userPanel: 'User panel',
    deleteAccount: 'Delete account',
    delete: 'Delete',
    MLChart: 'MachineLearningChart',
    classification: 'Classification',
    regression: "Regression",
    train:  'Training',
    model: 'Model',
    epochs: 'Epochs',
    class: "Class",
    numberPerson: 'Counter',
    humanDetection: 'AI| Detection people on picture',
    download:'Download',
    about: "About Site",

    // Messages
    loginSuccess: 'Login successful',
    loginError: 'Login failed',
    registerSuccess: 'Registration successful',
    forgotPassword: 'Forgot your password?',
    slide1_title: "Hi, I'm Ernest Zduńczyk 👋",
    slide1_text: "Junior Python Developer. I build web applications with Django, Flask, React.js, create REST APIs, and develop open-source projects. Looking for my first commercial role to grow as a developer.",


    slide2_title: "Interactive Machine Learning Projects",
    slide2_text: "After logging in, explore ML tools: dynamic regression & classification charts, data visualizations, and intelligent person silhouette detection — all working directly in your browser.",


    slide3_title: "Let’s stay connected",
    slide3_text: "If you have questions about my projects or want to collaborate, feel free to contact me through GitHub, LinkedIn, or email — all links are available below.",

    about_me_heading: "About me",
    experience_title: "Experience",
    experience_text: "Developing modern web applications with Django, Flask, and React.js.\n" +

                        "Building scalable REST APIs and responsive interfaces.\n" +

                        "Working with SQL, Docker, Git, and CI/CD tools.\n" +

                        "Contributing to open-source projects: e-commerce store, diet app, library system.\n"+

                        "Implementing JWT authentication, unit tests, and backend features.\n" +

                        "Handling full application lifecycle – from design to production.",

    projects_title: "EzPortfolio – Interactive ML Project",
    projects_text: "Full-stack application built with Django and React. Logged-in users can train machine learning models, generate regression and classification charts, and use a person detection module on images. Runs on a dedicated REST API with user dashboard. Feel free to reach out for collaboration or testing.",
    contact_title: "Contact",
    contact_text: "Email, LinkedIn, GitHub — all in one place.",
    aboutTitle: "EzPortfolio – Interactive ML Project with Docker and HTTPS",
    aboutDescription: "The project consists of four Docker containers and is production-ready with full HTTPS support using Certbot / Let's Encrypt.",
    techStackTitle: "Tech stack:",
    techFrontend: "Frontend: React.js with routing and interactive components for ML visualization.",
    techBackend: "Backend: Django REST Framework handling user registration, account activation, and password reset.",
    techMLBackend: "ML Backend: Python with TensorFlow / NumPy – training ML models, generating loss/prediction charts, and detecting people in images.",
    techDatabase: "Database: PostgreSQL for storing users and project data.",
    featuresTitle: "Features:",
    featureRegistration: "User registration with email activation token.",
    featurePasswordReset: "Password reset and authentication.",
    featureInteractiveCharts: "Interactive point, regression, and classification charts in real time.",
    featureMLPersonDetection: "ML model for person detection in images.",
    featureContainerized: "Fully containerized stack with backend, ML service, frontend, and database.",
    featureDockerCompose: "With Docker Compose, all containers communicate seamlessly, and Nginx serves as a reverse proxy with HTTPS enabled.",
    deploymentInfo: "Deployed on a VPS with Ubuntu, Docker, and Nginx managing reverse proxy and HTTPS."

      // Add more translations as needed

  },
  pl: {
    // Navigation
    home: 'Strona główna',
    login: 'Zaloguj się',
    logout: 'Wyloguj się',
    register: 'Zarejestruj się',
    
    // Common
    profil: 'Konto',
    welcome: 'Witaj',
    email: 'Email',
    password: 'Hasło',
    oldPassword: 'Stare hasło',
    newPassword: 'Nowe hasło',
    username: 'Nazwa użytkownika',
    submit: 'Wyślij',
    cancel: 'Anuluj',
    save: 'Zapisz',
    changePassword: 'Zmiana hasła',
    userPanel: 'Panel użytkownika',
    deleteAccount: 'Usuń konto',
    delete: 'Usuń',
    MLChart: 'WykresUczeniaMaszynowego',
    classification: 'Klasyfikacja',
    regression: "Regresja",
    train:  'Trenuj',
    model: 'Model',
    epochs: 'Epoki',
    class: "Klasy",
    numberPerson: 'Liczba osób',
    humanDetection: 'AI| Wykrywanie osób na obrazie',
    download: "Pobierz",
    about: "O stronie",

    // Messages
    loginSuccess: 'Logowanie pomyślne',
    loginError: 'Błąd logowania',
    registerSuccess: 'Rejestracja pomyślna',
    forgotPassword: 'Nie pamietasz hasłą?',
    slide1_title: "Cześć, jestem Ernest Zduńczyk 👋",
    slide1_text: "Junior Python Developer. Tworzę aplikacje webowe w Django, Flask i React.js, buduję REST API oraz rozwijam projekty open-source. Szukam pierwszej komercyjnej roli, aby dalej się rozwijać.",


    slide2_title: "Projekty i Machine Learning",
    slide2_text: "Po zalogowaniu możesz przetestować moje projekty z uczenia maszynowego: generowanie wykresów regresji i klasyfikacji oraz rozpoznawanie sylwetek osób na zdjęciu. Wszystkie funkcje są w pełni zaimplementowane i działają w aplikacji.",


    slide3_title: "Pozostańmy w kontakcie",
    slide3_text: "Chcesz zobaczyć więcej, porozmawiać o projektach lub zapytać o wdrożenia? Zapraszam — GitHub, LinkedIn i email czekają na Twoją wiadomość.",

    about_me_heading: "O mnie",
    experience_title: "Doświadczenie",
    experience_text: "Tworzę nowoczesne aplikacje webowe w Django, Flask i React.js.\n" +
        "\n" +
        "Buduję skalowalne REST API i responsywne interfejsy.\n" +
        "\n" +
        "Pracuję z SQL, Docker, Git i narzędziami CI/CD.\n" +
        "\n" +
        "Realizuję projekty open-source: sklep e-commerce, aplikacja dietetyczna, system biblioteczny.\n" +
        "\n" +
        "Wdrażam JWT, testy jednostkowe i funkcje backendowe.\n" +
        "\n" +
        "Zajmuję się pełnym cyklem aplikacji – od projektu do produkcji.",
    projects_title: "EzPortfolio – Interaktywny projekt ML",
    projects_text: "Aplikacja full-stack stworzona w Django i React. Po zalogowaniu można trenować modele uczenia maszynowego, generować wykresy regresji i klasyfikacji oraz korzystać z modułu rozpoznawania sylwetek osób na zdjęciu. Całość działa na własnym REST API z panelem użytkownika. Zapraszam do kontaktu w celu współpracy lub testowania projektu.",
    contact_title: "Kontakt",
    contact_text: "Email, LinkedIn, GitHub — wszystko w jednym miejscu.",
    aboutTitle: "EzPortfolio – Interaktywny projekt ML z Docker i HTTPS",
    aboutDescription: "Projekt składa się z czterech kontenerów Docker i jest gotowy do produkcji z pełnym wsparciem HTTPS przy użyciu Certbot / Let's Encrypt.",
    techStackTitle: "Stack technologiczny:",
    techFrontend: "Frontend: React.js z routingiem i interaktywnymi komponentami do wizualizacji ML.",
    techBackend: "Backend: Django REST Framework obsługujący rejestrację użytkowników, aktywację kont i reset hasła.",
    techMLBackend: "ML Backend: Python z TensorFlow / NumPy – trenowanie modeli ML, generowanie wykresów loss/prediction i wykrywanie osób na obrazkach.",
    techDatabase: "Baza danych: PostgreSQL do przechowywania użytkowników i danych projektu.",
    featuresTitle: "Funkcje:",
    featureRegistration: "Rejestracja użytkownika z tokenem aktywacyjnym e-mail.",
    featurePasswordReset: "Reset hasła i uwierzytelnianie.",
    featureInteractiveCharts: "Interaktywne wykresy punktowe, regresji i klasyfikacji w czasie rzeczywistym.",
    featureMLPersonDetection: "Model ML do wykrywania osób na obrazkach.",
    featureContainerized: "W pełni konteneryzowany stack z backendem, usługą ML, frontendem i bazą danych.",
    featureDockerCompose: "Dzięki Docker Compose wszystkie kontenery komunikują się bezproblemowo, a Nginx działa jako reverse proxy z włączonym HTTPS.",
    deploymentInfo: "Wdrożony na VPS z Ubuntu, Docker i Nginx zarządzającym reverse proxy oraz HTTPS."
    // Add more translations as needed
  }
};

export default translations;
