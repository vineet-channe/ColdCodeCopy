from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from datetime import datetime
import time
import json

secrets_file = 'secrets.json'
with open(secrets_file) as f:
    secrets = json.load(f)

mongoUsername = secrets['MongoDB_username']
mongoPassword = secrets["MongoDB_password"]
clusterURL = secrets['Cluster_url']

uri = f"mongodb+srv://{mongoUsername}:{mongoPassword}@{clusterURL}/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, server_api=ServerApi('1'))
db = client['scholarships_db']
collection = db['scholarships']

def scrape_data():
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    service = Service(executable_path='C:/Users/admin/OneDrive/Desktop/chromedriver-win64/chromedriver.exe')
    driver = webdriver.Chrome(service=service, options=chrome_options)

    try:
        driver.get('https://www.buddy4study.com/scholarships')
        elements = WebDriverWait(driver, 120).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, 
                                            '.Listing_categoriesBox__CiGvQ'))
        )

        print(f"Found {len(elements)} scholarships")

        scraped_data = []

        for element in elements:
            try:
                date_tag = element.find_element(By.CSS_SELECTOR, '.Listing_calendarDate__WCgKV p:nth-of-type(2)')
                if date_tag:
                    date = date_tag.text

                    h4_tag = element.find_element(By.CSS_SELECTOR, 'h4.Listing_scholarshipName__VLFMj')
                    scholarship_name = h4_tag.text
                    
                    award_containers = element.find_elements(By.CSS_SELECTOR, 'div.Listing_awardCont__qnjQK')

                    if len(award_containers) > 1:  # Ensure there are at least 2 containers
                        el_tag = award_containers[1].find_element(By.CSS_SELECTOR, '.Listing_rightAward__DxMQV')
                        el_tag_span = el_tag.find_element(By.TAG_NAME, 'span')
                        eligibility = el_tag_span.text

                    scholarship = {
                        'name': scholarship_name,
                        'deadline': date,
                        'eligibility': eligibility,
                    }
                    scraped_data.append(scholarship)
                else:
                    continue
                

            except NoSuchElementException:
                print("Invalid element. Continuing...")

        return scraped_data
    
    finally:
        driver.quit()

def record_exists(scholarship_name):
    return collection.count_documents({'name': scholarship_name}) > 0

def update_mongo_db():
    data = scrape_data()
    # print("Scraped Data:")
    # print(data)

    if data:
        for scholarship in data:
            if not record_exists(scholarship['name']):
                collection.insert_one(scholarship)
                print(f"Inserted new scholarship: {scholarship['name']}")
            else:
                print(f"Scholarship already exists: {scholarship['name']}")
    else:
        print("No data to insert.")

if __name__ == '__main__':
    while True:
        print(f"Running at {datetime.now()}")
        update_mongo_db()
        print("Script finished. Sleeping for 24 hours.")
        time.sleep(86400)  # Will run once everyday
    
    # update_mongo_db()
