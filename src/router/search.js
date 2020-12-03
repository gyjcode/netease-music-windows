// 发现页路由
import Search from '@/components/pages/search/index.js'

let routes=[
	{
		path: '/search',
		redirect: '/search/single',
	},
	{
		path: '/search/single',
		component: Search.Single,
	},
	{
		path: '/search/album',
		component: Search.Album,
	},
	{
		path: '/search/singer',
		component: Search.Singer,
	},
	{
		path: '/search/playlist',
		component: Search.Playlist,
	},
	{
		path: '/search/user',
		component: Search.User,
	},
	{
		path: '/search/mv',
		component: Search.MV,
	},
	{
		path: '/search/lyric',
		component: Search.Lyric,
	},
	{
		path: '/search/dj',
		component: Search.DJ,
	},
	{
		path: '/search/video',
		component: Search.Video,
	},
	{
		path: '/search/composite',
		component: Search.Composite,
	},
]

export default routes