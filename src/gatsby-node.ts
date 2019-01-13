const ExtractTextPlugin = require("extract-text-webpack-plugin");

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {

    const sassFiles = /\.s[ac]ss$/;
    const sassModulesFiles = /\.module\.s[ac]ss$/;

    const cssTypescriptTypings = {
        loader: 'typings-for-css-modules-loader',
        options: {
            modules: true,
            localIdentName: '[name]__[local]--[hash:base64:5]',
            namedExport: true,
            camelCase: true,
            url: true
        }
    };

    const sassLoader = {
        loader: `sass-loader`
    };

    const cssModulesLoader = {
        test: sassFiles,
        exclude: sassModulesFiles,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader', use: [
                cssTypescriptTypings,
                loaders.postcss(),
                sassLoader
            ]
        })
    };

    actions.setWebpackConfig({
        module: {
            rules: [cssModulesLoader]
        }
    });
};
