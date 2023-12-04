const { defineConfig } = require("@vue/cli-service");
const version = require("./package.json").version;

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    client: {
      overlay: {
        runtimeErrors: false,
      },
    },
  },
  configureWebpack: {
    output: {
      filename: `[name].[fullhash]-${version}.bundle.js`,
      chunkFilename: `js/[name].[fullhash]-${version}.js`,
    },
  },
});
