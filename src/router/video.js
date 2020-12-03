// 发现页路由
import Video from '@/components/pages/video/index.js'

let routes=[
	{
		path: '/video', 
		redirect: '/video/all',
	},
	{
		path: '/video/all', 
		component: Video.All,
	},
	{
		path: '/video/mv', 
		component: Video.MV,
	}
]

export default routes