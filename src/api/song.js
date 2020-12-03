import $http from '../utils/http.js'

/* ==================== 歌曲 ==================== */
// 歌曲歌词
export function getSongLyric(id){
	return $http.get('/lyric?id='+ id);
}
// 歌曲详情
export function getSongDetail(ids){
	return $http.get('/song/detail?ids='+ids);
}

/* ==================== 歌单 ==================== */
// 歌曲列表——包含歌曲 ID 的歌单
export function getPlayListDetail(id){
	return $http.get('/playlist/detail?id='+id);
}
// 相似歌单——包含歌曲 ID 的相似歌单
export function getSimiPlayList(id){
	return $http.get('/simi/playlist?id='+id);
}
// 相似歌曲——当前歌曲 ID 的相似歌曲
export function getSimiSongs(id){
	return $http.get('/simi/song?id='+id);
}
// 歌曲——分类标签
export function getPlaylistCategories(){
	return $http.get('/playlist/catlist');
}
// 歌曲——热门分类标签
export function getPlaylistHotTags(){
	return $http.get('/playlist/hot');
}
// 歌单——网友精选碟
export function getPlaylistTop({order, cat, limit, offset}){
	return $http.get('/top/playlist', {
		params:{
			order,
			cat,
			limit,
			offset
		},
	});
}
// 歌单——网友精选碟
export function getPlaylistTopHighquality({cat, limit, before}){
	return $http.get('/top/playlist/highquality', {
		params:{
			cat,
			limit,
			before
		},
	});
}

/* ==================== 榜单 ==================== */
// 所有榜单
export function getToplist(){
	return $http.get('/toplist');
}
// 所有榜单摘要
export function getToplistDetial(){
	return $http.get('/toplist/detail');
}

// 新歌速递
export function getTopSong(type){
	return $http.get('/top/song?type='+type);
}