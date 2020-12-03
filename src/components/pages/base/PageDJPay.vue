<template>
	<div class="page-djpay-container">
		<div class="header">
			<div class="pic-box">
				<img :src="headerData.picUrl" alt="">
			</div>
			<div class="info-box">
				<div class="title">
					<span>付费精品</span>
					<h1>{{ headerData.name }}</h1>
				</div>
				<div class="price">
					<div class="original">¥ {{ headerData.originalPrice }}</div>
				</div>
				<div class="buttons">
					<BtnDefault
					class="btn buynow"
					icon="icon-shopping-l"
					title="立即购买"
					></BtnDefault>
					<BtnDefault
					class="btn free"
					icon="icon-player-start-l"
					title="免费试听"
					></BtnDefault>
					<BtnDefault
					class="btn share"
					icon="icon-sharing-l"
					:title="'分享'+'('+headerData.shareCount+')'"
					></BtnDefault>
				</div>
				<div
				v-html="headerData.slogan"
				class="slogan"></div>
				<div class="tag">最新上架</div>
			</div>
		</div>
		<div class="body">
			<!-- Tabs 面板 -->
			<el-tabs
			v-model="activeTab">
				<!-- 详情 -->
				<el-tab-pane label="详情" name="detail" class="detail">
					<div
					class="module"
					v-for="(item, i) in detailModules"
					:key="i">
						<h3>{{ item.title }}</h3>
						<!-- 详情内容 -->
						<div
						v-if="item.detail"
						class="detail-content">
							<div
							class="item"
							v-for="(detail, i) in item.detail"
							:key="i">
								<div
								v-if="detail.type === 1"
								v-html="detail.content.replace(/\n/g,'<p>')">
								</div>
								<img
								v-if="detail.type === 3"
								:src="detail.content" alt="">
							</div>
						</div>
						<!-- 节目内容 -->
						<div
						v-if="item.data && (item.type === 4 || item.type === 5)"
						class="data-content">
							<DJTableList
							:serialNumShow="false"
							:data="item.data"></DJTableList>
						</div>
						<!-- 精彩评论 -->
						<div
						v-if="item.data && (item.type === 6)"
						class="data-content">
							<DJCommentList
							:data="item.data"></DJCommentList>
						</div>
					</div>
				</el-tab-pane>
				<!-- 节目 -->
				<el-tab-pane :label="'节目'+'('+ headerData.programCount +')'" name="program" class="program">
					<div class="program-count">
						共 {{ headerData.programCount }} 期
					</div>
					<!-- DJ节目 -->
					<DJTableList
					:data="tableData"></DJTableList>
				</el-tab-pane>
			</el-tabs>
			
		</div>
	</div>
</template>

