var router = require('express').Router()
var controller = require('./controller')
var throttle = require("express-throttle")

var currentRequests = 0

router.use(throttle({ "rate": "5/s" }))

router.get('/', function(req, res){
    res.sendfile('index.html');
});

router.get('/sync', function (req, res) {
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
    res.set('Content-Disposition', 'attachment; filename=hyperlinks.csv' )
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
    res.set('Content-Disposition', 'attachment; filename=baby.csv' )
    res.end(data)
  })
})

module.exports = router
