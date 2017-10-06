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

gulp.task('lint', lint('scripts/**/*.js'));

gulp.task('html', ['nunjucks:configure', 'views'], () => {
  return gulp.src('demo/*.html')
    .pipe($.eol())
    .pipe($.useref({
      searchPath: ['demo.src', '.']
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
    .pipe(gulp.dest('demo'));
});

gulp.task('images', () => {
  return gulp.src('demo.src/images/**/*')
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
    .pipe(gulp.dest('demo/images'));
});

gulp.task('nunjucks:configure', () => {
  $.nunjucksRender.nunjucks.configure(['demo.src/'], {
    watch: false
  });
});

gulp.task('nunjucks:watch', () => {
  $.nunjucksRender.nunjucks.configure(['demo.src/'], {
    watch: true
  });
});

gulp.task('views', () => {
  var componentsJson = JSON.parse(fs.readFileSync(__dirname + '/demo.src/components.json'));
  var templatesJson = JSON.parse(fs.readFileSync(__dirname + '/demo.src/templates.json'));

  $.nunjucksRender.nunjucks.configure(['demo.src/'], {
    watch: false
  });

  return gulp.src(['demo.src/*.html', 'demo.src/layouts/pages/*.html', 'demo.src/layouts/templates/*.html'])
    // .pipe($.plumber())
    .pipe($.nunjucksRender({
      path: 'demo.src/',
      componentsToLoad: componentsJson,
      templatesToLoad: templatesJson
    }))
    .pipe(gulp.dest('demo'));
});

gulp.task('extras', () => {
  return gulp.src([
      'demo.src/*.*',
      '!demo.src/*.html',
      '!demo.src/*.json'
    ], {
      dot: true
    })
    .pipe(gulp.dest('demo'));
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

gulp.task('clean', del.bind(null, ['demo']));

gulp.task('serve', ['nunjucks:watch', 'html', 'webpack'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['demo'],
    }
  });

  gulp.watch('scripts/**/*.js', ['webpack', reload]);
  gulp.watch('sass/**/*.scss', ['webpack', reload]);
  gulp.watch('package.json', ['webpack']);
  gulp.watch('webpack.config.js', ['webpack']);

  gulp.watch('demo.src/components.json', ['html', reload]);
  gulp.watch('demo.src/templates.json', ['html', reload]);
  gulp.watch('demo.src/images/**/*', ['webpack', reload]);
  gulp.watch('demo.src/**/*.html', ['html', reload]);
  gulp.watch('demo.src/**/*.nj', ['html', reload]);
});

gulp.task('serve:demo', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['demo']
    }
  });
});

gulp.task('build', ['html', 'images', 'webpack', 'extras'], () => {
  return gulp.src('demo/**/*').pipe($.size({
    title: 'build',
    gzip: true
  }));
});

gulp.task('default', ['clean'], () => {
  return gulp.start('build');
});
