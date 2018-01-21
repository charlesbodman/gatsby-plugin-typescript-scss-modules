const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { cssModulesConfig } = require(`gatsby-1-config-css-modules`)
const { defaults } = require("./defaults");

const postCssLoader = "postcss-loader";
const cssLoader = "typings-for-css-modules-loader";

exports.modifyWebpackConfig = ({ config, stage }, options) => {

  const sassFiles = /\.s[ac]ss$/
  const sassModulesFiles = /\.module\.s[ac]ss$/
  const sassLoader = `sass?${JSON.stringify(options)}`

  config.removeLoader("cssModules");

  const configuration = JSON.stringify({
    ...defaults,
    ...options,
  });
  const loader = `${cssLoader}?${configuration}`;

  switch (stage) {
    case "develop": {
      config.loader("cssModules", {
        test: sassFiles,
        exclude: sassModulesFiles,
        loaders: ["style-loader", loader, postCssLoader, sassLoader],
      });

      config.loader(`sassModules`, {
        test: sassModulesFiles,
        loaders: [`style`, cssModulesConfig(stage), `postcss`, sassLoader],
      })
      return config;
    }
    case "build-css": {
      config.loader("cssModules", {
        test: sassFiles,
        exclude: sassModulesFiles,
        loader: ExtractTextPlugin.extract("style-loader", [
          loader,
          postCssLoader,
          sassLoader,
        ]),
      });

      config.loader(`sassModules`, {
        test: sassModulesFiles,
        loader: ExtractTextPlugin.extract(`style`, [
          cssModulesConfig(stage),
          `postcss`,
          sassLoader,
        ]),
      })

      return config;
    }
    case "develop-html":
    case "build-html":
    case "build-javascript": {
      config.loader("cssModules", {
        test: sassFiles,
        exclude: sassModulesFiles,
        loader: ExtractTextPlugin.extract("style-loader", [
          loader,
          postCssLoader,
          sassLoader,
        ]),
      });

      config.loader(`sassModules`, {
        test: sassModulesFiles,
        loader: ExtractTextPlugin.extract(`style`, [
          cssModulesConfig(stage),
          sassLoader,
        ]),
      })
      return config;
    }
    default: {
      return config;
    }
  }
};
