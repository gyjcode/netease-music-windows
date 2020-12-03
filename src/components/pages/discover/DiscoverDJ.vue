<template>
	<div class="discover-dj-container">
		<Banner :data="banners"></Banner>
		<DJScrollItemsH class="scrolling-items" :data = "scrollItems"></DJScrollItemsH>
		<!-- 付费精品 -->
		<Title title="付费精品"></Title>
		<DJPay></DJPay>
		<!-- 创作|翻唱 -->
		<Title title="创作翻唱" url="/page/dj/category/2001"></Title>
		<DJPicBox :data="createItems" ></DJPicBox>
		<!-- 3D|电子 -->
		<Title title="3D|电子" url="/page/dj/category/10002"></Title>
		<DJPicBox
		:data="threeDItems"
		></DJPicBox>
		<!-- 音乐故事 -->
		<Title title="音乐故事" url="/page/dj/category/2"></Title>
		<DJPicBox
		:data="storyItems"
		></DJPicBox>
		<!-- 情感调频 -->
		<Title title="情感调频" url="/page/dj/category/3"></Title>
		<DJPicBox
		:data="emotionItems"
		></DJPicBox>
		<!-- 二次元 -->
		<Title title="二次元" url="/page/dj/category/3001"></Title>
		<DJPicBox
		:data="secondDItems"
		></DJPicBox>
	</div>
</template>

<script>
	import DJScrollItemsH from '@/components/pages/discover/modules/DJScrollItemsH.vue'
	import DJPay from '@/components/pages/discover/modules/DJPay.vue'
	import DJPicBox from '@/components/pages/discover/modules/DJPicBox.vue'
	
	export default{
		components:{
			DJScrollItemsH,
			DJPay,
			DJPicBox
		},
		data(){
			return{
				banners: [],
				scrollItems:[],
				createName: '',
				createItems: [],
				threeDName: '',
				threeDItems: [],
				storyName: '',
				storyItems: [],
				emotionName: '',
				emotionItems: [],
				secondDName: '',
				secondDItems: [],
			};
		},
		created() {
			this.banner()
			this.categories()
			this.createAndCover()
			this.threeDAndElectron()
			this.musicStory()
			this.emotion()
			this.secondD()
		},
		methods:{
			// 轮播图
			async banner(){
				const data = await this.$api.getDJBanner();
				// console.log(data)
				if(data.code === 200){
					const banners = data.data.map((data)=>{
						return {
							url: data.url,
							picUrl: data.pic
						}
					})
					this.banners = banners
				}
			},
			// 分类图标
			async categories(){
				const data = await this.$api.getDJCategorylist();
				// console.log(data)
				if(data.code === 200){
					const result = data.categories.map((categories)=>{
						return {
							id: categories.id,
							name: categories.name,
							picUrl: categories.pic56x56Url
						}
					})
					this.scrollItems = result
				}
			},
			// 类别热门电台
			async djRadioHot(params){
				// 传入一个对象 {limit, offset, cateId}
				const data = await this.$api.getDJRadioHot(params);
				let result = []
				// console.log(data)
				if(data.code === 200){
					result = data.djRadios.map((djRadios)=>{
						return {
							id: djRadios.id,
							name: djRadios.name,
							url: djRadios.url,
							rcmdText: djRadios.rcmdtext,
							picUrl: djRadios.picUrl,
							moreUrl: null,
						}
					})
				}
				return result    // 注意返回的是 Promise 对象
			},
			// 创作|翻唱
			createAndCover(){
				this.createName = '创作|翻唱'
				this.djRadioHot({limit: 6, cateId: 2001}).then(r=>{
					this.createItems = r.splice(0, 6)
				})
				
			},
			// 3D|电子
			threeDAndElectron(){
				this.threeDName = '3D|电子'
				this.djRadioHot({limit: 6, cateId: 10002}).then(r=>{
					this.threeDItems = r.splice(0, 6)
				})
			},
			// 音乐故事
			musicStory(){
				this.storyName = '音乐故事'
				this.djRadioHot({limit: 6, cateId: 2}).then(r=>{
					this.storyItems = r.splice(0, 6)
				})
			},
			// 情感调频
			emotion(){
				this.emotionName = '情感调频'
				this.djRadioHot({limit: 6, cateId: 3}).then(r=>{
					this.emotionItems = r.splice(0, 6)
				})
			},
			// 二次元
			secondD(){
				this.secondDName = '二次元'
				this.djRadioHot({limit: 6, cateId: 3001}).then(r=>{
					this.secondDItems = r.splice(0, 6)
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.discover-dj-container{
		position: relative;
		height: 100%;
		background: #fafafa;
		overflow: hidden;
		.scrolling-items{
			width: 100%;
		}
	}
</style>
