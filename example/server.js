var express     = require('express'),
    path        = require('path'),
    multer      = require('multer'),
    bodyParser  = require('body-parser'),
    MulterImpl  = require('./src-server/multerImpl'),
    app         = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('../'));

//Call the multerImpl and pass in app state to it
require('./src-server/multerImpl')(app); 

module.exports = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
  console.log('Visit http://localhost:' + app.get('port') + '/example/ to check out the upload example');
});
