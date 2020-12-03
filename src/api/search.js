import $http from '../utils/http.js'

// 搜索建议
export function getSearchSuggest(keywords, type){
	return $http.get('/search/suggest', {
		params:{
			keywords,
			type
		},
	});
}
// 热搜列表(简略)
export function getSearchHot(){
	return $http.get('/search/hot');
}
// 热搜列表(简略)
export function getSearchHotDetail(){
	return $http.get('/search/hot/detail');
}
// 搜索(页面)
export function getSearch({keywords, type, limit, offset}){
	return $http.get('/cloudsearch', {
		params:{
			keywords,
			type,
			limit,
			offset
		},
	});
}
// 搜索多重匹配
export function getMultiMatchSearch(keywords){
	return $http.get('/search/multimatch?keywords='+ keywords);
}