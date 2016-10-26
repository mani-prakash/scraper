# Scraper  
This project is already deployed on heroku  
To access use https://scraperdev.herokuapp.com  

## Throttle  

I've thought of using a library like express-throttle, but I've kept it simple by using a variable currentRequests.  

When a request comes in a global variable currentRequests is incremented, once the request is processed it will be decremented. So when the next request comes in if currentRequests is greater than 5 a status will be send as a response indicating that the server is overloaded.  


## async library  

I've written two api call one which uses async library and other which doesn't uses async library  

Most of the code was written using callbacks, so the functionality is mostly asynchronous.   
 
## api's

There are two api calls  
  /scrap --  uses normal callbacks to scrap the webpage and send the response.   
  /async --  uses async library to implement the functionality.    


### request  

Both api calls have a request parameter which is url its value being the url of the web page the user wants to scrap.  

### response  

The response is a csv file, which contains all the hyperlinks and their occurrence count in the scrapped webpage.  

## webpage  

I've also written a html page through which user can enter a url and scrap its webpage by using async api or normal scrap api call.  
