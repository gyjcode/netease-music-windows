<template>
	<div class="search-singer-container">
		<div class="singers">
			<router-link
			tag="div"
			:to="`/page/artist/`+singer.id"
			class="singer"
			v-for="(singer, i) in singers"
			:key="i">
				<div class="pic-box">
					<img :src="singer.picUrl + '?param=100y100'" alt="">
				</div>
				<div class="name">
					{{ singer.name }}
				</div>
				<div v-show="singer.accountId" class="icon">
					<i class="iconfont icon-people-s"></i>
				</div>
			</router-link>
		</div>
		<Paging @current="getCurrentPage" :all="pageCount"></Paging>
	</div>
</template>

<script>
	export default{
		inject: ["searchRoot"],
		data(){
			return{
				singers: [],
				pageCount: null,
				pageCurrent: 1,
			};
		},
		mounted() {
			this.searchSinger()
		},
		methods:{
			// 获取单曲搜索结果
			async searchSinger(){
				const data = await this.$api.getSearch({
					keywords: this.searchRoot.keywords,
					type: this.searchRoot.type,
					limit: 20,
					offset: (this.pageCurrent - 1) * 20
				})
				// console.log(data)
				if(data.code === 200){
					const result = data.result.artists.map((artists)=>{
						return {
							id: artists.id,
							name: artists.name,
							picUrl: artists.img1v1Url,
							accountId: artists.accountId,
						}
					})
					
					this.singers = result
					this.pageCount = Math.ceil(data.result.artistCount / 20)
					this.searchRoot.countMsg = "找到了"+ data.result.artistCount +"位歌手"
				}
			},
			getCurrentPage(num){
				this.pageCurrent = num
			}
		},
		watch:{
			$route:{
				handler(newVal, oldVal){
					this.searchSinger()
				},
				deep: true
			},
			pageCurrent(newVal, oldVal){
				this.searchSinger()
			}
		},
	}
</script>

<style lang="scss" scoped>
	.search-singer-container{
		position: relative;
		.singers{
			position: relative;
			.singer{
				cursor: pointer;
				position: relative;
				width: auto;
				height: 80px;
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
					float: left;
					width: 60px;
					height: 60px;
					margin: 10px;
					border-radius: 5px;
					overflow: hidden;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.name{
					position: relative;
					transform: translateY(-50%);
					top: 50%;
					font-size: 13px;
					color: #333;
				}
				.icon{
					position: absolute;
					transform: translateY(-50%);
					top: 50%;
					right: 20px;
					color: #ef4444;
					i.iconfont{
						font-size: 16px;
					}
				}
			}
		}
	}
</style>
