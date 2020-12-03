import $http from '../utils/http.js'

// 歌手详情
export function getArtistDetail(id){
	return $http.get('/artists?id='+ id);
}

// 歌手专辑
export function getArtistAlbum({id, limit, offset}){
	return $http.get('/artist/album', {
		params:{
			id,
			limit,
			offset
		},
	});
}

// 歌手MV
export function getArtistMV(id){
	return $http.get('/artist/mv?id='+ id);
}

// 歌手描述
export function getArtistDesc(id){
	return $http.get('/artist/desc?id='+ id);
}

// 相似歌手
export function getArtistSimi(id){
	return $http.get('/simi/artist?id='+ id);
}

// 歌手列表
export function getArtistList({limit, offset, type, area, initial}){
	return $http.get('/artist/list', {
		params:{
			limit,
			offset,
			type,
			area,
			initial
		},
	});
}