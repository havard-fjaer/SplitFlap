var gulp = require('gulp');
var GulpSSH = require('gulp-ssh');

var config = {
    host: '192.168.1.10',
    port: 22,
    username: 'pi',
    password: 'raspberry' // Please don't hack me :)
};

var gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config
});

var file = '/home/pi/Source/SplitFlap/SplitFlap.js';

gulp.task('split-flap-upload-to-rpi', function () {
    gulp.watch('src/**/*.js', function(){
        console.log('Upload');
        return gulp.src('src/SplitFlap.js')
            .pipe(gulpSSH.sftp('write', file))


    });

});

gulp.task('split-flap-run-on-rpi', function () {
    var command = "node " + file;
    return gulpSSH.shell([command], {filePath: 'run-split-flap-on-rpi.log'})
        .pipe(gulp.dest('logs'));
});

