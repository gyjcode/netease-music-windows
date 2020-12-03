<template>
	<div class="local-container">
		<div class="main">
			<div class="header">
				<Title class="title" title="本地音乐"><span>共 0 首</span></Title>
				<div class="menus">
					<div 
					@click="filter = 'list'"
					:class="['menu', filter === 'list' ? 'active': '']"
					name="list">
						歌曲
					</div>
					<div
					@click="filter = 'artists'"
					:class="['menu', filter === 'artists' ? 'active': '']"
					name="artists">
						歌手
					</div>
					<div
					@click="filter = 'album'"
					:class="['menu', filter === 'album' ? 'active': '']"
					name="album">
						专辑
					</div>
					<div
					@click="filter = 'folder'"
					:class="['menu', filter === 'folder' ? 'active': '']"
					name="folder">
						文件夹
					</div>
				</div>
			</div>
			<div class="body">
				<div class="content">
					<div class="add-local-music">
						<h3>请添加本地音乐</h3>
						<p>升级本地音乐为高品质音乐并和朋友分享！</p>
						<div
						class="select-local-dir">
							<input
							@change="localSong"
							type="file"
							id="selectLocalDir"
							ref="localDir"
							webkitdirectory>
							<label
							for="selectLocalDir">选择本地音乐文件夹</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				filter: 'list',
				localDirs: ['E:\CloudMusic'],
				localSongs: []
			}
		},
		mounted() {
			this.localSong()
		},
		methods:{
			localSong(){
				console.log(this)
				console.log(this.$refs.localDir)
				// this.localSongs = this.$refs.LocalDir.files
			}
		}
	}
</script>

<style lang="scss" scoped>
	.local-container{
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
			max-width: 1200px;
			margin: 0 auto;
		}
		.header{
			position: relative;
			width: auto;
			height: auto;
			margin: 0 30px;
			/deep/.title{
				height: 30px;
				line-height: 30px;
				margin: 25px 0 5px;
				h3{
					font-size: 20px;
					font-weight: bold;
				}
				span{
					font-size: 12px;
					margin: 0 10px;
					color: #777;
				}
			}
			.menus{
				display: inline-block;
				height: 20px;
				line-height: 20px;
				margin: 10px 0;
				font-size: 15px;
				.menu{
					float: left;
					cursor: pointer;
					width: auto;
					height: 20px;
					line-height: 20px;
					margin-right: 10px;
					text-align: center;
					color: #333;
					&:hover{
						color: #000;
					}
					&.active{
						position: relative;
						color: #000;
						font-weight: bold;
						&::after{
							content: "";
							position: absolute;
							bottom: -5px;
							left: 10%;
							width: 80%;
							height: 3px;
							background: #ec4141;
						}
					}
				}
			}
		}
		.body{
			height: auto;
			margin: 0 30px;
			overflow: hidden;
			.content{
				position: relative;
				height: auto;
				overflow: hidden;
				.add-local-music{
					position: relative;
					top: 50px;
					width: 300px;
					min-height: 200px;
					margin: auto;
					text-align: center;
					h3{
						font-size: 15px;
					}
					p{
						display: block;
						font-size: 13px;
						color: #777;
					}
					.select-local-dir{
						cursor: pointer;
						position: relative;
						width: 240px;
						height: 60px;
						margin: 30px auto;
						border: 0;
						border-radius: 5px;
						font-size: 15px;
						color: #fff;
						background: #0c73c2;
						&:hover{
							background: #1167a8;
						}
						input{
							outline: 0;
							cursor: pointer;
							z-index: 999;
							width: auto;
							height: 100%;
							opacity: 0;
						}
						label{
							pointer-events: none;
							position: absolute;
							transform: translate(-50%, -50%);
							top: 50%;
							left: 50%;
							text-overflow: ellipsis;
							word-break: break-all;
							white-space: nowrap;
							overflow: hidden;
						}
					}
				}
			}
		}
	}
</style>
