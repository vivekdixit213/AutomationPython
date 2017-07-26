import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import csv

BASE_URL = "https://google.com"
search_text = "Datalicious"
driver = webdriver.Chrome("/home/vivek/Documents/Automation/Python/chromedriver")
driver.maximize_window()
driver.get(BASE_URL)
serach = driver.find_element_by_id("lst-ib")
serach.send_keys(search_text)
serach.send_keys(Keys.ENTER)
time.sleep(5)
content = driver.find_elements_by_xpath('//*[@class="r"]/a')
# print content[0].text, content[0].get_attribute("href")
url = content[0].get_attribute("href")
content[0].click()
from subprocess import check_output
import json

out = check_output(['phantomjs', '--ssl-protocol=any',	
					'--web-security=false', 'getResource.js', url])
data = json.loads(out)
fout = open("output.csv", "w")
fout.write("Url"+"\n")
fout.write("\n".join(data)+"\n")
fout.close()
