<template>
	<div id="setting-download" class="setting-download-container">
		<div class="title">
			<h3>下载</h3>
		</div>
		<div class="content">
			<div class="group">
				<div class="title">
					<div class="name">音质选择：</div>
				</div>
				<div class="trial">
					<span class="label">试用</span>
					<Radio :data="qualities" :default="qualities[0]" @selected="setTrialQuality"></Radio>
				</div>
				<div class="download">
					<span  class="label">下载</span>
					<Radio :data="qualities" :default="qualities[1]" @selected="setDownloadQuality"></Radio>
				</div>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">下载目录：<span>默认将音乐文件下载在该文件夹中</span></div>
				</div>
				<div class="dir-select">
					<span>{{ downloadDir }}</span>
					<button>更改目录</button>
				</div>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">缓存目录：</div>
				</div>
				<div class="dir-select">
					<span>{{ cacheDir }}</span>
					<button>更改目录</button>
				</div>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">音乐命名格式：</div>
				</div>
				<div class="slider">
					<span class="name">缓存最大占用</span>
					<el-slider v-model="cacheMax" :step="0.5" :max="7" :min="0.5"> </el-slider>
					<span v-show="cacheMax >= 1">{{ cacheMax }}G</span>
					<span v-show="cacheMax < 1">512M</span>
					<button>清除缓存</button>
				</div>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">音乐命名格式：</div>
				</div>
				<Radio :data="nameFormats" :default="nameFormats[1]" @selected="setNameFormat"></Radio>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">文件智能分类：</div>
				</div>
				<Radio :data="autoCategories" :default="autoCategories[0]" @selected="setAutoCategory"></Radio>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				qualities: [
					{id: 1, tip: '标准'},
					{id: 2, tip: '较高'},
					{id: 3, tip: '极高'},
					{id: 4, tip: '无损音质'},
				],
				trialQuality: {},
				downloadQuality: {},
				downloadDir: 'E:\\CloudMusic',
				cacheDir: 'C:\\Users\Administrator\AppData\Local\Netease\CloudMusic\Cache',
				cacheMax: 1,
				nameFormats: [
					{id: 1, tip: '歌曲名'},
					{id: 2, tip: '歌手-歌曲名'},
					{id: 3, tip: '歌曲名-歌手'},
				],
				selectedNameFormat: {},
				autoCategories: [
					{id: 1, tip: '不分文件夹'},
					{id: 2, tip: '安歌手分文件夹'},
					{id: 3, tip: '按歌手\专辑分文件夹'},
				],
				selectedAutoCategory: {}
			};
		},
		methods:{
			// 试听音质
			setTrialQuality(val){
				this.trialQuality = val
			},
			// 下载音质
			setDownloadQuality(val){
				this.downloadQuality = val
			},
			// 设置下载目录
			setDownloadDir(){
				
			},
			// 设置缓存目录
			setCacheDir(){
				
			},
			// 音乐命名格式
			setNameFormat(val){
				this.selectedNameFormat = val
			},
			// 文件智能分类
			setAutoCategory(val){
				this.selectedAutoCategory = val
			},
		},
	}
</script>

<style lang="scss" scoped>
	.setting-download-container{
		cursor: default;
		position: relative;
		.title{
			height: 30px;
			line-height: 30px;
			h3{
				margin: 0;
				padding: 0;
				font-size: 15px;
			}
		}
		.content{
			display: block;
			width: auto;
			height: auto;
			font-size: 13px;
			color: #999;
			.group{
				position: relative;
				margin: 10px 0;
				.title{
					height: 20px;
					line-height: 20px;
					.name{
						float: left;
						margin-right: 5px;
						font-weight: bold;
						color: #555;
						span{
							color: #999;
						}
					}
					.desc{
						font-size: 12px;
					}
				}
				.trial, .download{
					position: relative;
					margin: 5px 0;
					overflow: hidden;
					.label{
						float: left;
						margin: 5px 15px 5px 0;
						font-size: 12px;
						color: #555;
					}
					/deep/.radio-container{
						float: left;
						margin: 0;
						.radio{
							float: left;
							width: 80px;
						}
					}
				}
				.slider{
					display: flex;
					flex-direction: row;
					height: 20px;
					margin-top: 5px;
					margin-bottom: 20px;
					span{
						display: block;
						height: 20px;
						min-width: 40px;
						margin: 5px 0;
						color: #333;
					}
					/deep/.el-slider{
						flex-basis: 360px;
						display: block;
						width: 360px;
						height: 20px;
						margin: 5px 10px;
						.el-slider__runway{
							margin: 7px 0;
						}
						.el-slider__bar{
							background-color: #2b7fdc;
						}
						.el-slider__button-wrapper{
							top: -7px;
							width: 20px;
							height: 20px;
						}
						.el-slider__button{
							position: relative;
							width: 14px;
							height: 14px;
							border: 1px solid #ccc;
							&:after{
								display: block;
								position: absolute;
								content: "";
								top: 3px;
								left: 5px;
								width: 2px;
								height: 5px;
								border: 1px solid #777;
								border-top-color: transparent;
								border-bottom-color: transparent;
							}
							&:hover{
								cursor: pointer;
								-webkit-transform: scale(1);
								transform: scale(1);
							}
						}
					}
					button{
						margin-left: 20px;
					}
				}
				.dir-select{
					margin: 5px 0;
					color: #555;
					span{
						margin-right: 20px;
					}
				}
			}
			button{
				cursor: pointer;
				outline: none;
				height: 24px;
				line-height: 24px;
				margin-right: 15px;
				border: 1px solid #ccc;
				border-radius: 20px;
				padding: 0px 15px;
				font-size: 10px;
				background: #f9f9f9;
				&:hover{
					background: #eee;
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.setting-download-container{
		.title{
			height: 20px;
			line-height: 20px;
			h3{
				font-size: 13px;
			}
		}
		.content{
			font-size: 10px;
			.group{
				margin: 5px 0;
				.title{
					.desc{
						display: none;
					}
				}
				.trial, .download{
					margin: 5px 0;
					.label{
						margin: 0 10px 0 0;
						font-size: 12px;
					}
				}
				.slider{
					height: 20px;
					margin-top: 5px;
					margin-bottom: 10px;
					span{
						display: block;
						height: 20px;
						min-width: 40px;
						margin: 5px 0;
						&.name{
							width: 100px;
							text-overflow: ellipsis;
							word-break: break-all;
							white-space: nowrap;
							overflow: hidden;
						}
					}
					/deep/.el-slider{
						flex-basis: 200px;
						width: 200px;
						height: 20px;
						margin: 3px 5px;
					}
					button{
						flex-grow: 0;
						flex-basis: 100px;
						margin-left: 10px;
						padding: 0 5px;
						font-size: 10px;
						width: 80px;
					}
				}
				.dir-select{
					margin: 5px 0;
					color: #555;
					span{
						margin-right: 20px;
					}
				}
			}
			button{
				cursor: pointer;
				outline: none;
				height: 24px;
				line-height: 24px;
				margin-right: 15px;
				border: 1px solid #ccc;
				border-radius: 20px;
				padding: 0px 15px;
				font-size: 10px;
				background: #f9f9f9;
				&:hover{
					background: #eee;
				}
			}
		}
	}
}
</style>
