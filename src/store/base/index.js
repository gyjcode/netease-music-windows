/* 
 * 基础设置状态管理
 * 播放器的基础设置相关参数，不适宜归到具体分类下的
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