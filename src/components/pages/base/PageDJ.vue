<template>
	<div class="page-dj-container">
		<div class="header">
			<div class="pic-box">
				<img :src="headerData.picUrl" alt="">
			</div>
			<div class="info-box">
				<h1 class="title"><span>电台</span>{{ headerData.name }}</h1>
				<div class="artists">
					<el-avatar class="avatar"><img :src="headerData.authorAvatar" alt=""></el-avatar>
					<h3 class="name">{{ headerData.authorName }}</h3>
				</div>
				<div class="buttons">
					<BtnPlayAll
					class="btn"
					:playlist="tableData"></BtnPlayAll>
					<BtnDefault
					icon="icon-collect-l"
					:title="'订阅('+headerData.subscribedCount+')'"
					class="btn collect"></BtnDefault>
					<BtnDefault
					icon="icon-sharing-l"
					:title="'分享('+headerData.shareCount+')'"
					class="btn share"></BtnDefault>
				</div>
				<div
				v-html="headerData.desc"
				class="desc"></div>
			</div>
		</div>
		<div class="body">
			<!-- Tabs 面板 -->
			<el-tabs
			v-model="activeTab">
				<!-- 节目 -->
				<el-tab-pane :label="'节目'+'('+ headerData.programCount +')'" name="program">
					<!-- DJ节目 -->
					<DJTableList
					:data="tableData"></DJTableList>
				</el-tab-pane>
				<!-- 收藏者 -->
				<el-tab-pane :label="'订阅者'+'('+ headerData.subscribedCount +')'" name="subscriber">
					<Subscribers :id="id" type="dj" class= "subscribers"></Subscribers>
				</el-tab-pane>
			</el-tabs>
			
		</div>
	</div>
</template>

<script>
	// 导入必要组件
	import DJTableList from '@/components/pages/base/modules/DJTableList.vue'
	import Subscribers from '@/components/base/Subscribers.vue'
	
	// 导入公共函数库
	import {createSong, formatDate, formatNumber} from '@/utils'
	import {mapState, mapMutations} from 'vuex'
	
	export default{
		components:{
			DJTableList,
			Subscribers
		},
		data(){
			return{
				headerData: {},
				activeTab: 'program',
				tableData: [],
			};
		},
		props:{
			id:{
				type: [String, Number],
				required: true
			},
		},
		created(){
			this.songListArr()
		},
		methods:{
			...mapMutations('music',[
				'setCurrentSong',
				'setPlaylist'
			]),
			// 获取音乐列表
			async songListArr(){
				// 头部信息
				const data = await this.$api.getDJDetail(this.id);
				// console.log(data)
				this.headerData = {
					id: data.data.id,
					name: data.data.name,
					description: data.data.desc,
					desc: '<span>'+data.data.category+'</span>&nbsp;'+data.data.desc.replace(/\n/g,"<p>"),
					picUrl: data.data.picUrl,
					programCount: formatNumber(data.data.programCount),
					subscribedCount: formatNumber(data.data.subCount),
					shareCount: formatNumber(data.data.shareCount),
					commentCount: formatNumber(data.data.commentCount),
					categoryId: data.data.categoryId,
					category: data.data.category,
					authorId: data.data.dj.userId,
					authorName: data.data.dj.nickname,
					authorAvatar: data.data.dj.avatarUrl,
				}
				// 节目列表
				const djProgram = await this.$api.getDJProgram({
					rid: this.headerData.id
				})
				console.log(djProgram)
				const result = djProgram.programs.map((programs)=>{
					return {
						id: programs.id,
						name: programs.name,
						picUrl: programs.coverUrl,
						serialNum: programs.serialNum,
						likedCount: programs.likedCount,
						listenerCount: programs.listenerCount,
						shareCount: programs.shareCount,
						commentCount: programs.commentCount,
						subscribedCount: programs.subscribedCount,
						createTime: programs.createTime,
						duration: programs.duration,
						mainSong: createSong({
							id: programs.mainSong.id,
							name: programs.mainSong.name,
							picUrl: programs.mainSong.picUrl,
							duration: programs.mainSong.duration,
							artists: programs.mainSong.artists.map((artists)=>{
								return {
									id: artists.id,
									name: artists.name,
									picUrl: artists.picUrl
								}
							}),
							albumId: programs.mainSong.album.id,
							albumName: programs.mainSong.album.name,
							albumPicUrl: programs.mainSong.album.picUrl,
						})
					}
				} )
				this.tableData = result
			},
		},
		computed:{
			...mapState('music', [
				'currentSong',
				'playlist'
			])
		},
	}
</script>
<style>
	/* 修正 v-html 无法渲染样式问题 */
	/* .page-dj-container .header .info-box .desc span{
		display: inline-block;
		height: 14px;
		line-height: 14px;
		margin: 3px 0;
		border: 1px solid #ec4141;
		padding: 0 3px;
		font-size: 12px;
		color: #ec4141;
	} */
</style>
<style lang="scss" scoped>
	.page-dj-container{
		position: relative;
		height: 100%;
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
			margin: 30px;
			.pic-box{
				float: left;
				width: 200px;
				height: 200px;
				border-radius: 5px;
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
				.artists{
					height: 24px;
					margin-top: 10px;
					line-height: 24px;
					.avatar{
						float: left;
						width: 24px;
						height: 24px;
						border-radius: 50%;
						img{
							height: 100%;
							width: 100%;
						}
					}
					.name{
						margin-left: 34px;
						font-size: 13px;
						font-weight: normal;
						color: #777;
						span{
							font-size: 12px;
							color: #999;
						}
					}
				}
				.buttons{
					margin: 20px 0;
					overflow: hidden;
					.btn{
						float: left;
						margin-right: 10px;
					}
					.btn-playall-container{
						float: left;
					}
				}
				.desc{
					margin-top: 15px;
					font-size: 14px;
					color: #555;
					max-height: 60px;
					overflow: hidden;
					/deep/ span{    /* 修正 v-html 无法渲染样式问题 */
						display: inline-block;
						height: 14px;
						line-height: 14px;
						margin: 3px 0;
						border: 1px solid #ec4141;
						padding: 0 3px;
						font-size: 12px;
						color: #ec4141;
					}
					/deep/p{
						margin: 7px 0;
					}
				}
			}
		}
		.body{
			margin: 50px 0;
			/deep/.el-tabs{
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
	.page-dj-container{
		.header{
			height: 100px;
			width: calc(100% - 20px);
			margin: 5px 0 0;
			padding: 10px;
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
			width: calc(100% - 20px);
			margin: 5px 0;
			padding: 0 10px;
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
