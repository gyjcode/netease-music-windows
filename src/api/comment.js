import $http from '../utils/http.js'

// 歌曲评论
export function getCommentMusic({id, limit, offset, before}){
	return $http.get('/comment/music', {
		params:{
			id,
			limit,
			offset,
			before
		},
	});
}
// 歌单评论
export function getCommentListOfPlaylist({id, limit, offset, before}){
	return $http.get('/comment/playlist', {
		params:{
			id,
			limit,
			offset,
			before
		},
	});
}
// 专辑评论
export function getCommentListOfAlbum({id, limit, offset, before}){
	return $http.get('/comment/album', {
		params:{
			id,
			limit,
			offset,
			before
		},
	});
}
// MV 评论
export function getCommentListOfMV({id, limit, offset, before}){
	return $http.get('/comment/mv', {
		params:{
			id,
			limit,
			offset,
			before
		},
	});
}
// 电台评论
export function getCommentListOfDJ({id, limit, offset, before}){
	return $http.get('/comment/dj', {
		params:{
			id,
			limit,
			offset,
			before
		},
	});
}
// 视频评论
export function getCommentListOfVideo({id, limit, offset, before}){
	return $http.get('/comment/video', {
		params:{
			id,
			limit,
			offset,
			before
		},
	});
}
// 热门评论
export function getCommentListOfHot({id, type, limit, offset, before}){
	return $http.get('/comment/hot', {
		params:{
			id,
			type,
			limit,
			offset,
			before
		},
	});
}
// 楼层评论
export function getCommentListOfFloor({id, limit, offset, before}){
	return $http.get('/comment/floor', {
		params:{
			id,
			limit,
			offset,
			before
		},
	});
}
// 发送、回复评论
export function postComment({t, type, id, content, commentId}){
	return $http.post('/comment', {
		t,
		type,
		id,
		content,
		commentId
	});
}