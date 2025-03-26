const esbuild = require("rollup-plugin-esbuild");
const nodeResolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const glob = require("glob");

function typescript() {
  // https://www.npmjs.com/package/rollup-plugin-esbuild#usage
  return esbuild.default({
    sourcemap: false,
  });
}

module.exports = function () {
  const templates = glob
    .sync("static/templates/**/*.html")
    .filter((name) => name.slice(0, 1) !== ".")
    .map((file) =>
      file
        .replace("static", "systems/zaibatsu-unofficial")
        .replaceAll("\\", "/"),
    );

  return {
    input: "src/zaibatsu.ts",
    output: {
      file: "dist/zaibatsu.bundle.js",
      format: "es",
      inlineDynamicImports: true,
      intro: `
        console.log("build ${new Date().toTimeString()}");
        const handlebarsTemplates = ${JSON.stringify(templates)};
      `,
    },
    plugins: [nodeResolve(), commonjs(), typescript()],
  };
};
