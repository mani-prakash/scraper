var Queue = require('./src/Queue.js')
var controller = require('./src/controller.js')
var queue = new Queue()
var base_url = 'http://www.medium.com'
queue.push(base_url)
var crawlers = []
var urls = {}
urls[base_url] = true
function crawler(callback){
	var pushUrls = callback
	var isBusy = false
	var response = function(err, list)
	{
		isBusy = false
		pushUrls(list)
	}
	var parseLink = function(url)
	{
		if(isBusy){	return false }
		isBusy = true
		controller.processRequest( url, response)
		return true
	}
	this.parseUrl = parseLink
} 
function CrawlerHandler() {
	var crawlers = []
	var pushUrls = function(urlsList){
		for( var i = 0; i < urlsList.length; i++ )
		{
			if(!urls[urlsList[i]])
			{
				queue.push(urlsList[i])
				urls[urlsList[i]] = true
			}
		}
		activateCrawlers()
	}
	var activateCrawlers = function(){
		var url = queue.front()
		for(var i = 0; i < crawlers.length && queue.length > 0; i++ )
		{
			var isFree = crawlers[i].parseUrl(url)
			if(isFree){
				queue.shift()
				url = queue.front()
			}
		}
	}
	crawlers.push(new crawler(pushUrls))
	crawlers.push(new crawler(pushUrls))
	crawlers.push(new crawler(pushUrls))
	crawlers.push(new crawler(pushUrls))
	crawlers.push(new crawler(pushUrls))
	console.log('activating crawler')
	activateCrawlers()
}
CrawlerHandler()

