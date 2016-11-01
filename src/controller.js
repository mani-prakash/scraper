var request = require('request')
var async = require('async')
var cheerio = require('cheerio')

var url = 'http://www.medium.com';

var getUrlsFromPage = function( url, callback )
{
  var urls = []
  return request(url, function(err, resp, body){
    $ = cheerio.load(body);
    links = $('a');
    $(links).each(function(i, link){
      urls.push($(link).attr('href'))
    });
    return callback(null, urls)
  });
}
//console.log($(link).text() + ':\n  ' + $(link).attr('href'));
//getUrlsFromPage(url, null)
var processRequest = function (url, callback) {

  return loadPage(url, function (err, page) {
    if (err) {
      console.log('Error reading page for URL: ' + url + ' ' + err)
      return callback(err)
    }
    return listUrls(page, callback)
  })
}

var listUrls = function(page, callback){
  var urls = getUrls(page)
  console.log('controller')
  console.log(urls)
  var listUrls = [];
  for(var url in urls) {
    listUrls.push(url)  
  }
  return callback(null, url)
}

var processRequestAsyncly = function (url, callback) {
  return async.waterfall([
    function (cb) {
      return loadPage(url, cb)
    },
    function (page, cb) {
      return pageToCsv(page, cb)
    }
  ], callback)
}

var pageToCsv = function (page, callback) {
  var urls = getUrls(page)
  var csv = 'urls,occurrence count\n'
  for(var url in urls) {
    csv += url+','+urls[url]+'\n'
  }
  return callback(null, csv)
}

var getUrls = function (page) {
  var urls = {};
  var segments = page.split('\"href\":\"')
  console.log('length')
  console.log(segments.length)
  for(var i = 1 ; i < segments.length ; i++) {
    var url = segments[i].split('\"')[0]
    if(!urls[url]){
      urls[url] = 0
    }
    urls[url]++
  }
  console.log('get urls')
  console.log(urls)
  return urls
}

var loadPage = function (url, callback) {
  var options = {}
  options.url = url
  options.method = 'GET'
  options.json = true

  return request(options, function (err, res, body) {
    if (err) {
      console.log('Error retrieving fb feed for ' + pageId + ' ' + err)
      return callback(err)
    }
    if (res.statusCode !== 200) {
      console.log('StatusCode: ' + res.statusCode + ' received for URL: ' + url)
      return callback(new Error('Status code received: ' + res.statusCode))
    }
    return callback(null, body)
  })
}

module.exports = {
  processRequest: getUrlsFromPage,
  processRequestAsyncly: processRequestAsyncly
}

//processRequest