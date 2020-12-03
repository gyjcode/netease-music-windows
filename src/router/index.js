// Vue 路由配置入口文件
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import Pages from '@/components/pages'
import Base from '@/router/base.js'
import Search from '@/router/search.js'
import Discover from '@/router/discover.js'
import Video from '@/router/video.js'
import Download from '@/router/download.js'
import Subscribe from '@/router/subscribe.js'

import MobileMine from '@/components/layout/Mine.vue'

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

// 配置路由规则
const router = new VueRouter({
	linkActiveClass: 'active',
	routes:[
		...Base,
		{	// 默认首页
			path: '/', 
			redirect: '/discover',
		},
		{	// 发现音乐
			path: '/discover', 
			component: Pages.Discover,
			children:[
				...Discover
			]
		},
		{	// 私人FM
			path: '/fm', 
			component: Pages.FM,
		},
		{	// LOOK 直播
			path: '/live', 
			component: Pages.Live,
		},
		{	// 视频
			path: '/Video', 
			component: Pages.Video,
			children:[
				...Video
			]
		},
		{	// 朋友
			path: '/social', 
			component: Pages.Social,
		},
		{	// 本地音乐
			path: '/local', 
			component: Pages.Local,
		},
		{	// 下载管理
			path: '/download', 
			component: Pages.Download,
			children:[
				...Download
			]
		},
		{	// 音乐云盘
			path: '/cloud', 
			component: Pages.Cloud,
		},
		{	// 我的收藏
			path: '/collection', 
			component: Pages.Subscribe,
			children:[
				...Subscribe
			]
		},
		{	// 我的-手机端
			path: '/mine', 
			component: MobileMine,
		},
		{	// 搜索页面
			path: '/search', 
			component: Pages.Search,
			children:[
				...Search
			]
		},
		{	// 设置页面
			path: '/setting', 
			component: Pages.Setting,
		},
	],
	
})

// 向外暴露一个路由规则
export default router
