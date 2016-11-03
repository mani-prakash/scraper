var Queue = require('./src/Queue.js')
var utils = require('./src/utils.js')
var foo = (function(url, crawlDepth, callback) {
  var queue = new Queue()
  queue.push({ url : url, depth : 1 })
  var visitedUrls = { }
  visitedUrls[url] = true
  var count = 1
  var initWorkers = function (callback) {
    count--
    var ret = 0
    var done = function(err) {
      ret--
      if(ret == 0) {
        return callback()
      }
    }
    function worker(cb) {
      ret++
      if (count < 5 && queue.length > 0) {
        count++
        var urlObject = queue.shift() 
        console.log(urlObject)
        bar(urlObject.url, urlObject.depth, cb)
      } 
      else
        return cb(null)
    }
    worker(done)
    worker(done)
    worker(done)
    worker(done)
    worker(done)
  }
  var crawl = function (url, depth, callback) {
    return utils.getUrlsFromPage(url, function(err, urls){
      pushUrls(urls, depth)
      return initWorkers(callback)
    })
  }
  var pushUrls = function(urls, depth){
    var list = filterUrls(urls, depth)
    for(var i in list)
    {
      queue.push(list[i])
    }
  }
  var filterUrls = function(urlList, depth){
    var filteredUrls = []
    for( var i = 0; i < urlList.length ; i++ )
    {
      var url = urlList[i]
      if( url && !visitedUrls[url] && url.indexOf('medium.com') != -1 && url.indexOf('http') === 0 )
      {
        visitedUrls[url] = true
        filteredUrls.push( {'url' : url , 'depth' : depth + 1 } )
      }
    }
    return ( depth < crawlDepth ) ? filteredUrls : []
  }
  return initWorkers(function (err) {
    return callback(null, Object.keys(visitedUrls).join())
  })
})('http://www.medium.com', 2, function(err, data){
    utils.writeFile('urls.csv', data)
})