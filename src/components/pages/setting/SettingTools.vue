<template>
	<div id="setting-tools" class="setting-tools-container">
		<div class="title">
			<h3>工具</h3>
		</div>
		<div class="content">
			<div class="group">
				<div class="title">
					<div class="name">Http代理：</div>
				</div>
				<Radio :data="httpProxys" :default="httpProxys[1]" @selected="setHttpProxy"></Radio>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">音乐云盘设置：</div>
				</div>
				<CheckBox @checked="setAutoUploadCloud" :default="false" tip="本地音乐添加歌单后,蒋文杰上传至云盘,可多端同步歌单,播放下载"></CheckBox>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				httpProxys: [
					{id: 1, tip: '不使用代理'},
					{id: 2, tip: '使用IE代理设置'},
					{id: 3, tip: '自定义代理'},
				],
				httpPtoxy: {},
				autoUploadCloud: true,
			};
		},
		methods:{
			// HTTP 代理
			setHttpProxy(val){
				this.httpPtoxy = val
			},
			// 云盘设置
			setAutoUploadCloud(val){
				this.autoUploadCloud = val
			}
		},
	}
</script>

<style lang="scss" scoped>
	.setting-tools-container{
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
			}
		}
	}
@media screen and (max-width: 540px) {
	.setting-tools-container{
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
				.output-devices{
					min-width: 200px;
				}
			}
		}
	}
}
</style>
