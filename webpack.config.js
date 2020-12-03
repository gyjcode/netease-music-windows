// 引入 Node.js 的 path 模块
const path = require('path');

// HTML 页面托管到内存中
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 导入 vue-loader 组件
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// 向外暴露一个配置对象
module.exports = {
	// 要处理的 js 文件
	entry: {
		// path.join(__dirname, './src/assets/js/main.js'),
		main: ['babel-polyfill', path.join(__dirname, './src/assets/js/main.js')]
	},
	// 要输出的 js 文件
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bundle.js'
	},
	// 配置别名
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src/'),
		}
	},
	// webpack 插件相关
	plugins: [
		new HtmlWebpackPlugin({
			template : path.join(__dirname,'./src/index.html'), 
			filename : 'index.html',
			minify   : { 
				removeComments: true,        // 移除页面中的注释
				collapseWhitespace: true,    // 合并空白字符
				removeAttributeQuotes: true, // 移除属性节点上的引号
			}
		}),
		
		new VueLoaderPlugin()
	],
	// 配置非 JS 文件加载器
	module: {
		rules:[
			{    // CSS 加载器
				test: /\.css$/,
				use:['style-loader','css-loader'],
			},
			{    // Less 加载器
				test: /\.less$/,
				use:['style-loader','css-loader','less-loader'],
			},
			{    // SCSS 加载器
				test: /\.scss$/,
				use:['style-loader','css-loader','sass-loader'],
			},
			{    // JS 加载器
				test: /\.js$/,
				use:['babel-loader'],
				exclude: /node_modules/,
			},
			{    // 图片加载器
				test: /\.jpg|jpeg|png|gif|bmp$/,
				use: [{
					loader: 'url-loader',
					options:{
						esModule: false,
						name: 'images/[name].[ext]',
						limit: 1024,
					},
				}],
			},
			{    // 字体加载器
				test: /\.ttf|woff|woff2|eot|svg$/,
				use:[{
					loader: 'url-loader',
					options:{
						esModule: false,
						name: 'fonts/[name].[ext]',
						limit: 1024,
					},
				}],
			},
			{    // Vue 加载器
				test: /\.vue$/,
				use:['vue-loader'],
			},
		]
	},
	// 配置代理 解决跨域问题
	devServer: {    // package.json 中 webpack-dev-server 配置
		proxy: {
			'/': {
				target: 'https://api.music.quietguoguo.com/',
				changeOrigin: true,
				secure: true,
			}
		},
	}
}