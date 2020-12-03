<template>
	<div class="search-mv-container">
		<div class="mvs">
			<div
			class="mv"
			v-for="(mv, i) in mvs"
			:key="i">
				<router-link
				tag="div"
				:to="`/page/mv/`+mv.id"
				:style="'height:'+picBoxHeight+'px'"
				ref="picBox"
				class="pic-box">
					<div class="mask"></div>
					<img :src="mv.picUrl + '?param=360y200'" alt="">
					<div class="play-count">
						<i class="iconfont icon-player-start-s"></i>
						<span>{{ mv.playCount|formatNumber }}</span>
					</div>
					<div class="duration">
						{{ mv.duration|formatDate("mm:ss") }}
					</div>
				</router-link>
				<router-link
				tag="div"
				:to="`/page/mv/`+mv.id"
				v-html="mv.name.replace(searchRoot.keywords, '<span>'+ searchRoot.keywords +'</span>')"
				class="name">
				</router-link>
				<router-link
				tag="div"
				:to="`/page/user/`+ mv.artists[0].id"
				v-if="mv.artists.length"
				class="artists">
					by {{ mv.artists[0].name }}
				</router-link>
			</div>
		</div>
		<Paging @current="getCurrentPage" :all="pageCount"></Paging>
	</div>
</template>

<script>
	import {formatDate, formatNumber} from '@/utils'
	export default{
		inject: ["searchRoot"],
		data(){
			return{
				mvs: [],
				picBoxHeight: 120,
				pageCount: 1,
				pageCurrent: 1,
			};
		},
		mounted() {
			this.searchMV()
		},
		updated(){    // mounted 无法找到使用了 v-if、v-show 或者 v-for 渲染的 DOM 节点
			// console.log(this)
			if(this.$refs.picBox) this.picBoxHeight = this.$refs.picBox[0].$el.offsetWidth / 400 * 220
			window.addEventListener('resize', () => {
				this.picBoxHeight = this.$refs.picBox[0].$el.offsetWidth / 400 * 220
			}, false);
		},
		methods:{
			// 获取单曲搜索结果
			async searchMV(){
				const data = await this.$api.getSearch({
					keywords: this.searchRoot.keywords,
					type: this.searchRoot.type,
					limit: 24,
					offset: (this.pageCurrent - 1) * 24
				})
				// console.log(data)
				if(data.code === 200){
					const result = data.result.mvs.map((mvs)=>{
						return {
							id: mvs.id,
							name: mvs.name,
							picUrl: mvs.cover,
							duration: mvs.duration,
							playCount: mvs.playCount,
							artists: mvs.artists.map((artists)=>{
								return {
									id: artists.id,
									name: artists.name
								}
							}),
						}
					})
					
					this.mvs = result
					this.pageCount = Math.ceil(data.result.mvCount / 20)
					this.searchRoot.countMsg = "找到了"+ data.result.mvCount +"个MV"
				}
			},
			getCurrentPage(num){
				this.pageCurrent = num
			}
		},
		watch:{
			$route:{
				handler(newVal, oldVal){
					this.searchMV()
				},
				deep: true
			},
			pageCurrent(newVal, oldVal){
				this.searchMV()
			}
		},
	}
</script>

<style lang="scss" scoped>
	.search-mv-container{
		position: relative;
		.mvs{
			position: relative;
			width: auto;
			height: auto;
			.mv{
				float: left;
				position: relative;
				width: calc(25% - 30px);
				margin-bottom: 20px;
				padding: 0 15px;
				overflow: hidden;
				.pic-box{
					cursor: pointer;
					position: relative;
					width: auto;
					height: 200px;
					border-radius: 5px;
					overflow: hidden;
					font-size: 10px;
					color: #fff;
					.mask{
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						box-shadow: inset 3px 3px 30px #5555;
					}
					img{
						width: 100%;
						height: 100%;
					}
					.play-count{
						position: absolute;
						top: 3px;
						right: 5px;
						i.iconfont{
							font-size: 10px;
						}
					}
					.duration{
						position: absolute;
						bottom: 3px;
						right: 5px;
					}
				}
				.name{
					cursor: pointer;
					display: block;
					height: 20px;
					line-height: 20px;
					width: 100%;
					font-size: 12px;
					color: #333;
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
					white-space: nowrap;
					/deep/span{
						color: #0c73c6;
					}
				}
				.artists{
					cursor: pointer;
					display: block;
					width: 100%;
					height: 20px;
					line-height: 20px;
					line-height: 20px;
					font-size: 10px;
					color: #999;
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
				}
			}
		}
	}
</style>
