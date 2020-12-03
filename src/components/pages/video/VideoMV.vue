<template>
	<div class="video-mv-container">
		<div class="content">
			<!-- 最新 MV -->
			<div class="new">
				<Title
				class="title"
				title="MV排行榜">
					<div class="areas">
						<div
						:class="['area' , newMVArea === area ? 'active' : '']"
						@click="newMVArea = area"
						v-for="(area,i) in areas"
						:key="i">
							{{ area }}
						</div>
					</div>
				</Title>
				<MVPicBox :data="newMVs"></MVPicBox>
			</div>
			<!-- 热播 MV -->
			<div class="hot">
				<Title
				class="title"
				title="热播MV"></Title>
				<MVPicBox :data="hotMVs"></MVPicBox>
			</div>
			<!-- 网易出品 -->
			<div class="wangyi">
				<Title
				class="title"
				title="网易出品"></Title>
				<MVPicBox :data="wangyiMVs"></MVPicBox>
			</div>
			<!-- MV 排行榜 -->
			<div class="ranking">
				<Title
				class="title"
				title="MV排行榜">
					<div class="areas">
						<div
						:class="['area' , rankingMVArea === area ? 'active' : '']"
						@click="rankingMVArea = area"
						v-for="(area,i) in areas"
						:key="i">
							{{ area }}
						</div>
					</div>
				</Title>
				<MVPicText :data="rankingMVs"></MVPicText>
			</div>
		</div>
	</div>
</template>

<script>
	import MVPicBox from '@/components/pages/video/modules/MVPicBox.vue'
	import MVPicText from '@/components/pages/video/modules/MVPicText.vue'
	
	export default{
		components:{
			MVPicBox,
			MVPicText
		},
		data(){
			return{
				areas:  ['内地', '港台', '欧美', '日本', '韩国'],
				newMVArea: '',
				newMVs: [],
				hotMVs: [],
				wangyiMVs: [],
				rankingMVArea: '',
				rankingMVs: [],
			};
		},
		created() {
			this.newMV()
			this.hotMV()
			this.wangyiMV()
			this.rankingMV()
		},
		methods:{
			// 最新 MV
			async mvAll(params){
				// 传入一个对象 {area, type, order, limit, offset}
				const data = await this.$api.getMVAll(params);
				// console.log(data)
				if(data.code === 200){
					const videos = data.data.map((data)=>{
						return {
							id: data.id,
							name: data.name,
							picUrl: data.cover,
							playTime: data.duration,
							playCount: data.playCount,
							artistId:  data.artistId,
							artistName: data.artistName,
						}
					})
					return videos
				}
			},
			// 最新 MV
			newMV(){
				this.mvAll({
					area: this.newMVArea,
					order: '最新',
					limit: 8
				}).then(r=>{
					this.newMVs = r
				})
			},
			// 热播 MV
			hotMV(){
				this.mvAll({
					order: '最热',
					limit: 8
				}).then(r=>{
					this.hotMVs = r
				})
			},
			// 网易 MV
			async wangyiMV(){
				const data = await this.$api.getMVExclusiveRecommend(8);
				// console.log(data)
				if(data.code === 200){
					const videos = data.data.map((data)=>{
						return {
							id: data.id,
							name: data.name,
							picUrl: data.cover,
							duration: data.duration,
							playCount: data.playCount,
							artistId:  data.artistId,
							artistName: data.artistName,
						}
					})
					this.wangyiMVs = videos
				}
			},
			// MV 排行榜
			async rankingMV(){
				const data = await this.$api.getMVTop({area: this.rankingMVArea, limit: 8});
				// console.log(data)
				if(data.code === 200){
					const videos = data.data.map((data)=>{
						return {
							id: data.id,
							name: data.name,
							picUrl: data.cover,
							duration: data.duration,
							playCount: data.playCount,
							artistId:  data.artistId,
							artistName: data.artistName,
						}
					})
					this.rankingMVs = videos
				}
			},
		},
		watch:{
			newMVArea(newVal, oldVal){
				this.newMV()
			},
			rankingMVArea(newVal, oldVal){
				this.rankingMV()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video-mv-container{
		position: relative;
		margin: 20px 0 0;
		.content{
			margin: 20px 0 0;
			/deep/.title-container{
				.areas{
					float: right;
					display: block;
					height: 30px;
					line-height: 30px;
					.area{
						cursor: pointer;
						float: left;
						position: relative;
						display: block;
						width: auto;
						height: 10px;
						line-height: 10px;
						margin: 5px 7px;
						padding: 5px 9px;
						border-radius: 16px;
						font-size: 12px;
						text-align: center;
						color: #999;
						&:after{
							content: "";
							position: absolute;
							left: -7px;
							width: 1px;
							height: 10px;
							background: #e1e1e1;
						}
						&:first-child:after{
							display: none;
						}
						&:hover{
							color: #333;
						}
						&.active{
							color: #ec4141;
							background: #fcebeb;
						}
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.video-mv-container{
		margin: 10px 0 0;
		.content{
			margin: 10px 0 0;
			/deep/.title-container{
				.areas{
					float: right;
					display: block;
					height: 30px;
					line-height: 30px;
					.area{
						margin: 2px 5px;
						padding: 3px 5px;
						font-size: 10px;
						&:after{
							display: none;
						}
					}
				}
			}
		}
	}
}
</style>
