var request = require('request')
var cheerio = require('cheerio')
var fs = require('fs')
var writeFile = function(name,data)
{
    fs.writeFile(name, data,  function(err) {
    	if (err)
    		return console.error(err)
    	console.log("Data written successfully!")
	})
}

var getUrlsFromPage = function( url, callback )
{
  var urls = []
  return request(url, function(err, resp, body){
    $ = cheerio.load(body)
    links = $('a')
    $(links).each(function(i, link){
      urls.push($(link).attr('href'))
    })
    return callback(null, urls)
  })
}

module.exports = {getUrlsFromPage : getUrlsFromPage,
                  writeFile : writeFile
                  }