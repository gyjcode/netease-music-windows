// 发现页路由
import Download from '@/components/pages/download/index.js'

let routes=[
	{
		path: '/download', 
		redirect: '/download/song',
	},
	{
		path: '/download/song', 
		component: Download.Song,
	},
	{
		path: '/download/dj', 
		component: Download.DJ,
	},
	{
		path: '/download/mv', 
		component: Download.MV,
	},
	{
		path: '/download/ing', 
		component: Download.Ing,
	}
]

export default routes