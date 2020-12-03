<template>
	<div class="download-song-container">
		<div class="header">
			<BtnPlayAll class="btn-playall"></BtnPlayAll>
			<div class="save">
				<span class="save-dir">存储目录：{{ saveDir }}</span>
				<span class="open-dir">
					<input
					type="file"
					id="saveDir"
					@change="localSong()"
					ref="saveDir"
					directory mozdirectory webkitdirectory multiple />
					<label for="saveDir">打开目录</label>
				</span>
			</div>
		</div>
		<div class="body">
			<!-- 歌曲列表 -->
			<el-table
			:data="tableData"
			@row-dblclick="setPlaylistArr()"
			@cell-dblclick="playingCurrentSong"
			style="width: 100%"
			:lazy="true">
				<el-table-column
				type="index"
				align="right"
				width="50">
					<!-- 获取当前行索引，通过插值使用全局过滤器 -->
					<template slot-scope="scope">{{ scope.$index+1 | formatOrderNum() }}</template>
				</el-table-column>
				<el-table-column
				align="center"
				width="30">
					<i class="iconfont icon-heart-l"></i>
				</el-table-column>
				<el-table-column
				prop="name"
				label="音乐标题"
				class-name="name"
				min-width="300">
				</el-table-column>
				<el-table-column
				prop="artists"
				label="歌手"
				min-width="100">
				</el-table-column>
				<el-table-column
				prop="album.name"
				label="专辑"
				min-width="240">
				</el-table-column>
				<el-table-column
				prop="size"
				label="大小"
				min-width="100">
				</el-table-column>
				<el-table-column
				prop="duration"
				label="下载时间"
				width="100">
					<!-- 通过插值使用全局过滤器 -->
					<template slot-scope="scope">{{ scope.row.duration | formatDate("YYYY-MM-DD") }}</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				saveDir: 'E:\\CloudMusic',
				tableData: []
			};
		},
		mounted() {
			this.localSong()
		},
		methods: {
			// 本地音乐
			localSong(){
				let songs = []
				const fileList = this.$refs.saveDir.files
				for (var i = 0; i < fileList.length; i++) {
					const item = {
						name: fileList[i].name.split("-")[1],
						artists: fileList[i].name.split("-")[0],
						size: fileList[i].size,
						lastModified: fileList[i].lastModified
					}
					songs.push(item)
				}
				this.tableData = songs
			},
			playingCurrentSong(){
				
			},
			setPlaylistArr(){
				
			}
		},
	}
</script>

<style lang="scss" scoped>
	.download-song-container{
		.header{
			position: relative;
			width: auto;
			height: auto;
			margin: 10px 0;
			padding: 0;
			overflow: hidden;
			.btn-playall{
				float: left;
				position: relative;
				margin-right: 10px;
			}
			.save{
				float: left;
				line-height: 36px;
				font-size: 13px;
				span{
					float: left;
					display: inline-block;
				}
				.open-dir{
					cursor: pointer;
					position: relative;
					width: 60px;
					height: 30px;
					color: #0c73c2;
					overflow: hidden;
					input{
						opacity: 0;
					}
					label{
						cursor: pointer;
						position: absolute;
						top: 0;
						left: 0;
						margin: 0 5px;
						width: 100%;
					}
				}
			}
		}
		.body{
			width: auto;
			/deep/.el-table{
				.el-table__body-wrapper{
					&.is-scrolling-left{
						overflow: hidden
					}
				}
			}
		}
	}
</style>
