'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import rename from 'gulp-rename';
import rev from 'gulp-rev-append';
import scss from 'gulp-sass';
import prefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import browserify from 'browserify';
import watchify from 'watchify';
import tap from 'gulp-tap';
import buffer from 'gulp-buffer';
import babelify from 'babelify';
import sourcemap from 'gulp-sourcemaps';
import watch from 'gulp-watch';
import strip from 'gulp-strip-comments';
import shell from 'gulp-shell';

gulp.task( 'db:drop', shell.task([

	'mongo test --eval "db.dropDatabase();"'

]));

gulp.task( 'js', () => {

	return gulp.src( './js/main.jsx',  {

		read: false

	})

		.pipe( tap( file => {

			file.contents = watchify( browserify( file.path, {

				entries: './js/main.jsx',
				extensions: ['.jsx'],
				debug: true,
				cache: {},
				packageCache: {},
				fullPaths: true

			})

			.transform( babelify.configure({

				presets: ['es2015', 'react'],
				extensions: ['.jsx']

			})))

			.bundle()

				.on( 'error', error => {

					gutil.log( 'Browserify Error', error.message );

				})

			;

		}))

		.pipe( buffer() )

		.pipe( strip() )

		.pipe( rename( 'bundle.js' ) )

		.pipe( sourcemap.init({

			loadMaps: true

		}))

		.pipe( sourcemap.write( './' ) )

		.pipe( gulp.dest( './public/' ) )

	;

});

gulp.task( 'scss', () => {

	return gulp.src( './scss/main.scss' )

		.pipe( sourcemap.init({

			loadMaps: true

		}))

		.pipe( scss({

			outputStyle: 'compressed'

		})
			.on( 'error', scss.logError

		))

		.pipe( prefixer() )

		.pipe( rename( 'style.css' ) )

		.pipe( sourcemap.write( './' ) )

		.pipe( gulp.dest( './public/' ) )

	;

});

gulp.task( 'rev', () => {

	return gulp.src( './index.html' )

		.pipe( rev() )

		.pipe( gulp.dest( './' ) )

	;

});

gulp.task( 'watch', () => {

	gulp.watch( './js/**/*.js', ['js', 'rev'] );

	gulp.watch( './scss/**/*.scss', ['scss', 'rev'] );

});

gulp.task( 'default', [

	'js',
	'scss',
	'watch',
	'rev'

]);