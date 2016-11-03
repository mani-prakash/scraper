# Scraper  
There are 4 js files in the project  

utils.js provides functions to perform io tasks  
Queue.js is a implementation of queue, which is used maintain the unscrapped urls.  
scraper.js contains the code to crawl the webpage without using async library  
asyncScraper.js contains the code to crawl the webpage using async library  

## Throttle  
A varaible is used maintain the no of requests made at present, if this variable is more than 5 then additional requests will be halted  


## Run Commands

nodejs scarper.js 3  
crawls the webpage and saves the urls to a urls.csv file  

nodejs asyncScarper.js  3 
crawls the webpage using async library and saves the urls to a urls.csv file 

The argument passed in the cmds is the depth the crawler should go, if its not mentioned then the default value is 2  

## Control Flow

When a queue is updated initWorkers function will be called which will activates worker function 5 times  

Worker function will check a requests count at present, if its less than 5 then a request will be made to scrap a url from the queue   

The workers will be initiated diffrently in asyncScraper and scraper  

async.parllel is used to call worker in asyncScraper   

callback mechanism is used to call worker in scraper  




