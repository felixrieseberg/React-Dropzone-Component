const express = require('express')
const app = express()

app.set('port', process.env.PORT || 3000)
app.use(express.static('../'))

// Call the multerImpl and pass in app state to it
require('./src-server/multerImpl')(app)

module.exports = app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'))
  console.log('Visit http://localhost:' + app.get('port') + '/example/ to check out the upload example')
})
