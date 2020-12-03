<template>
	<div class="video-all-container">
		<div class="header">
			<TagSelect
			@selectedTag="getSelectedTag"
			class="select-tag"></TagSelect>
		</div>
		<div class="content">
			<MVPicBox :data="videos"></MVPicBox>
		</div>
	</div>
</template>

<script>
	import {formatDate, formatNumber} from '@/utils'
	import TagSelect from '@/components/pages/video/modules/TagSelect.vue'
	import MVPicBox from '@/components/pages/video/modules/MVPicBox.vue'
	
	export default{
		components:{
			TagSelect,
			MVPicBox
		},
		data(){
			return{
				selectedTag: {id: 58100, name: "现场"},
				videos: [],
			}
		},
		created() {
			this.mvAll()
		},
		methods:{
			// 获取选中的标签
			getSelectedTag(tag){
				this.selectedTag = tag
			},
			async mvAll(){
				const data = await this.$api.getMVAll({})
				// console.log(data)
				if(data.code === 200){
					const videos = data.data.map((data)=>{
						return {
							id: data.id,
							name: data.name,
							picUrl: data.cover,
							playTime: data.duration,
							playCount: data.playCount,
							artistId: data.artistId,
							artistName: data.artistName,
						}
					})
					this.videos = videos
				}
			}
		},
		watch:{
			selectedTag(newVal, oldVal){
				if(newVal != oldVal){
					this.mvAll()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video-all-container{
		position: relative;
		margin: 20px 0 0;
		background: none;
		.header{
			margin: 20px 0 0;
			.select-tag{
				width: 100%;
			}
		}
		.content{
			margin: 20px 0 0;
		}
	}
@media screen and (max-width: 540px) {
	.video-all-container{
		margin: 10px 0 0;
		.header{
			margin: 10px 0 0;
			.select-tag{
				width: 100%;
			}
		}
		.content{
			margin: 10px 0 0;
		}
	}
}
</style>
