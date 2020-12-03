<!-- 
  * 桌面歌词显示
 -->
<template>
	<div
	class="play-lyric-container"
	v-show="isPlayLyricShow"
	@mousedown="dragLyric"
	ref="dragLyric"
	id="drag-lyric">
		<div class="mask"></div>
		<div class="content">
			<div class="tools">
				<div class="player" @click="togglePlayerShow" v-show="!locked">
					<i class="iconfont icon-musical-note-l"></i>
				</div>
				<div class="back" @click="prev" v-show="!locked">
					<i class="iconfont icon-player-back-l"></i>
				</div>
				<div class="play" @click="play" v-show="!locked">
					<i :class="['iconfont', !this.playingState ? 'icon-player-start-s':'icon-player-pause-s']"></i>
				</div>
				<div class="forward" @click="next" v-show="!locked">
					<i class="iconfont icon-player-forward-l"></i>
				</div>
				<router-link
				tag="div"
				:to="`/setting`"
				v-show="!locked"
				class="setting">
					<i class="iconfont icon-setting-l"></i>
				</router-link>
				<div class="lock" @click="locked = !locked">
					<i :class="['iconfont', !this.locked ? 'icon-locked-l':'icon-unlocked-l']"></i>
				</div>
				<div class="arrow-left" v-show="!locked">
					<i class="iconfont icon-arrow-left-l">-</i>
				</div>
				<div class="arrow-right" v-show="!locked">
					<i class="iconfont icon-arrow-right-l">+</i>
				</div>
				<div class="close" @click="close" v-show="!locked">
					<i class="iconfont icon-close-l"></i>
				</div>
			</div>
			<div
			v-show="currentSong.id"
			class="lyrics">
				<div
				v-show="playedLyric"
				:data-text="playedLyric"
				class="played">
					{{ playedLyric }}
				</div>
				<!-- <div
				v-show="tlyrics && playedTLyric"
				:data-text="playedTLyric"
				class="played">
					{{ playedTLyric }}
				</div> -->
				<div
				v-show="notPlayedLyric"
				:data-text="notPlayedLyric"
				class="not-played">
					{{ notPlayedLyric }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
	import { drag, isDefined } from '@/utils'
	
	export default{
		data(){
			return{
				lyrics: [],
				tlyrics: [],
				locked: false
			};
		},
		created() {
			this.getLyric()
		},
		methods:{
			...mapMutations('music', [
				'setIsPlayerShow',
				'setPlayingState',
				'setIsPlayLyricShow'
			]),
			...mapActions('music', [
				'startPlaying'
			]),
			// 获取歌词
			async getLyric(){
				if(!this.currentSong) return
				const data = await this.$api.getSongLyric(this.currentSong.id)
				// console.log(data)
				if(data.nolyric) return
				if(data.code === 200){
					this.lyrics =this.parseLyric(data.lrc.lyric)
					this.tlyrics = this.parseLyric(data.tlyric.lyric)
				}
			},
			// 歌词解析器
			parseLyric(lyricRaw) {
				if(!lyricRaw) return
				// 回车符号分割为数组
				const lyrics = lyricRaw.split('\n')
				const result = []
				// 遍历数组重新生成
				for (let i = 0; i < lyrics.length; i++) {
					const lyric = decodeURIComponent(lyrics[i])
					const timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g
					const timeRegExpArr = lyric.match(timeReg)
					if (!timeRegExpArr) continue
					
					const content = lyric.replace(timeReg, '')
					
					for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
						const t = timeRegExpArr[k]
						const min = Number(String(t.match(/\[\d*/i)).slice(1))
						const sec = Number(String(t.match(/:\d*/i)).slice(1))
						const time = min * 60 + sec
						if (content !== '') {
							result.push({ time: time, content })
						}
					}
				}
				return result
			},
			dragLyric(){
				if(this.locked){
					drag(this.$refs.dragLyric, this.$refs.dragLyric, false)
				}else{
					drag(this.$refs.dragLyric, this.$refs.dragLyric)
				}
			},
			// 显示隐藏当前播放详情页
			togglePlayerShow(){
				this.setIsPlayerShow(!this.isPlayerShow)
			},
			// 播放按钮
			play(){
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
			close(){
				this.setIsPlayLyricShow(false)
			}
		},
		computed:{
			...mapState('music',[
				'isPlayLyricShow',
				'isPlayerShow',
				'currentSong',
				'audioCurrentTime',
				'playingState',
			]),
			...mapGetters("music", [
				'prevSong', 
				'nextSong',
			]),
			
			hasCurrentSong(){
				return isDefined(this.currentSong.id)
			},
			// 计算当前激活歌词的索引 array.findIndex(function(currentValue, index, arr), thisValue)
			activeLyricIndex() {
				// 使用箭头函数 this 指向上下文
				const index = this.lyrics.findIndex((item, index) => {
					// console.log(item)
					const nextLyric = this.lyrics[index + 1]
					return ( this.audioCurrentTime/1000 >= item.time && (nextLyric ? this.audioCurrentTime/1000 < nextLyric.time : true) )
				})
				return this.lyrics ? index : -1
			},
			playedLyric() {
				if(this.activeLyricIndex === -1 ) return ''
				return this.lyrics[this.activeLyricIndex].content
			},
			playedTLyric() {
				if(!this.tlyrics || this.activeLyricIndex === -1 ) return ''
				return this.tlyrics[this.activeLyricIndex].content
			},
			notPlayedLyric() {
				if( this.activeLyricIndex === -1 || this.activeLyricIndex === this.lyrics.length) return ''
				return this.lyrics[this.activeLyricIndex + 1].content
			}
		},
		watch:{
			currentSong(newVal, oldVal){
				this.getLyric()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.play-lyric-container{
		z-index: 999;
		position: fixed;
		left: calc(50% - 330px);
		bottom: 80px;
		width: 660px;
		height: 130px;
		margin: 0 auto;
		background: none;
		overflow: hidden;
		.mask{
			display: block;
			position: absolute;
			width: 100%;
			height: 100%;
			padding: 5px;
			opacity: 0;
		}
		&:hover .mask{
			border: 1px solid #777;
			background: #000;
			opacity: 0.24;
		}
		.content{
			position: absolute;
			width: calc(100% - 10px);
			height: calc(100% - 10px);
			margin: 5px;
			.tools{
				cursor: pointer;
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				width: 300px;
				height: 20px;
				line-height: 20px;
				margin: 5px auto;
				color: #fff;
				&>div{
					flex: 0 0 1;
					width: 20px;
					height: 20px;
					line-height: 20px;
					margin-right: 5px;
					text-align: center;
					i.iconfont{
						font-size: 13px;
						&.icon-arrow-right-l{
							position: relative;
							left: -15px;
							font-size: 15px;
							&::before{
								position: relative;
								left: 20px;
								font-size: 13px;
							}
						}
						&.icon-arrow-left-l{
							position: relative;
							font-size: 16px;
							&::before{
								font-size: 13px;
							}
						}
					}
				}
			}
			.lyrics{
				
				.played, .not-played{
					display: block;
					cursor: default;
					text-align: center;
					position: relative;
					width: auto;
					height: auto;
					line-height: 1;
					margin: 10px 50px;
					border: 0;
					border-radius: 0;
					padding: 0;
					font-family: '黑体';
					font-weight: bold;
					font-size: 32px;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					-webkit-animation: hue 6s infinite linear;
					-moz-user-select: none; /*火狐*/
					-webkit-user-select: none; /*webkit浏览器*/
					-ms-user-select: none; /*IE10*/
					-khtml-user-select: none; /*早期浏览器*/
					user-select: none;
					word-break: break-all;
					white-space: nowrap;
					overflow: hidden;
					&::before {
						z-index: -1;
						content: attr(data-text);
						position: absolute;
						-webkit-text-stroke: 2px #333;
					}
				}
				.played{
					text-align: left;
					background-image: linear-gradient( #ffdedf, #ffaaaa, #ffdedf);
				}
				.not-played{
					text-align: right;
					background-image: linear-gradient( #f9f9f9, #e1e1e1, #f9f9f9);
				}
			}
		}
	}
</style>
