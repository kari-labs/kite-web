const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const ExtractCssChunksPlugin = require('extract-css-chunks-webpack-plugin')
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const S3Plugin = require('webpack-s3-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const webpack = require('webpack')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    entry: {
        main: './src/js/main.js'
    },
    cache: true,
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: './',
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[id].[contenthash].js'
    },
    optimization: {
        minimize: false,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        runtimeChunk: {
            name: 'bootstrap'
        },
        splitChunks: {
            // chunks: 'async',
            chunks: 'all',
            minSize: 30000,
            maxSize: 50000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/i,
                    chunks: 'all'
                },
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    minChunks: 2
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    devtool: 'source-map',
    target: 'web',
    devServer: {
        compress: true,
        hot: true,
        https: false,
        watchOptions: {
            poll: true
        },
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.styl'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.join(__dirname, './src/')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    hotReload: true
                }
            },
            {
                test: /\.scss$/,
                use: [
                    ExtractCssChunksPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    ExtractCssChunksPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'purgecss-loader',
                        options: {
                            content: [
                                path.join(__dirname, 'src/**/*.vue')
                            ],
                            whitelistPatterns: [
                                /alert/,
                                /fas/,
                                /fa-bars/,
                                /material-icons/,
                                /^mdi/,
                                /v-icon/
                            ],
                            whitelistPatternsChildren: [
                                /fas/,
                                /material-icons/,
                                /v-icon/
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    ExtractCssChunksPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@vue/babel-preset-app'],
                        sourceMap: true
                    }
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/[name].[ext]',
                    publicPath: '../'
                }
            },
            {
                test: /\.(png|jpe?g|gif)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    name: 'assets/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new ExtractCssChunksPlugin({
            filename: devMode ? 'css/[name].css' : 'css/[name].[contenthash].css',
            chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[contenthash].css',
            hot: false,
            cssModules: true,
            orderWarning: false
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: devMode ? 'index.html' : 'index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new VuetifyLoaderPlugin(),
    ],
    stats: {
        assets: true,
        assetsSort: 'chunks',
        builtAt: true,
        children: true,
        chunks: true,
        chunkGroups: true,
        chunkModules: true,
        chunkOrigins: true,
        colors: true
    }
}

if (process.env.NODE_ENV === 'production') {
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new UglifyJsPlugin({
            sourceMap: true,
            minify(file, sourceMap=true) {
                const uglifyJsOptions = {
                    output: {
                        comments: false,
                        beautify: false,
                    },
                    toplevel: true,
                    compress: {
                        comparisons: false
                    }
                }

                if(sourceMap) {
                    uglifyJsOptions.sourceMap = {
                        content: sourceMap
                    }
                }
                return require('uglify-js').minify(file, uglifyJsOptions)
            }
        }),
        new PreloadWebpackPlugin({
            rel: 'preload',
            include: ['bootstrap', 'fontAwesome', 'vuetify', 'vue', 'vueRouter']
        }),
        new HtmlCriticalWebpackPlugin({
            base: path.resolve(__dirname, 'dist'),
            src: 'index.html',
            dest: 'index.html',
            inline: true,
            minify: true,
            extract: true,
            width: 375,
            height: 565,
            penthouse: {
                blockJSRequests: false
            }
        }),
        new DuplicatePackageCheckerPlugin({
            verbose: true,
            emitError: true,
            strict: true
        }),
        new S3Plugin({
            s3Options: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
            directory: 'dist/',
            s3UploadOptions: {
                Bucket: 'neit-kite-dev'
            },
            cloudfrontInvalidateOptions: {
                DistributionId: "E2C8O85JLGBHZR",
                Items: ["/*"]
            }
        })
    ])
}