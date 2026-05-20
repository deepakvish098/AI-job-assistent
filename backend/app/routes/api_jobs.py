import requests

URL = "https://remotive.com/api/remote-jobs"

def fetch_jobs():
    response = requests.get(URL)
    return response.json()

    jobs = []
    for job in data['jobs'][:20]:
        jobs.append({
            'title': job['title'],
            'company': job['company_name'],
            'location': job['candidate_required_location'],
            'description': job['description']
        })

    return jobs
