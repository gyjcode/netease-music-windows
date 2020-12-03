/* 
 * musicModule 状态管理—— actions 
 */

export default{
	// 初始化音乐播放器
	startPlaying({ commit, state }, rawSong) {
		// 设置当前音乐并开始播放
		const song = Object.assign({}, rawSong)
		commit('setCurrentSong', song)
		commit('setPlayingState', true)
		
		// 设置历史播放记录
		const { playingHistory } = state
		const playingHistoryCopy = playingHistory
		// console.log(playingHistoryCopy)
		const index = playingHistoryCopy.findIndex(({ id }) => song.id === id) || -1
		if (index !== -1) playingHistoryCopy.splice(index, 1)
		playingHistoryCopy.unshift(song)
		commit('setPlayingHistory', playingHistoryCopy)
		localStorage.setItem('playing_history', window.JSON.stringify(playingHistoryCopy))
	}
}