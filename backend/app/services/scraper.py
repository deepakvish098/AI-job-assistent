import requests
from bs4 import BeautifulSoup

URL = "https://realpython.github.io/fake-jobs/"

def scrape_jobs():
    response = requests.get(URL)
    soup = BeautifulSoup(response.text, 'html.parser')

    jobs = []
    cards = soup.find_all('div', class_='card-content')
    for card in cards:
        title = card.find('h2', class_='title')
        company = card.find('h3', class_='company')
        location = card.find('p', class_='location')
        if title and company and location:
            jobs.append({
                'title': title.text.strip(),
                'company': company.text.strip(),
                'location': location.text.strip(),
                'description': ''
            })
    return jobs
