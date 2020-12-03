import $http from '../utils/http.js'

// 视频 - 标签列表
export function getVideoGroupList(){
	return $http.get('/video/group/list');
}
// 视频 - 分类列表 (需要登录)
export function getVideoCategoryList(){
	return $http.get('/video/category/list');
}
// 视频 - 标签/分类列表 (需要登录)
export function getVideoGroup({id, offset}){
	return $http.get('/video/group', {
		params:{
			id,
			offset
		},
	});
}
// 视频 - 全部视频列表 (需要登录)
export function getVideoTimelineAll(offset){
	return $http.get('/video/timeline/all?offset=' + offset)
}
// 视频 - 推荐视频列表
export function getVideoTimelineRecommend(offset){
	return $http.get('/video/timeline/recommend?offset=' + offset)
}
// 视频 - 相关视频
export function getVideoRelatedAll(vid){
	return $http.get('/video/related/allvideo?id=' + vid)
}
// 视频 - 视频详情
export function getVideoDetail(vid){
	return $http.get('/video/detail?id=' + vid)
}
// 视频 - 点赞转发评论数据
export function getVideoDetailInfo(vid){
	return $http.get('/video/detail/info?id=' + vid)
}
// 视频 - 视频播放地址
export function getVideoUrl(vid){
	return $http.get('/video/url?id=' + vid)
}