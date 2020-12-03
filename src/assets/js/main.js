// IE 浏览器兼容 ES6
import 'babel-polyfill'
// 项目 JS 入口文件
import Vue from 'vue'

// 路由
import router from '@/router/index.js'

// 状态管理
import store from '@/store/index.js'

// 公共工具库
import '@/utils/index.js'

// 全局样式
import '@/assets/css/main.css'

// 导入根组件
import App from '@/components/APP.vue'
// 创建根组件实例
const vm = new Vue({
	el: '#app',
	render: c=>c(App),
	router,
	store
})