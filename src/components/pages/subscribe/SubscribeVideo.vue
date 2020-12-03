<template>
	<div class="subscribe-video-container">
		<Title class="title" title="收藏的专辑"><span>({{ videos.length }})</span></Title>
		<div class="videos">
			<div
			class="video"
			v-for="(video, i) in videos"
			:key="i">
				<router-link
				tag="div"
				:to="`/page/mv/` + video.id"
				ref="picBox"
				class="pic-box">
					<img :src="video.picUrl + '?param=320y180'" alt="">
					<div class="play-count">
						<i class="iconfont icon-player-start-c-l"></i>
						{{ video.playCount|formatNumber }}
					</div>
					<div class="duration">
						{{ video.duration|formatDate("mm:ss") }}
					</div>
				</router-link>
				<router-link
				tag="div"
				:to="`/page/mv/` + video.id"
				class="name">
					{{ video.name }}
				</router-link>
				<router-link
				tag="div"
				:to="`/page/artist/` + video.creators[0].id"
				class="creators">
					<i class="iconfont icon-user-l"></i>
					{{ video.creators[0].name }}
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import {formatDate, formatNumber} from '@/utils'
	export default{
		data(){
			return{
				videos: [],
				picHeight: 180
			};
		},
		created() {
			this.subscribeVideos()
		},
		updated(){    // mounted 无法找到使用了 v-if、v-show 或者 v-for 渲染的 DOM 节点
			console.log(this)
			if(this.$refs.picBox) this.picHeight = this.$refs.picBox[0].$el.offsetWidth
			window.addEventListener('resize', () => {
				this.picHeight = this.$refs.picBox[0].$el.offsetWidth / 320 * 180
			}, false);
		},
		methods:{	
			async subscribeVideos(){
				const data = await this.$api.getMVSublist()
				console.log(data)
				if(data.code === 200){
					const result = data.data.map((data)=>{
						return {
							id: data.vid,
							name: data.title,
							picUrl: data.coverUrl,
							duration: data.durationms,
							playCount: data.playTime,
							creators: data.creator.map((creator)=>{
								return {
									id: creator.userId,
									name: creator.userName
								}
							}),
						}
					})
					this.videos = result
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.subscribe-video-container{
		position: relative;
		margin: 20px 30px;
		/deep/.title-container{
			margin: 15px 0;
			h3{
				font-size: 15px;
			}
			span{
				margin: 0 3px;
				font-size: 10px;
				color: #777;
			}
		}
		.videos{
			cursor: default;
			position: relative;
			width: 100%;
			height: auto;
			margin: 10px 0;
			padding: 0;
			overflow: hidden;
			.video{
				float: left;
				position: relative;
				width: calc(20% - 20px);
				height: auto;
				margin-right: 20px;
				margin-bottom: 30px;
				padding: 0;
				background: none;
				overflow: hidden;
				.pic-box{
					cursor: pointer;
					position: relative;
					display: block;
					border-radius: 5px;
					overflow: hidden;
					img{
						display: block;
						object-fit: cover;
						width: 100%;
						height: 100%;
					}
					.play-count{
						position: absolute;
						top: 3px;
						right: 10px;
						font-size: 10px;
						color: #fff;
					}
					.duration{
						position: absolute;
						bottom: 3px;
						right: 10px;
						font-size: 10px;
						color: #fff;
					}
				}
				.name{
					cursor: pointer;
					line-height: 20px;
					margin-top: 10px;
					font-size: 15px;
					color: #333;
				}
				.creators{
					cursor: pointer;
					line-height: 20px;
					color: #999;
					font-size: 12px;
					color: #999;
				}
			}
			
		}
	}
</style>
