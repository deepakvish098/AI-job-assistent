from flask import Blueprint, request, jsonify
from app.database import SessionLocal
from app.models import Job
from app.services.matcher import match_resume
from app.services.resume_parser import extract_resume_text
import os

resume_bp = Blueprint('resume', __name__)

@resume_bp.route('/match', methods=['POST'])
def match_resume_to_job():
    db = SessionLocal()
    try:
        data = request.json
        resume_text = data.get('resume', '')
        job_id = data.get('job_id')
        if not job_id:
            return jsonify({'error': 'Please select a job'}), 400
        job = db.query(Job).get(int(job_id))
        if not job:
            return jsonify({'error': 'Job not found'}), 404
        result = match_resume(resume_text, job.role)
        return jsonify({'result': result, 'job': {'company': job.company, 'role': job.role}})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        db.close()

@resume_bp.route('/upload', methods=['POST'])
def upload_resume():
    try:
        file = request.files.get('resume_pdf')
        job_description = request.form.get('job', '')
        if not file:
            return jsonify({'error': 'Please upload a resume'}), 400
        file_path = os.path.join('uploads', file.filename)
        file.save(file_path)
        resume_text = extract_resume_text(file_path)
        result = match_resume(resume_text, job_description)
        return jsonify({'result': result, 'job_description': job_description})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
