var gulp = require('gulp');
var GulpSSH = require('gulp-ssh');
var GulpSFTP = require('gulp-sftp');

// Path
var buildPath = 'src/**/*.js';
var basePath = '/home/pi/Source/SplitFlap/';
var mainProgram = basePath + 'SplitFlap.js';

// SSH
var sshConfig = {
    host: '192.168.1.10',
    port: 22,
    username: 'pi',
    password: 'raspberry' // Please don't hack me :)
};

var gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: sshConfig
});

// SFTP
var sftpConfig = {
    host: sshConfig.host,
    user: sshConfig.username,
    pass: sshConfig.password,
    remotePath: basePath
};


gulp.task('split-flap-upload-to-rpi', function () {
    process.stdout.write('Monitoring ' + buildPath + '\n');
    gulp.watch(buildPath, function () {
        return gulp.src([buildPath])
            .pipe(GulpSFTP(sftpConfig));
    });
});

gulp.task('split-flap-run-on-rpi', function () {
    return gulpSSH.shell("node " + mainProgram, {autoExit: false})
        .on('ssh2Data', function (chunk) {
            process.stdout.write(chunk);
        });
});

/*
gulp.task('split-flap-upload-to-rpi2', function () {
    process.stdout.write('Monitoring ' + buildPath + '\n')
    gulp.watch(buildPath)
        .on("change", function(file) {
            process.stdout.write(file.path + '\n');
            function extracted() {
                var dest = gulpSSH.dest(basePath);
                return dest;
            }

            gulp.src('src/SplitFlap/')
                .pipe(extracted());
        });
});
*/

