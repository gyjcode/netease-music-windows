<template>
	<div
	v-if="personalFMs[0]"
	class="fm-container">
		<div class="main">
			<div class="header">
				<div class="mask" :style="'background-image: url(' + currentSong.picUrl + ')'"></div>
				<div class="pic-box">
					<!-- 虚拟播放器 -->
					<div class="pic">
						<div class="prev">
							<el-image
							:src="personalFMs[prevFMIndex].picUrl + '?param=240y240'"
							fit="cover"
							:lazy="false">
								<div slot="placeholder" class="loading">
									<i class="el-icon-loading"></i>
								</div>
								<div slot="error" class="error">
									<i class="el-icon-picture-outline"></i>
								</div>
							</el-image>
						</div>
						<div class="current">
							<el-image
							:src="personalFMs[currentFMIndex].picUrl + '?param=300y300'"
							fit="cover"
							:lazy="false">
								<div slot="placeholder" class="loading">
									<i class="el-icon-loading"></i>
								</div>
								<div slot="error" class="error">
									<i class="el-icon-picture-outline"></i>
								</div>
							</el-image>
						</div>
					</div>
					<!-- 功能按钮 -->
					<div class="btns">
						<div class="btn">
							<i class="iconfont icon-heart-l"></i>
						</div>
						<div class="btn">
							<i class="iconfont icon-bin-l"></i>
						</div>
						<div
						@click="changeCurrentSong(personalFMs[nextFMIndex ? nextFMIndex : 0])"
						class="btn">
							<i class="iconfont icon-player-forward-l"></i>
						</div>
						<div
						class="btn">
							<i class="iconfont icon-more-l"></i>
						</div>
					</div>
				</div>
				<!-- 歌曲信息 -->
				<div class="song-info">
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
							<LyricScroller
							:songId="currentSong.id"
							:currentTime="audioCurrentTime"
							></LyricScroller>
						</div>
					</div>
				</div>
			</div>
			<div class="body">
				<div class="content">
					<CommentBox
					:resourceType="0"
					:resourceId="currentSong.id"
					:parentComment="parentComment"
					v-if="currentSong.id">
					</CommentBox>
					
					<!-- 最新评论 -->
					<div class="comment-list-new">
						<div class="title">
							<h3>最新评论</h3>
						</div>
						<CommentList
						:data="commentList"
						@comment="getParentComment"
						v-if="currentSong.id"
						></CommentList>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {parseLyric, createSong} from '@/utils'
	import {mapState, mapMutations} from 'vuex'
	import LyricScroller from '@/components/base/LyricScroller.vue'
	import CommentBox from '@/components/base/CommentBox.vue'
	import CommentList from '@/components/base/CommentList.vue'
	
	export default{
		components:{
			LyricScroller,
			CommentBox,
			CommentList,
		},
		data(){
			return{
				personalFMs: [],
				currentFMIndex: 0,
				prevFMIndex: 0,
				nextFMIndex: 0,
				commentList: [],
				parentComment: null
			};
		},
		created() {
			this.personalFM()
		},
		methods:{
			...mapMutations('music', [
				'setIsPlayerShow',
				'setCurrentSong'
			]),
			// 设置当前播放音乐信息
			changeCurrentSong(song){
				this.setCurrentSong(song)
				// 计算当前歌曲及上一曲索引
				if(this.currentFMIndex < 0 || this.currentFMIndex >= this.personalFMs.length - 1){
					this.currentFMIndex = 0
				}else{
					this.currentFMIndex = this.currentFMIndex + 1
				}
			},
			async personalFM(){
				const data = await this.$api.getFMPersonal()
				// console.log(data)
				if(data.code === 200){
					const fms = data.data.map((data)=>{
						return createSong({
							id: data.id,
							name: data.name,
							picUrl: data.album.picUrl,
							duration: data.duration,
							artists: data.artists.map((artists)=>{
										return {
											id: artists.id,
											name: artists.name,
											picUrl: artists.picUrl
										}
									}),
							albumId: data.album.id,
							albumName: data.album.name,
							albumPicUrl: data.album.picUrl,
						})
					})
					this.personalFMs = fms
					
					this.setCurrentSong(this.personalFMs[0])
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
					this.commentList = result
				}
			},
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
			currentFMIndex(newVal, oldVal){
				this.prevFMIndex = this.currentFMIndex - 1
				this.nextFMIndex = this.currentFMIndex + 1
				if(this.prevFMIndex < 0){
					this.prevFMIndex = this.personalFMs.length - 1
				}
				if(this.nextFMIndex > this.personalFMs.length - 1){
					this.nextFMIndex = 0
				}
			},
			currentSong(newVal, oldVal){
				this.commentlistOfMusic(newVal.id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fm-container{
		display: block;
		position: relative;
		width: auto;
		height: 100%;
		margin: 0 auto;
		overflow: hidden;
		overflow-y: auto;
		&::-webkit-scrollbar{
			width: 9px;
			height: 9px;
		}
		&::-webkit-scrollbar-thumb{
			border-radius: 18px;
			background: #7777;
		}
		&::-webkit-scrollbar-thumb:hover{
			background: #9999;
		}
		&::-webkit-scrollbar-track{
			border-right: 0px solid #7777;
			background: none;
		}
		.main{
			max-width: 1200px;
			margin: 0 auto;
		}
		.header{
			position: relative;
			width: 100%;
			height: 460px;
			margin: 10px 30px;
			background: none;
			.mask{
				z-index: -1;
				top: 0;
				left: 0;
				position: absolute;
				width: 100%;
				height: 100%;
				filter: blur(24px);
				opacity: 0.36;
				background-color: #9999;
				background-position: center;
				background-repeat: no-repeat;
				background-size: cover;
			}
			.pic-box{
				float: left;
				position: absolute;
				width: 40%;
				height: 460px;
				.pic{
					position: relative;
					width: 100%;
					height: 360px;
					.el-image{
						position: relative;
						width: 100%;
						height: 100%;
						background: #f1f1f1;
						img{
							width: 100%;
							height: 100%;
						}
						.error, .loading{
							position: absolute;
							transform: translate(-50%, -50%);
							top: 50%;
							left: 50%;
							font-size: 30px;
							color: #999;
						}
					}
					.prev{
						position: absolute;
						transform: translate(-50%, -50%);
						top: 50%;
						left: 37%;
						width: 240px;
						height: 240px;
					}
					.current{
						position: absolute;
						transform: translate(-50%, -50%);
						top: 50%;
						left: 50%;
						width: 300px;
						height: 300px;
					}
				}
				.btns{
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					justify-content: space-around;
					width: auto;
					height: auto;
					margin: 0 60px;
					text-align: center;
					.btn{
						display: block;
						width: 40px;
						height: 40px;
						line-height: 40px;
						border: 1px solid #ddd;
						border-radius: 50%;
						text-align: center;
						color: #777;
						background-color: #fff;
						&:hover{
							cursor: pointer;
							background-color: #fafafa;
						}
						i{
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
						.btns{
							float: right;
							position: relative;
							width: 40px;
							height: 100%;
							i{
								font-size: 30px;
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
								color: #999;
								&.active{
									color: #555;
								}
							}
							.nolyric{
								width: 100%;
								height: 100%;
							}
						}
					}
				}
			}
		}
		.body{
			position: relative;
			margin: 30px;
			.content{
				
			}
		}
	}
</style>
