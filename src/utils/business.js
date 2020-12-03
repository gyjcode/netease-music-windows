/* 业务工具方法 */
// 获取相关 API ,组装完整歌曲内容
import {getSongDetail, getAlbumDetail, getArtistDesc} from '@/api'

export function createSong(song){
	const { id, name, picUrl, duration, artists, albumId, albumName, albumPicUrl, ...rest } = song
	
	return {
		id,
		url: getSongPlayUrl(id),
		name,
		picUrl,
		duration,
		artists,
		album: {
			id: albumId,
			name: albumName,
			picUrl: albumPicUrl,
		},
		...rest
	}
}

// 获取音乐播放地址
export function getSongPlayUrl(id){
	return 'https://music.163.com/song/media/outer/url?id='+id+'.mp3'
}