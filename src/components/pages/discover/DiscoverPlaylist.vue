<template>
	<div class="discover-playlist-container">
		<div class="header">
			<router-link
			tag="div"
			:to="`/discover/playlist/highquality`"
			class="highquality">
				<div
				class="mark"
				v-show="playlistsHighquality"
				:style="'background-image: url(' + playlistsHighquality.coverImgUrl + ')'"></div>
				<div class="pic-box">
					<el-image
					v-show="playlistsHighquality"
					:src="playlistsHighquality.coverImgUrl"
					:lazy="false"
					fit="cover">
						<div slot="placeholder" class="loading">
							<i class="el-icon-loading"></i>
						</div>
						<div slot="error" class="error">
							<i class="el-icon-picture-outline"></i>
						</div>
					</el-image>
				</div>
				<div class="text-box">
					<BtnDefault title="精品歌单" icon="icon-vip-l"></BtnDefault>
					<h3>{{ playlistsHighquality.name }}</h3>
					<div>{{ playlistsHighquality.copywriter }}</div>
				</div>
			</router-link>
			
			<TagSelect
			@selectedTag="getSelectedTag"
			class="select-tag"></TagSelect>
		</div>
		<div class="content">
			<router-link 
			tag="div" 
			:to ="`/page/playlist/`+item.id"
			class="item" 
			v-for="(item, i) in playlists" 
			:key="i">
				<div
				ref="picBox"
				:style="'height:' + picBoxHeight + 'px'"
				class="pic-box">
					<div class="play-num">
						<i class="iconfont icon-musical-note-l"></i>
						{{ item.playCount|formatNumber(0) }}
					</div>
					<el-image
					:src="item.coverImgUrl + '?param=300y300'"
					:lazy="false"
					fit="cover">
						<div slot="placeholder" class="loading">
							<i class="el-icon-loading"></i>
						</div>
						<div slot="error" class="error">
							<i class="el-icon-picture-outline"></i>
						</div>
					</el-image>
					<div class="creator">
						<i class="iconfont icon-peoples-l"></i>
						{{ item.creator.nickname }}
					</div>
					<div class="player">
						<i class="iconfont icon-player-start-l"></i>
					</div>
				</div>
				<div class="desc">
					{{ item.name }}
				</div>
			</router-link>
		</div>
		<Paging :all="allPages" @current="getCurrentPage"></Paging>
	</div>
</template>

