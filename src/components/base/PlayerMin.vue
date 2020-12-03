<template>
	<div class="palyer-min-container" id="player-min">
		<!-- 歌曲缩略信息 -->
		<div class="left" v-show="hasCurrentSong">
			<div class="pic" @click="togglePlayerShow">
				<div class="mask"></div>
				<i class="iconfont icon-expand-l"></i>
				<img :src="currentSong.picUrl" alt="">
			</div>
			<div class="desc">
				<div class="name" v-html="currentSong.name"></div>
				<div class="artists" v-html="currentSong.artists.map(({name})=>name).join('/')"></div>
			</div>	
		</div>
		<div class="middle">
			<!-- 音频控制台 -->
			<div class="player">
				<div class="controler">
					<el-tooltip
						placement="top"
						effect="dark"
						:content="playingModeName">
						<i :class="['iconfont mode', 'icon-playing-' + playingModeIcon + '-l']" @click="changePlayingMode()"></i>
					</el-tooltip>
					<el-tooltip
						placement="top"
						effect="dark"
						content="上一曲">
						<i 
						class="iconfont icon-player-back-c-s"
						@click="prev">
						</i>
					</el-tooltip>
					<el-tooltip
						placement="top"
						effect="dark"
						content="播放">
						<i 
						:class='["play iconfont", !this.playingState ? "icon-player-start-c-s":"icon-player-pause-c-s"]'
						@click="player">
						</i>
					</el-tooltip>
					<el-tooltip
						placement="top"
						effect="dark"
						content="下一曲">
						<i
						class="iconfont icon-player-forward-c-s"
						@click="next">
						</i>
					</el-tooltip>
					<el-tooltip
						placement="top"
						effect="dark"
						content="打开歌词">
						<i
						class="iconfont lyrics"
						@click="togglePlayLyricShow">
						词</i>
					</el-tooltip>
				</div>
			</div>
			<!-- 音频 Audio 标签 -->
			<audio
			:src="currentSong.url"
			@timeupdate="updateTime"
			@ended="ended"
			ref="audio">
				当前浏览器不支持 audio 标签！
			</audio>
			<!-- 进度控制器 -->
			<div class="progress">
				<span>{{ audioCurrentTime|formatDate('mm:ss') }}</span> 
				<div class="slider" @mousedown="isDraging = true" @mouseup="isDraging = false">
					<el-slider
					:show-tooltip="false"
					v-model="playerPercent"
					@change="changePlayerPercent"
					></el-slider>
				</div>
				<span>{{ currentSong.duration|formatDate('mm:ss') }}</span>
			</div>
		</div>
		<div class="right">
			<div class="effect">
				<el-tooltip
					placement="top"
					effect="dark"
					content="打开音效">
					<i class="iconfont icon-music-effects-l"></i>
				</el-tooltip>
			</div>
			<!-- 音量控制器 -->
			<div class="volume">
				<i class="iconfont icon-horn-s"></i>
				<div class="slider">
					<el-slider
					:show-tooltip="false"
					v-model="volumePercent"
					@change="changeVolumePercent"
					></el-slider>
				</div>
			</div>
			<div class="playlist">
				<el-tooltip
					placement="top"
					effect="dark"
					content="打开播放列表">
					<i class="iconfont icon-playing-list-l" @click="togglePlayListShow">
						<div
						v-show="playlistChangeMsgShow"
						class="playlist-change-msg">
							{{ playlistChangeMsg }}
						</div>
					</i>
				</el-tooltip>
			</div>
		</div>
	</div>
	
</template>

