from flask import Blueprint, request, jsonify
from app.database import SessionLocal
from app.models import Job
from sqlalchemy import func
from app.services.scraper import scrape_jobs
from app.services.recommander import recommand_jobs
from flask_cors import cross_origin

jobs_bp = Blueprint('jobs', __name__)

sample_jobs = [
    {"company": "Google", "role": "Backend Engineer", "description": "Python Flask SQL Docker"},
    {"company": "Amazon", "role": "Frontend Developer", "description": "React JavaScript HTML CSS"},
    {"company": "Microsoft", "role": "Full Stack Developer", "description": "Python React SQL JavaScript"}
]

@jobs_bp.route('/')
def index():
    return jsonify({'message': 'AI Job Assistant API is running'})

@jobs_bp.route('/jobs', methods=['GET'])
def get_jobs():
    db = SessionLocal()
    try:
        jobs = db.query(Job).all()
        return jsonify([{'id': j.id, 'company': j.company, 'role': j.role, 'status': j.status, 'description': j.description} for j in jobs])
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@jobs_bp.route('/jobs', methods=['POST'])
def create_job():
    db = SessionLocal()
    try:
        data = request.json
        new_job = Job(company=data['company'], role=data['role'], description=data.get('description', ''))
        db.add(new_job)
        db.commit()
        return jsonify({'message': 'Job created successfully'}), 201
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@jobs_bp.route('/jobs/<int:job_id>', methods=['PUT'])
def update_job(job_id):
    db = SessionLocal()
    try:
        job = db.query(Job).get(job_id)
        if not job:
            return jsonify({'error': 'Job not found'}), 404
        data = request.json
        job.status = data.get('status', job.status)
        job.company = data.get('company', job.company)
        job.role = data.get('role', job.role)
        db.commit()
        return jsonify({'message': 'Job updated successfully'})
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@jobs_bp.route('/jobs/<int:job_id>', methods=['DELETE'])
def delete_job(job_id):
    db = SessionLocal()
    try:
        job = db.query(Job).get(job_id)
        if not job:
            return jsonify({'error': 'Job not found'}), 404
        db.delete(job)
        db.commit()
        return jsonify({'message': 'Job deleted successfully'})
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@jobs_bp.route('/search', methods=['GET'])
def search_jobs():
    db = SessionLocal()
    try:
        query = request.args.get('query', '')
        jobs = db.query(Job).filter(Job.company.contains(query) | Job.role.contains(query)).all()
        return jsonify([{'id': j.id, 'company': j.company, 'role': j.role, 'status': j.status} for j in jobs])
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@jobs_bp.route('/dashboard', methods=['GET'])
def dashboard():
    db = SessionLocal()
    try:
        total_jobs = db.query(Job).count()
        jobs_by_status = db.query(Job.status, func.count(Job.id)).group_by(Job.status).all()
        return jsonify({
            'total_jobs': total_jobs,
            'jobs_by_status': [{'status': s, 'count': c} for s, c in jobs_by_status]
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@jobs_bp.route('/scrape', methods=['GET'])
def scraper():
    db = SessionLocal()
    try:
        jobs = scrape_jobs()
        added = 0
        for job in jobs:
            existing_job = db.query(Job).filter_by(company=job['company'], role=job['title']).first()
            if not existing_job:
                new_job = Job(company=job['company'], role=job['title'], description=job.get('description', ''))
                db.add(new_job)
                added += 1
        db.commit()
        return jsonify({'message': f'{added} jobs scraped and added'})
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@jobs_bp.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    resume = data.get('resume', '')
    recommendations = recommand_jobs(resume, sample_jobs)
    return jsonify(recommendations)
