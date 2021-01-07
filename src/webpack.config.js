// 컴퓨터나 서버에서의 전체 경로를 갖게해주는 코드 ex) /users/smp/...
const path = require("path");

const autoprefixer = require("autoprefixer");
const ExtractCSS = require("mini-css-extract-plugin");
const MODE = process.env.WEBPACK_ENV;
// for file
const ENTRY_FILE = path.resolve(__dirname, "assets","js","main.js");
// for directory
const OUTPUT_DIR = path.join(__dirname,"static");




const config = {
    entry: ["@babel/polyfill", ENTRY_FILE],
    mode: MODE,
    module: {
        rules: [{
                test: /\.(js|scss)$/,
                use: [{
                    loader: "babel-loader"
                }]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    /* devMode ? 'style-loader' : */
                    ExtractCSS.loader,
                    'css-loader',
                    {loader: 'postcss-loader',options:{plugins(){return [autoprefixer({browsers:"cover 99.5%"})]}}},
                    'sass-loader',
                   ],
            }
        ]
    },
    output: {
        path: OUTPUT_DIR,
        filename: "[name].js"
    },
    plugins: [new ExtractCSS({filename: "styles.css"})]
};
  


module.exports = config;