var express = require('express')
var app = express()

app.get('/ping', function (req, res) {
  return res.send('PONG')
})

app.use(require('./src/router'))
app.use(express.static('public'))

app.set('port', (process.env.PORT || 3030))

var server = app.listen(app.get('port'), function () {
  console.log('extension-manager listening on port: ' + app.get('port'))
  return
})
server.timeout = 30000

module.exports = app
