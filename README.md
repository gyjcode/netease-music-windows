# 网易云音乐播放器 ----- 2020年12月03日


### 如何使用？
 01. 下载代码到本地并解压
 02. 文件夹下按住Shift并右键打开命令窗口， 运行 npm i 安装相关依赖
 03. 运行 npm run dev 后访问 127.0.0.1:1001 即可

### 基础项目环境配置
 01. 初始化项目：npm init -y  (注意项目名合法)
 02. 创建项目入口 js 文件及其他必要目录
 03. webpack 基本配置
	- webpak 打包工具安装：npm i webpack -D
	- webpack 学习链接：[webpack 4.43 文档](https://www.webpackjs.com/concepts/targets/)
	- 创建 webpack.config.js 并配置输入输出文件
	- webpack-cli 工具
		- 安装：npm i webpack-cli -D   &nbsp;&nbsp;&nbsp;<font color="yellow">webpack 4.X 版本独立出来了</font>	
	- webpack-dev-server 实时打包工具
		- 安装： npm i webpack-dev-server -D
	- HTML 页面托管到虚拟内存：npm i html-webpack-plugin -D
	- webpack.config.js - 基础加载器配置
		- 文件 加载器： npm i file-loader -D
		- CSS  加载器： npm i style-loader css-loader -D
		- LESS 加载器： npm i less-loader less -D
		- SCSS 加载器： npm i sass-loader node-sass -D
		- URL  加载器： npm i url-loader file-loader -D
		- Vue  加载器： npm i vue-loader -D
		- JS   加载器： npm i babel-core babel-loader babel-plugin-transform-runtime -D
			<br> 运行： npm i babel-preset-env babel-preset-stage-0 -D
			<br> 报错解决（降级版本）：npm i babel-loader@7 -D
			<br> 报错解决（升级版本）：npm i @babel/core @babel/preset-env @babel/preset-react @babel/plugin-transform-runtime @babel/plugin-transform-strict-mode -D
		- 创建配置文件 .babelrc 并配置：[Babel 配置文件](https://www.babeljs.cn/docs/config-files)
 04. vue 环境安装：
	- Vue 安装：npm i vue -S
	- Vue 模板编译器安装：npm i vue-template-compiler -D
	- Vue 加载器安装：npm i vue-loader -D
	- Vue 加载器配置：webpack.config.js
	- Vue 路由安装及配置：npm i vue-router -D
	- Vue 状态管理安装及配置：npm i vuex -S
05. 常见问题处理
	- IE 浏览器不兼容 ES6 语法，使用 babel-polyfill
		- 安装：npm install babel-polyfill -s
		- 配置 webpack.base.conf.js ： entry: { app: ['babel-polyfill','./src/main.js'] },
		- main.js中最顶部引入：import 'babel-polyfill'

### 常用工具配置
 01. 桌面端组件库 Element UI 
	- 安装：npm i element-ui -S
	- 使用：
		 - import ElementUI from 'element-ui'
		 - import 'element-ui/lib/theme-chalk/index.css';
		 - Vue.use(ElementUI);
 02. 基于 Promise 的 HTTP 库 Axios
	- 安装：npm i axios -D
	- 使用：
		- import axios from 'axios'
		- Vue.prototype.$http = axios.create({ baseURL: 'https://api.music.quietguoguo.com/' })
 03. better-scroll 滚动插件——歌词滚动
	- 安装： npm i better-scroll -S
	- 使用：
		- import BScroll from 'better-scroll'
		- const bs = new BScroll( wrapper, config)
 04. vue-cookies 管理登录信息等
	- 安装： npm i vue-cookies -S
	- 使用：
		- import Vue from 'vue'
		- import VueCookies from 'vue-cookies'
		- Vue.use(VueCookies)
		- $cookies.config(expireTimes, path)
		- $cookies.set(key, value[, expireTimes[, path[, domain[, secure]]]])
		- $cookies.get(key)
		- $cookies.remove(key [, path [, domain]])
		- $cookies.isKey(key)
		- $cookies.keys()
 05. vue-video-player 视频播放器
	- 安装：npm i vue-video-player -S
	- 使用：
		- import VideoPlayer from 'vue-video-player'
		- Vue.use(VideoPlayer)
 06. clipboard 复制粘贴
	- 安装：npm i clipboard -S
	- 使用：
		- import clipboard from 'clipboard';
		- Vue.prototype.$clipboard = clipboard;
		- const clipboard = new this.$clipboard('按钮DOM', { });

### 打包发布
 01. 发布网页版
	- 配置文件： webpack.publish.config.js
	- package.json: "pub": "webpack --config webpack.publish.config.js"
	- axios 的 baseURL: BASE_URL : 开发阶段因跨域问题启用了 webpack 的 devServer，关停了 axios 的 baseURL 配置，这里恢复回去
 02. 