# gulp-highwinds
[![NPM](https://nodei.co/npm/gulp-highwinds.png)](https://npmjs.org/package/gulp-highwinds)

Highwinds plugin for [gulp](https://github.com/wearefractal/gulp) based on [gulp-cloudfiles](https://github.com/pieceoftoast/gulp-cloudfiles).

### Install
	npm install --save-dev gulp-highwinds

### Config
Setup a `highwinds.json` file or load these through another config file or env vars.

```javascript
{
  "username": "HIGHWINDS-USERNAME",
  "password": "HIGHWINDS-PASSWORD",
  "authUrl": "HIGHWINDS-AUTH-URL",
  "container": "HIGHWINDS-CONTAINER"
}
```
### Usage

```javascript
var fs = require('fs')
var gulp = require('gulp');
var openstack = require("gulp-highwinds");
var highwinds = JSON.parse(fs.readFileSync('./rackspace.json'));

var options = {}

gulp.task('highwinds', function() {
  return gulp.src('./dist/**', {read: false})
    .pipe(openstack(highwinds, options));
});
```

### Options

- `headers`
	- Headers to set to each file uploaded
	- Type: object
	- Default: `{}`
- `uploadPath`
	- Type: String
	- Default: `""`

  
### License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

