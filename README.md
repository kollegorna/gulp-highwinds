# gulp-cloudfiles
[![NPM](https://nodei.co/npm/gulp-cloudfiles.png)](https://npmjs.org/package/gulp-cloudfiles)

rackspace cloudfiles plugin for [gulp](https://github.com/wearefractal/gulp) based off of [gulp-s3](https://github.com/nkostelnik/gulp-s3) by [nkostelnik](https://github.com/)

### Install
	npm install --save-dev gulp-cloudfiles

### Config
Setup a `rackspace.json` file or load these through another config file or env vars.

```javascript
{
    "username": "RACKSPACE-USERNAME",
    "apiKey": "RACKSPACE-APIKEY",
    "region": "RACKSPACE-REGION"
    "container": "RACKSPACE-CONTAINER"
}
```
### Usage

```javascript
var fs = require('fs')
var gulp = require('gulp');
var cloudfiles = require("gulp-cloudfiles");
var rackspace = JSON.parse(fs.readFileSync('./rackspace.json'));

var options = {}

gulp.task('cloudfiles', function() {
  return gulp.src('./dist/**', {read: false})
    .pipe(cloudfiles(rackspace, options));
});
```

### Options

- `delay`
	- Delay in ms to wait after each file upload.
	- Type: Number
	- Default: `0`
- `headers`
	- Headers to set to each file uploaded
	- Type: object
	- Default: `{}`
- `uploadPath`
	- Type: String
	- Default: `""`

  
### License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

