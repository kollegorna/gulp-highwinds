'use strict';

var fs = require('fs');
var fsutil = require('fs-utils');
var gutil = require('gulp-util');
var es = require('event-stream');
var pkgcloud = require('pkgcloud');


module.exports = function (highwinds, options) {
	var options = options || {};
	var container = highwinds.container || options.container

	if (!highwinds) { gutil.log(gutil.colors.red('[FAILED]', "No Highwinds configuration")); return false; }
	if (!container) { gutil.log(gutil.colors.red('[FAILED]', "No container specified")); return false; }
	if (!options.delay) { options.delay = 0; }	

	var client = pkgcloud.storage.createClient({
	  provider: "openstack",
	  username: highwinds.username,
	  password: highwinds.password,
    authUrl: highwinds.authUrl,
    version: 1
	});
/*  client.on('log::*', function(message, object) {
    if (object) {
      console.log(this.event.split('::')[1] + ' ' + message);
      console.dir(object);
    }
    else {
      console.log(this.event.split('::')[1]  + ' ' + message);
    }
  });
 */
	var waitTime = 0;

  return es.mapSync(function (file, cb) {
		var isFile = fs.lstatSync(file.path).isFile();
		if (!isFile) { return false; }

		var uploadPath = file.path.replace(file.base, fsutil.addSlash(options.uploadPath || '')).replace(/\\/g,'/');
		var headers = { 'x-amz-acl': 'public-read' };
		if (options.headers) {
			for (var key in options.headers) {
				headers[key] = options.headers[key];
			}
		}
    var readStream = fs.createReadStream(file.path);
    
		var writeStream = client.upload({
				container: container, 
				remote: uploadPath,
				headers: headers
		});
    writeStream.on('error', function(err) {
		  gutil.log(gutil.colors.red('[FAILED]', err.message));
    });
		writeStream.on('success', function(file) {
      gutil.log(gutil.colors.green('[SUCCESS]', file.name));
  	});
    readStream.pipe(writeStream);
  });
};

