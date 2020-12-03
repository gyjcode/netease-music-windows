import $http from '../utils/http.js'

// MV - 全部
export function getMVAll({area, type, order, limit, offset}){
	return $http.get('/mv/all', {
		params:{
			area,        // 全部,内地,港台,欧美,日本,韩国
			type,        // 全部,官方版,原生,现场版,网易出品
			order,       // 上升最快,最热,最新
			limit,
			offset
		},
	});
}
// MV - 热播
export function getMVFirst(area, limit){
	return $http.get('/mv/first', {
		params:{
			area,
			limit
		},
	});
}
// MV - 网易出品
export function getMVExclusiveRecommend(limit, offset){
	return $http.get('/mv/exclusive/rcmd', {
		params:{
			limit,
			offset
		},
	});
}
// MV - 排行
export function getMVTop({area, limit, offset}){
	return $http.get('/top/mv', {
		params:{
			area,
			limit,
			offset
		},
	});
}
// MV - 详情
export function getMVDetail(mvid){
	return $http.get('/mv/detail?mvid=' + mvid);
}
// MV - 详情数据
export function getMVDetailInfo(mvid){
	return $http.get('/mv/detail/info?mvid=' + mvid);
}
// MV - 地址
export function getMVUrl(id, r){
	return $http.get('/mv/url', {
		params:{
			id,
			r
		},
	});
}
// MV - 相似MV
export function getMVSimilar(mvid){
	return $http.get('/simi/mv?mvid=' + mvid);
}
