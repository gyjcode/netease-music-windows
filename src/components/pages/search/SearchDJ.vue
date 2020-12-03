<template>
	<div class="search-dj-container">
		<div class="djs">
			<div
			class="dj"
			v-for="(dj, i) in djs"
			:key="i">
				<router-link
				tag="div"
				:to="`/page/dj/`+dj.id"
				class="pic-box">
					<img :src="dj.picUrl + '?param=100y100'" alt="">
				</router-link>
				<router-link
				tag="div"
				:to="`/page/dj/`+dj.id"
				v-html="dj.name.replace(searchRoot.keywords, '<span>'+ searchRoot.keywords +'</span>')"
				class="name">
				</router-link>
				<router-link
				tag="div"
				:to="`/page/user/`+ dj.creatorId"
				v-if="dj.creatorId"
				class="creator">
					by {{ dj.creatorName }}
				</router-link>
			</div>
		</div>
		<Paging @current="getCurrentPage" :all="pageCount"></Paging>
	</div>
</template>

<script>
	export default{
		inject: ["searchRoot"],
		data(){
			return{
				djs: [],
				pageCount: 1,
				pageCurrent: 1,
			};
		},
		mounted() {
			this.searchDJ()
		},
		methods:{
			// 获取单曲搜索结果
			async searchDJ(){
				const data = await this.$api.getSearch({
					keywords: this.searchRoot.keywords,
					type: this.searchRoot.type,
					limit: 20,
					offset: (this.pageCurrent - 1) * 20
				})
				console.log(data)
				if(data.code === 200){
					const result = data.result.djRadios.map((djRadios)=>{
						return {
							id: djRadios.id,
							name: djRadios.name,
							picUrl: djRadios.picUrl,
							trackCount: djRadios.trackCount,
							creatorId: djRadios.dj.userId,
							creatorName: djRadios.dj.nickname,
						}
					})
					
					this.djs = result
					this.pageCount = Math.ceil(data.result.djRadiosCount / 20)
					this.searchRoot.countMsg = "找到了"+ data.result.djRadiosCount +"个电台"
				}
			},
			getCurrentPage(num){
				this.pageCurrent = num
			}
		},
		watch:{
			$route:{
				handler(newVal, oldVal){
					this.searchDJ()
				},
				deep: true
			},
			pageCurrent(newVal, oldVal){
				this.searchDJ()
			}
		},
	}
</script>

<style lang="scss" scoped>
	.search-dj-container{
		position: relative;
		.djs{
			position: relative;
			.dj{
				position: relative;
				display: flex;
				flex-direction: row;
				width: auto;
				height: 80px;
				line-height: 80px;
				padding: 0 20px;
				overflow: hidden;
				background: #f1f2f3;
				&:nth-child(2n){
					background: #f9f9f9;
				}
				&:hover{
					background: #eee;
				}
				.pic-box{
					cursor: pointer;
					flex: 0 0 60px;
					height: 60px;
					margin: 10px 20px;
					border-radius: 5px;
					overflow: hidden;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.name{
					cursor: pointer;
					flex-grow: 1;
					display: block;
					height: 100%;
					width: 100%;
					font-size: 12px;
					color: #333;
					/deep/span{
						color: #0c73c6;
					}
				}
				.creator{
					cursor: pointer;
					display: block;
					width: 100%;
					height: 100%;
					font-size: 12px;
					color: #999;
				}
			}
		}
	}
</style>
