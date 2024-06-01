from selenium import webdriver
from selenium.webdriver.common.by import By

# Initialize the Chrome driver
driver = webdriver.Chrome()

# Navigate to the Twitter URL
url = "https://twitter.com/elonmusk"
driver.get(url)

# Extract tweets
tweets = driver.find_elements(By.CSS_SELECTOR, '[data-testid="tweet"]')
for tweet in tweets:
    tweet_text = tweet.find_element(
        By.CSS_SELECTOR, 'div[data-testid="tweetText"]'
    ).text
    print(tweet_text)

# Close the browser
driver.quit()
