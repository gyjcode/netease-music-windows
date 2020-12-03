/* 
 * musicModule 状态管理—— state 
 */

export default{
	// 显示隐藏当前音乐详情
	isPlayerShow: false,
	// 显示隐藏当前播放列表
	isPlayListShow: false,
	// 显示隐藏当前歌词
	isPlayLyricShow: false,
	// 播放状态
	playingState: false,
	// 播放模式：sequence；loop；random
	playingMode: 'sequence',
	// 播放列表
	playlist: [],
	// 历史记录
	playingHistory: localStorage.getItem("playing_history") ? JSON.parse( localStorage.getItem("playing_history") ) : [],
	// 当前播放歌曲
	currentSong: {
		id:31877077,
		name:"天亮了(Live)",
		picUrl:"https://p2.music.126.net/onVOfRkz4TW37Bak8jVGKQ==/2901611186844770.jpg",
		url:"https://music.163.com/song/media/outer/url?id=31877077.mp3",
		artists: [
			{
				id:7891,
				name:"韩红"
			}
		],
		album: {
			id:3142014,
			name:"我是歌手第三季 第1期",
			picUrl:"https://p2.music.126.net/onVOfRkz4TW37Bak8jVGKQ==/2901611186844770.jpg"
		}
	},
	// 当前播放时间，单位：ms
	audioCurrentTime: 0,
}