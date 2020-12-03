<template>
	<div class="lyric-scroller-container">
		<div class="content">
			<!-- 滚动按钮 -->
			<div class="btns">
				<div class="top">
					<i class="iconfont icon-arrow-up-c-s"></i>
					<i class="iconfont icon-arrow-down-c-s"></i>
				</div>
				<div class="bottom">
					<i class="iconfont icon-question-s"></i>
				</div>
			</div>
			<!-- 歌曲歌词 -->
			<Scroller
			:data="lyrics"
			@init="onInitScroller"
			ref="scroller">
				<div
				class="lyric"
				ref="lyricBox">
					<div class="nolyric" v-if="!lyrics[1]">还没有歌词哦~</div>
					<div
					:class="['lyric-item', activeLyricIndex === index ? 'active' : '']"
					v-for="(item, index) in lyrics"
					:key= "index"
					ref="lyric">
						<p v-for="(lyric,lyricIndex) in item.contents" :key = "lyricIndex">
							{{ lyric }}
						</p>
					</div>
				</div>
			</Scroller>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			songId:{
				type: Number,
				required: false
			},
			currentTime:{
				type: Number,
				required: false
			}
		},
		data(){
			return{
				lyrics: []
			};
		},
		created() {
			this.getLyric()
			this.lyricScrollType = {
				"wheel": false,
				"scroll": false
			}
			this.lyricScrollTimer = {
				"wheel": null,
				"scroll": null
			}
		},
		methods:{
			// 获取歌词
			async getLyric(){
				if(!this.songId) return
				const data = await this.$api.getSongLyric(this.songId)
				// console.log(data)
				if(data.nolyric) return
				if(data.code === 200){
					// 获取原歌词及翻译歌词
					var lyricRaw = this.parseLyric(data.lrc.lyric)
					var tlyricRaw = this.parseLyric(data.tlyric.lyric)
					this.lyrics = this.lyricWithTranslation(lyricRaw, tlyricRaw)
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
			// 原始歌词拼接翻译歌词
			lyricWithTranslation(lyric, tlyric){
				let result = []
				// 去除空值  array.filter(function(currentValue,index,arr), thisValue)
				const lyricFiltered = lyric.filter(function({ content }){
					return Boolean(content)
				})
				// content转换为数组 array.forEach(function(currentValue, index, arr), thisValue)
				if (lyricFiltered.length) {
					lyricFiltered.forEach( item => {
						const { time, content } = item          // 解构 item
						const lyricItem = { time, content, contents: [content] }        // 默认歌词
						// 翻译歌词-追加
						if(tlyric){
							// 查找相同时间的翻译项目 array.find(function(currentValue, index, arr),thisValue)
							const sameTimeTLyricItem = tlyric.find(
								({ time: tLyricTime }) => tLyricTime === time
							)
							// 获取查找到的翻译项目歌词并添加到 contents 中
							if (sameTimeTLyricItem) {
								const { content: tLyricContent } = sameTimeTLyricItem
								if (content) {
									lyricItem.contents.push(tLyricContent)
								}
							}
						}
						// 追加处理后的歌词项目
						result.push(lyricItem)
					})
				} else {
					result = lyricFiltered.map(({ time, content }) => ({
						time,
						content,
						contents: [content]
					}))
				}
				return result
			},
			// 初始化滚动器
			onInitScroller(scoller) {
				// 滚动开始
				const onScrollStart = type => {
					this.lyricScrollTimer[type] && clearTimeout(this.lyricScrollTimer[type])
					this.lyricScrollType[type] = true
				}
				// 滚动结束
				const onScrollEnd = type => {
					this.lyricScrollTimer[type] && clearTimeout(this.lyricScrollTimer[type])
					this.lyricScrollTimer[type] = setTimeout(() => {
						this.lyricScrollType[type] = false
					}, 500)        // 500ms 后自动滚动
				}
				// 拖拽条滚动
				scoller.on("scrollStart", onScrollStart.bind(null, "scroll"))
				scoller.on("scrollEnd", onScrollEnd.bind(null, "scroll"))
				// 滑轮滚动
				scoller.on("mousewheelStart", onScrollStart.bind(null, "wheel"))
				scoller.on("mousewheelEnd", onScrollEnd.bind(null, "wheel"))
			},
			// 滚动到指定歌词
			scrollToActiveLyric() {
				if (this.activeLyricIndex !== -1) {
					const { scroller, lyric } = this.$refs
					if (scroller && lyric[this.activeLyricIndex]) {
						scroller
						.getScroller()
						.scrollToElement(lyric[this.activeLyricIndex], 200, 0, true)
					}
				}
			}
		},
		computed:{
			// 计算当前激活歌词的索引 array.findIndex(function(currentValue, index, arr), thisValue)
			activeLyricIndex() {
				// 使用箭头函数 this 指向上下文
				const index = this.lyrics.findIndex((item, index) => {
					// console.log(item)
					const nextLyric = this.lyrics[index + 1]
					return ( this.currentTime/1000 >= item.time && (nextLyric ? this.currentTime/1000 < nextLyric.time : true) )
				})
				return this.lyrics ? index : -1
			},
		},
		watch:{
			songId(newVal, oldVal){
				if(newVal) this.getLyric()
			},
			// 监控当前歌词改变
			activeLyricIndex(newIndex, oldIndex) {
				if( newIndex !== oldIndex && !this.lyricScrollType["wheel"] && !this.lyricScrollType["scroll"] ){
					// Dom 加载后滚动到歌词
					this.$nextTick(() => {
						this.scrollToActiveLyric()
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lyric-scroller-container{
		.content{
			font-size: 14px;
			height: 300px;
			.btns{
				float: right;
				position: relative;
				width: 40px;
				height: 100%;
				i{
					display: block;
					margin: 5px;
					font-size: 18px;
					color: #9999;
					&:hover{
						color: #7777;
					}
				}
				.top{
					position: absolute;
					top: 0;
				}
				.bottom{
					position: absolute;
					bottom: 0;
				}
			}
			.lyric{
				width: auto;
				height: auto;
				margin: 0 45px 0 0;
				overflow: hidden;
				overflow-y: auto;
				&::-webkit-scrollbar{
					width: 9px;
					height: 9px;
				}
				&::-webkit-scrollbar-thumb{
					border-radius: 18px;
					background: #9999;
				}
				&::-webkit-scrollbar-thumb:hover{
					background: #7777;
				}
				&::-webkit-scrollbar-track{
					border-right: 1px solid #7777;
					background: none;
				}
				.lyric-item{
					margin: 0;
					&.active{
						color: #fff;
					}
					p{
						margin: 10px 0;
					}
				}
				.nolyric{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
