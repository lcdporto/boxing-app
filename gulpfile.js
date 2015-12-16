var gulp = require('gulp');
var webserver = require('gulp-webserver');
var inject = require('gulp-inject');
var util = require('gulp-util');
var debug = require('gulp-debug'); // https://www.npmjs.com/package/gulp-debug
var jshint = require('gulp-jshint'); // https://github.com/spalger/gulp-jshint
var jscs = require('gulp-jscs'); // https://github.com/jscs-dev/gulp-jscs
var yargs = require('yargs').argv; // https://www.npmjs.com/package/yargs
var gulpif = require('gulp-if'); // https://github.com/robrich/gulp-if
var annotate = require('gulp-ng-annotate'); // https://www.npmjs.com/package/gulp-ng-annotate
var filter = require('gulp-filter'); // https://www.npmjs.com/package/gulp-filter
var uglify = require('gulp-uglify'); // https://github.com/terinjokes/gulp-uglify
var useref = require('gulp-useref'); // https://www.npmjs.com/package/gulp-useref
var minify = require('gulp-minify-css'); // https://www.npmjs.com/package/gulp-minify-css
var imagemin = require('gulp-imagemin'); // https://github.com/sindresorhus/gulp-imagemin

// global configuration object
// to centralize the configs in
// one place
var config = {
    index: 'app/index.html',
    app: 'app/',
    build: 'build/app/',
    libs: 'app/libs/',
    images: 'app/images/*.*',
    jsfiles: [
        'app/**/*.module.js',
        'app/**/*.js',
        '!app/libs/**/*'
    ],
    cssfiles: [
        'app/*.css'
    ],
    bowerjson: './bower.json',
    bowerfiles: 'app/libs/**/*'
};

// https://github.com/schickling/gulp-webserver
// http://stephenradford.me/gulp-angularjs-and-html5mode/
gulp.task('webserver', ['dev-settings'], function() {
    gulp.src(config.app)
        .pipe(webserver({
            fallback: 'index.html',
            livereload: true,
            open: true
        }));
});

/*
 *  watcher setup
 */

gulp.task('watchers', function(){
    util.log(util.colors.bgBlue('Setting Up Watchers'));
    gulp.watch(config.jsfiles.concat(config.cssfiles), ['html-inject']);
    // we could set up here a watcher for the bower files, but that means the task
    // will run twice on install, and also none on uninstall since there appears
    // to be some issues with the watch task and also with the gaze dependency
    // so we decided to go back and use bower hooks, unfortunately bower does not
    // have a postuninstall hook, so we are f... well, i've discover that it supports preuninstall
    // so we are going that route, see the .bowerrc file
    // gulp.watch(config.bowerfiles, ['bower-inject']);
});

/*
 *  Read the js and css files from the filesystem
 *  as defined in the config.files array and inject
 *  them in the index.html file using gulp inject
 *
 *  @bug when adding folders gulp might crash, at least in linux
 *  the problem seems to be with gaze, and has no easy solution
 */

gulp.task('html-inject', function() {
    // gulp util uses chalk, see reference
    // https://github.com/chalk/chalk
    util.log(util.colors.bgBlue('Custom Code HTML Inject'));
    return gulp
        .src(config.index)
        // gulp src options: https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpsrcglobs-options
        // we do not need to read the file content, all we need here are the paths
        // gulp inject options: https://github.com/klei/gulp-inject#optionsrelative
        // we want the inject to be relative to the target (index.html) and not
        // the current working dir as is the default
        .pipe(inject(gulp.src(config.jsfiles.concat(config.cssfiles), {read: false}), {relative: true}))
        .pipe(gulp.dest(config.app));
});

/*
 *  Uses Wiredep to read dependencies from bower.json file
 *  and inject them in the index.html file
 *  this task is called by the hooks defined in .bowerrc
 *  we have setup a task dependency on html-inject because
 *  on launch if we have two tasks in parallel injecting in the html
 *  on of them will override the changes made by the other
 */

gulp.task('bower-html-inject', ['html-inject'], function() {
    util.log(util.colors.bgBlue('Bower Dependencies HTML Inject'));
    var wiredep = require('wiredep').stream;

    var options = {
        bowerJson: require(config.bowerjson),
        directory: config.libs
    };

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe(gulp.dest(config.app));
});

/*
 * Lints JavaScript code and enforces coding style. Rules are
 * defined in .jshintrc and .jscsrc respectively
 * when used with --debug prints the files that are being piped
 *
 */

gulp.task('code-check', function(){
    util.log(util.colors.bgBlue('Code check using JSHint and JSCS'))
        return gulp
        .src(config.jsfiles)
        .pipe(gulpif(yargs.debug, debug({title: 'code-check'})))
        .pipe(jscs())
        .pipe(jshint())
        // stylish reporter https://github.com/sindresorhus/jshint-stylish
        .pipe(jshint.reporter('jshint-stylish'), {verbose: true});
});

/*
 * Create a build to prepare the app for production
 */

gulp.task('build', ['bower-html-inject', 'html-inject', 'images', 'production-settings'], function(){
    util.log(util.colors.bgBlue('Building App for Production'));
    return gulp
        .src('app/**/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', annotate()))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minify()))
        .pipe(gulp.dest(config.build));
});

/*
* Compresses images and copies them to the build folder
*/

gulp.task('images',function(){
    util.log(util.colors.bgBlue('Compressing and Copying Images to Build Folder'));
    return gulp
        .src(config.images)
        .pipe(imagemin())
        .pipe(gulp.dest(config.build + 'images'));
});

/*
* Copies development settings file to app folder
*/

gulp.task('dev-settings',function(){
    util.log(util.colors.bgBlue('Copying Development Settings File'));
    return gulp
        .src('dist/angular/development/app.settings.js')
        .pipe(gulp.dest(config.app));
});

/*
* Copies production settings file to app folder
*/

gulp.task('production-settings',function(){
    util.log(util.colors.bgBlue('Copying Production Settings File'));
    return gulp
        .src('dist/angular/production/app.settings.js')
        .pipe(gulp.dest(config.app));
});


/*
* Launch a webserver to serve the production build
*/

gulp.task('serve', ['build'], function() {
    util.log(util.colors.bgBlue('Serving Production Build'));
    gulp.src(config.build)
        .pipe(webserver({
            fallback: 'index.html',
            livereload: true,
            open: true
        }));
});


// setting up the default task, that calls an array of tasks
gulp.task('default', ['bower-html-inject', 'webserver', 'watchers']);
