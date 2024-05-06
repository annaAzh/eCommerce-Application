import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import 'webpack-dev-server';

type Mode = 'production' | 'development';

interface EnvVar {
  mode: Mode;
  port: number;
}

module.exports = (env: EnvVar) => {
  const isDev = env.mode === 'development';
  const isProd = env.mode === 'production';

  const config: Configuration = {
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name][contenthash].js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: isDev
      ? {
          port: env.port ?? 5005,
          open: true,
          historyApiFallback: true,
        }
      : undefined,
    devtool: isDev && 'inline-source-map',
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
      isProd &&
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash:8].css',
          chunkFilename: '[name].[contenthash:8].css',
        }),
    ].filter(Boolean),
  };
  return config;
};
