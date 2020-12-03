<template>
	<div class="page-mv-container">
		<div class="sidebar">
			<Title title="相关推荐"></Title>
			<MVPicTextSidebar :data="simiMVs"></MVPicTextSidebar>
		</div>
		<div class="main">
			<div class="header">
				<div class="title">
					<i class="iconfont icon-arrow-left-l"></i>
					<router-link
					tag="div"
					:to="`/video/mv`">MV详情</router-link>
				</div>
				<Video :sources="mvSources"></Video>
				<div class="artists">
					<router-link
					tag="div"
					:to="`/page/artist/` + mv.artistId"
					class="avatar">
						<img :src="mv.artistAvatar + '?param=60y60' || require('@/assets/images/avatar-default.png')" alt="">
					</router-link>
					<router-link
					tag="div"
					:to="`/page/artist/` + mv.artistId"
					class="name">
						{{ mv.artistName }}
					</router-link>
				</div>
				<div class="name">
					<h1>
						{{ mv.name }}
						<i
						v-show="mv.desc"
						@click="descShow = !descShow"
						class="iconfont icon-arrow-down-s"></i>
					</h1>
				</div>
				<div class="info">
					<span>发布：{{ mv.publishTime }}</span>
					<span>播放：{{ mv.playCount|formatNumber }}</span>
				</div>
				<div
				v-show="mv.tags"
				class="tags">
					<div
					v-for="(tag, i) in mv.tags"
					:key="i"
					class="tag">
						{{ tag.name }}
					</div>
				</div>
				<div
				v-show="descShow"
				class="desc">
					{{ mv.desc }}
				</div>
				<div class="buttons">
					<BtnDefault
					title="赞"
					v-show="mv.likeCount"
					icon="icon-thumb-l"
					class="btn thumb">
						<span>({{ mv.likeCount }})</span>
					</BtnDefault>
					<BtnDefault
					title="收藏"
					icon="icon-collect-l"
					v-show="mv.subscribeCount"
					class="btn collect">
						<span>({{ mv.subscribeCount }})</span>
					</BtnDefault>
					<BtnDefault
					title="分享"
					icon="icon-sharing-l"
					v-show="mv.shareCount"
					class="btn share">
						<span>({{ mv.shareCount }})</span>
					</BtnDefault>
				</div>
			</div>
			<div class="body">
				<div class="content">
					<CommentBox
					:resourceType="0"
					:resourceId="mv.id"
					:parentComment="parentComment"
					class="comment-box"
					v-if="mv.id">
					</CommentBox>
					
					<!-- 最新评论 -->
					<div class="comment-list-new">
						<Title title="最新评论"></Title>
						<CommentList
						:data="commentList"
						@comment="getParentComment"
						v-if="mv.id"
						></CommentList>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// 导入公共函数库
	import {mapState, mapMutations} from 'vuex'
	import {formatDate, formatNumber} from '@/utils'
	
	import CommentBox from '@/components/base/CommentBox.vue'
	import CommentList from '@/components/base/CommentList.vue'
	import MVPicTextSidebar from '@/components/pages/base/modules/MVPicTextSidebar.vue'
	
	export default{
		components:{
			CommentBox,
			CommentList,
			MVPicTextSidebar
		},
		props:{
			id:{
				type: String|Number,
				required: true
			},
		},
		data(){
			return {
				descShow: false,
				mv: {},
				mvSources: [],
				simiMVs: [],
				commentList: [],
				parentComment: null
			}
		},
		created(){
			this.mvDetails()
			this.mvUrl()
			this.mvSimi()
			this.commentlistOfMV()
		},
		methods:{
			// 获取MV详情
			async mvDetails(){
				const data = await this.$api.getMVDetail(this.id)
				const artist = await this.$api.getArtistDetail(data.data.artistId)
				console.log(data)
				if(data.code === 200){
					const result = {
						id: data.data.id,
						desc: data.data.desc,
						name: data.data.name,
						picUrl: data.data.cover,
						publishTime: data.data.publishTime,
						playTime: data.data.duration,
						playCount: data.data.playCount || 0,
						likeCount: data.data.likeCount || 0,
						shareCount: data.data.shareCount || 0,
						subscribeCount: data.data.subCount || 0,
						artistId: artist.artist.id,
						artistName: artist.artist.name,
						artistAvatar: artist.artist.picUrl,
						tags: data.data.videoGroup
					}
					this.mv = result
				}
			},
			// 获取MV地址
			async mvUrl(){
				const data= await this.$api.getMVUrl(this.id)
				// console.log(data)
				if(data.code === 200){
					const sources = [
						{type: "", src: data.data.url}
					]
					this.mvSources = sources
				}
			},
			// 获取父评论信息
			getParentComment(comment){
				this.parentComment = comment
			},
			// MV评论数据
			async commentlistOfMV(){
				const data = await this.$api.getCommentListOfMV({
					id: this.id,
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
			async mvSimi(){
				const data = await this.$api.getMVSimilar(this.id)
				// console.log(data)
				if(data.code === 200){
					const videos = data.mvs.map((mvs)=>{
						return {
							id: mvs.id,
							name: mvs.name,
							picUrl: mvs.cover,
							playTime: mvs.duration,
							playCount: mvs.playCount,
							artistId:  mvs.artistId,
							artistName: mvs.artistName,
						}
					})
					this.simiMVs = videos
				}
			}
		},
		watch:{
			id(newVal, oldVal){
				if(newVal != oldVal){
					this.mvDetails()
					this.mvUrl()
					this.mvSimi()
					this.commentlistOfMV()
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page-mv-container{
		position: relative;
		transform: translateX(-50%);
		left: 50%;
		width: auto;
		max-width: 1000px;
		height: 100%;
		padding: 10px 30px;
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
		.sidebar{
			float: right;
			width: 300px;
		}
		.main{
			margin: 0 320px 0 0;
		}
		.header{
			cursor: default;
			width: 100%;
			height: auto;
			overflow: hidden;
			.title{
				cursor: pointer;
				height: 30px;
				line-height: 30px;
				margin: 10px 0;
				font-weight: bold;
				i.iconfont{
					float: left;
					font-size: 13px;
				}
			}
			.artists{
				width: auto;
				height: 50px;
				line-height: 50px;
				margin: 10px 0;
				.avatar{
					float: left;
					width: 50px;
					height: 50px;
					border-radius: 50%;
					overflow: hidden;
					img{
						object-fit: cover;
						width: 100%;
						height: 100%;
					}
				}
				.name{
					cursor: pointer;
					margin-left: 60px;
					font-size: 13px;
					color: #777;
				}
			}
			.name{
				margin: 10px 0;
				h1{
					margin: 0;
					font-size: 20px;
					i.iconfont{
						
					}
				}
			}
			.info{
				font-size: 12px;
				color: #999;
				span{
					margin-right: 15px;
				}
			}
			.tags{
				line-height: 20px;
				margin: 10px 0;
				overflow: hidden;
				.tag{
					float: left;
					display: block;
					height: 16px;
					line-height: 16px;
					margin-right: 5px;
					border-radius: 16px;
					padding: 1px 5px;
					font-size: 10px;
					color: #333;
					background: #eee;
				}
			}
			.desc{
				margin: 10px 0;
				line-height: 20px;
				font-size: 12px;
				color: #999;
			}
			.buttons{
				margin: 10px 0;
				overflow: hidden;
				.btn{
					float: left;
					margin-right: 10px;
				}
			}
		}
		.body{
			margin: 30px 0;
		}
	}
@media screen and (max-width: 540px) {
	.page-mv-container{
		padding: 5px 10px;
		.sidebar{
			display: none;
		}
		.main{
			margin: 0;
		}
		.header{
			cursor: default;
			width: 100%;
			height: auto;
			overflow: hidden;
			.title{
				height: 20px;
				line-height: 20px;
				margin: 3px 0;
				font-size: 13px;
				i.iconfont{
					font-size: 10px;
				}
			}
			.artists{
				width: auto;
				height: 24px;
				line-height: 24px;
				margin: 5px 0;
				.avatar{
					width: 24px;
					height: 24px;
				}
				.name{
					margin-left: 30px;
					font-size: 10px;
				}
			}
			.name{
				margin: 5px 0;
				h1{
					font-size: 15px;
					text-overflow: ellipsis;
					word-break: break-all;
					white-space: nowrap;
					overflow: hidden;
				}
			}
			.info{
				font-size: 10px;
				span{
					margin-right: 10px;
				}
			}
			.tags{
				line-height: 20px;
				margin: 5px 0;
			}
			.desc{
				margin: 5px 0;
				font-size: 10px;
			}
			.buttons{
				margin: 5px 0;
				.btn{
					margin-right: 5px;
				}
			}
		}
		.body{
			margin: 10px 0;
		}
	}
}
</style>
