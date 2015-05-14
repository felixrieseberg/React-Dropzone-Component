var UploadMgr = function(config){

       this.initUploadRouter = function(router){
          var multer  = require('multer');
          var defaultDest = './uploads/';
          var uploadDirectory = !config.dest ? defaultDest : config.dest;

          router.use(function middleware1(req, res, next){
            multer({ dest: uploadDirectory,
                rename: function (fieldname, filename) {
                  return filename+Date.now();
                },
                onFileUploadStart: function (file) {
                  console.log(file.originalname + ' is starting ...');
                },
                onFileUploadComplete: function (file) {
                   console.log(file.fieldname + ' uploaded to  ' + file.path);
                }
            })
          });

          router.get('/hello',function testRoute(req, res, next){
              res.end("Hello:)");
          });

          return;
       }
};

module.exports = UploadMgr;