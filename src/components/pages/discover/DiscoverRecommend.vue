<template>
	<div class="discover-recommend-container">
		<Banner :data="banners"></Banner>
		
		<Title title="推荐歌单" url="/discover/playlist"></Title>
		<PlaylistRecommend></PlaylistRecommend>
		
		<Title title="独家放送" url="/video/all"></Title>
		<MVExclusive></MVExclusive>
		
		<Title title="最新音乐" url="/discover/new"></Title>
		<NewSongRecommend></NewSongRecommend>
		
		<Title title="推荐MV" url="/video/mv"></Title>
		<MVPicBox></MVPicBox>
		
		<Title title="主播电台" url="/discover/dj"></Title>
		<DJPicBox :data="djItems"></DJPicBox>
	</div>
</template>

<script>
	import PlaylistRecommend from '@/components/pages/discover/modules/PlaylistRecommend.vue'
	import MVExclusive from '@/components/pages/discover/modules/MVExclusive.vue'
	import NewSongRecommend from '@/components/pages/discover/modules/NewSongRecommend.vue'
	import MVPicBox from '@/components/pages/discover/modules/MVPicBox.vue'
	import DJPicBox from '@/components/pages/discover/modules/DJPicBox.vue'
	
	export default{
		components:{
			PlaylistRecommend,
			MVExclusive,
			NewSongRecommend,
			MVPicBox,
			DJPicBox,
		},
		data(){
			return{
				banners: [],
				djName: '',
				djItems: [],
			};
		},
		created() {
			this.banner()
			this.personalizedDJProgram()
		},
		methods:{
			// 轮播图
			async banner(){
				const data = await this.$api.getBanner();
				// console.log(data)
				if(data.code === 200){
					const banners = data.banners.map((banners)=>{
						return {
							url: banners.url,
							picUrl: banners.imageUrl
						}
					})
					this.banners = banners
				}
			},
			// 主播电台
			async personalizedDJProgram(){
				const data = await this.$api.getPersonalizedDJProgram();
				// console.log(data)
				if(data.code === 200){
					const result = data.result.map((result)=>{
						return {
							id: result.program.radio.id,
							name: result.program.radio.name,
							rcmdText: result.program.radio.rcmdText,
							picUrl: result.program.radio.picUrl,
							moreUrl: null,
						}
					})
					this.djItems = result
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.discover-recommend-container{
		position: relative;
		height: 100%;
		background: #fafafa;
		overflow: hidden;
	}
</style>
