<!-- 全局 Scroller 组件 : better-scroll 插件 Vue 化 -->
<template>
	<div
	class="video-container"
	ref="video">
		<video-player
		v-show="sources.length"
		ref="videoPlayer"
		:playsinline="true"
		:options="playerOptions">
		</video-player>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		name: "Video",
		props: {
			sources: {
				type: Array,
				require: true,
				default: () => []
			}
		},
		data(){
			return{
				// 默认配置项
				playerOptions: {
					playbackRates: [0.7, 1.0, 1.5, 2.0],     //播放速度
					autoplay: true,     // 自动播放
					muted: false,     // 默认静音
					loop: false,     // 是否轮播
					preload: 'auto',     // 预加载
					language: 'zh-CN',     // 默认语言
					aspectRatio: '16:9',     // 播放器比例
					fluid: true,       // 流体大小，按比例缩放以适应其容器。
					sources: [{     // 视频源，数组可设置多个
						type: "",    // 视频格式
						src: ""     // 视频地址
					}],
					poster: require('@/assets/images/video-poster.png'),     //默认封面
					// width: document.documentElement.clientWidth,     //播放器宽度
					notSupportedMessage: '此视频暂无法播放，请稍后再试', //默认错误信息。
					controlBar: {
						timeDivider: true,
						durationDisplay: true,
						remainingTimeDisplay: false,
						fullscreenToggle: true     //全屏按钮
					}
				}
			}
		},
		watch:{
			sources(newVal, oldVal){
				if(newVal != oldVal){
					this.playerOptions.sources = this.sources
				}
			}
		}
	}
</script>

<style lang="scss">
	.video-container{
		position: relative;
		overflow: hidden;
		.video-player{
			width: 100%;
			height: auto;
			/deep/.video-js{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
