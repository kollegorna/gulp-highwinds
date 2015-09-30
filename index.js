'use strict';

var fs = require('fs');
var fsutil = require('fs-utils');
var gutil = require('gulp-util');
var es = require('event-stream');
var pkgcloud = require('pkgcloud');
var PluginError = gutil.PluginError;
var PLUGIN = 'gulp-highwinds';

module.exports = function (highwinds, options) {
	var options = options || {};
	var container = highwinds.container || options.container

	if (!highwinds) { new gutil.PluginError(TAG, "No Highwinds configuration"); return false; }
	if (!container) { new gutil.PluginError(TAG, "No container specified"); return false; }
	if (!options.delay) { options.delay = 0; }	

	var client = pkgcloud.storage.createClient({
	  provider: "openstack",
	  username: highwinds.username,
	  password: highwinds.password,
    authUrl: highwinds.authUrl,
    version: 1
	});

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
      new gutil.PluginError(TAG, err);
    });
		writeStream.on('success', function(file) {
      gutil.log(TAG, gutil.colors.green('[SUCCESS]', file.name));
  	});
    readStream.pipe(writeStream);
  });
};

