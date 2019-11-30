const packageJson = require('./package.json');

const withTypeScript = require('@zeit/next-typescript');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();

let config = {
  exportPathMap: async function() {
    return {
      '/': { page: '/index' },
    };
  },
  webpack: (config, { isServer, webpack }) => {
    config.node = {
      fs: 'empty',
      __dirname: false,
      __filename: false,
    };

    config.plugins.push(
      gitRevisionPlugin,
      new webpack.DefinePlugin({
        PACKAGE_NAME: JSON.stringify(packageJson.name),
        PACKAGE_VERSION: JSON.stringify(packageJson.version),
        COMMIT_HASH: JSON.stringify(gitRevisionPlugin.commithash()),
        COMMIT_HASH_SHORT: JSON.stringify(
          gitRevisionPlugin.commithash().substr(0, 7)
        ),
        IS_SERVER: isServer,
        IS_PRODUCTION: process.env.NODE_ENV === 'production',
      })
    );

    config.module.rules.push({
      test: /\.(png|jpg|gif)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8000,
            emitFile: false,
            publicPath: '/static',
            name: '[name].[ext]',
          },
        },
      ],
    });

    return config;
  },
};

config = withTypeScript(config);
// bundle analyzer will run if environment variable BUNDLE_ANALYZE is 'both'|'server'|'client'
// reports will be created in .next/analyzer/{server|client}.html
config = withBundleAnalyzer({
  ...config,
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['client', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../analyzer/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: 'analyzer/client.html',
    },
  },
});

module.exports = config;
