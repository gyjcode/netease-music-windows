<template>
	<Toggle
	:reserveDoms="reserveDoms"
	:show="isPlayListShow"
	@update:show="setIsPlayListShow(false)">
		<div class="play-list-container" v-show="isPlayListShow">
			<div class="header">
				<div class="tabs">
					<div :class="['tab', {active: currentTab === 'playlist' }]" @click="toggleTabs('playlist')">
						播放列表
					</div>
					<div :class="['tab', {active: currentTab === 'history' }]" @click="toggleTabs('history')">
						历史记录
					</div>
				</div>
				<span class="close" @click="close()">&times;</span>
			</div>
			<div class="body">
				<div class="main">
					<div class="controler">
						<div class="info">共{{tableData.length}}首</div>
						<div class="btns">
							<div class="collect">
								<i class="iconfont icon-collect-l"></i>
								<span @click="subscribeAll" v-show="currentTab === 'playlist'">收藏全部</span>
							</div>
							<div
							@click="clear"
							class="clear">
								<i class="iconfont icon-bin-l"></i>
								<span>清空</span>
							</div>
						</div>
					</div>
					<div class="content">
						<el-table
						stripe
						:data="tableData"
						:show-header="false"
						style="width: 100%"
						@cell-dblclick="cellDblClick">
							<!-- 播放标识 -->
							<el-table-column
							width="30">
								<i
								:class="['iconfont', playingState ? 'icon-player-pause-s' : 'icon-player-start-s']"
								slot-scope="scope"
								v-show="scope.row.id == currentSong.id"></i>
							</el-table-column>
							<!-- 歌曲名称 -->
							<el-table-column
							class-name="name"
							prop="name"
							width="300">
							</el-table-column>
							<!-- 歌手名称 -->
							<el-table-column
							width="120">
								<template slot-scope="scope">{{ scope.row.artists.map(({name})=>name).join('/') }}</template>
							</el-table-column>
							<!-- 歌曲时长 -->
							<el-table-column
							prop="duration"
							:formatter="formatDate"
							width="70">
							</el-table-column>
						</el-table>
					</div>
				</div>
			</div>
		</div>
	</Toggle>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	import moment from 'moment'
	
	export default{
		data(){
			return{
				reserveDoms: null,
				currentTab: 'playlist',
			};
		},
		mounted() {
			// 获取用于判断的父 DOM 元素
			this.reserveDoms = [document.getElementById("player-min")]
		},
		methods:{
			...mapMutations('music', [
				'setIsPlayListShow',
				'setCurrentSong',
				'setPlaylist',
				'setPlayingHistory'
			]),
			// 关闭列表
			close(){
				this.setIsPlayListShow(false)
			},
			// 切换播放列表&历史记录
			toggleTabs(name){
				this.currentTab = name
			},
			// 格式化列表歌曲时间
			formatDate(row){
				return moment(row.duration).format('mm:ss')
			},
			// 双击歌曲名播放当前歌曲
			cellDblClick(row, cell){
				// console.log( cell )
				this.setCurrentSong(row)
			},
			// 收藏全部
			subscribeAll(){
				
			},
			// 清空播放列表
			clear(){
				if(this.currentTab === 'playlist'){
					this.setPlaylist([])
				}else if(this.currentTab === 'history'){
					this.setPlayingHistory([])
					localStorage.removeItem('playing_history')
				}
			},
		},
		computed:{
			...mapState('music', [
				'playingState',
				'currentSong',
				'isPlayListShow',
				'playlist',
				'playingHistory'
			]),
			// 动态计算播放列表|历史记录
			tableData(){
				if(this.currentTab === "playlist"){
					return this.playlist
				}else if(this.currentTab === "history"){
					return this.playingHistory
				}
				
			},
		}
	}
</script>

