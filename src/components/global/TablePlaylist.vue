<!-- 全局 TablePlaylist 组件 : 默认歌曲列表 -->
<template>
	<div class="table-playlist-container">
		<div
		v-show="popShow"
		class="pop-msg">
			<div class="mask"></div>
			<div class="msg">
				<i class="iconfont icon-cartoon-l"></i>
				<span>{{ popMsg }}</span>
			</div>
		</div>
		<el-table
		stripe
		:data="data"
		@row-dblclick="setPlaylistArr()"
		@cell-dblclick="playingCurrentSong"
		:show-header="headerShow"
		style="width: 100%">
			<!-- 播放标识 -->
			<el-table-column
			type="index"
			v-if="numShow"
			class-name="num"
			align="right"
			width="50">
				<!-- 获取当前行索引，通过插值使用全局过滤器 -->
				<template slot-scope="scope">
					<i
					v-show="currentSong.id === scope.row.id"
					class="iconfont icon-horn-s"></i>
					<span
					v-show="currentSong.id !== scope.row.id">{{ scope.$index+1 | formatOrderNum() }}</span>
				</template>
			</el-table-column>
			<el-table-column
			v-if="operateShow"
			class-name="operate"
			label="操作"
			width="60">
				<template slot-scope="scope">
					<i
					@click="likeTheSong(scope.row.id)"
					:class="['iconfont', liked(scope.row.id) ? 'icon-heart-s like': 'icon-heart-l']"></i>
					<i
					@click="downloadSong(scope.row.id)"
					class="iconfont icon-download-l"></i>
				</template>
			</el-table-column>
			<el-table-column
			v-if="titleShow"
			label="音乐标题"
			:sortable="true"
			class-name="title"
			min-width="200">
				<template
				slot-scope="scope">
					<span class="name" v-html="scope.row.name"></span>
					<span class="alia" v-if="scope.row.alias && scope.row.alias.length">({{ scope.row.alias[0] }})</span>
				</template>
			</el-table-column>
			<el-table-column
			v-if="artistsShow"
			label="歌手"
			:sortable="true"
			class-name="artists"
			min-width="80">
				<template
				slot-scope="scope">
					<span>{{ scope.row.artists.map(({name})=>name).join('/') }}</span>
				</template>
			</el-table-column>
			<el-table-column
			v-if="albumShow"
			prop="album.name"
			class-name="album-name"
			label="专辑"
			:sortable="true"
			min-width="100">
			</el-table-column>
			<el-table-column
			v-if="durationShow"
			prop="duration"
			class-name="duration"
			label="时长"
			width="80">
				<!-- 通过插值使用全局过滤器 -->
				<template slot-scope="scope">{{ scope.row.duration | formatDate("mm:ss") }}</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script type="text/ecmascript-6">
	import { formatDate, getSongPlayUrl } from '@/utils'
	import { mapState, mapMutations } from 'vuex'
	import $http from '@/utils/http.js'
	
	export default {	
		name: 'TablePlaylist',
		props: {
			data: {
				type: Array,
				required: true,
			},
			// 是否显示标题
			headerShow: {
				type: Boolean,
				required: false,
				default: true
			},
			// 是否显示索引
			numShow: {
				type: Boolean,
				required: false,
				default: true
			},
			// 是否显示操作
			operateShow: {
				type: Boolean,
				required: false,
				default: true
			},
			// 是否显示歌名
			titleShow: {
				type: Boolean,
				required: false,
				default: true
			},
			// 是否显示歌手名
			artistsShow: {
				type: Boolean,
				required: false,
				default: true
			},
			// 是否显示专辑名
			albumShow: {
				type: Boolean,
				required: false,
				default: true
			},
			// 是否显示专辑名
			durationShow: {
				type: Boolean,
				required: false,
				default: true
			}
		},
		data(){
			return{
				popShow: false,
				popMsg: "",
				likeList: []
			}
		},
		created() {
			this.userLikeList()
		},
		methods: {
			...mapMutations('music',[
				'setCurrentSong',
				'setPlaylist'
			]),
			// 双击设置播放列表
			setPlaylistArr(){
				this.setPlaylist(this.data)
			},
			// 双击歌曲名播放当前歌曲
			playingCurrentSong(row, cell){
				if(cell.label === "音乐标题"){
					this.setCurrentSong(row)
				}
			},
			async userLikeList(){
				const data = await this.$api.getLikeList(this.loginUser.profile.userId)
				// console.log(data)
				if(data.code === 200){
					this.likeList = data.ids
				}
			},
			async likeTheSong(id){
				let like = true
				if(this.liked(id)) like = false
				const data = await this.$api.getLike({
					id: id,
					like: like
				})
				// console.log(data)
				if(data.code === 200){
					this.popShow = true
					this.popMsg = "喜欢成功"
					if(!like) this.popMsg = "取消喜欢成功"
					// 延时弹窗
					clearTimeout(timer)
					const timer = setTimeout(()=>{
						this.popShow = false
					}, 1000);
				}
				/* const index = this.data.findIndex((item)=>{
					return item.id == id
				})
				if (index != -1) this.data.splice(index, 1); */
				this.userLikeList()
			},
			// 喜欢音乐
			liked(id){
				return this.likeList.indexOf(id) != -1
			},
			// 下载音乐
			async downloadSong(id){
				const url = getSongPlayUrl(id)
				// console.log($http.get(url))
				let ele = document.createElement('a')
				ele.href = url
				ele.target = "_blank"
				ele.click()
			}
		},
		computed:{
			...mapState('music', [
				'currentSong'
			]),
			...mapState('user', [
				'loginUser'
			])
		},
		watch:{
			loginUser(newVal, oldVal){
				if(newVal.profile.userId) this.userLikeList()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.table-playlist-container{
		cursor: default;
		position: relative;
		.pop-msg{
			z-index: 999;
			position: fixed;
			transform: translate(-50%, -50%);
			top: 50%;
			left: 50%;
			width: auto;
			height: 80px;
			border-radius: 7px;
			color: #fff;
			overflow: hidden;
			.mask{
				position: absolute;
				width: 100%;
				height: 100%;
				background: #000;
				opacity: 0.8;
			}
			.msg{
				position: relative;
				transform: translate(-50%, -50%);
				top: 50%;
				left: 50%;
				height: 40px;
				line-height: 40px;
				padding: 0 30px;
				font-size: 18px;
				i.iconfont{
					float: left;
					margin-right: 10px;
					font-size: 36px;
				}
			}
		}
		/deep/.el-table{
			font-size: 12px;
			overflow-x: hidden;
			&.el-table--scrollable-x .el-table__body-wrapper{
				overflow: hidden !important;
			}
			th .cell{
				height: 30px;
				line-height: 30px;
			}
			.title div.cell{
				color: #555;
				span{
					width: auto;
				}
			}
			td div.cell:hover{
				color: #555;
			}
			.el-table--enable-row-hover .el-table__body tr:hover>td{
				background: none;
			}
			tr{
				background: #fff;
				&:nth-child(odd){
					background: #f3f3f3;
				}
				&:hover.td{
					background: none;
				}
				&.el-table__row:hover{
				background: #eee;
			}
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
								font-size: 14px;
								padding-left: 3px;
							}
							span{
								display: block;
								width: auto;
								word-break: break-all;
								word-wrap: break-word;
								white-space: nowrap;
								text-overflow: ellipsis;
								overflow: hidden;
							}
						}
						&.num .cell{
							i{
								font-size: 14px;
								color: #ec4141;
							}
						}
						&.operate .cell{
							text-align: center;
							i.iconfont{
								cursor: pointer;
								font-size: 14px;
								&:hover{
									color: #333;
								}
								&.like{
									color: #ec4141;
									font-weight: bold;
									&:hover{
										color: #d73535;
									}
								}
							}
						}
						&.title .cell{
							color: #333;
							.alia{
								color: #999;
							}
						}
						&.artists .cell{
							cursor: pointer;
						}
						&.album-name .cell{
							cursor: pointer;
						}
						&.duration .cell{
							
						}
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.table-playlist-container{
		.pop-msg{
			display: none;
		}
		/deep/.el-table{
			display: block;
			font-size: 10px;
			.caret-wrapper{
				display: none;
			}
			th{
				display: block;
				height: 24px;
				overflow: hidden;
				.cell{
					height: 24px;
					line-height: 24px;
					padding: 0 5px;
				}
			}
			td{
				display: block;
				height: 24px;
				overflow: hidden;
				.cell{
					height: 24px;
					line-height: 24px;
					padding: 0 5px;
				}
			}
			.el-table__header{
				display: block;
				width: auto!important;
				thead{
					display: block;
					width: auto!important;
					
				}
				tr{
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					width: auto!important;
					height: 24px;
					line-height: 24px;
					.num{
						flex-basis: 30px;
						min-width: 30px;
					}
					.operate{
						display: none;
					}
					.title{
						flex-grow: 3;
						width: auto;
					}
					.artists{
						flex-basis: 100px;
						width: auto;
					}
					.album-name{
						display: none;
					}
					.duration{
						display: none;
					}
				}
			}
			tbody{
				display: block;
				width: auto!important;
			}
			.el-table__body{
				display: block;
				width: auto!important;
				overflow: hidden;
				.el-table__row{
					display: flex;
					width: auto!important;
					height: 24px;
					padding: 0;
					line-height: 24px;
					td{
						padding: 2px 0;
					}
					.num{
						flex-basis: 30px;
						min-width: 30px;
					}
					.operate{
						display: none;
					}
					.title{
						flex-grow: 1;
						width: auto;
					}
					.artists{
						flex-basis: 100px;
						width: auto;
						.cell{
							span{
								width: calc(100% - 10px);
							}
						}
					}
					.album-name{
						display: none;
					}
					.duration{
						display: none;
					}
				}
			}
		}
	}
}
</style>
