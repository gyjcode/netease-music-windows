<template>
	<div class="dj-ranking-table-container">
		<div class="content" >
			<el-table
			stripe
			lazy
			:data="data"
			@cell-click="cellClick"
			:show-header="false"
			style="width: 100%">
				<!-- 序列号 -->
				<el-table-column
				class-name="serial"
				type="index"
				width="50">
					<template slot-scope="scope">
						<div :class="['rank', 'rank-' + (scope.$index+1)]">{{ scope.$index+1 }}</div>
						<div
						v-show="scope.row.lastRank != -1"
						class="trend">
							<div
							v-if="scope.row.lastRank - scope.row.rank > 0"
							class="sign up el-icon-top"></div>
							<div
							v-if="scope.row.lastRank - scope.row.rank == 0"
							class="sign zero">-</div>
							<div
							v-if="scope.row.lastRank - scope.row.rank < 0"
							class="sign down el-icon-bottom"></div>
							<div class="num">
								{{ Math.abs(scope.row.lastRank - scope.row.rank) }}
							</div>
						</div>
						<div
						v-show="scope.row.lastRank == -1"
						class="trend">
							<div class="new">
								new
							</div>
						</div>
					</template>
				</el-table-column>
				<!-- 歌曲名称 -->
				<el-table-column
				class-name="avatar"
				width="80">
					<template slot-scope="scope">
						<i
						v-if="scope.row.mainSong"
						@click="playCurrentSong(scope.row.mainSong)"
						class="iconfont icon-player-start-l"></i>
						<el-image
						:src="scope.row.picUrl + '?param=60y60'"
						fit="cover"
						:lazy="false">
							<div slot="placeholder" class="loading">
								<i class="el-icon-loading"></i>
							</div>
							<div slot="error" class="error">
								<i class="el-icon-picture-outline"></i>
							</div>
						</el-image>
					</template>
				</el-table-column>
				<!-- 歌曲名称 -->
				<el-table-column
				class-name="name"
				prop="name"
				min-width="100">
				</el-table-column>
				<!-- 歌手名称 -->
				<el-table-column
				class-name="creator"
				prop="creatorName"
				min-width="50">
				</el-table-column>
				<!-- 歌曲 -->
				<el-table-column
				class-name="category"
				prop="categoryName"
				min-width="80">
				</el-table-column>
				<!-- 歌曲时长 -->
				<el-table-column
				class-name="score"
				width="50">
					<template slot-scope="scope">
						<el-progress
						:percentage="scope.row.score/maxScore*100"
						:show-text="false"
						color="#959595"></el-progress>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	import {formatOrderNum} from '@/utils'
	
	export default{
		props:{
			data:{
				type: Array,
				required: true
			}
		},
		methods:{
			...mapMutations('music', [
				'setCurrentSong',
				'setPlaylist'
			]),
			playCurrentSong(song){
				this.setCurrentSong(song)
			},
			// 单元格点击事件
			cellClick(row, column){
				console.log(row)
				switch (column.className){
					case 'name':
						if(row.mainSong){
							this.setCurrentSong(row.mainSong)
							let playlist = []
							this.data.forEach((item)=>{
								playlist.push(item.mainSong)
							})
							this.setPlaylist(playlist)
						}else{
							this.$router.push("/page/dj/"+ row.id)
						}
						break;
					case 'creator':
						this.$router.push("/page/user/"+ row.creatorId)
						break;
					case 'category':
						this.$router.push("/page/dj/category/"+ row.categoryId)
						break;
					default:
				}
			}
		},
		computed:{
			...mapState('music', [
				'currentSong'
			]),
			// 获取最大值用于计算进度条——目前不知道网易怎么计算的
			maxScore(){
				return Math.max.apply(Math, this.data.map(item => { return item.score }))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dj-ranking-table-container{
		position: relative;
		margin: 0 0 20px;
		.content{
			/deep/.el-table{
				margin: 20px 0 0;
				.el-table__row{
					height: 80px;
					overflow: hidden;
					&:hover>td{
						background: #efefef;
					}
					td{
						cursor: default;
						height: auto;
						width: auto;
						padding: 0 10px;
						div.cell{
							position: relative;
							width: auto;
							height: 60px;
							line-height: 60px;
							margin: 0;
							padding: 0;
							color: #777;
							overflow: hidden;
						}
					}
					td.serial{
						div.cell{
							text-align: center;
							font-size: 13px;
							color: #ccc;
							padding: 10px 0;
							.rank{
								height: 20px;
								line-height: 20px;
								font-size: 16px;
								font-weight: bold;
								color: #979797;
								&.rank-1, &.rank-2, &.rank-3{
									color: #ec4141;
								}
							}
							.trend{
								height: 20px;
								width: 30px;
								line-height: 20px;
								.sign{
									display: inline-block;
									color: #777;
									font-size: 8px;
									font-weight: bold;
									&.up{
										color: #ec4141;
									}
									&.down{
										color: #2c77ca;
									}
								}
								.num{
									position: relative;
									top: 1px;
									display: inline-block;
									font-family: "微软雅黑";
									font-size: 13px;
									color: #aaa;
								}
								.new{
									color: #1aa034;
								}
							}
						}
					}
					td.avatar{
						width: 80px;
						height: 80px;
						.cell{
							position: relative;
							width: 60px;
							height: 60px;
							margin: 0;
						}
						i.iconfont{
							z-index: 999;
							position: absolute;
							transform: translate(-50%, -50%);
							top: 50%;
							left: 50%;
							font-size: 36px;
							color: #fff;
							&:hover{
								color: #ec414199;
							}
						}
						.el-image{
							width: 60px;
							height: 60px;
							position: relative;
							background: #f1f1f1;
							img{
								width: 100%;
								height: 100%;
							}
							.error, .loading{
								position: absolute;
								transform: translate(-50%, -50%);
								top: 50%;
								left: 50%;
								font-size: 30px;
								color: #999;
							}
						}
					}
					td.name{
						div.cell{
							color: #555;
						}
					}
					td.creator{
						cursor: pointer;
					}
					td.category{
						cursor: pointer;
						position: relative;
						div.cell{
							display: inline-block;
							position: absolute;
							transform: translateY(-50%);
							top: 50%;
							width: auto;
							height: 18px;
							line-height: 14px;
							color: #bbb;
							border: 1px solid #999;
							border-radius: 1px;
							padding: 1px 2px;
							box-shadow: none;
						}
					}
					td.score{
						cursor: default;
						.el-progress{
							position: relative;
							transform: translateY(-50%);
							top: 50%;
						}
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.dj-ranking-table-container{
		margin: 0 0 10px;
		.content{
			/deep/.el-table{
				margin: 5px 0 0;
				.el-table__row{
					height: 60px;
					td{
						padding: 0 5px;
						div.cell{
							height: 40px;
							line-height: 40px;
						}
					}
					td.serial{
						div.cell{
							font-size: 10px;
							padding: 5px 0;
							.rank{
								height: 16px;
								line-height: 16px;
								font-size: 12px;
							}
							.trend{
								height: 16px;
								width: 20px;
								line-height: 16px;
								.sign{
									font-size: 6px;
								}
								.num{
									font-size: 10px;
								}
							}
						}
					}
					td.avatar{
						width: 50px;
						height: 50px;
						.cell{
							width: 40px;
							height: 40px;
						}
						.el-image{
							width: 40px;
							height: 40px;
							position: relative;
							background: #f1f1f1;
						}
						i.iconfont{
							font-size: 24px;
						}
					}
					td.category{
						display: none!important;
					}
					td.score{
						display: none;
					}
				}
			}
		}
	}
}
</style>