<style lang="scss">
	.play-list-container{
		z-index: 999;
		cursor: default;
		display: block;
		position: fixed;
		right: 0;
		bottom: 0;
		max-width: 520px;
		width: 100%;
		height: 70%;
		margin: 0 0 50px;
		overflow: hidden;
		.header{
			float: left;
			width: 100%;
			height: 40px;
			border-bottom: 1px solid #e3e3e3;
			line-height: 40px;
			background: #eee;
			text-align: center;
			.tabs{
				display: inline-block;
				width: auto;
				height: 24px;
				margin: 7px auto;
				border: 1px solid #eee;
				border-radius: 5px;
				line-height: 24px;
				background: #fafafa;
				overflow: hidden;
				.tab{
					float: left;
					margin: 0;
					border: 0;
					padding: 0 30px;
					font-size: 12px;
					&.active{
						color: #fff;
						background: #777;
					}
					&:hover{
						opacity: 0.8;
					}
				}
			}
			.close{
				position: absolute;
				right: 0;
				margin: auto;
				padding: 0 15px;
				font-size: 18px;
				color: #777;
				text-decoration: none;
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
				height: 100%;
				.controler{
					height: 30px;
					padding: 0 30px;
					line-height: 30px;
					overflow: hidden;
					span{
						padding: 0 10px;
						&:first-child{
							border-right: 1px solid #999;
						}
					}
					.info{
						float: left;
						font-size: 12px;
						color: #999;
					}
					.btns{
						float: right;
						position: relative;
						font-size: 12px;
						color: #999;
						div{
							float: left;
							margin-left: 10px;
							color: #777;
							&:hover{
								color: #333;
							}
							i.iconfont{
								float: left;
								display: block;
								position: relative;
								font-size: 15px;
							}
							span{
								cursor: pointer;
								padding: 0 5px;
								font-size: 13px;
							}
						}
					}
				}
				.content{
					background: none;
					width: 100%;
					height: calc(100% - 30px);
					overflow-x: hidden;
					overflow-y: auto;
					&::-webkit-scrollbar{
						width: 7px;
						height: 7px;
					}
					&::-webkit-scrollbar-thumb{
						border-radius: 14px;
						background: #eeee;
					}
					&::-webkit-scrollbar-thumb:hover{
						background: #cccc;
					}
					&::-webkit-scrollbar-track{
						background: none;
					}
					.el-table{
						font-size: 12px;
						overflow-x: hidden;
						&.el-table--scrollable-x .el-table__body-wrapper{
							overflow: hidden !important;
						}
						.name div.cell{
							color: #555;
						}
						td div.cell:hover{
							color: #555;
						}
						.el-table__body{
							.el-table__row{
								cursor: default;
								width: 100%;
								height: 20px;
								padding: 0 15px;
								line-height: 20px;
								overflow: hidden;
								td{
									padding: 3px 0;
									.cell{
										cursor: default;
										height: 20px;
										margin: 0;
										padding: 0 5px;
										line-height: 20px;
										word-break: break-all;
										word-wrap: break-word;
										white-space: nowrap;
										text-overflow: ellipsis;
										overflow: hidden;
										i{
											position: relative;
											top: 1px;
											font-size: 12px;
											padding-left: 3px;
											color: #c62f2f;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.play-list-container{
		height: 70%;
		.header{
			float: left;
			width: 100%;
			height: 40px;
			border-bottom: 1px solid #e3e3e3;
			line-height: 40px;
			background: #eee;
			text-align: center;
			.tabs{
				display: inline-block;
				width: auto;
				height: 24px;
				margin: 7px auto;
				border: 1px solid #eee;
				border-radius: 5px;
				line-height: 24px;
				background: #fafafa;
				overflow: hidden;
				.tab{
					float: left;
					margin: 0;
					border: 0;
					padding: 0 30px;
					font-size: 12px;
					&.active{
						color: #fff;
						background: #777;
					}
					&:hover{
						opacity: 0.8;
					}
				}
			}
			.close{
				position: absolute;
				right: 0;
				margin: auto;
				padding: 0 15px;
				font-size: 18px;
				color: #777;
				text-decoration: none;
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
				height: 100%;
				.controler{
					height: 30px;
					padding: 0 30px;
					line-height: 30px;
					overflow: hidden;
					span{
						padding: 0 10px;
						&:first-child{
							border-right: 1px solid #999;
						}
					}
					.info{
						float: left;
						font-size: 12px;
						color: #999;
					}
					.btns{
						float: right;
						position: relative;
						font-size: 12px;
						color: #999;
						div{
							float: left;
							margin-left: 10px;
							color: #777;
							&:hover{
								color: #333;
							}
							i.iconfont{
								float: left;
								display: block;
								position: relative;
								font-size: 15px;
							}
							span{
								cursor: pointer;
								padding: 0 5px;
								font-size: 13px;
							}
						}
					}
				}
				.content{
					background: none;
					width: 100%;
					height: calc(100% - 30px);
					overflow-x: hidden;
					overflow-y: auto;
					&::-webkit-scrollbar{
						width: 7px;
						height: 7px;
					}
					&::-webkit-scrollbar-thumb{
						border-radius: 14px;
						background: #eeee;
					}
					&::-webkit-scrollbar-thumb:hover{
						background: #cccc;
					}
					&::-webkit-scrollbar-track{
						background: none;
					}
					.el-table{
						font-size: 12px;
						overflow-x: hidden;
						&.el-table--scrollable-x .el-table__body-wrapper{
							overflow: hidden !important;
						}
						.name div.cell{
							color: #555;
						}
						td div.cell:hover{
							color: #555;
						}
						.el-table__body{
							.el-table__row{
								cursor: default;
								width: 100%;
								height: 20px;
								padding: 0 15px;
								line-height: 20px;
								overflow: hidden;
								td{
									padding: 3px 0;
									.cell{
										cursor: default;
										height: 20px;
										margin: 0;
										padding: 0 5px;
										line-height: 20px;
										word-break: break-all;
										word-wrap: break-word;
										white-space: nowrap;
										text-overflow: ellipsis;
										overflow: hidden;
										i{
											position: relative;
											top: 1px;
											font-size: 12px;
											padding-left: 3px;
											color: #c62f2f;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>
