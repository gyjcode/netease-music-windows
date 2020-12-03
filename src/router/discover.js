// 发现页路由
import Discover from '@/components/pages/discover/index.js'

let routes=[
	{
		path: '/discover', 
		redirect: '/discover/recommend',
	},
	{
		path: '/discover/recommend', 
		component: Discover.Recommend,
	},
	{
		path: '/discover/playlist', 
		component: Discover.Playlist,
	},
	{    // 精品歌单
		path: '/discover/playlist/highquality', 
		component: Discover.PlaylistHighquality,
	},
	{
		path: '/discover/dj', 
		component: Discover.DJ,
	},
	{
		path: '/discover/dj/ranking', 
		component: Discover.DJRanking,
	},
	{
		path: '/discover/ranking', 
		component: Discover.Ranking,
	},
	{
		path: '/discover/artist', 
		component: Discover.Artist,
	},
	{
		path: '/discover/new', 
		component: Discover.New,
	},
]

export default routes