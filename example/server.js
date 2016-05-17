var express     = require('express'),
    path        = require('path'),
    multer      = require('multer'),
    bodyParser  = require('body-parser'),
    MulterImpl  = require('./src-server/multerImpl'),
    app         = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('../'));
require('./src-server/multerImpl')(app); //Call the multerImpl and pass in app state to it


module.exports = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
    console.log('Visit http://localhost:' + app.get('port') + '/example/ to check out the upload example');
});
