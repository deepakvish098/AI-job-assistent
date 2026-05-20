import requests

def fetch_jobs():
    url = "https://remoteok.com/api"
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers)
    data = response.json()

    jobs = []
    for job in data[1:]:
        jobs.append({
            'company': job.get('company', ''),
            'role': job.get('position', ''),
            'description': job.get('description', '')
        })
    return jobs
