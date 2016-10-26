var router = require('express').Router()
var controller = require('./controller')

var currentRequests = 0

router.get('/', function(req, res){
    res.sendfile('index.html');
});

router.get('/scrap', function (req, res) {
  var url = req.query.url
  if(!url) {
    return res.status(400).send('Invalid URL, I didn\'t expect this from you :(')
  }
  if(currentRequests >= 5) {
    return res.status(503).send('Servers are working very hard but a server can only do so much, Pls try after a while')
  }
  currentRequests++
  return controller.processRequest(url,function (err, data) {
    currentRequests--
    if (err) {
      return res.status(500).send(err)
    }
    res.set('Content-Type', 'application/octet-stream')
    res.set('Content-Disposition', 'attachment; filename=Hyperlinks.csv' )
    res.end(data)
  })
})
router.get('/async', function (req, res) {
  var url = req.query.url
  if(!url) {
    return res.status(400).send('Invalid URL, I didn\'t expect this from you :(')
  }
  if(currentRequests >= 5) {
    return res.status(503).send('Servers are working very hard but a server can only do so much, Pls try after a while')
  }
  currentRequests++
  return controller.processRequestAsyncly(url,function (err, data) {
    currentRequests--
    if (err) {
      return res.status(500).send(err)
    }
    res.set('Content-Type', 'application/octet-stream')
    res.set('Content-Disposition', 'attachment; filename=asyncHyperlinks.csv' )
    res.end(data)
  })
})

module.exports = router
