import $http from '../utils/http.js'

// 轮播图
export function getBanner(type){
	return $http.get('/banner',{
		params:{
			type
		}
	});
}
// 推荐电台
export function getPersonalizedDJProgram(){
	return $http.get('/personalized/djprogram')
}
// 推荐节目
export function getRecommendProgram(){
	return $http.get('/program/recommend')
}
// 独家放送MV
export function getMVExclusive(){
	return $http.get('/personalized/privatecontent')
}
// 推荐 MV
export function getMVRecommend(){
	return $http.get('/personalized/mv');
}
// 最新歌曲
export function getSongListNews(){
	return $http.get('/personalized/newsong');
}
// 推荐歌曲列表
export function getSongListRecommend(limit){
	return $http.get('/personalized?limit='+limit);
}
// 每日推荐歌曲(需登录)
export function getRecommendSongs(){
	return $http.get('/recommend/songs')
}
