<template>
	<div id="setting-common" class="setting-about-container">
		<div class="title">
			<h3>常规</h3>
		</div>
		<div class="content">
			<div class="group">
				<div class="title">
					<div class="name">字体选择：</div>
					<div class="desc">如果字体显示不清晰，请在控制面板——字体设置中启用系统Clear Type设置</div>
				</div>
				<Select class="font-select" :data="fonts" :default="fonts[0]" @selected="setDefaultFont"></Select>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">启动：</div>
				</div>
				<CheckBox @checked="setAutoRun" :default="false" tip="开机自动运行"></CheckBox>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">关联：</div>
				</div>
				<CheckBox @checked="setDefaultPlayer" :default="false" tip="将网易云音乐设为默认播放器"></CheckBox>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">动画：</div>
				</div>
				<CheckBox @checked="setAnimation" :default="false" tip="禁用动画效果<span>( 减少部分资源占用 )</span>"></CheckBox>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">GPU加速：</div>
				</div>
				<CheckBox @checked="setGPU" :default="false" tip="禁用GPU加速<span>( 关闭图形加速,如果单曲播放页或MV播放黑屏请勾选 )</span>"></CheckBox>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">关闭主面板：</div>
				</div>
				<Radio :data="closePanels" :default="closePanels[1]" @selected="setClosePanelsVal"></Radio>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">定时关机：</div>
				</div>
				<CheckBox @checked="setAutoTurnOff" :default="false" tip="开启定时关机"></CheckBox>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">高清屏适配：<span>禁用后建议重启软件</span></div>
				</div>
				<CheckBox @checked="setScreenAdaptation" :default="false" tip="禁用系统缩放比例<span>( 减少部分资源占用 )</span>"></CheckBox>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				fonts: ['默认', '宋体', '微软雅黑', '楷体', '黑体'],
				defaultFont: '默认',
				autoRun: false,
				defaultPlayer: false,
				animation: false,
				gpu: false,
				closePanels: [
					{id: 1, tip: '最小化到托盘'},
					{id: 2, tip: '退出云音乐'}
				],
				closePanelVal: {},
				autoTurnOff: false,
				screenAdaptation: false,
			};
		},
		methods:{
			// 选择默认字体
			setDefaultFont(font){
				this.defaultFont = font
			},
			// 开机自启
			setAutoRun(val){
				this.autoRun = val
			},
			// 默认播放器
			setDefaultPlayer(val){
				this.defaultPlayer = val
			},
			// 动画效果
			setAnimation(val){
				this.animation = val
			},
			// GPU加速
			setGPU(val){
				this.gpu = val
			},
			// 关闭主面板
			setClosePanelsVal(radio){
				this.closePanelVal = radio
			},
			// 定时关机
			setAutoTurnOff(val){
				this.autoTurnOff = val
			},
			// 屏幕适配
			setScreenAdaptation(val){
				this.screenAdaptation = val
			},
		},
	}
</script>

<style lang="scss" scoped>
	.setting-about-container{
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
				.font-select{
					min-width: 200px;
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.setting-about-container{
		.title{
			height: 20px;
			line-height: 20px;
			h3{
				font-size: 13px;
			}
		}
		.content{
			font-size: 11px;
			.group{
				margin: 5px 0;
				.title{
					height: 20px;
					line-height: 20px;
					.name{
						margin-right: 5px;
						span{
							display: none;
						}
					}
					.desc{
						display: none;
					}
				}
				.font-select{
					min-width: 120px;
					margin: 5px 0;
				}
			}
		}
	}
}
</style>
