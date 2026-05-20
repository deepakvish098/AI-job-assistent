from app.services.matcher import match_resume

fresher_skills = [
    'python', 'javascript', 'html', 'css', 'react',
    'node.js', 'sql', 'git', 'rest api', 'json',
    'basics', 'fundamental', 'junior', 'entry-level'
]

entry_level_keywords = ['fresher', 'junior', 'entry-level', 'intern', 'graduate', 'beginner']

def is_entry_level_job(job_description):
    """Check if a job is suitable for freshers"""
    description_lower = job_description.lower()
    return any(keyword in description_lower for keyword in entry_level_keywords)

def get_fresher_recommendations(resume_text, jobs):
    """Get AI recommendations for freshers with skill gaps"""
    recommendations = []
    
    for job in jobs:
        # Filter for entry-level jobs
        if not is_entry_level_job(job.get('description', '')):
            continue
            
        result = match_resume(resume_text, job['description'])
        
        # Extract skill gaps
        job_skills = set(job['description'].lower().split())
        resume_skills = set(resume_text.lower().split())
        skill_gaps = job_skills - resume_skills
        
        recommendations.append({
            'company': job['company'],
            'role': job['role'],
            'score': result['score'],
            'matched_skills': result['matched'],
            'skill_gaps': list(skill_gaps)[:5],  # Top 5 missing skills
            'difficulty': 'Beginner Friendly',
            'learning_time': '2-4 weeks'
        })
    
    # Sort by score (best matches first)
    recommendations.sort(key=lambda x: x['score'], reverse=True)
    return recommendations[:10]  # Return top 10

def get_skill_roadmap(current_skills):
    """Suggest learning path for freshers"""
    basic_path = ['HTML', 'CSS', 'JavaScript', 'React']
    backend_path = ['Python', 'SQL', 'REST APIs', 'Flask/Django']
    devops_path = ['Git', 'Docker', 'Linux', 'CI/CD']
    
    return {
        'frontend': basic_path,
        'backend': backend_path,
        'devops': devops_path,
        'estimated_time': '3-6 months'
    }
