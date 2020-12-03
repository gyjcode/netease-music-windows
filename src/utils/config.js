import Vue from 'vue'

// API 管理
import * as api from '../api/index.js'
Vue.prototype.$api = api

// ElementUI 组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 全局自定义组件
import global from '@/utils/global.js'
Vue.use(global)

// Cookies 组件
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// 视频播放器插件
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
Vue.use(VideoPlayer)

// clipboard 剪切复制
import clipboard from 'clipboard';
Vue.prototype.$clipboard = clipboard;
