<template>
	<div class="ranking-container">
		<div class="rank-list">
			<Title title="官方榜"></Title>
			<div class="items">
				<RankingTableBox
				class="item"
				:data="item"
				v-for="(item, i) in rankOfficialItems"
				:key="i"></RankingTableBox>
			</div>
		</div>
		
		<div class="rank-box">
			<Title title="全球榜"></Title>
			<div class="items">
				<RankingPicBox
				class="item"
				:data="item"
				v-for="(item, i) in rankGlobalItems"
				:key="i"></RankingPicBox>
			</div>
		</div>
	</div>
</template>

<script>
	import RankingTableBox from '@/components/pages/discover/modules/RankingTableBox.vue'
	import RankingPicBox from '@/components/pages/discover/modules/RankingPicBox.vue'
	
	export default{
		components:{
			RankingTableBox,
			RankingPicBox
		},
		data(){
			return{
				rankOfficialItems: [],
				rankGlobalItems: []
			};
		},
		created() {
			this.toplistDetail()
			this.toplist()
		},
		methods:{
			async toplistDetail() {
				const data = await this.$api.getToplistDetial()
				// console.log(data)
				let result=[]
				const  rankInfo = [
							{
								title: ['飙','升','榜'],
								colorBegin: "#3c8ede",
								colorEnd: "#628fef"
							},
							{
								title: ['新','歌','榜'],
								colorBegin: "#2ba3bb",
								colorEnd: "#44c4cd"
							},
							{
								title: ['原','创','榜'],
								colorBegin: "#b52b54",
								colorEnd: "#ec5582"
							},
							{
								title: ['热','歌','榜'],
								colorBegin: "#ba4431",
								colorEnd: "#cd6d45"
							},
							{
								title: ['歌','手','榜'],
								colorBegin: "#8135c2",
								colorEnd: "#9957be"
							},
						]
				if(data.code === 200){
					result = data.list.slice(0, rankInfo.length).map((list, index)=>{
						return {
							id: list.id,
							name: list.name,
							updateTime: list.updateTime,
							coverImgUrl: list.coverImgUrl,
							title: rankInfo[index].title,
							colorBegin: rankInfo[index].colorBegin,
							colorEnd: rankInfo[index].colorEnd,
						}
					})
					this.rankOfficialItems =result
				}
			},
			async toplist(){
				const data = await this.$api.getToplist()
				// console.log(data)
				let result=[]
				if(data.code === 200){
					result = data.list.slice(8, data.list.length).map((list, index)=>{
						return {
							id: list.id,
							name: list.name,
							picUrl: list.coverImgUrl,
							playCount: list.playCount
						}
					})
				}
				this.rankGlobalItems =result
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.ranking-container{
		position: relative;
		height: 100%;
		background: #fafafa;
		overflow: hidden;
		.rank-list{
			
		}
		.rank-box{
			.items{
				.item{
					float: left;
					width: calc(15% - 2px);
					margin: 0;
					margin-bottom: 10px;
					margin-right: 2%;
					&:nth-child(6n){
						margin-right: 0;
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.ranking-container{
		.rank-box{
			.items{
				.item{
					float: left;
					width: calc(33.33% - 20px);
					margin: 10px;
					margin-top: 0;
				}
			}
		}
	}
}
</style>
