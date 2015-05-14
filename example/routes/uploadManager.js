function UploadManager(properties){
       var self = this;

       self.properties = properties;

       self.initUploadRouter = function(router){
          router.get('/upload', function(req, res) {
            uploader.get(req, res, function(obj) {
              res.send(JSON.stringify(obj));
            });
          });
         
          router.post('/upload', function(req, res) {
            uploader.post(req, res, function(obj) {
              res.send(JSON.stringify(obj));
            });
          });
         
          router.delete('/uploaded/files/:name', function(req, res) {
            uploader.delete(req, res, function(obj) {
              res.send(JSON.stringify(obj));
            });
          });
       
       return router;
     }
}

var props = {
            tmpDir: __dirname + '/../uploaded/tmp',
            uploadDir: __dirname + '/../uploaded/files',
            uploadUrl: '/uploaded/files/',
            storage: {
              type: 'local'
            }
       };

var uploadMgr = new UploadManager(props);
var uploader = require('blueimp-file-upload-expressjs')(uploadMgr.properties);

module.exports = uploadMgr;