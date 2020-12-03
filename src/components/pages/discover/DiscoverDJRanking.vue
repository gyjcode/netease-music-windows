<template>
	<div class="discover-dj-ranking-container" ref="newContainer">
		<div class="header">
			<div class="tabs">
				<div
				:class="['tab', {active: currentTab === 'program' }]"
				@click="toggleTabs('program')">
					节目榜
				</div>
				<div
				:class="['tab', {active: currentTab === 'new' }]"
				@click="toggleTabs('new')">
					新晋电台榜
				</div>
				<div
				:class="['tab', {active: currentTab === 'hot' }]"
				@click="toggleTabs('hot')">
					热门电台榜
				</div>
			</div>
		</div>
		<div class="body">
			<div class="main">
				<DJRankingTable :data="rankData"></DJRankingTable>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	import {createSong} from '@/utils'
	import DJRankingTable from '@/components/pages/discover/modules/DJRankingTable.vue'
	
	export default{
		components:{
			DJRankingTable
		},
		data(){
			return{
				currentTab: 'program',
				rankData: []
			};
		},
		created() {
			this.rankProgram()
		},
		methods:{
			...mapMutations('music', [
				'setIsPlayListShow',
				'setCurrentSong'
			]),
			// 切换播放列表&历史记录
			toggleTabs(name){
				this.currentTab = name
			},
			async rankNewAndHot() {
				const data = await this.$api.getDJToplist({
					type: this.currentTab
				})
				// console.log(data)
				if(data.code === 200){
					const result = data.toplist.map((toplist)=>{
						return {
							id: toplist.id,
							name: toplist.name,
							picUrl: toplist.picUrl,
							score: toplist.score,
							rank: toplist.rank,
							lastRank: toplist.lastRank,
							creatorId: toplist.dj.userId,
							creatorName: toplist.dj.nickname,
							categoryId: toplist.categoryId,
							categoryName: toplist.category,
						}
					})
					this.rankData = result
				}
			},
			async rankProgram() {
				const data = await this.$api.getDJToplistProgram({})
				// console.log(data)
				if(data.code === 200){
					const result = data.toplist.map((toplist)=>{
						return {
							id: toplist.program.id,
							name: toplist.program.name,
							picUrl: toplist.program.coverUrl,
							score: toplist.score,
							rank: toplist.rank,
							lastRank: toplist.lastRank,
							creatorId: toplist.program.dj.userId,
							creatorName: toplist.program.dj.nickname,
							categoryId: toplist.program.radio.categoryId,
							categoryName: toplist.program.radio.category,
							mainSong: createSong({
								id: toplist.program.mainSong.id,
								name: toplist.program.mainSong.name,
								mvid: toplist.program.mainSong.mvid,
								picUrl: toplist.program.mainSong.album.picUrl,
								duration: toplist.program.mainSong.duration,
								artists: toplist.program.mainSong.artists.map((artists)=>{
											return {
												id: artists.id,
												name: artists.name,
												picUrl: artists.picUrl
											}
										}),
								albumId: toplist.program.mainSong.album.id,
								albumName: toplist.program.mainSong.album.name,
								albumPicUrl: toplist.program.mainSong.album.picUrl,
							})
						}
					})
					this.rankData = result
				}
			}
		},
		watch:{
			currentTab(newVal, oldVal){
				if(newVal !== oldVal){
					if(newVal === "program"){
						this.rankProgram()
					}else{
						this.rankNewAndHot()
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.discover-dj-ranking-container{
		position: relative;
		margin: 20px 0 0;
		width: auto;
		height: 100%;
		overflow: hidden;
		.header{
			width: 100%;
			height: 40px;
			line-height: 40px;
			text-align: center;
			.tabs{
				display: inline-block;
				width: auto;
				height: 32px;
				margin: 7px auto;
				border: 1px solid #ccc;
				border-radius: 5px;
				line-height: 34px;
				border-radius: 34px;
				overflow: hidden;
				.tab{
					cursor: pointer;
					float: left;
					margin: 0;
					border: 0;
					padding: 0 40px;
					font-size: 13px;
					border-radius: 34px;
					&.active{
						color: #fff;
						background: #aaa;
						&:hover{
							background: #aaa;
						}
					}
					&:hover{
						background: #f4f4f4;
					}
				}
			}
		}
		.body{
			position: relative;
			width: 100%;
			height: calc(100% - 40px);
			margin-top: 40px;
			background: #fafafa;
			.main{
				width: 100%;
				height: auto;
			}
		}
	}
@media screen and (max-width: 540px) {
	.discover-dj-ranking-container{
		margin: 10px 0 0;
		.header{
			height: 30px;
			line-height: 30px;
			.tabs{
				height: 24px;
				margin: 5px auto;
				line-height: 24px;
				border-radius: 24px;
				.tab{
					padding: 0 20px;
					font-size: 10px;
					border-radius: 24px;
				}
			}
		}
		.body{
			height: calc(100% - 10px);
			margin-top: 10px;
		}
	}
}
</style>
