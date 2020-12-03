import $http from '../utils/http.js'

// 获取歌手描述
export function getFMPersonal(id){
	return $http.get('/personal_fm');
}
