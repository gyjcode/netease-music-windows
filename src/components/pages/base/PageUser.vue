<template>
	<div class="page-user-container">
		<div
		v-show="user"
		class="header">
			<div class="avatar">
				<img :src="user.profile.avatarUrl + '?param=200y200'" alt="">
			</div>
			<div class="info-box">
				<div class="title">
					<h1>{{ user.profile.nickname }}</h1>
					<div class="tags">
						<div
						v-if="user.identify"
						class="identify">
							<img :src="user.identify.imageUrl" alt="">
							<span class="desc">{{ user.identify.imageDesc }}</span>
						</div>
						<div class="level">
							Lv.{{ user.level }}
						</div>
						<div :class="['gender', user.profile.gender == 1 ? 'gg':'mm']">
							<i class="iconfont" v-if="user.profile.gender == 1">GG</i>
							<i class="iconfont" v-if="user.profile.gender == 2">MM</i>
						</div>
					</div>
				</div>
				
				<div class="label">
					<div class="item event">
						<div class="num">{{ user.profile.eventCount }}</div>
						<div class="name">动态</div>
					</div>
					<div class="item follows">
						<div class="num">{{ user.profile.follows }}</div>
						<div class="name">关注</div>
					</div>
					<div class="item followeds">
						<div class="num">{{ user.profile.followeds }}</div>
						<div class="name">动态</div>
					</div>
				</div>
				
				<div class="location">
					<span class="name">所在地区：</span>
					<span class="msg">{{ user.profile.city }}</span>
				</div>
				<div class="social">
					<span class="name">社交网络：</span>
					<div class="items">
						<div
						class="item"
						v-for="(item, i) in user.bindings"
						:key="i">
							<a v-if="item.type === 2" :href="item.url"><i class="iconfont icon-weibo-s"></i></a>
						</div>
					</div>
				</div>
				
				<div class="introduction">
					<span class="name">个人介绍：</span>
					<span class="msg">{{user.profile.signature}}</span>
				</div>
			</div>
		</div>
		<div class="body">
			<div class="title">
				<h3>Ta创建的电台</h3>
				<span>{{ '('+ djs.length +')' }}</span>
			</div>
			<div class="djs">
				<router-link
				tag="div"
				:to="`/page/dj/`+item.id"
				class="dj"
				v-for="(item, i) in djs"
				:key="i">
					<div class="pic-box">
						<img :src="item.picUrl + '?param=100y100'" alt="">
					</div>
					<div class="name">
						{{ item.name }}
						<span class="category">{{ item.categoryName }}</span>
					</div>
					<div class="programNum">
						节目{{ item.programCount|formatNumber }}
					</div>
					<div class="subscribeNum">
						订阅{{ item.subscribeCount|formatNumber }}
					</div>
				</router-link>
			</div>
			<div class="title">
				<h3>歌单</h3>
				<span>{{ '('+ playlist.length +')' }}</span>
			</div>
			<div class="playlist">
				<div
				class="item"
				v-show="item.songs.length"
				v-for="(item, i) in playlist"
				:key="i">
					<div class="header">
						<div class="pic-box">
							<img :src="item.picUrl + '?param=300y300'" alt="">
						</div>
					</div>
					<div class="body">
						<div class="title">
							<h3>{{ item.name }}</h3>
							<i class="iconfont icon-player-start-l"></i>
							<i class="iconfont icon-collect-l"></i>
						</div>
						<TablePlaylist
						class="table"
						:data="item.songs"
						:headerShow="false"
						:artistsShow="false"
						:albumShow="false"></TablePlaylist>
						<router-link
						tag="div"
						:to="`/page/playlist/`+item.id"
						v-show="item.songs.length > 10"
						class="more">
							查看全部{{ item.songs.length }} 首
							<i class="iconfont icon-arrow-right-l"></i>
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// 导入公共函数库
	import {mapState, mapMutations} from 'vuex'
	import {createSong, formatDate, formatNumber} from '@/utils'
	
	export default{
		props:{
			id:{    // DJ创建者 Id
				type: Number| String,
				required: true
			},
		},
		data(){
			return{
				user: {
					bindings: {},
					profile: {},
					identify: {}
				},
				djs: [],
				playlist: []
			};
		},
		created(){
			this.userDetial()
			this.userAudio()
			this.userPlaylist()
		},
		methods:{
			// 用户详情
			async userDetial(){
				const data = await this.$api.getUserDetail(this.id)
				// console.log(data)
				if (data.code === 200){
					this.user = data
				}
			},
			// 用户创建的电台
			async userAudio(){
				const data = await this.$api.getUserAudio(this.id)
				// console.log(data)
				if(data.code === 200){
					const result = data.djRadios.map((djRadios)=>{
						return {
							id: djRadios.id,
							name: djRadios.name,
							picUrl: djRadios.picUrl,
							categoryId: djRadios.category,
							categoryName: djRadios.category,
							programCount: djRadios.programCount,
							subscribeCount: djRadios.subCount,
						}
					})
					this.djs = result
				}
			},
			// 获取歌单歌曲信息
			async songsOfPlaylist(id){
				const data = await this.$api.getPlayListDetail(id)
				// console.log(data)
				let result = []
				if(data.playlist.tracks){
					result = data.playlist.tracks.map((tracks)=>{
						return createSong({
							id: tracks.id,
							name: tracks.name,
							picUrl: tracks.al.picUrl,
							duration: tracks.dt,
							artists: tracks.ar.map((ar)=>{
								return {
									id: ar.id,
									name: ar.name,
								}
							}),
							albumId: tracks.al.id,
							albumName: tracks.al.name,
							albumPicUrl: tracks.al.picUrl,
						})
					})
				}
				return result
			},
			// 用户歌单详情
			async userPlaylist(){
				const data = await this.$api.getUserPlaylist({
					uid: this.id
				})
				// console.log(data)
				if(data.code === 200){
					const result = await Promise.all(data.playlist.map(async (playlist)=>{
						return {
							id: playlist.id,
							name: playlist.name,
							picUrl: playlist.coverImgUrl,
							songs: await this.songsOfPlaylist(playlist.id),
						}
					}))
					this.playlist = result
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
	.page-user-container{
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
			cursor: default;
			width: 100%;
			height: 200px;
			margin: 30px;
			.avatar{
				float: left;
				width: 180px;
				height: 180px;
				border-radius: 50%;
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
					height: 70px;
					border-bottom: 1px solid #e3e3e3;
					h1{
						height: 30;
						margin: 0;
						line-height: 30px;
						font-size: 22px;
						font-weight: normal;
					}
					.tags{
						width: 100%;
						height: 20px;
						margin: 10px 0;
						&>div{
							float: left;
							width: auto;
							height: 14px;
							line-height: 14px;
							margin-right: 5px;
							border: 0;
							border-radius: 20px;
							padding: 0px 9px;
							font-size: 10px;
							color: #fff;
							background: #eee;
							overflow: hidden;
						}
						.identify{
							background: #f0483b;
							img{
								float: left;
								width: auto;
								height: 100%;
							}
						}
						.level{
							font-weight: bold;
							font-style: italic;
							background: #ccc;
						}
						.gender{
							background: #fecce7;
							i.iconfont{
								font-style: italic;
								font-size: 10px;
								color: #e8528f;
							}
							&.gg{
								background: #bef2fe;
								i.iconfont{
									color: #359ccf;
								}
							}
						}
					}
				}
				
				.label{
					width: 100%;
					height: 60px;
					.item{
						float: left;
						position: relative;
						width: auto;
						height: 40px;
						min-width: 40px;
						padding: 10px 20px;
						text-align: center;
						&::after{
							content: "";
							display: block;
							position: absolute;
							transform: translateY(-50%);
							top: 50%;
							right: 0;
							width: 1px;
							height: 30px;
							background: #ccc;
						}
						&:last-child:after{
							display: none;
						}
						.num{
							height: 25px;
							line-height: 25px;
							font-size: 20px;
							color: #555;
						}
						.name{
							height: 15px;
							line-height: 15px;
							font-size: 12px;
							color: #999;
						}
					}
				}
				.location, .social, .introduction{
					height: 20px;
					line-height: 20px;
					font-size: 12px;
					.name{
						color: #333;
					}
					.msg{
						color: #777;
					}
				}
			}
		}
		.body{
			margin: 50px 0;
			.title{
				width: 100%;
				height: 30px;
				margin: 0 30px;
				line-height: 30px;
				h3{
					float: left;
					height: 30px;
					margin: 0;
					font-size: 16px;
					font-weight: bold;
					span{
						font-size: 12px;
						font-weight: normal;
					}
				}
			}
			.djs{
				margin: 15px 0;
				.dj{
					cursor: pointer;
					display: flex;
					flex-direction: row;
					position: relative;
					height: 60px;
					line-height: 60px;
					padding: 10px 20px;
					background: #f1f1f1;
					&:nth-child(2n){
						background: #f9f9f9;
					}
					&:hover{
						background: #e9e9e9;
					}
					&>div{
						position: relative;
						transform: translateY(-50%);
						top: 50%;
						font-size: 13px;
						color: #333;
					}
					.pic-box{
						flex-basis: 60px;
						width: 60px;
						height: 60px;
						border-radius: 5px;
						overflow: hidden;
						img{
							width: 100%;
							height: 100%;
						}
					}
					.name{
						flex-grow: 1;
						margin: 0 10px;
						span{
							display: inline-block;
							position: relative;
							height: 14px;
							margin: 1px;
							border: 1px solid #c62f2f;
							padding: 0px 5px;
							border-radius: 3px;
							line-height: 14px;
							font-size: 10px;
							color: #c62f2f;
						}
					}
					.programNum{
						flex-basis: 100px;
						color: #999;
						font-size: 12px;
					}
					.subscribeNum{
						flex-basis: 100px;
						color: #999;
						font-size: 12px;
					}
				}
			}
			.playlist{
				position: relative;
				.item{
					display: block;
					margin: 30px;
					overflow: hidden;
					.header{
						float: left;
						width: 200px;
						height: auto;
						margin: 0;
						.pic-box{
							width: 150px;
							height: 150px;
							border-radius: 7px;
							overflow: hidden;
							img{
								position: relative;
								width: 100%;
								height: 100%;
								background: #f1f1f1;
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
							padding: 0 15px;
							font-size: 12px;
							color: #999;
							background: #f3f3f3;
						}
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.page-user-container{
		&::-webkit-scrollbar{
			display: none;
		}
		.header{
			width: calc(100% - 20px);
			height: 100px;
			margin: 10px;
			.avatar{
				width: 90px;
				height: 90px;
			}
			.info-box{
				height: 90px;
				margin-left: 100px;
				.title{
					height: 50px;
					margin: 10px 0;
					h1{
						height: 20px;
						margin: 5px 0;
						line-height: 20px;
						font-size: 16px;
						font-weight: bold;
					}
					.tags{
						height: 16px;
						margin: 5px 0;
					}
				}
				.label{
					display: none;
				}
				.location, .social{
					display: none;
				}
			}
		}
		.body{
			margin: 10px 0;
			.title{
				height: 20px;
				margin: 0 10px;
				line-height: 20px;
				h3{
					height: 20px;
					font-size: 13px;
					span{
						font-size: 10px;
					}
				}
			}
			.djs{
				margin: 10px 0;
				.dj{
					display: block;
					height: 40px;
					line-height: 40px;
					padding: 5px 10px;
					&>div{
						font-size: 10px;
					}
					.pic-box{
						float: left;
						width: 40px;
						height: 40px;
					}
					.name{
						height: 40px;
						line-height: 40px;
						width: auto;
						margin: 0 10px 0 50px;
						text-overflow: ellipsis;
						word-break: break-all;
						white-space: nowrap;
						overflow: hidden;
					}
					.programNum{
						display: none;
					}
					.subscribeNum{
						display: none;
					}
				}
			}
			.playlist{
				position: relative;
				.item{
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
							margin-top: 0;
							padding: 0 10px;
							font-size: 10px;
						}
					}
				}
			}
		}
	}
}
</style>
