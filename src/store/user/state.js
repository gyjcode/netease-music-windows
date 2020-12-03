/* 
 * musicModule 状态管理—— state 
 */
let user = {
		account: {},
		bindings: [],
		profile: {}
	}
export default{
	// 显示隐藏当前音乐详情
	loginPopupShow: false,
	loginUser: localStorage.getItem("login_user") ? JSON.parse( localStorage.getItem("login_user") ) : user,
}