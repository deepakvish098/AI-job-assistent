from selenium import webdriver
from selenium.webdriver.common.by import By
import time

def fill_form():
    driver = webdriver.Chrome()
    driver.get('https://www.techlistic.com/p/selenium-practice-form.html')
    time.sleep(2)

    first_name = driver.find_element(By.NAME, 'firstname')
    first_name.send_keys('Deepak')

    last_name = driver.find_element(By.NAME, 'lastname')
    last_name.send_keys('Vishwakarma')

    time.sleep(3)
    driver.quit()
