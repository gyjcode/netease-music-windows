<template>
	<div id="setting-play" class="setting-play-container">
		<div class="title">
			<h3>播放</h3>
		</div>
		<div class="content">
			<div class="group">
				<div class="title">
					<div class="name">播放列表：<span>单曲、节目</span></div>
				</div>
				<Radio :data="playlist" :default="playlist[0]" @selected="setPlaylistVal"></Radio>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">自动播放：</div>
				</div>
				<CheckBox @checked="setAutoPlay" :default="false" tip="程序启动时自动播放"></CheckBox>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">播放进度：</div>
				</div>
				<CheckBox @checked="setPlayProgress" :default="false" tip="程序启动时记住上一次播放进度"></CheckBox>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">效果：</div>
				</div>
				<CheckBox @checked="setEffect" :default="false" tip="开启音乐淡入淡出<span>( 仅支持输出设备DirectSound )</span>"></CheckBox>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">字体选择：</div>
					<div class="desc">如果字体显示不清晰，请在控制面板——字体设置中启用系统Clear Type设置</div>
				</div>
				<Select class="output-devices" :data="outputDevices" :default="selectedDebice" @selected="setSelectedDebice"></Select>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				playlist: [
					{id: 1, tip: '双击播放单曲时，用当前单曲所在的歌曲列表替换播放列表(节目同理)'},
					{id: 2, tip: '双击播放单曲时，仅把当前单曲添加到播放列表(节目同理)'},
				],
				playlistVal: {},
				autoPlay: false,
				playProgress: false,
				effect: false,
				outputDevices: ['DirectSound:主声音驱动程序', 'WaveOut:Microsoft声音映射器'],
				selectedDebice: 'DirectSound:主声音驱动程序',
			};
		},
		methods:{
			// 播放列表
			setPlaylistVal(radio){
				this.playlistVal = radio
			},
			// 自动播放
			setAutoPlay(val){
				this.autoPlay = val
			},
			// 播放进度
			setPlayProgress(val){
				this.playProgress = val
			},
			// 效果
			setEffect(val){
				this.effect = val
			},
			// 输出设备
			setSelectedDebice(debice){
				this.selectedDebice = debice
			},
		},
	}
</script>

<style lang="scss" scoped>
	.setting-play-container{
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
							font-weight: normal;
							color: #999;
						}
					}
					.desc{
						font-size: 12px;
					}
				}
				.output-devices{
					min-width: 400px;
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.setting-play-container{
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
