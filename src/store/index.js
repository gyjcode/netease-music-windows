// Vue 状态管理入口
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 导入状态管理模块
import base from './base'
import music from './music'
import user from './user'


const store = new Vuex.Store({
	modules:{
		base,
		music,
		user
	}
})

export default store