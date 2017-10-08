// generated on 2015-12-14 using generator-gulp-webapp 1.0.3
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import fs from 'fs';
import path from 'path';
var gutil = require("gulp-util");
var webpack = require("webpack");

const $ = gulpLoadPlugins({});
const reload = browserSync.reload;
var nunjucksWatch = false;

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({
        stream: true,
        once: true
      }))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}

const testLintOptions = {
  env: {
    mocha: true
  }
};

gulp.task('lint', lint('src/scripts/**/*.js'));

gulp.task('html', ['nunjucks:configure', 'views'], () => {
  return gulp.src('.tmp/*.html')
    .pipe($.eol())
    .pipe($.useref({
      searchPath: ['src', '.']
    }))
    .pipe($.uniquePath())
    .pipe($.if(/\.js$/, $.uglify()))
    .pipe($.if(/\.css$/, $.cleanCss()))
    .pipe($.if(/\.html$/, $.htmlmin({
      collapseWhitespace: true,
      conservativeCollapse: true,
      preserveLineBreaks: true
    })))
    .pipe($.eol('\r\n'))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('src/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
        progressive: true,
        interlaced: true,
        // don't remove IDs from SVGs, they are often used
        // as hooks for embedding and styling
        svgoPlugins: [{
          cleanupIDs: false
        }]
      }))
      .on('error', function (err) {
        console.log(err);
        this.end();
      })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('nunjucks:configure', () => {
  $.nunjucksRender.nunjucks.configure(['src/'], {
    watch: false
  });
});

gulp.task('nunjucks:watch', () => {
  $.nunjucksRender.nunjucks.configure(['src/'], {
    watch: true
  });
});

gulp.task('views', () => {
  var componentsJson = JSON.parse(fs.readFileSync(__dirname + '/src/components.json'));
  var templatesJson = JSON.parse(fs.readFileSync(__dirname + '/src/templates.json'));

  $.nunjucksRender.nunjucks.configure(['src/'], {
    watch: false
  });

  return gulp.src(['src/*.html', 'src/layouts/pages/*.html', 'src/layouts/templates/*.html'])
    // .pipe($.plumber())
    .pipe($.nunjucksRender({
      path: 'src/',
      componentsToLoad: componentsJson,
      templatesToLoad: templatesJson
    }))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('extras', () => {
  return gulp.src([
      'src/*.*',
      '!src/*.html',
      '!src/*.json'
    ], {
      dot: true
    })
    .pipe(gulp.dest('dist'));
});

gulp.task("webpack", function (callback) {
  // run webpack
  webpack(require('./webpack.config'),
    function (err, stats) {
      if (err) throw new gutil.PluginError("webpack", err);
      gutil.log("[webpack]", stats.toString({
        // output options
      }));
      callback();
    });
});

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('serve:watch', ['nunjucks:watch', 'html', 'webpack'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist'],
    }
  });

  gulp.watch('src/scripts/**/*.js', ['webpack', reload]);
  gulp.watch('src/styles/**/*.scss', ['webpack', reload]);
  gulp.watch('package.json', ['webpack']);
  gulp.watch('webpack.config.js', ['webpack']);
  
  gulp.watch('src/images/**/*', ['images', reload]);

  gulp.watch('src/components.json', ['html', reload]);
  gulp.watch('src/templates.json', ['html', reload]);
  gulp.watch('src/**/*.html', ['html', reload]);
  gulp.watch('src/**/*.nj', ['html', reload]);
});

gulp.task('serve', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('build', ['html', 'images', 'webpack', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({
    title: 'build',
    gzip: true
  }));
});

gulp.task('default', ['clean'], () => {
  return gulp.start('build');
});
