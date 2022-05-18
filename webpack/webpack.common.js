require('dotenv').config();
const path = require('path');

const npmCommand = process.env.npm_lifecycle_event;
const mode = npmCommand === 'build' ? 'production' : 'development';

process.env.NODE_ENV = mode;

module.exports = {
    mode,
    entry: {
        app: path.resolve(__dirname, '../src/main.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                include: path.resolve(__dirname, '../src'),
                exclude: /node_modules/,
                use: {
                    loader: 'esbuild-loader',
                    options: {
                        loader: 'jsx',
                        target: 'es2015'
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@component': path.resolve(__dirname, '../src/components/'),
            '@img': path.resolve(__dirname, '../src/assets/images/')
        }
    },
    cache: {
        type: 'filesystem',
        cacheDirectory: path.resolve(__dirname, '../.cache'),
        name: mode,
        maxAge: 86_400_000 // 1 day in milliseconds
    }
};
