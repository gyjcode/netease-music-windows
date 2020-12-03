import $http from '../utils/http.js'

// 电台-详情
export function getDJDetail(rid){
	return $http.get('/dj/detail?rid='+rid)
}
// 电台-节目
export function getDJProgram({rid, limit, offset, asc}){
	return $http.get('/dj/program', {
		params:{
			rid,
			limit,
			offset,
			asc
		},
	});
}
// 电台-订阅者列表
export function getDJSubscribers({id, time,limit}){
	return $http.get('/dj/subscriber', {
		params:{
			id,
			time,
			limit
		},
	});
}
// 电台-节目详情
export function getDJProgramDetail(id){
	return $http.get('/dj/program/detail?id='+id);
}
// 电台轮播图
export function getDJBanner(){
	return $http.get('/dj/banner')
}
// 电台-热门
export function getDJHot(limit, offset){
	return $http.get('/dj/hot', {
		params:{
			limit,
			offset
		},
	});
}
// 电台-栏目
export function getDJCategorylist(){
	return $http.get('/dj/catelist')
}
// 电台-推荐
export function getDJRecommend(){
	return $http.get('/dj/recommend')
}
// 电台-分类推荐
export function getDJRecommendByType(type){
	return $http.get('/dj/recommend/type?type='+type)
}
// 电台-订阅
export function getDJSub(rid){
	return $http.get('/dj/sub?rid='+rid)
}
// 电台-订阅列表
export function getDJSublist(){
	return $http.get('/dj/sublist')
}
// 电台-付费精选
export function getDJPaygift(limit, offset){
	return $http.get('/dj/paygift', {
		params:{
			limit,
			offset
		},
	});
}
// 电台-非热门类型
export function getDJCategoryExcludeHot(){
	return $http.get('/dj/category/excludehot')
}
// 电台-推荐类型
export function getDJCategoryRecommend(){
	return $http.get('/dj/category/recommend')
}
// 电台-今日优选
export function getDJTodyPerfered(){
	return $http.get('/dj/today/perfered')
}

// 电台-节目榜
export function getDJToplistProgram({limit, offset}){
	return $http.get('/dj/program/toplist', {
		params:{
			limit,
			offset
		},
	});
}
// 电台-24h节目榜
export function getDJToplistProgramHours(limit){
	return $http.get('/dj/program/toplist/hours?limit='+limit);
}
// 电台-24h主播榜
export function getDJToplistHours(limit){
	return $http.get('/dj/toplist/hours?limit='+limit);
}
// 电台-主播新人榜
export function getDJToplistNewcomer(limit){
	return $http.get('/dj/toplist/newcomer?limit='+limit);
}
// 电台-最热主播榜
export function getDJToplistPopular(limit){
	return $http.get('/dj/toplist/popular?limit='+limit);
}
// 电台-新晋电台榜/热门电台榜
export function getDJToplist({limit, offset, type}){
	return $http.get('/dj/toplist', {
		params:{
			limit,
			offset,
			type
		},
	});
}
// 电台-类别热门电台榜       ----  这个 API 有问题 limit 限制数量不对
export function getDJRadioHot({limit, offset, cateId}){
	return $http.get('/dj/radio/hot', {
		params:{
			cateId,    // 可选，类别ID
			limit,    // 可选，返回数量，默认 30
			offset    // 可选，偏移数量，用于分页
		},
	});
}