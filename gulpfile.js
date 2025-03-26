const fs = require("fs-extra");
const path = require("path");

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

const { rollup } = require("rollup");
const rollupConfig = require("./rollup.config.js");

const gulpConfig = {
  dist: {
    directory: path.join(__dirname, "dist"),
  },
  static: {
    directory: path.join(__dirname, "static"),
    files: ["assets", "fonts", "lang", "templates", "system.json"],
  },
};

async function cleanDist() {
  try {
    await fs.remove(gulpConfig.dist.directory);
  } catch (error) {}
}

async function buildCode() {
  const config = rollupConfig();
  const bundle = await rollup({ input: config.input, plugins: config.plugins });
  return bundle.write(config.output);
}

async function buildStyles() {
  const sourcePath = path.join(
    gulpConfig.static.directory,
    "styles",
    "*index.scss",
  );

  const destPath = path.join(gulpConfig.dist.directory, "styles");

  return (
    gulp
      .src(sourcePath)
      // https://www.npmjs.com/package/gulp-sass#usage
      .pipe(sass.sync().on("error", sass.logError))
      .pipe(gulp.dest(destPath))
  );
}

async function copyStaticFiles() {
  for (const file of gulpConfig.static.files) {
    const src = path.join(gulpConfig.static.directory, file);
    const dest = path.join(gulpConfig.dist.directory, file);
    await fs.copy(src, dest).catch(() => {});
  }
}

exports.build = gulp.series(cleanDist, copyStaticFiles, buildCode, buildStyles);
