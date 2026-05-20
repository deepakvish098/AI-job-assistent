from app.services.nlp_engine import preprocess_text

skills = [
    'python', 'flask', 'sql', 'react', 'docker', 'kubernetes',
    'html', 'css', 'javascript', 'node.js', 'mongodb', 'postgresql',
    'aws', 'gcp', 'azure', 'jenkins', 'terraform', 'ansible',
    'git', 'github', 'gitlab', 'bitbucket', 'slack', 'jira',
    'confluence', 'zoom', 'teams', 'google meet', 'microsoft teams',
]

def extract_skills(text):
    found_skills = []
    for skill in skills:
        if skill in text.lower():
            found_skills.append(skill)
    return set(found_skills)

def match_resume(resume_text, job_text):
    resume_words = set(preprocess_text(resume_text))
    job_words = set(preprocess_text(job_text))

    if not job_words:
        return {'score': 0.0, 'matched': [], 'match_percentage': 0.0}

    matches = resume_words.intersection(job_words)
    match_percentage = (len(matches) / len(job_words)) * 100
    score = min(
        len(matches) / len(job_words) * 0.7 +
        (len(resume_words) / len(job_words)) * 0.3,
        1.0
    )
    return {
        'score': score,
        'matched': list(matches),
        'match_percentage': match_percentage
    }
