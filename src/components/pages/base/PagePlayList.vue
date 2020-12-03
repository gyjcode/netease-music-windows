<template>
	<div class="page-playlist-container">
		<div class="header">
			<div class="pic-box">
				<img :src="headerData.coverImgUrl" alt="">
			</div>
			<div class="info-box">
				<h1 class="title"><span>歌单</span>{{ headerData.name }}</h1>
				<div class="artists">
					<el-avatar class="avatar"><img :src="headerData.creatorAvatarUrl" alt=""></el-avatar>
					<h3 class="name">{{ headerData.creatorName }} <span>{{ headerData.createTime|formatDate('YYYY-MM-DD') }}创建</span></h3>
				</div>
				<div class="buttons">
					<BtnPlayAll
					:playlist="tableData"
					class="btn playall"></BtnPlayAll>
					<BtnDefault
					icon="icon-collect-l"
					v-show="headerData.subscribedCount"
					:title="'收藏('+headerData.subscribedCount+')'"
					class="btn collect"></BtnDefault>
					<BtnDefault
					icon="icon-sharing-l"
					v-show="headerData.shareCount"
					:title="'分享('+headerData.shareCount+')'"
					class="btn share"></BtnDefault>
					<BtnDefault
					icon="icon-download-l"
					title="全部下载"
					class="btn download"></BtnDefault>
				</div>
				<div
				v-if="headerData.tags"
				class="tags">
					标签：{{ headerData.tags }}
				</div>
				<div class="count">
					<div class="item">
						<span class="name">播放：</span>
						<span class="num">{{ headerData.playCount }}</span>
					</div>
					<div class="item">
						<span class="name">歌曲：</span>
						<span class="num">{{ headerData.trackCount }}</span>
					</div>
				</div>
				<div class="desc">
					描述：{{ headerData.description }}
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
					:data="tableData"></TablePlaylist>
				</el-tab-pane>
				<!-- 评论 -->
				<el-tab-pane :label="'评论('+ (headerData.commentCount || 0) +')'" name="commentlist" class="comment-area">
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
				<el-tab-pane label="收藏者" name="collector">
					<Subscribers :id="id" type="playlist" class= "subscribers"></Subscribers>
				</el-tab-pane>
			</el-tabs>
			
		</div>
	</div>
</template>

<script>
	// 导入必要组件
	import CommentBox from '@/components/base/CommentBox.vue'
	import CommentList from '@/components/base/CommentList.vue'
	import Subscribers from '@/components/base/Subscribers.vue'
	
	// 导入公共函数库
	import {createSong, formatDate, formatNumber} from '@/utils'
	
	export default{
		components:{
			CommentBox,
			CommentList,
			Subscribers
		},
		props:{
			id:{
				type: [String, Number],
				required: true
			},
		},
		data(){
			return{
				headerData: {},
				activeTab: 'songslist',
				tableData: [],
				commentList: [],
				parentComment: null
			};
		},
		created() {
			this.songListArr()
			this.commentlistOfPlaylist()
		},
		methods:{
			// 获取音乐列表
			async songListArr(){
				// 头部信息
				const data = await this.$api.getPlayListDetail(this.id);
				// console.log(data)
				this.headerData = {
					id: data.playlist.id,
					name: data.playlist.name,
					tags: data.playlist.tags.join('/'),
					description: data.playlist.description,
					coverImgUrl: data.playlist.coverImgUrl,
					createTime: data.playlist.createTime,
					playCount: formatNumber(data.playlist.playCount),
					shareCount: formatNumber(data.playlist.shareCount),
					subscribedCount: formatNumber(data.playlist.subscribedCount),
					commentCount: data.playlist.commentCount,
					trackCount: data.playlist.trackCount,
					creatorName: data.playlist.creator.nickname,
					creatorAvatarUrl: data.playlist.creator.avatarUrl,
				}
				// 歌曲列表
				const trackIds = data.playlist.trackIds.map(({ id }) => id);
				const songDetails = await this.$api.getSongDetail(trackIds);
				// console.log(songDetails)
				// array.map(function(item,index,arr){})
				const playlist = songDetails.songs.map(function(songs){
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
						alias: songs.alia
					})
				} )
				this.tableData = playlist
			},
			// 获取父评论信息
			getParentComment(comment){
				this.parentComment = comment
			},
			// 歌单评论
			async commentlistOfPlaylist(){
				const data = await this.$api.getCommentListOfPlaylist({
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
		watch:{
			id(newVal, oldVal){
				if(newVal !== oldVal){
					this.songListArr()
					this.commentlistOfPlaylist()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page-playlist-container{
		position: relative;
		height: calc(100% - 60px);
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
					word-break: break-all;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
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
				.artists{
					height: 30px;
					margin-top: 10px;
					line-height: 30px;
					.avatar{
						float: left;
						width: 30px;
						height: 30px;
						border-radius: 50%;
						img{
							height: 100%;
							width: 100%;
						}
					}
					.name{
						margin-left: 40px;
						font-size: 14px;
						font-weight: normal;
						color: #777;
						span{
							font-size: 12px;
							color: #999;
						}
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
				.tags{
					margin: 5px 0;
					font-size: 14px;
					color: #555;
				}
				.count{
					margin: 5px 0;
					display: block;
					overflow: hidden;
					.item{
						float: left;
						margin-right: 5px;
					}
					font-size: 13px;
					color: #555;
				}
				.desc{
					margin: 5px 0;
					height: 20px;
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
	.page-playlist-container{
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
				.artists{
					height: 20px;
					margin-top: 5px;
					line-height: 20px;
					.avatar{
						width: 20px;
						height: 20px;
					}
					.name{
						margin-left: 25px;
						font-size: 10px;
						span{
							display: none;
						}
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
				.tags{
					display: none;
				}
				.count{
					display: none;
				}
				.desc{
					display: none;
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
		}
	}
}
</style>
