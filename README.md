# Scraper  
This project is already deployed on heroku  
To access use https://scraperdev.herokuapp.com  

## Throttle  

I've thought of using library like express-throttle, but I've kept it simple by using a variable currentRequests  

## async library  

I've written two api call once which uses async library and other which doesn't uses async library  
async library is used to call multiple async functions.  

Most of the code was written using callbacks, so the functionality is mostly asynchronous.   
 

### request  

Both api calls have a request parameter which is url its value being the url of the web page the user wants to scrap.  

## response  

The response is a csv file, which contains all the hyperlinks and their occurrence count in the scrapped webpage.  

