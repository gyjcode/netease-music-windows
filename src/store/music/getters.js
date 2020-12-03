/* 
 * musicModule 状态管理—— getters 
 * 计算播放歌曲上一曲下一曲
 * 计算播放歌曲随机下一曲
 */

export default{
	// 获取当前播放在音乐列表中的索引
	currentIndex(state){
		const {currentSong, playlist} = state
		return playlist.findIndex( ({id}) => id === currentSong.id )
	},
	
	// 上一曲：根据当前歌曲索引计算上一曲
	prevSong(state, getters){
		const {playlist, playingMode} = state
		let index = 0
		switch(playingMode){
			case 'sequence':
				index = getSequenceIndex()
				break;
			case 'random':
				index = getRandomIndex()
				break;
			case 'loop':
				index = getLoopIndex()
				break;
			default:
				index = getSequenceIndex()
		}
		return playlist[index]
		
		// 顺序播放
		function getSequenceIndex(){
			let prevIndex = getters.currentIndex - 1
			if(prevIndex <= 0) return playlist.length - 1
			return prevIndex
		}
		
		// 随机播放
		function getRandomIndex(){
			if(playlist === 1) return getters.currentIndex
			// 避免无限循环
			while(index === getters.currentIndex){
				index = Math.round(Math.random()*(playlist.length - 1))
			}
			return index 
		}
		
		//单曲播放
		function getLoopIndex(){
			return getters.currentIndex
		}
	},
	
	// 下一曲：根据当前歌曲索引计算下一曲
	nextSong(state, getters){
		const {playlist, playingMode} = state
		let index = 0
		switch(playingMode){
			case 'sequence':
				index = getSequenceIndex()
				break;
			case 'random':
				index = getRandomIndex()
				break;
			case 'loop':
				index = getLoopIndex()
				break;
			default:
				index = getSequenceIndex()
		}
		return playlist[index]
		
		// 顺序播放
		function getSequenceIndex(){
			let nextIndex = getters.currentIndex + 1
			if(nextIndex >= playlist.length) return 0
			return nextIndex
		}
		
		// 随机播放
		function getRandomIndex(){
			if(playlist === 1) return getters.currentIndex
			// 避免无限循环
			while(index === getters.currentIndex){
				index = Math.round(Math.random()*(playlist.length - 1))
			}
			return index 
		}
		
		//单曲播放
		function getLoopIndex(){
			return getters.currentIndex
		}
	}
}