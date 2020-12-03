<template>
	<div class="page-artist-container">
		<div
		v-show="artist.id"
		class="header">
			<div class="pic-box">
				<img :src="artist.picUrl + '?param=200y200'" alt="">
			</div>
			<div class="info-box">
				<h1 class="title">{{ artist.name }}</h1>
				<div class="buttons">
					<BtnDefault
					icon="icon-collect-l"
					title="收藏"
					class="btn collect"></BtnDefault>
					<router-link
					tag="div"
					:to="`/page/user/` + artist.id"
					>
						<BtnDefault
						v-show="artist.accountId"
						icon="icon-user-l"
						title="个人主页"
						class="btn user"></BtnDefault>
					</router-link>
				</div>
				<div class="tags">
					<div class="music">
						<span>单曲数:</span>
						<span>{{ artist.musicCount|formatNumber }}</span>
					</div>
					<div class="album">
						<span>专辑数:</span>
						<span>{{ artist.albumCount|formatNumber }}</span>
					</div>
					<div class="mv">
						<span>MV 数:</span>
						<span>{{ artist.mvCount|formatNumber }}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="body">
			<!-- Tabs 面板 -->
			<el-tabs
			@tab-click="tabClick"
			v-model="activeTab">
				<!-- 节目 -->
				<el-tab-pane
				label="专辑"
				name="album">
					<div class="album">
						<div class="hots">
							<div class="header">
								<div class="pic-box">
									<img :src="require('@/assets/images/top-50.png')" alt="">
								</div>
							</div>
							<div class="body">
								<div class="title">
									<h3>热门50首</h3>
									<i class="iconfont icon-player-start-l"></i>
									<i class="iconfont icon-collect-l"></i>
								</div>
								<TablePlaylist
								class="table"
								:style="'max-height:'+ tableMaxHeight"
								:data="hots"
								:headerShow="false"
								:artistsShow="false"
								:albumShow="false"></TablePlaylist>
								<div
								@click="tableMaxHeight = 'none'"
								v-show="tableMaxHeight !== 'none'"
								class="more">
									查看全部{{ hots.length }} 首
									<i class="iconfont icon-arrow-right-l"></i>
								</div>
							</div>
						</div>
						<!-- 其他专辑 -->
						<div
						class="item"
						v-for="(item, i) in albums"
						:key="i">
							<div class="header">
								<div
								class="pic-box">
									<el-image
									:src="item.picUrl + '?param=200y200'"
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
							<div class="body">
								<div class="title">
									<h3>{{ item.name }}</h3>
									<i class="iconfont icon-player-start-l"></i>
									<i class="iconfont icon-collect-l"></i>
								</div>
								<TablePlaylist
								:data="item.songs"
								:headerShow="false"
								:artistsShow="false"
								:albumShow="false"></TablePlaylist>
							</div>
						</div>
					</div>
				</el-tab-pane>
				<!-- MV -->
				<el-tab-pane
				label="MV"
				name="mv">
					<div class="mvs">
						<div
						v-show="!mvs.length"
						class="no-mvs">
							暂无相关MV
						</div>
						<MVPicBox :data="mvs"></MVPicBox>
					</div>
				</el-tab-pane>
				<!-- 歌手详情 -->
				<el-tab-pane
				label="歌手详情"
				name="detail">
					<div class="detail">
						<div
						v-show="!detail.length"
						class="no-detail">
							暂无歌手简介
						</div>
						<div
						class="item"
						v-show="detail.length"
						v-for="(item, i) in detail"
						:key="i">
							<h3>{{ item.title }}</h3>
							<div v-html="item.desc"></div>
						</div>
					</div>
				</el-tab-pane>
				<!-- 相似歌手 -->
				<el-tab-pane
				label="相似歌手"
				name="similar-artist">
					<div class="similar-artist">
						<div
						v-show="!similarArtist.length"
						class="no-similar-artist">
							暂无相似歌手
						</div>
						<div
						class="item"
						v-show="similarArtist.length"
						v-for="(item, i) in similarArtist"
						:key="i">
							<router-link
							tag="div"
							:to="`/page/artist/`+item.id"
							class="pic-box"
							:style="'height:'+ simiArtistPicBoxHeight + 'px'"
							ref="simiArtistPicBox">
								<el-image
								:src="item.picUrl + '?param=300y300'"
								fit="cover"
								:lazy="false">
									<div slot="placeholder" class="loading">
										<i class="el-icon-loading"></i>
									</div>
									<div slot="error" class="error">
										<i class="el-icon-picture-outline"></i>
									</div>
								</el-image>
							</router-link>
							<router-link
							tag="div"
							:to="`/page/artist/`+ item.id "
							class="artist">
								{{ item.name }}
							</router-link>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	// 导入公共函数库
	import {createSong, formatDate, formatNumber} from '@/utils'
	import {mapState, mapMutations} from 'vuex'
	import MVPicBox from '@/components/pages/video/modules/MVPicBox.vue'
	
	export default{
		components:{
			MVPicBox
		},
		props:{
			id:{    // 歌手 Id
				type: Number| String,
				required: true
			},
		},
		data(){
			return{
				tableMaxHeight: "300px",
				simiArtistPicBoxHeight: 180,
				artist: {},
				activeTab: 'album',
				hots: [],
				albums: [],
				mvs: [],
				detail: [],
				similarArtist: []
			};
		},
		created(){
			this.artistDetail()
			this.artistAlbum()
			/* this.artistMV()
			this.artistDesc()
			this.artistSimi() */
		},
		updated(){    // mounted 无法找到使用了 v-if、v-show 或者 v-for 渲染的 DOM 节点
			// console.log(this)
			if(this.$refs.simiArtistPicBox) this.simiArtistPicBoxHeight = this.$refs.simiArtistPicBox[0].$el.offsetWidth
			window.addEventListener('resize', () => {
				if(this.$refs.simiArtistPicBox[0].$el) this.simiArtistPicBoxHeight = this.$refs.simiArtistPicBox[0].$el.offsetWidth
			}, false);
		},
		methods:{
			// 点击标签获取数据，减少资源开销
			tabClick(){
				switch (this.activeTab) {
					case 'album':
						this.artistAlbum()
						break;
					case 'mv':
						this.artistMV()
						break;
					case 'detail':
						this.artistDesc()
						break;
					case 'similar-artist':
						this.artistSimi()
						break;
				}
			},
			// 歌手信息
			async artistDetail(){
				const data = await this.$api.getArtistDetail(this.id)
				// console.log(data)
				if(data.code === 200){
					const result =  {
						id: data.artist.id,
						name: data.artist.name,
						picUrl: data.artist.picUrl || data.artist.img1v1Url,
						accountId: data.artist.accountId,
						musicCount: data.artist.musicSize,
						albumCount: data.artist.albumSize,
						mvCount: data.artist.mvSize,
					}
					this.artist = result
					// 热门50首
					this.hots = data.hotSongs.map((hotSongs)=>{
						return createSong({
							id: hotSongs.id,
							name: hotSongs.name,
							picUrl: hotSongs.al.picUrl,
							duration: hotSongs.dt,
							artists: hotSongs.ar,
							albumId: hotSongs.al.id,
							albumName: hotSongs.al.name,
							albumPicUrl: hotSongs.al.picUrl,
						})
					})
				}
			},
			// 获取专辑歌曲信息
			async songsOfAlbum(id){
				const data = await this.$api.getAlbum(id)
				const result = data.songs.map((songs)=>{
					return createSong({
						id: songs.id,
						name: songs.name,
						picUrl: songs.al.picUrl,
						duration: songs.dt,
						artists: songs.ar,
						albumId: songs.al.id,
						albumName: songs.al.name,
						albumPicUrl: songs.al.picUrl,
					})
				})
				return result
			},
			// 歌手专辑
			async artistAlbum(){
				const data = await this.$api.getArtistAlbum({
					id: this.id
				});
				// console.log(data)
				if(data.code === 200){
					// 注意Promise 对象处理
					const result = await Promise.all(data.hotAlbums.map(async (item)=>{
						return {
							id: item.id,
							name: item.name,
							picUrl: item.picUrl,
							songs: await this.songsOfAlbum(item.id)
						}
					}))
					this.albums = result
				}
			},
			// 歌手MV
			async artistMV(){
				const data = await this.$api.getArtistMV(this.id)
				console.log(data)
				if(data.code === 200){
					const result = data.mvs.map((mvs)=>{
						return {
							id: mvs.id,
							name: mvs.name,
							picUrl: mvs.imgurl,
							duration: mvs.duration,
							playCount: mvs.playCount,
						}
					})
					this.mvs = result
				}
			},
			// 歌手详情
			async artistDesc(){
				const data = await this.$api.getArtistDesc(this.id)
				// console.log(data)
				if(data.code === 200){
					const result = data.introduction.map((introduction)=>{
						return {
							title: introduction.ti,
							desc: introduction.txt && introduction.txt.replace(/\n/g, '<p>')
						}
					})
					this.detail = result
				}
			},
			// 相似歌手
			async artistSimi(){
				const data = await this.$api.getArtistSimi(this.id)
				// console.log(data)
				if(data.code === 200){
					const result = data.artists.map((artists)=>{
						return {
							id: artists.id,
							name: artists.name,
							picUrl: artists.picUrl
						}
					})
					this.similarArtist = result
				}
			},
		},
		watch:{
			id(newVal, oldVal){
				if(newVal !== oldVal){
					this.activeTab ='album'
					this.artistDetail()
					this.artistAlbum()
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.page-artist-container{
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
				.buttons{
					margin: 20px 0;
					overflow: hidden;
					.btn{
						cursor: pointer;
						float: left;
						margin-right: 10px;
					}
				}
				.tags{
					margin-top: 15px;
					font-size: 14px;
					color: #555;
					div{
						float: left;
						margin-right: 15px;
						font-size: 12px;
						color: #555;
					}
				}
			}
		}
		.body{
			margin: 50px 30px;
			/deep/.el-tabs{
				.el-tabs__header{
					margin: 0;
					.el-tabs__nav{
						margin: 0 20px;
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
					height: 30px;
					line-height: 30px;
					font-size: 13px;
					&.is-active{
						font-weight: bold;
						color: #555;
					}
				}
				.el-tabs__item:hover {
					cursor: pointer;
				    color: #555;
				}
				.el-tabs__active-bar{
					background-color: #c62f2f;
				}
			}
			.el-tab-pane{
				height: auto;
				margin: 10px 0;
				overflow: hidden;
				div.album{
					div{
						display: block;
						margin: 20px 0;
						overflow: hidden;
						.header{
							float: left;
							width: 200px;
							height: auto;
							.pic-box{
								width: 150px;
								height: 150px;
								border-radius: 7px;
								overflow: hidden;
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
							}
						}
						.body{
							margin: 0 0 0 200px;
							.title{
								height: 40px;
								line-height: 40px;
								color: #555;
								h3{
									float: left;
									margin: 0;
									font-size: 16px;
									font-weight: normal;
								}
								i{
									float: left;
									display: block;
									margin: 0 10px;
									font-size: 20px;
								}
							}
							.table{
								max-height: 300px;
								overflow: hidden;
							}
							.more{
								cursor: pointer;
								text-align: right;
								width: auto;
								height: 30px;
								line-height: 30px;
								margin-top: -20px;
								padding: 0 15px;
								font-size: 12px;
								color: #999;
								background: #f3f3f3;
							}
						}
					}
				}
				div.mvs{
					position: relative;
					.no-mvs{
						position: absolute;
						transform: translate(-50%,-50%);
						top: 50%;
						left: 50%;
						margin: auto;
						font-size: 13px;
						color: #777;
					}
				}
				div.detail{
					position: relative;
					min-height: 300px;
					.item{
						position: relative;
						margin: 15px 0;
						h3{
							text-indent: 0;
							height: 30px;
							line-height: 30px;
							margin: 0;
							font-size: 13px;
							font-weight: bold;
							color: #333;
						}
						div{
							padding: 10px 0;
							line-height: 20px;
							text-indent: 2em;
							font-size: 13px;
							color: #777;
							/deep/p{
								margin: 7px 0;
							}
						}
					}
					.no-detail{
						position: absolute;
						transform: translate(-50%,-50%);
						top: 50%;
						left: 50%;
						margin: auto;
						font-size: 13px;
						color: #777;
					}
				}
				div.similar-artist{
					position: relative;
					display: grid;
					grid-template-columns: 24% 24% 24% 24%;
					grid-template-rows: 19% 19% 19% 19%;
					grid-gap: 1%;
					min-height: 300px;
					overflow: hidden;
					.item{
						margin: 10px 0;
						.pic-box{
							width: 100%;
							border-radius: 7px;
							overflow: hidden;
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
						}
						.artist{
							height: 30px;
							line-height: 30px;
							font-size: 15px;
							color: #555;
						}
					}
					.no-similar-artist{
						position: absolute;
						transform: translate(-50%,-50%);
						top: 50%;
						left: 50%;
						margin: auto;
						font-size: 13px;
						color: #777;
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.page-artist-container{
		height: calc(100% - 20px);
		padding: 10px;
		&::-webkit-scrollbar{
			display: none;
		}
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
			margin: 10px 0 0;
			/deep/.el-tabs{
				margin: 0;
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
			.el-tab-pane{
				margin: 5px 0;
				div.album{
					div{
						margin: 10px 0;
						.header{
							width: 90px;
							.pic-box{
								width: 80px;
								height: 80px;
								border-radius: 5px;
							}
						}
						.body{
							margin: 0 0 0 90px;
							.title{
								height: 30px;
								line-height: 30px;
								color: #333;
								h3{
									font-size: 14px;
								}
								i{
									margin: 0 5px;
									font-size: 14px;
								}
							}
							.table{
								max-height: 240px;
							}
							.more{
								height: 30px;
								line-height: 30px;
								margin-top: -10px;
								padding: 0 10px;
								font-size: 10px;
							}
						}
					}
				}
				div.mvs{
					.no-mvs{
						font-size: 10px;
					}
				}
				div.detail{
					min-height: 200px;
					.item{
						margin: 10px 0;
						h3{
							height: 30px;
							line-height: 30px;
							font-size: 12px;
						}
						div{
							padding: 5px 0;
							font-size: 12px;
							/deep/p{
								margin: 5px 0;
							}
						}
					}
					.no-detail{
						font-size: 12px;
					}
				}
				div.similar-artist{
					grid-template-columns: 1fr 1fr 1fr;
					grid-template-rows: auto;
					grid-gap: 10px;
					min-height: 200px;
					.item{
						margin: 10px 0 0;
						.pic-box{
							border-radius: 5px;
						}
						.artist{
							height: 30px;
							line-height: 30px;
							font-size: 12px;
						}
					}
					.no-similar-artist{
						font-size: 12px;
					}
				}
			}
		}
	}
}
</style>
