# gulp-cloudfiles

rackspace cloudfiles plugin for [gulp](https://github.com/wearefractal/gulp) based off of [gulp-s3](https://github.com/nkostelnik/gulp-s3) by nkostelnik


## Usage

First, install `gulp-cloudfiles` as a development dependency:


Setup your rackspace.json file
```javascript
{
    "provider": "rackspace",
    "username": "YOUR-RACKSPACE-USERNAME",
    "apiKey": "YOUR-RACKSPACE-APIKEY",
    "region": "IAD"
}
```

Then, use it in your `gulpfile.js`:
```javascript
var fs = require('fs')
var cloudfiles = require("gulp-cloudfiles");

var rackspace = JSON.parse(fs.readFileSync('./rackspace.json'));
var options = { 
	container: "MY-CONTAINER", //cloudfiles continer, similar to s3 buckets
	delay: 1000, // optional delay each request by x milliseconds
	headers: {}, // optional additional headers
	uploadPath: "" //optional upload path (uses the container root by default)
} 

gulp.src('./dist/**', {read: false})
    .pipe(cloudfiles(rackspace, options));
```
  
## License
  
[MIT License](http://en.wikipedia.org/wiki/MIT_License)