<script>
	import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
	import { isDefined, formatDate } from '@/utils'
	
	export default{
		data(){
			return{
				playingModeName: '列表循环',
				playingModeIcon: 'sequence',
				isDraging: false,
				playerPercent: 0,
				volumePercent: 30,
				playlistChangeMsgShow: false,
				playlistChangeMsg: "已添加至播放列表"
			};
		},
		mounted(){
		  //this.audio.volume = this.volume
		},
		methods:{
			...mapMutations('music', [
				'setPlayingMode',
				'setPlayingState',
				'setIsPlayerShow',
				'setIsPlayListShow',
				'setIsPlayLyricShow',
				'setAudioCurrentTime'
			]),
			...mapActions('music', [
				'startPlaying'
			]),
			// 显示隐藏当前播放详情页
			togglePlayerShow(){
				this.setIsPlayerShow(!this.isPlayerShow)
			},
			// 显示隐藏当前播放列表
			togglePlayListShow(){
				this.setIsPlayListShow(!this.isPlayListShow)
			},
			// 显示隐藏当前播放歌词
			togglePlayLyricShow(){
				this.setIsPlayLyricShow(!this.isPlayLyricShow)
			},
			// 修改播放模式
			changePlayingMode(){
				switch(this.playingMode){
					case 'sequence':
						this.setPlayingMode('random')
						this.playingModeIcon = 'random'
						this.playingModeName = '随机播放'
						break;
					case 'random':
						this.setPlayingMode('loop')
						this.playingModeIcon = 'loop'
						this.playingModeName = '单曲循环'
						break;
					case 'loop':
						this.setPlayingMode('sequence')
						this.playingModeIcon = 'sequence'
						this.playingModeName = '列表循环'
						break;
					default:
						this.setPlayingMode('sequence')
						this.playingModeIcon = 'sequence'
						this.playingModeName = '列表循环'
				}
			},
			// 播放按钮
			player(){
				if (this.hasCurrentSong){
					this.setPlayingState(!this.playingState)
				}else{
					this.$message({
						message: '错误，请选择至少一首歌曲',
						type: 'error'
					});
				}
			},
			// 上一曲
			prev(){
				this.startPlaying(this.prevSong)
			},
			// 下一曲
			next(){
				this.startPlaying(this.nextSong)
			},
			// 播放结束后自动切换下一曲信息
			ended(){
				this.startPlaying(this.nextSong)
			},
			// 获取当前播放时间
			updateTime(event){
				const curentTime = event.target.currentTime * 1000    // 转换为毫秒
				const fullTime = this.currentSong.duration
				this.setAudioCurrentTime(curentTime)
				if(!this.isDraging){
					this.playerPercent = Math.min(curentTime/fullTime*100, 100) || 0
				}
			},
			// 更改播放进度
			changePlayerPercent(newVal){
				const newTime = parseInt(this.currentSong.duration * newVal / 100) || 0
				this.playerPercent = newVal
				this.setAudioCurrentTime(newTime)
				this.$refs.audio.currentTime = newTime/1000
			},
			// 计算播放音量百分比
			changeVolumePercent(newVal){
				this.volumePercent = newVal
				this.$refs.audio.volume = newVal/100
			}
		},
		computed:{
			...mapState("music", [
				'playingMode',
				'playingState',
				'isPlayerShow',
				'isPlayListShow',
				'isPlayLyricShow',
				'playlist',
				'currentSong',
				'audioCurrentTime'
			]),
			...mapGetters("music", [
				'prevSong', 
				'nextSong',
			]),
			
			hasCurrentSong(){
				return isDefined(this.currentSong.id)
			},
		},
		watch:{
			currentSong(newSong, oldSong) {
				// 播放完毕后自动监听切换下一曲
				if(oldSong.id){
					this.setPlayingState(false)
					if (this.timer) clearTimeout(this.timer)
					this.timer = setTimeout(() => {
						this.player()
					}, 1000)
				}
			},
			playlist(newVal, oldVal){
				if(newVal !== oldVal){
					this.playlistChangeMsgShow = true
					clearTimeout(timer)
					const timer = setTimeout(()=>{
						this.playlistChangeMsgShow = false
					}, 2000);
					return;
				}
			},
			playingState(newVal, oldVal){
				if(newVal){
					this.$refs.audio.play()
				}else{
					this.$refs.audio.pause()
				}
			}
		}
	}
</script>

