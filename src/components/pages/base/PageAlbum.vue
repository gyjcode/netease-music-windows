<template>
	<div class="page-album-container">
		<div class="header">
			<div class="pic-box">
				<img :src="album.coverImgUrl" alt="">
			</div>
			<div class="info-box">
				<h1 class="title"><span>专辑</span>{{ album.name }}</h1>
				<div class="buttons">
					<BtnPlayAll
					:playlist="playlist"
					class="btn playall"></BtnPlayAll>
					<BtnDefault
					icon="icon-sharing-l"
					:title="'分享('+album.shareCount+')'"
					class="btn share"></BtnDefault>
					<BtnDefault
					icon="icon-download-l"
					title="全部下载"
					class="btn download"></BtnDefault>
				</div>
				<div class="info">
					<div
					v-if=" album.artists"
					class="item artists">
						<span class="name">歌手：</span>
						<span class="num">{{ album.artists[0].name }}</span>
					</div>
					<div class="item time">
						<span class="name">时间：</span>
						<span class="num">{{ album.publishTime|formatDate('YYYY-MM-DD') }}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="body">
			<!-- Tabs 面板 -->
			<el-tabs
			v-model="activeTab">
				<!-- 歌曲列表 -->
				<el-tab-pane label="歌曲列表" name="songslist">
					<!-- 歌曲列表 -->
					<TablePlaylist
					:data="playlist"></TablePlaylist>
				</el-tab-pane>
				<!-- 评论 -->
				<el-tab-pane :label="'评论('+album.commentCount+')'" name="commentlist" class="comment-area">
					<!-- 评论框 -->
					<CommentBox
					:resourceType="2"
					:resourceId="parseInt(id)"
					:parentComment="parentComment"
					class="comment-box"
					v-if="id">
					</CommentBox>
					<!-- 最新评论 -->
					<div class="comment-list-new">
						<Title title="最新评论" class="title"><span>({{ commentList.length }})</span></Title>
						<CommentList
						class="comment-list"
						:data="commentList"
						@comment="getParentComment"
						></CommentList>
					</div>
				</el-tab-pane>
				<!-- 收藏者 -->
				<el-tab-pane label="专辑详情" name="detail">
					<div
					v-if="album.description"
					class="description">
						<Title title="专辑介绍"></Title>
						<div
						class="content"
						v-html="album.description"></div>
					</div>
					<div
					class="no-description"
					v-if="!album.description">
						<div class="content">暂无介绍</div>
					</div>
				</el-tab-pane>
			</el-tabs>
			
		</div>
	</div>
</template>

