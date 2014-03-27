# gulp-cloudfiles

rackspace cloudfiles plugin for [gulp](https://github.com/wearefractal/gulp) based off of [gulp-s3](https://github.com/nkostelnik/gulp-s3) by [nkostelnik](https://github.com/nkostelnik)


## Usage

First, install `gulp-cloudfiles` as a development dependency:


Setup your rackspace.json file
```javascript
{
    "username": "YOUR-RACKSPACE-USERNAME",
    "apiKey": "YOUR-RACKSPACE-APIKEY",
    "region": "YOUR-RACKSPACE-REGION"
    "container": "YOUR-RACKSPACE-CONTAINER" // similar to s3 buckets
}
```

Then, use it in your gulpfile:
```javascript
var fs = require('fs')
var cloudfiles = require("gulp-cloudfiles");
var rackspace = JSON.parse(fs.readFileSync('./rackspace.json'));

var options = { 
	delay: 1000, // optional delay each request by x milliseconds, default is 0
	headers: {}, // optional additional headers
	uploadPath: "" //optional upload path (uses the container root by default)
} 

gulp.src('./dist/**', {read: false})
    .pipe(cloudfiles(rackspace, options));
```
  
## License
  
[MIT License](http://en.wikipedia.org/wiki/MIT_License)

