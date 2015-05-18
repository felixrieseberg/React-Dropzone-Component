var express = require('express'),
    path = require('path'),
    multer = require('multer'),
    bodyParser = require('body-parser'),
    app = module.exports = express();
    app.set('port', process.env.PORT || 3000);


app.use(express.static('./'));

app.post('/uploadHandler', function (req, res) {
    res.sendStatus(200);
});

module.exports = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});