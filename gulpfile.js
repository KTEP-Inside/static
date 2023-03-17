const fs = require("fs");
const path = require("path");

const gulp = require("gulp");
const rimraf = require("rimraf");
const rename = require("gulp-rename");

const postcss = require("gulp-postcss");
const postcssImport = require("postcss-import");
const postcssCsso = require("postcss-csso");
const postcssMinMax = require("postcss-media-minmax");

/**
 * Processing CSS
 */

const getPostcssTask = () =>
	postcss([postcssImport, postcssCsso, postcssMinMax]);

gulp.task("styles::base::postcss", () => {
	return gulp
		.src("src/styles/styles.css")
		.pipe(getPostcssTask())
		.pipe(rename("styles/styles.min.css"))
		.pipe(gulp.dest("dist/"));
});

gulp.task("styles::schemes::postcss", () => {
	return gulp
		.src("src/styles/schemes/*.css")
		.pipe(getPostcssTask())
		.pipe(gulp.dest("dist/styles/schemes"));
});

gulp.task("clean", () => {
	return rimraf(["dist/styles/styles.css"], {
		glob: true,
	});
});

gulp.task(
	"build",
	gulp.series(
		"styles::base::postcss",
		"styles::schemes::postcss",
		"clean"
	)
);