<script>
	import TagSelect from '@/components/pages/discover/modules/TagSelect.vue'
	
	export default{
		components:{
			TagSelect
		},
		data(){
			return{
				picBoxHeight: '',
				selectedTagName: null,
				playlists: [],
				playlistsHighquality: {},
				allPages: null,
				currentPage: 1,
			}
		},
		created() {
			this.topPlaylist()
			this.topPlaylistHighquality()
		},
		updated(){    // mounted 无法找到使用了 v-if、v-show 或者 v-for 渲染的 DOM 节点
			// console.log(this)
			if(this.$refs.picBox.lenght) this.picBoxHeight = this.$refs.picBox[0].offsetWidth
			window.addEventListener('resize', () => {
				this.picBoxHeight = this.$refs.picBox[0].offsetWidth
			}, false);
		},
		methods:{
			getSelectedTag(tag){
				this.selectedTagName = tag.name
			},
			// 精品歌单
			async topPlaylistHighquality(){
				const data = await this.$api.getPlaylistTopHighquality({cat:this.selectedTagName});
				// console.log(data)
				this.playlistsHighquality = data.playlists[0]
			},
			// 歌单排行
			async topPlaylist(){
				const data = await this.$api.getPlaylistTop({
					cat: this.selectedTagName,
					offset: (this.currentPage - 1) * 50
				});
				// console.log(data)
				this.playlists = data.playlists
				this.allPages = Math.ceil(data.total / 50)
			},
			// 获取当前页
			getCurrentPage(page){
				this.currentPage = page
			}
		},
		watch:{
			selectedTagName(newVal, oldVal){
				this.topPlaylist()
			},
			currentPage(newVal, oldVal){
				this.topPlaylist()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.discover-playlist-container{
		position: relative;
		height: 100%;
		background: #fafafa;
		overflow: hidden;
		.header{
			margin: 20px 0 0;
			.highquality{
				cursor: pointer;
				position: relative;
				width: 100%;
				height: 170px;
				border-radius: 7px;
				overflow: hidden;
				.mark{
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					overflow: hidden;
					filter: blur(32px);
					background-color: #9999;
					background-position: center;
					background-repeat: no-repeat;
					background-size: cover;
				}
				.pic-box{
					float: left;
					margin: 15px;
					width: 140px;
					height: 140px;
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
				.text-box{
					position: relative;
					margin: 35px 20px 35px 160px;
					/deep/ button{
						height: 30px;
						line-height: 24px;
						border: 1px solid #e7aa5a;
						color: #e7aa5a;
						background: none;
					}
					h3{
						margin: 20px 0 5px;
						font-weight: normal;
						font-size: 18px;
						color: #fff;
					}
					div{
						font-size: 13px;
						color: #999;
					}
				}
			}
			.select-tag{
				width: 100%;
			}
		}
		.content{
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
			grid-gap: 15px;
			width: 100%;
			.item{
				cursor: pointer;
				display: flex;
				flex-direction: column;
				width: auto;
				height: auto;
				margin: 0;
				padding: 0;
				overflow: hidden;
				.pic-box{
					display: flex;
					position: relative;
					border-radius: 7px;
					overflow: hidden;
					.play-num{
						float: right;
						z-index: 99;
						display: block;
						position: absolute;
						right: 0;
						top: 0;
						width: 50%;
						text-align: right;
						padding: 3px 5px;
						font-size: 12px;
						text-overflow: ellipsis;
						word-break: break-all;
						white-space: nowrap;
						color: #fff;
						background: #0606065c;
						//background-image: linear-gradient(to left,#0606065c, #00000000);
						background: -webkit-gradient(linear,left top,right top,from(#00000000),to(#0606065c)) no-repeat;
						background: -webkit-linear-gradient(left,#00000000,#0606065c) no-repeat;
						background: linear-gradient(90deg,#00000000,#0606065c) no-repeat;
						overflow: hidden;
					}
					img{
						width: 100%;
						height: 100%;
					}
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
					.creator{
						float: left;
						position: absolute;
						left: 0;
						bottom: 0;
						padding: 3px 5px;
						font-size: 14px;
						color: #fff;
					}
					.player{
						float: right;
						z-index: 999;
						display: none;
						position: absolute;
						right: 0;
						bottom: 0;
						padding: 1px 5px;
						i.iconfont{
							font-size: 20px;
							color: #eee;
						}
					}
					&:hover .player{
						display: block;
					}
				}
				.desc{
					flex-basis: 40px;
					bottom: 0;
					line-height: 20px;
					margin: 5px 0 0;
					font-size: 14px;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-overflow: ellipsis;
					word-break: break-all;
					overflow: hidden;
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.discover-playlist-container{
		.header{
			margin: 10px 0 0;
			.highquality{
				height: 100px;
				border-radius: 5px;
				.pic-box{
					margin: 10px;
					width: 80px;
					height: 80px;
					border-radius: 5px;
				}
				.text-box{
					position: relative;
					margin: 10px 10px 10px 100px;
					/deep/ button{
						height: 20px;
						line-height: 18px;
					}
					h3{
						margin: 10px 0 5px;
						font-weight: normal;
						font-size: 15px;
					}
					div{
						font-size: 10px;
					}
				}
			}
			.select-tag{
				width: 100%;
			}
		}
		.content{
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			grid-gap: 10px;
			width: 100%;
			.item{
				padding: 0;
				&:last-child{
					display: none;
				}
				.pic-box{
					.time{
						.time-box{
							.week{
								font-size: 15px;
							}
							.date{
								font-size: 60px;
							}
						}
					}
					.play-num{
						width: 80%;
						height: 20px;
						padding: 1px 3px;
						font-size: 10px;
					}
					.tips{
						padding: 1px 2px;
						font-size: 10px;
					}
					.player{
						padding: 1px 3px;
						i{
							font-size: 24px;
						}
					}
				}
				.desc{
					flex-basis: 30px;
					line-height: 15PX;
					margin: 3px 0 0;
					font-size: 10px;
				}
			}
		}
	}
}
</style>
