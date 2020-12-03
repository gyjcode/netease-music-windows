<template>
	<div class="newsong-list-container">
		<div class="content" >
			<el-table
			stripe
			lazy
			:data="tableData"
			:show-header="false"
			style="width: 100%">
				<!-- 序列号 -->
				<el-table-column
				class-name="serial"
				type="index"
				width="50">
					<template slot-scope="scope">
						<i
						v-show="currentSong.id === scope.row.id"
						class="iconfont icon-horn-l"></i>
						<span
						v-show="currentSong.id !== scope.row.id">{{ scope.$index+1 | formatOrderNum() }}</span>
					</template>
				</el-table-column>
				<!-- 歌曲名称 -->
				<el-table-column
				class-name="avatar"
				width="80">
					<template slot-scope="scope">
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
				min-width="200">
				</el-table-column>
				<!-- 歌手名称 -->
				<el-table-column
				class-name="artists"
				prop="artists"
				min-width="100">
					<template slot-scope="scope">
						{{ scope.row.artists.map(({name})=>name).join('/') }}
					</template>
				</el-table-column>
				<!-- 歌曲 -->
				<el-table-column
				class-name="album-name"
				prop="album.name"
				min-width="100">
				</el-table-column>
				<!-- 歌曲时长 -->
				<el-table-column
				class-name="duration"
				prop="duration"
				:formatter="formatDate"
				width="80">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	import moment from 'moment'
	import { mapState, mapMutations } from 'vuex'
	import { createSong, formatOrderNum } from '@/utils'
	
	export default{
		props:{
			type: {
				type: Number,
				required: true
			}
		},
		data(){
			return{
				tableData: [],
			}
		},
		created() {
			this.topSong()
		},
		methods:{
			...mapMutations('music',[
				'setCurrentSong',
				'setPlaylist'
			]),
			// 格式化列表歌曲时间
			formatDate(row){
				return moment(row.duration).format('mm:ss')
			},
			async topSong(){
				const data = await this.$api.getTopSong(this.type)
				// console.log(data)
				if(data.code === 200){
					const songs = data.data.map((data)=>{
						return createSong({
							id: data.id,
							name: data.name,
							picUrl: data.album.blurPicUrl,
							duration: data.duration,
							artists: data.artists.map((artists)=>{
										return {
											id: artists.id,
											name: artists.name,
											picUrl: artists.picUrl
										}
									}),
							albumId: data.album.id,
							albumName: data.album.name,
							albumPicUrl: data.album.blurPicUrl,
						})
					})
					this.tableData = songs
				}
			}
		},
		computed:{
			...mapState('music', [
				'currentSong',
				'isPlayListShow',
				'playlist',
				'playingHistory'
			]),
		},
		watch:{
			type(newVal, oldVal){
				if(newVal != oldVal){
					this.topSong()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.newsong-list-container{
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
						}
					}
					td.avatar{
						width: 80px;
						height: 80px;
						.cell{
							width: 60px;
							height: 60px;
							margin: 0;
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
					td.artists{
						cursor: pointer;
					}
					td.album-name{
						cursor: pointer;
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.newsong-list-container{
		margin: 0 0 10px;
		.content{
			/deep/.el-table{
				margin: 10px 0 0;
				.el-table--scrollable-x .el-table__body-wrapper{
					overflow: hidden!important;
				}
				.el-table__body{
					display: block;
					width: 100%!important;
					overflow: hidden!important;
				}
				.el-table__row{
					display: block;
					width: 100%;
					height: 60px!important;
					td{
						padding: 5px;
						div.cell{
							height: 50px;
							line-height: 50px;
							text-overflow: ellipsis;
							word-break: break-all;
							white-space: nowrap;
							overflow: hidden;
						}
					}
					td.serial{
						float: left;
						display: block;
						width: 30px!important;
						div.cell{
							font-size: 13px;
						}
					}
					td.avatar{
						float: left;
						display: block;
						width: 60px!important;
						height: 60px!important;
						padding: 5px;
						div.cell{
							width: 50px!important;
							height: 50px!important;
						}
						.el-image{
							width: 50px;
							height: 50px;
						}
					}
					td.name{
						display: block;
						width: calc(100% - 200px);
						margin-left: 90px;
					}
					td.artists{
						display: none;
					}
					td.album-name{
						display: none;
					}
					td.duration{
						display: none;
					}
				}
			}
		}
	}
}
</style>
