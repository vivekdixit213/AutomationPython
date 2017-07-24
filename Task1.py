import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By


BASE_URL = "https://google.com"

driver = webdriver.Chrome("/home/vivek/Documents/Automation/Python/chromedriver")

driver.maximize_window()

driver.get(BASE_URL)
serach = driver.find_element_by_id("lst-ib")
serach.send_keys("Datalicious")
serach.send_keys(Keys.ENTER)
time.sleep(5)
content = driver.find_elements_by_xpath('//*[@class="r"]/a')
content[0].click()