# Scraper  
There are 4 js files in the project  

utils.js provides functions to perform io tasks  
Queue.js is a implementation of queue, which is used maintain the unscrapped urls.  
scraper.js contains the code to crawl the webpage without using async library  
asyncScraper.js contains the code to crawl the webpage using async library  

## Throttle  
A varaible is used maintain the no of requests made at present, if this variable is more than 5 additional requests will be halted  


## async library  


## Run Commands

nodejs scarper.js crawls the webpage and saves the urls to a urls.csv file 

nodejs asyncScarper.js crawls the webpage using async library and saves the urls to a urls.csv file 

## Control Flow

When a queue is updated initWorkers function will be called which will activates worker function 5 times  

Worker function will check a requests count at present, if its less than 5 then a request will be made to a scrap a url  

 


