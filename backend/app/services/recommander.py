from app.services.matcher import match_resume

def recommand_jobs(resume_text, jobs):
    recommendations = []
    for job in jobs:
        result = match_resume(resume_text, job['description'])
        recommendations.append({
            'company': job['company'],
            'role': job['role'],
            'score': result['score']
        })
    recommendations.sort(key=lambda x: x['score'], reverse=True)
    return recommendations
