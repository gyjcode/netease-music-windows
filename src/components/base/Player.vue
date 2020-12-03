<template>
	<transition name="rotate">
	<div class="player-container" v-show="isPlayerShow">
		<div class="content">
			<div class="header">
				<div class="mask" :style="'background-image: url(' + currentSong.picUrl + ')'"></div>
				<div class="player-box" v-show="virtualPlayerShow">
					<!-- 虚拟播放器 -->
					<VirtualPlayer :play="playingState" :picUrl="currentSong.picUrl"></VirtualPlayer>
					<!-- 功能按钮 -->
					<div class="btns">
						<div class="btn heart"><i class="iconfont icon-heart-l"></i></div>
						<div class="btn collect"><i class="iconfont icon-collect-l"></i></div>
						<div class="btn download"><i class="iconfont icon-download-l"></i></div>
						<div class="btn share"><i class="iconfont icon-sharing-l"></i></div>
						<div class="btn comment" @click="toggleBodyShow"><i class="iconfont icon-comment-l"></i></div>
					</div>
				</div>
				<!-- 歌曲信息 -->
				<div class="song-info" v-show="lyricScrollerShow">
					<div class="main">
						<div class="header">
							<h1 class="title">{{ currentSong.name }}</h1>
							<div class="source">{{ currentSong.album.name }}</div>
							<div class="info">
								<span class="album">专辑：{{ currentSong.album.name }}</span>
								<span class="artist">歌手：{{ currentSong.artists.map(({name})=>name).join('/') }}</span>
								<span class="from">来源：{{ currentSong.name }}</span>
							</div>
						</div>
						<div class="content">
							<LyricScroller :songId="currentSong.id" :currentTime="audioCurrentTime" ></LyricScroller>
						</div>
					</div>
				</div>
				<span class="close" @click="close()">
					<i class="iconfont icon-shrink-l"></i>
				</span>
				<span class="lyric" @click="togglePlayerLyricShow()">
					<i class="iconfont icon-musical-note-l"></i>
				</span>
			</div>
			<div class="body" v-show="bodyShow">
				<div class="close-body" @click="toggleBodyShow"><i class="iconfont icon-close-l"></i></div>
				<div class="slider">
					<PlayerSidebar></PlayerSidebar>
				</div>
				<div class="content">
					<!-- 评论框 -->
					<Title
					class="title"
					title="听友评论">
						<span>(已有{{ commentTotal }}条评论)</span>
					</Title>
					<CommentBox
					:resourceType="0"
					:resourceId="currentSong.id"
					:parentComment="parentComment"
					v-if="currentSong.id">
					</CommentBox>
					<!-- 最新评论 -->
					<div class="comment-list-new">
						<Title
						class="title"
						title="最新评论"></Title>
						<CommentList
						:data="commentList"
						v-if="currentSong.id"
						@comment="getParentComment"
						></CommentList>
					</div>
				</div>
			</div>
		</div>
	</div>
	</transition>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	import VirtualPlayer from '@/components/base/VirtualPlayer.vue'
	import LyricScroller from '@/components/base/LyricScroller.vue'
	import CommentBox from '@/components/base/CommentBox.vue'
	import CommentList from '@/components/base/CommentList.vue'
	import PlayerSidebar from '@/components/base/PlayerSidebar.vue'
	
	export default{
		components:{
			VirtualPlayer,
			LyricScroller,
			CommentBox,
			CommentList,
			PlayerSidebar
		},
		data(){
			return{
				lyricArr: [],
				commentTotal: 0,
				commentList: [],
				parentComment: null,
				virtualPlayerShow: true,
				lyricScrollerShow: true,
				bodyShow: true
			};
		},
		mounted() {
			this.commentlistOfMusic(this.currentSong.id)
			this.togglePlayerLyricShow()
			this.toggleBodyShow()
		},
		methods:{
			...mapMutations('music', [
				'setIsPlayerShow',
			]),
			// 关闭播放页面
			close(){
				this.setIsPlayerShow(false)
			},
			// 切换歌词-播放器显示
			togglePlayerLyricShow(){
				const clientWidth = document.body.clientWidth
				if(clientWidth > 540) return
				
				const playerShow = this.virtualPlayerShow
				const lyricShow = this.lyricScrollerShow
				if( (playerShow && lyricShow) || (!playerShow && lyricShow) ){
					this.virtualPlayerShow = true
					this.lyricScrollerShow = false
				}else{
					this.virtualPlayerShow = false
					this.lyricScrollerShow = true
				}
			},
			// 切换评论区域显示隐藏
			toggleBodyShow(){
				const clientWidth = document.body.clientWidth
				if(clientWidth > 540) return
				
				const bodyShow = this.bodyShow
				if(bodyShow){
					this.bodyShow = false
				}else{
					this.bodyShow = true
				}
			},
			// 获取父评论信息
			getParentComment(comment){
				this.parentComment = comment
			},
			// 音乐评论数据
			async commentlistOfMusic(){
				const data = await this.$api.getCommentMusic({
					id: this.currentSong.id,
				})
				// console.log(data)
				if(data.code === 200){
					const result = data.comments.map((comments) =>{
						return {
							id: comments.commentId,
							time: comments.time,
							content: comments.content,
							user: {
								id: comments.user.userId,
								name: comments.user.nickname,
								avatar: comments.user.avatarUrl,
							},
							beReplied: comments.beReplied.map((beReplied) => {
								return {
									id: beReplied.beRepliedCommentId,
									content: beReplied.content,
									user: {
										id: beReplied.user.userId,
										name: beReplied.user.nickname,
										avatar: beReplied.user.avatarUrl,
									},
								}
							})
						}
					})
					this.commentTotal = data.total
					this.commentList = result
				}
			},
			// 获取父评论信息
			getParentCommentId(id){
				this.parentCommentId = id
			}
		},
		computed:{
			...mapState('music',[
				'isPlayerShow',
				'playingState',
				'currentSong',
				'audioCurrentTime'
			]),
		},
		watch:{
			currentSong(newVal, oldVal){
				this.commentlistOfMusic(newVal.id)
				this.togglePlayerLyricShow()
				this.toggleBodyShow()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.player-container{
		z-index: 99;
		float: left;
		display: block;
		position: fixed;
		top: 50px;
		bottom: 50px;
		width: 100%;
		height: auto;
		padding: 10px 30px;
		background: #fafafa;
		overflow: hidden;
		overflow-y: auto;
		.content{
			width: auto;
			max-width: 1200px;
			height: auto;
			margin: auto;
			.header{
				position: relative;
				width: 100%;
				height: 460px;
				margin: auto;
				background: none;
				.mask{
					z-index: -1;
					top: 0;
					left: 0;
					position: absolute;
					width: 100%;
					height: 100%;
					filter: blur(36px);
					opacity: 0.36;
					background-color: #9999;
					background-position: center;
					background-repeat: no-repeat;
					background-size: cover;
				}
				.player-box{
					float: left;
					position: relative;
					width: 40%;
					height: 460px;
					.virtual-player{
						transform: translateX(-50%);
						left: 50%;
					}
					.btns{
						display: flex;
						flex-direction: row;
						justify-content: space-around;
						width: 100%;
						max-width: 300px;
						height: auto;
						margin: 20px auto;
						text-align: center;
						.btn{
							display: inline-block;
							position: relative;
							width: 40px;
							height: 40px;
							margin: 0 auto;
							border-radius: 50%;
							background-color: #f5f5f5;
							&.comment{
								display: none;
							}
							&:hover{
								cursor: pointer;
								background-color: #ebebeb;
							}
							i{
								display: block;
								position: absolute;
								transform: translate(-50%, -50%);
								top: 50%;
								left: 50%;
								color: #000;
								font-size: 16px;
							}
						}
					}
				}
				.song-info{
					float: right;
					width: 60%;
					height: 100%;
					color: #333;
					overflow: hidden;
					.main{
						margin: 20px 60px;
						.header{
							min-height: 60px;
							height: auto;
							background: none;
							.title{
								height: 40px;
								margin: 0;
								line-height: 40px;
								font-size: 20px;
							}
							.source{
								display: none;
								margin: 10px 0;
								font-size: 16px;
							}
							.info{
								margin: 15px 0;
								font-size: 12px;
								span{
									display: inline-block;
									min-width: 100px;
									margin-right: 10px;
									text-overflow: ellipsis;
									white-space: nowrap;
									word-break: break-all;
								}
							}
						}
						.content{
							font-size: 14px;
							height: 300px;
						}
					}
				}
				.close{
					float: right;
					display: inline-block;
					position: absolute;
					top: 30px;
					right: 50px;
					padding: 1px 9px;
					border-radius: 5px;
					color: #999;
					background: #eee;
					&:hover{
						color: #666;
						background: #f9f9f9;
					}
					&>i.icon-shrink-l{
						padding: 3px 5px;
						font-size: 16px;
						font-weight: bold;
					}
				}
				.lyric{
					display: none;
				}
			}
			.body{
				position: relative;
				.close-body{
					display: none;
				}
				.content{
					width: auto;
					padding: 0 360px 0 0;
					.title{
						span{
							margin: 0 5px;
							font-size: 12px;
							font-weight: normal;
							color: #999;
						}
					}
				}
				.slider{
					z-index: 9;
					float: right;
					width: 300px;
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.player-container{
		top: 50px;
		bottom: 50px;
		width: 100%;
		padding: 0;
		&::-webkit-scrollbar{
			display: none;
		}
		.content{
			width: 100%;
			height: 100%;
			.header{
				position: relative;
				width: calc(100% - 20px);
				height: calc(100% - 18px);
				padding: 10px;
				overflow: hidden;
				.mask{
					filter: blur(60px);
					opacity: 1;
				}
				.player-box{
					position: absolute;
					width: calc(100% - 20px);
					height: calc(100% - 20px);
					.virtual-player{
						top: 30px;
						width: 280px;
						height: 280px;
					}
					.btns{
						position: absolute;
						transform: translateX(-50%);
						left: 50%;
						width: 80%;
						height: auto;
						margin: auto;
						bottom: 30px;
						.btn{
							background: none;
							&.comment{
								display: block;
							}
							&:hover{
								background: none;
							}
							i{
								font-size: 20px;
								color: #fff;
							}
						}
					}
				}
				.song-info{
					position: absolute;
					width: calc(100% - 20px);
					height: calc(100% - 20px);
					.main{
						width: calc(100% - 60px);
						height: calc(100% - 60px);
						margin: 30px;
						.header{
							min-height: 60px;
							height: auto;
							background: none;
							text-align: center;
							.title{
								height: 30px;
								line-height: 30px;
								font-size: 18px;
							}
							.source{
								display: none;
							}
							.info{
								margin: 10px 0;
								font-size: 10px;
							}
						}
						.content{
							font-size: 14px;
							height: calc(100% - 82px);
							/deep/.lyric-scroller-container{
								height: 100%;
								.content{
									height: 100%;
									text-align: center;
									.btns{
										display: none;
									}
									.scroller-container{
										.lyric{
											margin: 0;
										}
									}
								}
							}
						}
					}
				}
				.close{
					display: none;
				}
				.lyric{
					z-index: 999;
					display: block;
					position: absolute;
					top: 30px;
					right: 50px;
					color: #eee;
					background: none;
					&:hover{
						color: #fff;
					}
					&>i.icon-musical-note-l{
						font-size: 20px;
					}
				}
			}
			.body{
				z-index: 999999;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: #fff;
				overflow: hidden;
				.close-body{
					z-index: 999;
					display: block;
					position: absolute;
					top: 10px;
					right: 30px;
					color: #333;
					background: none;
					&:hover{
						color: #555;
					}
					&>i.icon-musical-note-l{
						font-size: 20px;
					}
				}
				.content{
					width: auto;
					padding: 20px;
					overflow: hidden;
					overflow-y: auto;
				}
				.slider{
					display: none;
				}
			}
		}
	}
}
</style>
