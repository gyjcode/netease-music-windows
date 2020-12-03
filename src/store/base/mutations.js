/* 
 * musicModule 状态管理——mutations 
 */

export default{
	setDiscoverScrollY(state, scrollY){
		state.discoverScrollY = scrollY
	},
	// 手机端显示隐藏
	setMobileSidebarShow(state, bol){
		state.mobileSidebarShow = bol
	}
}
