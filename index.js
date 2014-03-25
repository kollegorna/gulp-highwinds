'use strict';

var es = require('event-stream');
var fs = require('fs');
var pkgcloud = require('pkgcloud');
var gutil = require('gulp-util');


module.exports = function (rackspace, options) {
  options = options || {};
  if (!options.delay) { options.delay = 0; }

  var client = pkgcloud.storage.createClient(rackspace);
  var waitTime = 0;

  return es.mapSync(function (file, cb) {
      var isFile = fs.lstatSync(file.path).isFile();
      if (!isFile) { return false; }

      var uploadPath = file.path.replace(file.base, options.uploadPath || '');
      var headers = { 'x-amz-acl': 'public-read' };
      if (options.headers) {
          for (var key in options.headers) {
              headers[key] = options.headers[key];
          }
      }

      setTimeout(function() {

        client.upload({
          container: options.container, 
          //TODO: haldle case with no specified container.
          remote: uploadPath,
          local: file.path,
          headers: headers
        }, function(err, success,res) {
            if (err || (res.statusCode !== 200 && res.statusCode!==201)) {
                gutil.log(gutil.colors.red('[FAILED]', err||res.statusCode, file.path));
                
            } else {
                gutil.log(gutil.colors.green('[SUCCESS]', file.path));
                res.resume();
            }
        });

      }, waitTime);
      waitTime += options.delay;
  });
};