<style lang="scss">
	.palyer-min-container{
		z-index: 999;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		position: relative;
		height: calc(100% - 20px);
		padding: 10px 20px;
		color: #777;
		font-size: 12px;
		font-weight: normal;
		.left{
			flex-basis: 200px;
			width: 200px;
			position: relative;
			background: none;
			.pic{
				float: left;
				position: relative;
				width: 50px;
				height: 50px;
				border-radius: 7px;
				overflow: hidden;
				.mask{
					display: none;
					position: absolute;
					transform: translate(-50%,-50%);
					top: 50%;
					left: 50%;
					width: 100%;
					height: 100%;
					text-align: center;
					background: #000;
					opacity: 0.36;
				}
				i{
					display: none;
					position: absolute;
					transform: translate(-50%,-50%);
					top: 50%;
					left: 50%;
					font-size: 32px;
					font-weight: normal;
					color: #fff;
				}
				&:hover .mask,&:hover i{
					display: block;
				}
				img{
					width: 100%;
					height: 100%;
				}
			}
			.desc{
				margin-left: 60px;
				padding: 5px 0;
				.name{
					height: 20px;
					width: auto;
					font-size: 14px;
					color: #555;
					word-break: break-all;
					word-wrap: break-all;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.artists{
					height: 20px;
					font-size: 14px;
					color: #999;
					word-break: break-all;
					word-wrap: break-all;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
		.middle{
			flex-grow: 1;
			position: relative;
			.player{
				position: relative;
				display: inline-block;
				transform: translateX(-50%);
				left: 50%;
				margin: auto;
				.controler{
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					position: relative;
					vertical-align: middle;
					width: auto;
					height: auto;
					margin: auto;
					i.iconfont{
						cursor: pointer;
						margin: auto 10px;
						font-size: 24px;
						color: #ec4141;
						&:hover{
							color: #e83c3c;
						}
						&.play{
							font-size: 36px;
						}
						&.mode{
							font-size: 13px;
							color: #333;
						}
						&.lyrics{
							font-size: 13px;
							color: #333;
						}
					}
				}
			}
			.progress{
				display: flex;
				position: relative;
				transform: translateX(-50%);
				left: 50%;
				max-width: 520px;
				height: 10px;
				line-height: 10px;
				span{
					flex-basis: 40px;
					height: 10px;
					line-height: 10px;
					margin: 0 5px;
					font-size: 10px;
					text-align: center;
				}
				.slider{
					flex-grow: 1;
					display: block;
					margin: 0;
					.el-slider{
						position: relative;
						height: 10px;
					}
					.el-slider__runway{
						height: 4px;
						margin: 3px 0;
					}
					.el-slider__bar{
						height: 4px;
						background-color: #e83c3c;
					}
					.el-slider__button-wrapper{
						width: 34px;
						height: 34px;
					}
					.el-slider__button{
						width: 5px;
						height: 5px;
						border: 2px solid #e83c3c;
					}
				}
			}
		}
		.right{
			flex-basis: 200px;
			position: relative;
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			.effect{
				flex-basis: 20px;
				position: relative;
				transform: translateY(-50%);
				top: 50%;
				width: 20px;
				height: 20px;
				margin-right: 15px;
				i.iconfont{
					width: 20px;
					height: 20px;
					line-height: 20px;
					font-size: 16px;
				}
			}
			.volume{
				flex-grow: 1;
				position: relative;
				transform: translateY(-50%);
				top: 50%;
				width: 20px;
				height: 20px;
				display: flex;
				flex-wrap: nowrap;
				i.iconfont{
					flex-basis: 20px;
					width: 20px;
					height: 20px;
					line-height: 20px;
					font-size: 20px;
				}
				.slider{
					flex-grow: 1;
					display: block;
					margin: 5px;
					.el-slider{
						position: relative;
						height: 10px;
					}
					.el-slider__runway{
						height: 4px;
						margin: 3px 0;
					}
					.el-slider__bar{
						height: 4px;
						background-color: #e83c3c;
					}
					.el-slider__button-wrapper{
						width: 34px;
						height: 34px;
					}
					.el-slider__button{
						width: 5px;
						height: 5px;
						border: 2px solid #e83c3c;
					}
				}
			}
			.playlist{
				flex-basis: 20px;
				position: relative;
				transform: translateY(-50%);
				top: 50%;
				width: 20px;
				height: 20px;
				margin-left: 15px;
				i.iconfont{
					width: 20px;
					height: 20px;
					line-height: 20px;
					font-size: 16px;
				}
			}
			.playlist-change-msg{
				position: absolute;
				bottom: 40px;
				left: -70px;
				width: 100px;
				height: 20px;
				line-height: 20px;
				padding: 3px 10px;
				border: 1px solid #ccc;
				font-size: 12px;
				background: #fff;
			}
		}
	}
@media screen and (max-width: 540px) {
	.palyer-min-container{
		display: block;
		height: calc(100% - 14px);
		padding: 7px 10px;
		.left{
			position: absolute;
			top: 0;
			left: 0;
			width: calc(100% - 100px);
			height: 100%;
			.pic{
				margin: 7px;
				margin-left: 20px;
				width: 36px;
				height: 36px;
				border-radius: 50%;
				i{
					font-size: 18px;
				}
			}
			.desc{
				margin: 7px;
				margin-left: 60px;
				padding: 2px 0;
				.name{
					height: 18px;
					font-size: 13px;
				}
				.artists{
					height: 14px;
					font-size: 10px;
				}
			}
		}
		.middle{
			position: absolute;
			top: 0;
			right: 60px;
			width: 40px;
			height: 100%;
			.player{
				margin: 7px auto;
				.controler{
					i.iconfont{
						display: none;
						&.play{
							display: block;
							font-size: 32px;
						}
					}
				}
			}
			.progress{
				display: none;
			}
		}
		.right{
			position: absolute;
			top: 0;
			right: 0;
			width: 60px;
			height: 100%;
			.effect{
				display: none;
			}
			.volume{
				display: none;
			}
			.playlist{
				position: relative;
				transform: translateY(-50%);
				top: 50%;
				width: 40px;
				height: 40px;
				margin-left: 20px;
				i.iconfont{
					width: 40px;
					height: 40px;
					line-height: 40px;
					font-size: 20px;
				}
			}
			.playlist-change-msg{
				position: absolute;
				bottom: 40px;
				left: -70px;
				width: 100px;
				height: 20px;
				line-height: 20px;
				padding: 3px 10px;
				border: 1px solid #ccc;
				font-size: 12px;
				background: #fff;
			}
		}
	}
}
</style>
