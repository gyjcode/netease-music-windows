// 发现页路由
import Subscribe from '@/components/pages/subscribe/index.js'

let routes=[
	{
		path: '/subscribe', 
		redirect: '/subscribe/album',
	},
	{
		path: '/subscribe/album', 
		component: Subscribe.Album,
	},
	{
		path: '/subscribe/artist', 
		component: Subscribe.Artist,
	},
	{
		path: '/subscribe/video', 
		component: Subscribe.Video,
	},
	{
		path: '/subscribe/column', 
		component: Subscribe.Column,
	}
]

export default routes