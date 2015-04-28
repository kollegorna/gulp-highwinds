'use strict';

var fs = require('fs');
var fsutil = require('fs-utils');
var gutil = require('gulp-util');
var es = require('event-stream');
var pkgcloud = require('pkgcloud');


module.exports = function (rackspace, options) {
	var options = options || {};
	var container = rackspace.container || options.container

	if (!rackspace) { gutil.log(gutil.colors.red('[FAILED]', "No rackspace configuration")); return false; }
	if (!container) { gutil.log(gutil.colors.red('[FAILED]', "No container specified")); return false; }
	if (!options.delay) { options.delay = 0; }	

	var client = pkgcloud.storage.createClient({
		provider: "rackspace",
	    username: rackspace.username,
	    apiKey: rackspace.apiKey,
	    region: rackspace.region
	});
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

    	setTimeout(function() {
			client.upload({
				container: container, 
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

