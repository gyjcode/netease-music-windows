<template>
	<div class="cloud-container">
		<div class="main">
			<div class="header">
				<Title class="title" title="我的音乐云盘"></Title>
				<div class="pan-info">
					<span class="text">云盘容量</span>
					<span class="progress">
						<el-progress
						:stroke-width="10"
						:show-text="false"
						v-if="!isNaN(Math.ceil(size/maxSize *100))"
						:percentage="Math.ceil(size/maxSize *100)"></el-progress>
						<i class="data">{{ Math.ceil(size/1024/1024/1024*10)/10 + "G/" + Math.ceil(maxSize/1024/1024/1024*10)/10 + "G" }}</i>
					</span>
					<span class="text">歌曲永久保存，随时随地多端畅听 <a target="_blank" href="https://music.163.com/store/product/detail?id=34001" class="expand">扩容</a></span>
				</div>
				<div class="btns">
					<BtnPlayAll class="btn" :playlist="tableData"></BtnPlayAll>
					<BtnDefault class="btn" title="上传音乐" icon="icon-plus-l" @click.native="upload">
						<!-- <input class="file-uploader" type="file"> -->
					</BtnDefault>
				</div>
			</div>
			<div class="body">
				<!-- 歌曲列表 -->
				<el-table
				:data="tableData"
				:lazy="true">
					<el-table-column
					type="index"
					align="right"
					width="50">
						<template slot-scope="scope">{{ scope.$index+1 | formatOrderNum() }}</template>
					</el-table-column>
					<el-table-column
					align="center"
					class-name="operate"
					width="30">
						<i class="iconfont icon-download-l"></i>
					</el-table-column>
					<el-table-column
					label="音乐标题"
					class-name="title"
					min-width="200">
						<template slot-scope="scope">
							<span class="name">{{ scope.row.name }}</span>
							<span v-if="scope.row.alia" class="alia">({{ scope.row.alia }})</span>
						</template>
					</el-table-column>
					<el-table-column
					label="歌手"
					class-name="artists"
					min-width="100">
						<template slot-scope="scope"><router-link tag="div" :to="`page/artist/`+scope.row.artists[0].id">{{ scope.row.artists.map(({name})=>name).join('/') }}</router-link></template>
					</el-table-column>
					<el-table-column
					prop="album.name"
					class-name="album"
					label="专辑"
					min-width="100">
						<template slot-scope="scope"><router-link tag="div" :to="`page/album/`+scope.row.album.id">{{ scope.row.album.name }}</router-link></template>
					</el-table-column>
					<el-table-column
					label="大小"
					class-name="size"
					min-width="50">
						<template slot-scope="scope">{{ Math.floor(scope.row.fileSize/1024/1024*10)/10 +"MB" }}</template>
					</el-table-column>
					<el-table-column
					class-name="add-time"
					label="上传时间"
					min-width="50">
						<!-- 通过插值使用全局过滤器 -->
						<template slot-scope="scope">{{ scope.row.addTime | formatDate("YYYY-MM-DD") }}</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="footer">
				<a target="_blank" href="http://music.163.com/static/cloudservice.html" class="service-agreement">《'我的音乐云盘'服务协议》</a>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import {createSong} from '@/utils'
	export default{
		data(){
			return{
				size: null,
				maxSize: null,
				tableData: [],
			}
		},
		created() {
			this.cloud()
		},
		methods:{
			// 云盘详情
			async cloud(){
				const data = await this.$api.getUserCloud({})
				console.log(data)
				if(data.code === 200){
					const result = data.data.map((data)=>{
						return createSong({
							id: data.simpleSong.id,
							name: data.simpleSong.name,
							alia: data.simpleSong.alia[0],
							picUrl: data.simpleSong.al.picUrl,
							duration: data.simpleSong.dt,
							artists: data.simpleSong.ar.map((ar)=>{
								return{
									id: ar.id,
									name: ar.name,
									picUrl: ar.picUrl
								}
							}),
							albumId: data.simpleSong.al.id,
							albumName: data.simpleSong.al.name,
							albumPicurl: data.simpleSong.al.picUrl,
							addTime: data.addTime,
							fileSize: data.fileSize
						})
					})
					this.tableData = result
					this.size = data.size
					this.maxSize = data.maxSize
				}
			},
			// 点击上传-暂不可用
			upload(){
				alert('抱歉，上传功能暂不可用')
			}
		},
		computed:{
			...mapState('music', [
				'loginUser'
			])
		}
	}
</script>

<style lang="scss" scoped>
	.cloud-container{
		display: block;
		position: relative;
		width: auto;
		height: 100%;
		margin: 0 auto;
		overflow: hidden;
		overflow-y: auto;
		&::-webkit-scrollbar{
			width: 9px;
			height: 9px;
		}
		&::-webkit-scrollbar-thumb{
			border-radius: 18px;
			background: #7777;
		}
		&::-webkit-scrollbar-thumb:hover{
			background: #9999;
		}
		&::-webkit-scrollbar-track{
			border-right: 0px solid #7777;
			background: none;
		}
		.main{
			margin: 0 auto;
		}
		.header{
			position: relative;
			width: auto;
			height: auto;
			margin: 0 30px;
			/deep/.title-container{
				margin: 20px 0 10px;
				h3{
					font-size: 20px;
					font-weight: bold;
				}
			}
			.pan-info{
				height: 20px;
				line-height: 20px;
				margin: 10px 0;
				font-size: 12px;
				color: #777;
				overflow: hidden;
				span{
					float: left;
					a{
						text-decoration: none;
						color: #507daf;
					}
				}
				.progress{
					display: block;
					width: auto;
					margin: 0 30px 0 3px;
					overflow: hidden;
					.el-progress{
						float: left;
						width: 110px;
						margin: 5px 3px;
					}
					i.data{
						font-size: 10px;
						font-style: normal;
						color: #999;
					}
				}
			}
			.btns{
				position: relative;
				margin: 15px 0;
				overflow: hidden;
				.btn{
					float: left;
					margin-right: 10px;
					&.btn-default-container{
						.file-uploader{
							position: absolute;
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
							opacity: 0;
						}
					}
				}
			}
		}
		.body{
			position: relative;
			width: auto;
			height: auto;
			overflow: hidden;
			/deep/.el-table{
				font-size: 12px;
				overflow-x: hidden;
				&.el-table--scrollable-x .el-table__body-wrapper{
					overflow: hidden;
				}
				.operate div.cell{
					cursor: pointer;
				}
				.title div.cell{
					color: #555;
					.alia{
						color: #999;
					}
				}
				.artists div.cell{
					cursor: pointer;
					color: #777;
				}
				.album div.cell{
					cursor: pointer;
					color: #777;
				}
				.size div.cell{
					color: #777;
				}
				td div.cell:hover{
					color: #333;
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
								height: 20px;
								margin: 0;
								padding: 0 5px;
								line-height: 20px;
								word-break: break-all;
								word-wrap: break-word;
								white-space: nowrap;
								text-overflow: ellipsis;
								overflow: hidden;
							}
						}
					}
				}
			}
		}
		.footer{
			margin-top: 50px;
			text-align: center;
			.service-agreement{
				display: inline-block;
				color: #999;
				font-size: 10px;
				&:hover{
					color: #777;
				}
			}
		}
	}
</style>
