# AI Job Assistant

A full-stack AI-powered job application tracker built with Flask (backend) and React (frontend). It helps you track job applications, match your resume to job descriptions, scrape jobs from the web, and get AI-powered recommendations.

---

## Features

 
- **📱 Responsive Design** — Mobile-first UI that works seamlessly on phones, tablets, and desktops
- **📋 Job Tracker** — Add, update, delete and search job applications
- **🎯 Resume Matcher** — Match your skills against a job and get a match score
- **📤 Resume Upload** — Upload a PDF resume and analyze it against a job description
- **🕷️ Job Scraper** — Scrape real jobs from the web automatically
- **🔗 API Job Fetcher** — Fetch jobs from RemoteOK API
- **🤖 Job Recommendations** — Get ranked job recommendations based on your skills using AI similarity matching
- **📊 Dashboard** — Visual overview of your application status with progress bars
- **☰ Mobile Sidebar** — Hamburger menu for easy navigation on mobile devices

---

## Tech Stack

### Backend
- Python 3.x
- Flask
- Flask-Login (Authentication)
- Flask-CORS
- SQLAlchemy
- SQLite
- spaCy (NLP)
- BeautifulSoup4 (scraping)
- PyPDF2 (resume parsing)
- Werkzeug (security)

### Frontend
- React 19
- Vite
- Tailwind CSS 4
- React Router 7
- Axios
- Responsive Design (Mobile-first)

---

## Project Structure

```
ai-job-assistant/
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── jobs.py        # Job CRUD, scrape, dashboard routes
│   │   │   ├── resume.py      # Match and upload routes
│   │   │   ├── auth.py        # Register/login routes
│   │   │   └── api.py         # External API job fetching
│   │   ├── services/
│   │   │   ├── matcher.py     # Resume matching logic
│   │   │   ├── scraper.py     # Web scraping logic
│   │   │   ├── recommander.py # Job recommendation logic
│   │   │   ├── resume_parser.py # PDF parsing
│   │   │   ├── nlp_engine.py  # spaCy NLP processing
│   │   │   └── autofill.py    # Selenium form autofill
│   │   ├── __init__.py        # App factory
│   │   ├── database.py        # DB connection
│   │   └── models.py          # SQLAlchemy models
│   ├── tests/
│   │   ├── conftest.py
│   │   └── test_matcher.py
│   ├── uploads/               # Uploaded resumes
│   ├── .env                   # Environment variables
│   ├── requirement.txt        # Python dependencies
│   └── run.py                 # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Jobs.jsx
    │   │   ├── AddJob.jsx
    │   │   ├── MatchResume.jsx
    │   │   ├── UploadResume.jsx
    │   │   └── Recommend.jsx
    │   ├── api.js             # Axios instance
    │   ├── App.jsx
    │   └── main.jsx
    ├── vite.config.js
    └── package.json
```

---

## Getting Started

### Prerequisites
- Python 3.x
- Node.js 18+
- pip

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ai-job-assistant.git
cd ai-job-assistant
```

### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux

# Install dependencies
pip install -r requirement.txt

# Download spaCy model
python -m spacy download en_core_web_sm

# Create .env file
echo DATABASE_URL=sqlite:///./app.db > .env
echo FLASK_DEBUG=true >> .env

# Run the backend
python run.py
```

Backend runs on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Run the frontend
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## Environment Variables

Create a `.env` file inside the `backend/` folder:

```
DATABASE_URL=sqlite:///./app.db
FLASK_DEBUG=true
```

---

## API Endpoints

| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current user |
| GET | `/jobs` | Get all jobs |
| POST | `/jobs` | Add a new job |
| PUT | `/jobs/<id>` | Update a job |
| DELETE | `/jobs/<id>` | Delete a job |
| GET | `/search?query=` | Search jobs |
| GET | `/dashboard` | Get dashboard stats |
| GET | `/scrape` | Scrape jobs from web |
| GET | `/fetch-api-jobs` | Fetch jobs from API |
| POST | `/match` | Match resume to job |
| POST | `/upload` | Upload PDF resume |
| POST | `/recommend` | Get job recommendations |

---

## Running Tests

```bash
cd backend
pytest tests/
```

---

## Usage

1. **Add jobs** you applied to via the Add Job page
2. **Scrape jobs** automatically using the Scrape Jobs button
3. **Match your resume** against a job to see your match score
4. **Upload your PDF resume** to analyze it against a job description
5. **Get recommendations** by pasting your skills
6. **Track status** — update jobs from Applied to Interview, Offered, or Rejected
7. **Dashboard** shows a visual overview of all your applications

---

## License

MIT License