<script>
	// 导入必要组件
	import CommentBox from '@/components/base/CommentBox.vue'
	import CommentList from '@/components/base/CommentList.vue'
	
	// 导入公共函数库
	import {createSong, formatDate, formatNumber} from '@/utils'
	
	export default{
		components:{
			CommentBox,
			CommentList,
		},
		data(){
			return{
				album: {},
				activeTab: 'songslist',
				playlist: [],
				commentList: [],
				parentComment: null
			};
		},
		props:{
			id:{
				type: [String, Number],
				required: true
			},
		},
		created(){
			this.songs()
			this.commentlistOfAlbum()
		},
		methods:{
			// 获取音乐列表
			async songs(){
				// 头部信息
				const data = await this.$api.getAlbum(this.id);
				// console.log(data)
				this.album = {
					id: data.album.id,
					name: data.album.name,
					artists: data.album.artists.map((artists)=>{
						return{
							id: artists.id,
							name: artists.name
						}
					}),
					description: data.album.description && data.album.description.replace(/\n/g, '<p>'),
					coverImgUrl: data.album.picUrl,
					publishTime: data.album.publishTime,
					shareCount: formatNumber(data.album.info.shareCount),
					subscribedCount: formatNumber(data.album.info.subscribedCount),
					commentCount: formatNumber(data.album.info.commentCount),
				}
				// 歌曲列表
				const playlist = data.songs.map(function(songs){
					return createSong({
						id: songs.id,
						name: songs.name,
						picUrl: songs.al.picUrl,
						duration: songs.dt,
						artists: songs.ar.map((ar)=>{
									return {
										id: ar.id,
										name: ar.name,
										picUrl: ar.picUrl
									}
								}),
						albumId: songs.al.id,
						albumName: songs.al.name,
						albumPicUrl: songs.al.picUrl,
					})
				} )
				this.playlist = playlist
			},
			// 获取父评论信息
			getParentComment(comment){
				this.parentComment = comment
			},
			// 专辑评论
			async commentlistOfAlbum(){
				const data = await this.$api.getCommentListOfAlbum({
					id: this.id,
				})
				// console.log(data)
				if(data.code === 200){
					const commentlist = data.comments.map((comments) => {
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
					this.commentList = commentlist
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.page-album-container{
		position: relative;
		height: 100%;
		padding: 30px;
		background: #fafafa;
		overflow: hidden;
		overflow-y: auto;
		&::-webkit-scrollbar{
			display: none;
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
		.header{
			width: 100%;
			height: 200px;
			margin: 10px 0 0;
			.pic-box{
				float: left;
				width: 200px;
				height: 200px;
				border-radius: 7px;
				overflow: hidden;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.info-box{
				width: auto;
				height: 100%;
				margin-left: 235px;
				.title{
					position: relative;
					height: 30px;
					margin: 0;
					line-height: 30px;
					font-size: 22px;
					font-weight: normal;
					span{
						display: inline-block;
						position: relative;
						bottom: 2px;
						height: 16px;
						margin: 2px 5px;
						border: 1px solid #c62f2f;
						padding: 1px 5px;
						border-radius: 3px;
						line-height: 16px;
						font-size: 14px;
						color: #c62f2f;
					}
				}
				.buttons{
					margin: 15px 0;
					overflow: hidden;
					.btn{
						float: left;
						margin-right: 10px;
					}
					.btn-playall-container{
						float: left;
					}
				}
				.info{
					margin: 5px 0;
					line-height: 20px;
					color: #555;
					font-size: 14px;
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
					white-space: nowrap;
					a{
						text-decoration: none;
						color: royalblue;
					}
				}
			}
		}
		.body{
			margin: 50px 0 0;
			.comment-area{
				.title{
					margin: 10px 50px;
					span{
						font-weight: bold;
					}
				}
				.comment-box{
					margin: 20px 30px;
				}
				.comment-list-new{
					
				}
				.comment-list{
					margin: 10px 30px;
				}
			}
			.description{
				margin: 10px 30px;
				.content{
					text-indent: 2em;
					line-height: 20px;
					font-size: 13px;
					color: #555;
					/deep/p{
						margin: 7px 0;
					}
				}
			}
			.no-description{
				margin: 50px 30px;
				font-size: 13px;
				color: #999;
				text-align: center;
			}
			/deep/.el-tabs{
				margin: 0 -30px;
				.el-tabs__header{
					margin: 0;
					.el-tabs__nav{
						margin: 0 30px;
					}
				}
				.el-tabs__content{
					margin: 0;
					border: 0;
					padding: 0;
				}
				.el-tabs__nav-wrap::after {
					content: "";
					position: absolute;
					left: 0;
					bottom: 0;
					width: 100%;
					height: 1px;
				}
				.el-tabs__item{
					padding: 0 15px;
					font-size: 15px;
				}
				.el-tabs__item.is-active{
					color: #c62f2f;
				}
				.el-tabs__item:hover {
				    color: #c62f2f;
				    cursor: pointer;
				}
				.el-tabs__active-bar{
					background-color: #c62f2f;
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.page-album-container{
		height: calc(100% - 20px);
		padding: 10px;
		.header{
			height: 100px;
			margin: 5px 0 0;
			.pic-box{
				width: 100px;
				height: 100px;
			}
			.info-box{
				height: calc(100% - 10px);
				margin-left: 110px;
				padding: 5px 0;
				.title{
					height: 20px;
					line-height: 20px;
					font-size: 15px;
					font-weight: bold;
					span{
						bottom: 0px;
						height: 14px;
						margin: 1px 3px;
						border: 1px solid #c62f2f;
						padding: 0 3px;
						border-radius: 2px;
						line-height: 14px;
						font-size: 10px;
					}
				}
				.buttons{
					margin: 15px 0 0;
					.btn{
						margin-right: 10px;
					}
					.share{
						display: none;
					}
					.collect{
						display: none;
					}
				}
				.info{
					margin: 10px 0;
					font-size: 10px;
					.artists{
						display: none;
					}
				}
			}
		}
		.body{
			margin: 15px 0 0;
			.comment-area{
				.title{
					margin: 10px 50px;
					span{
						font-weight: bold;
					}
				}
				.comment-box{
					margin: 10px 15px;
				}
				.comment-list-new{
					margin: 10px 0 0;
					.title{
						margin: 0 10px;
					}
					.comment-list{
						margin: 0 10px;
					}
				}
				.comment-list{
					margin: 10px 30px;
				}
			}
			/deep/.el-tabs{
				margin: 0 -10px;
				.el-tabs__header{
					margin: 0;
					.el-tabs__nav{
						margin: 0 10px;
					}
				}
				.el-tabs__item{
					height: 30px;
					line-height: 30px;
					padding: 0 7px;
					font-size: 13px;
				}
			}
			.description{
				margin: 5px 15px;
				.content{
					font-size: 10px;
					/deep/p{
						margin: 5px 0;
					}
				}
			}
			.no-description{
				margin: 30px 15px;
				font-size: 10px;
			}
		}
	}
}
</style>
