import $http from '../utils/http.js'

// 收藏/取消收藏歌手
export function getArtistSubscribe({id, t}){
	return $http.get('/artist/sub', {
		params:{
			id,        // 歌手ID
			t,         // 1为收藏，其他为取消收藏
		},
	});
}
// 收藏/取消收藏歌手
export function getArtistSublist(){
	return $http.get('/artist/sublist');
}
// 收藏/取消收藏视频
export function getVideoSubscribe({id, t}){
	return $http.get('/video/sub', {
		params:{
			id,        // 视频ID
			t,         // 1为收藏，其他为取消收藏
		},
	});
}
// 收藏/取消收藏MV
export function getMVSubscribe({mvid, t}){
	return $http.get('/mv/sub', {
		params:{
			mvid,      // MVID
			t,         // 1为收藏，其他为取消收藏
		},
	});
}
// 收藏/取消收藏MV
export function getMVSublist(){
	return $http.get('/mv/sublist');
}
// 收藏/取消收藏专辑
export function getAlbumSubscribe({mvid, t}){
	return $http.get('/album/sub', {
		params:{
			id,        // 专辑ID
			t,         // 1为收藏，其他为取消收藏
		},
	});
}
// 收藏/取消收藏专辑
export function getAlbumSublist(){
	return $http.get('/album/sublist');
}
// 收藏/取消收藏歌单
export function getPlaylistSubscribe({id, t}){
	return $http.get('/playlist/subscribe', {
		params:{
			id,        // 歌单ID
			t,         // 1为收藏，其他为取消收藏
		},
	});
}
// 歌单收藏者
export function getPlaylistSubscribers({id, limit, offset}){
	return $http.get('/playlist/subscribers', {
		params:{
			id,
			limit,
			offset
		},
	});
}