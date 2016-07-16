const gulp = require('gulp');
const jshint = require('gulp-jshint');
const jscs = require('gulp-jscs');
const wiredep = require('wiredep').stream;
const bowerjson = require('./bower.json');
const inject = require('gulp-inject');
const nodemon = require('gulp-nodemon');

const options = {
  bowerJson: bowerjson,
  directory: './public/lib',

  ignorePath: '../../public',
};

const files = ['*.js', 'src/**/*.js'];

const injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], { read: false });
const injectOptions = {
  ignorePath: '/public',
};

const serveOptions = {
  script: 'app.js',
  delayTime: 1,
  env: {
    PORT: 3000,
  },
  watch: files,
};

gulp.task('style', () => gulp.src(files).
  pipe(jshint()).
  pipe(jshint.reporter('jshint-stylish', {
    verbose: true,
  })).
  pipe(jscs()).
  pipe(jscs.reporter())
);

gulp.task('inject', () => gulp.src('./src/view/*.ejs').
    pipe(wiredep(options)).
    pipe(inject(injectSrc, injectOptions)).
    pipe(gulp.dest('./src/view'))
);

gulp.task('serve', ['style', 'inject'], () => nodemon(serveOptions).
  on('restart', () => console.log('Restarting...')));
