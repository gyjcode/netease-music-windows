import $http from '../utils/http.js'

// 获取专辑
export function getAlbum(id){
	return $http.get('/album?id='+ id);
}
// 专辑详情
export function getAlbumDetail(id){
	return $http.get('/album/detail?id='+ id);
}

// 最新专辑-新碟上架
export function getAlbumNewest(){
	return $http.get('/album/newest');
}

// 最新专辑
export function getAlbumNew({limit, offset, area}){
	return $http.get('/album/new', {
		params:{
			limit,
			offset,
			area,    // ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
		},
	});
}

// 新碟上架
export function getAlbumTop({limit, offset, area, type, year, month}){
	return $http.get('/top/album', {
		params:{
			limit,
			offset,
			area,
			type,
			year,
			month
		},
	});
}

// 数字专辑-新碟上架
export function getAlbumList({limit, offset}){
	return $http.get('/album/list', {
		limit,
		offset
	});
}

// 数字专辑&数字单曲-榜单
export function getAlbumSongsaleboard({limit, offset, albumType, type, year, month, day}){
	return $http.get('/album/songsaleboard', {
		params:{
			limit,
			offset,
			albumType,
			type,
			year,
			month,
			day
		},
	});
}