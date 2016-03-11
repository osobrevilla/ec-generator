var gulp = require('gulp');
var reporter = require('frontend-reporter');

gulp.task('report', function(){
    return reporter(__dirname + '/report.json');
});
