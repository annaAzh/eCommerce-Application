import path, { resolve } from 'path';
import { Configuration, DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import 'webpack-dev-server';
import dotenv from 'dotenv';

type Mode = 'production' | 'development';

interface EnvVar {
  mode: Mode;
  port: number;
}

module.exports = (env: EnvVar) => {
  const isDev = env.mode === 'development';
  const dotenvPath = dotenv.config({ path: path.resolve(__dirname, '.env') });

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
      preferAbsolute: true,
      modules: [resolve(__dirname, 'src'), 'node_modules'],
      mainFiles: ['index'],
      alias: {},
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
        favicon: './public/svg/favicon.svg',
      }),
      new DefinePlugin({
        'process.env': JSON.stringify(dotenvPath.parsed),
      }),
      !isDev &&
        new MiniCssExtractPlugin({
          filename: '[name].[contenthash:8].css',
          chunkFilename: '[name].[contenthash:8].css',
        }),
    ].filter(Boolean),
  };
  return config;
};
