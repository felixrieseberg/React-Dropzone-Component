var express = require('express');
var path = require('path'),
    multer = require('multer'),
    bodyParser = require('body-parser'),
    MulterImpl = require('./src/multerImpl'),
    app = module.exports = express();
    app.set('port', process.env.PORT || 3000);

    setTimeout(function() {
      module.exports = app.listen(app.get('port'), function() {
        console.log("Express server listening on port " + app.get('port'));
      });
    }, 50);

    app.use(express.static('./'));
    //app.use(multer({dest: 'uploads'})); // dest is not necessary if you are happy with the default: /tmp
    app.use(new MulterImpl({}).init());

    app.post('/uploadHandler', function (req, res) {
        var files = req.files.file;
        if (Array.isArray(files)) {
            // response with multiple files (old form may send multiple files)
            console.log("Got " + files.length + " files");
        }
        else {
            // dropzone will send multiple requests per default
            console.log("Got one file");
        }
        res.sendStatus(200);
    });