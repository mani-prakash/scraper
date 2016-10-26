var request = require('request')
var async = require('async')

var processRequest = function (url, callback) {

  return loadPage(url, function (err, page) {
    if (err) {
      console.log('Error reading page for URL: ' + url + ' ' + err)
      return callback(err)
    }
    return pageToCsv(page, callback)
  })
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
  for(var i = 1 ; i < segments.length ; i++) {
    var url = segments[i].split('\"')[0]
    if(!urls[url]){
      urls[url] = 0
    }
    urls[url]++
  }
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
  processRequest: processRequest,
  processRequestAsyncly: processRequestAsyncly
}