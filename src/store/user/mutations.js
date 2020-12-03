/* 
 * musicModule 状态管理——mutations 
 */

export default{
	// 设置当前播放详情页显示隐藏
	setLoginPopupShow(state, status){
		state.loginPopupShow = status
	},
	// 设置登录用户
	setLoginUser(state, user){
		state.loginUser = user
	},
	// 登出当前用户
	setUserLogout(state){
		state.loginUser = {
			account: {},
			bindings: [],
			profile: {}
		}
	},
}
