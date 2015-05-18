function MulterImpl(config) {
    var defaultDest = './uploads/';

    this.init = function () {
        var multer = require('multer');
        var uploadDir = !config.uplodaDir ? defaultDest : config.uplodaDir;

        var options = {
            dest: uploadDir,
            rename: function (fieldname, filename) {
                return filename + Date.now();
            },
            onFileUploadStart: function (file) {
                console.log(file.originalname + ' is starting ...');
            },
            onFileUploadComplete: function (file) {
                console.log(file.fieldname + ' uploaded to  ' + file.path);
            }
        };

        return multer(options);
    }
}

module.exports = MulterImpl;