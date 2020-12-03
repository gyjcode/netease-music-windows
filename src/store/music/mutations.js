/* 
 * musicModule 状态管理——mutations 
 */


export default{
	// 设置当前播放详情页显示隐藏
	setIsPlayerShow(state, status){
		state.isPlayerShow = status
	},
	// 设置当前播放列表显示隐藏
	setIsPlayListShow(state, status){
		state.isPlayListShow = status
	},
	// 设置当前播放歌词显示隐藏
	setIsPlayLyricShow(state, status){
		state.isPlayLyricShow = status
	},
	// 设置当前播放状态
	setPlayingState(state, playingState){
		state.playingState = playingState
	},
	// 设置音乐播放列表
	setPlaylist(state, playlist){
		state.playlist = playlist
	},
	// 追加音乐播放列表
	addPlaylist(state, playlist){
		if(state.playlist && playlist == state.playlist) return
		state.playlist = state.playlist.concat(playlist)
	},
	// 设置音乐历史播放记录
	setPlayingHistory(state, playingHistory){
		state.playingHistory = playingHistory
	},
	// 设置当前播放音乐详情
	setCurrentSong(state, song){
		state.currentSong = song
	},
	// 设置当前播放时间
	setAudioCurrentTime(state, time){
		state.audioCurrentTime = time
	},
	// 设置播放模式
	setPlayingMode(state, mode) {
	  state.playingMode = mode
	},
}