<script>
	// 导入必要组件
	import DJTableList from '@/components/pages/base/modules/DJTableList.vue'
	import DJCommentList from '@/components/pages/base/modules/DJCommentList.vue'
	
	// 导入公共函数库
	import {createSong, formatDate} from '@/utils'
	import {mapState, mapMutations} from 'vuex'
	
	export default{
		components:{
			DJTableList,
			DJCommentList
		},
		data(){
			return{
				headerData: {},
				activeTab: 'detail',
				tableData: [],
				detailModules: [],
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
					description: data.data.desc.replace(/\n/g,"<p>"),
					slogan: data.data.feeInfo.slogan,
					picUrl: data.data.picUrl,
					originalPrice: data.data.feeInfo.price/100,
					programCount: data.data.programCount,
					subscribedCount: data.data.subCount,
					shareCount: data.data.shareCount,
					commentCount: data.data.commentCount,
					categoryId: data.data.categoryId,
					category: data.data.category,
					authorId: data.data.dj.userId,
					authorName: data.data.dj.nickname,
					authorAvatar: data.data.dj.avatarUrl,
				}
				
				// 详情模块
				let modules = []
				data.data.feeInfo.modules.forEach((item)=>{
					if(Array.isArray(item.data)){
						if(item.type === 4){
							item.title = '最近更新'
							item.data = item.data.map((item)=>{
								return {
									id: item.id,
									name: item.name,
									picUrl: item.coverUrl,
									serialNum: item.serialNum,
									likedCount: item.likedCount,
									listenerCount: item.listenerCount,
									shareCount: item.shareCount,
									commentCount: item.commentCount,
									subscribedCount: item.subscribedCount,
									createTime: item.createTime,
									duration: item.duration,
								}
							})
						}else if(item.type === 5){
							item.title = '免费试听'
							item.data = item.data.map((item)=>{
								return {
									id: item.id,
									name: item.name,
									picUrl: item.coverUrl,
									serialNum: item.serialNum,
									likedCount: item.likedCount,
									listenerCount: item.listenerCount,
									shareCount: item.shareCount,
									commentCount: item.commentCount,
									subscribedCount: item.subscribedCount,
									createTime: item.createTime,
									duration: item.duration,
								}
							})
						}else if(item.type === 6){
							item.title = '精彩评论'
							item.data = item.data.map(({commentId, programName, content, userProfile})=>{
								return {
									id: commentId,
									programName: programName,
									content: content,
									userId: userProfile.userId,
									userNickname: userProfile.nickname,
									userAvatar: userProfile.avatarUrl,
								}
							})
						}
						modules.push(item)
					}else{
						modules.push(item.data)
					}
				})
				this.detailModules = modules
				
				// 节目列表
				const djProgram = await this.$api.getDJProgram({
					rid: this.headerData.id
				})
				// console.log(djProgram)
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

<style lang="scss" scoped>
	.page-djpay-container{
		position: relative;
		height: 100%;
		background: #fafafa;
		overflow: hidden;
		overflow-y: auto;
		&::-webkit-scrollbar{
			width: 9px;
			height: 9px;
		}
		&::-webkit-scrollbar-thumb{
			border-radius: 18px;
			background: none;
		}
		&::-webkit-scrollbar-thumb:hover{
			background: none;
		}
		&::-webkit-scrollbar-track{
			border-right: 0px solid #7777;
			background: none;
		}
		.header{
			width: 100%;
			height: 200px;
			margin: 30px 30px 0;
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
					height: 40px;
					margin: 0;
					line-height: 40px;
					font-size: 22px;
					font-weight: normal;
					span{
						float: left;
						display: inline-block;
						position: relative;
						bottom: 2px;
						height: 16px;
						margin: 12px 5px;
						border: 1px solid #ec4141;
						padding: 1px 5px;
						border-radius: 3px;
						line-height: 16px;
						font-size: 14px;
						color: #ec4141;
					}
					h1{
						display: inline-block;
						height: 40px;
						margin: 0;
						font-size: 22px;
					}
				}
				.price{
					height: 30px;
					line-height: 30px;
					margin: 5px 0;
					.original{
						font-size: 22px;
						font-weight: normal;
						color: #ec4141
					}
				}
				.buttons{
					margin: 20px 0;
					overflow: hidden;
					.btn{
						float: left;
						margin-right: 10px;
					}
					.buynow{
						/deep/ button{
							border: 1px solid #ec4141;
							color: #fff;
							background: linear-gradient(to right, #ec4141, #ed4241);
							&:hover{
								border: 1px solid #f14e41;
								background: linear-gradient(to right, #f14e41, #ca372f);
							}
						}
					}
					.free{
						/deep/ button{
							border: 1px solid #ec4141;
							color: #ec4141;
							&:hover{
								border: 1px solid #ca372f;
								color: #ca372f;
							}
						}
					}
				}
				.slogan{
					margin-top: 15px;
					font-size: 14px;
					color: #333;
				}
				.tag{
					margin-top: 10px;
					font-size: 14px;
					color: #999;
				}
			}
		}
		.body{
			/deep/.el-tabs{
				.el-tabs__header{
					margin: 10px 0 0;
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
					background: none;
				}
				.el-tabs__item{
					font-weight: bold;
					font-size: 13px;
				}
				.el-tabs__item.is-active{
					color: #ec4141;
				}
				.el-tabs__item:hover {
				    color: #ec4141;
				    cursor: pointer;
				}
				.el-tabs__active-bar{
					background-color: #ec4141;
				}
			}
			.detail{
				position: relative;
				margin: 20px 30px;
				h3{
					height: 16px;
					line-height: 16px;
					margin: 10px 0;
					border-left: 3px solid #ec4141;
					padding: 0 10px;
					font-size: 15px;
					color: #333;
				}
				img{
					display: block;
					max-width: 360px;
				}
				div{
					line-height: 18px;
					margin: 15px 0;
					font-size: 13px;
					color: #555;
				}
				/deep/p{
					margin: 7px 0;
				}
				.detail-content{
					.item{
						margin: 0;
					}
				}
			}
			.program{
				.program-count{
					margin: 10px 30px;
					font-size: 10px;
					color: #777;
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.page-djpay-container{
		&::-webkit-scrollbar{
			display: none;
		}
		.header{
			width: calc(100% - 20px);
			height: 100px;
			margin: 10px 10px 0;
			.pic-box{
				width: 100px;
				height: 100px;
			}
			.info-box{
				margin-left: 110px;
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
					h1{
						height: 20px;
						font-size: 15px;
					}
				}
				.price{
					height: 20px;
					line-height: 20px;
					margin: 10px 0;
					.original{
						font-size: 18px;
					}
				}
				.buttons{
					margin: 15px 0;
					.btn{
						margin-right: 5px;
					}
				}
				.slogan{
					display: none;
				}
				.tag{
					display: none;
				}
			}
		}
		.body{
			margin: 0;
			padding: 10px;
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
			.detail{
				margin: 0;
				padding: 0 10px;
				h3{
					margin: 10px 0;
					border-left: 2px solid #ec4141;
					padding: 0 5px;
					font-size: 13px;
				}
				div{
					line-height: 16px;
					margin: 7px 0;
					font-size: 10px;
				}
				/deep/p{
					margin: 7px 0;
				}
				.detail-content{
					.item{
						margin: 0;
					}
				}
			}
			.program{
				.program-count{
					margin: 5px 10px;
				}
			}
		}
	}
}
</style>
