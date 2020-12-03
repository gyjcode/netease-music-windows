// 基础页面路由
import Base from '@/components/pages/base/index.js'

let routes=[
	{	// 用户页面
		path: '/page/user/:id', 
		component: Base.PageUser,
		props: true
	},
	{	// 每日推荐
		path: '/page/recommend/daily', 
		component: Base.PageRecommendDaily,
	},
	{	// 歌单页面
		path: '/page/playlist/:id', 
		component: Base.PagePlaylist,
		props: true
	},
	{	// 歌手页面
		path: '/page/artist/:id', 
		component: Base.PageArtist,
		props: true
	},
	{	// 专辑页面
		path: '/page/album/:id', 
		component: Base.PageAlbum,
		props: true
	},
	{	// 电台页面
		path: '/page/dj/:id', 
		component: Base.PageDJ,
		props: true
	},
	{	// 电台-付费精品页面
		path: '/page/dj/pay/:id', 
		component: Base.PageDJPay,
		props: true
	},
	{	// 电台-分类页面
		path: '/page/dj/category/:id', 
		component: Base.PageDJCategory,
		props: true
	},
	{	// 视频-MV页面
		path: '/page/mv/:id', 
		component: Base.PageMV,
		props: true
	}
]

export default routes