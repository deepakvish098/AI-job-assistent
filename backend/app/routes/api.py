from flask import Blueprint
from app.database import SessionLocal
from app.models import Job
from app.services.api import fetch_jobs

api_bp = Blueprint('api', __name__)

@api_bp.route('/fetch-api-jobs')
def fetch_api_jobs():
    db = SessionLocal()
    try:
        jobs = fetch_jobs()
        for job in jobs:
            existing_job = db.query(Job).filter_by(company=job['company'], role=job['role']).first()
            if not existing_job:
                new_job = Job(company=job['company'], role=job['role'], description=job['description'])
                db.add(new_job)
        db.commit()
        return 'API Jobs Added'
    except Exception as e:
        db.rollback()
        return f'Error: {e}'
    finally:
        db.close()
