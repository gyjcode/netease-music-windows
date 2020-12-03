/* 
 * 音乐相关状态管理
 * 注意音乐状态管理放在了单独的文件夹下并启用命名空间,调用时需留意
 */

import state from './state.js'
import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
}