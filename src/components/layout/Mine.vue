<template>
	<div class="mine-container">
		<div class="user">
			<div
			@click="loginPopup"
			v-show="loginUser"
			ref="loginUser"
			class="login-user">
				<div class="pic-box">
					<img
					:src="loginUser.profile.avatarUrl || require('@/assets/images/avatar-default.png')"
					class="avatar">
				</div>
				<div class="info">
					<div class="name">
						{{ loginUser.profile.nickname || '未登录'}}
					</div>
					<div class="tags">
						<div class="level">
							<span>{{ level ? ('Lv.'+ level) : 'Lv.0' }}</span>
						</div>
						<div :class="['gender', loginUser.profile.gender == 0 ? 'gg':'mm']">
							<i class="iconfont" v-if="loginUser.profile.gender == 0">GG</i>
							<i class="iconfont" v-if="loginUser.profile.gender != 0">MM</i>
						</div>
					</div>
				</div>
				<div class="more">
					<i class="iconfont icon-arrow-right-l"></i> 
				</div>
			</div>
		</div>
		<div class="apps">
			<router-link
			tag="div"
			:to="app.url"
			class="app"
			v-for="(app, i) in apps"
			:key="i">
				<i :class="['iconfont', app.icon]"></i>
				<span>{{ app.name }}</span>
			</router-link>
			<div class="app plus" onclick="javascript:alert('抱歉，该功能暂不可用');">
				<i class="iconfont icon-plus-l"></i>
				<span>音乐应用</span>
			</div>
		</div>
		<div class="playlist">
			<div class="menus">
				<h3
				@click="tabShow = 'created'"
				:class="['title', tabShow == 'created' ? 'active' : '']">
					<span> 创建歌单 </span>
				</h3>
				<h3
				@click="tabShow = 'subscribed'"
				:class="['title', tabShow == 'subscribed' ? 'active' : '']">
					<span> 收藏歌单 </span>
				</h3>
			</div>
			<div
			:class="['section', tabShow]">
				<router-link
				tag="div"
				:to="`/page/playlist/`+ item.id"
				class="item"
				v-for="(item, i) in playlist"
				:key="i">
					<div class="pic-box">
						<img :src="item.picUrl" alt="">
					</div>
					<div class="text-box">
						<div class="name">{{ item.name }}</div>
						<div class="desc">共{{ item.size }} 首</div>
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	
	export default{
		data(){
			return{
				level: 0,
				apps:[
					{ id: 'local-music', name: '本地音乐', url: '/local', icon: 'icon-download-l' },
					{ id: 'cloud-disk', name: '云盘', url: '#', icon: 'icon-cloud-s' },
					{ id: 'buyed', name: '已购', url: '#', icon: 'icon-shopping-l' },
					{ id: 'recently-played', name: '最近播放', url: '#', icon: 'icon-player-start-c-s' },
					{ id: 'friend', name: '我的好友', url: '/social', icon: 'icon-peoples-s' },
					{ id: 'collect', name: '收藏和赞', url: '/subscribe', icon: 'icon-star-s' },
				],
				tabShow: 'created',
				playlist: [],
				playlistCreated: [],
				playlistSubscribed: [],
			};
		},
		created() {
			this.userPlaylists()
		},
		methods:{
			...mapMutations('user',[
				'setLoginPopupShow',
			]),
			// 显示登陆窗体
			loginPopup() {
				if(!this.loginUser.account.id){
					this.setLoginPopupShow(true)
				}else{
					this.userPanelShow = true
				}
			},
			// 用户等级
			async userLevel(){
				const data = await this.$api.getUserLevel(this.loginUser.profile.id)
				// console.log(data)
				if(data.code === 200){
					this.level = data.data.level
				}
			},
			// 获取用户歌单
			async userPlaylists(){
				if(!this.loginUser.account.id) return
				const data = await this.$api.getUserPlaylist({
					uid: this.loginUser.account.id
				})
				// console.log(data)
				if(data.code === 200){
					const result = data.playlist.map((playlist)=>{
						return {
							id: playlist.id,
							name: playlist.name,
							picUrl: playlist.coverImgUrl,
							size: playlist.trackCount,
							creatorId: playlist.creator.userId,
							creatorName: playlist.creator.userName
						}
					})
					
					let created = []
					let subscribed = []
					result.forEach((item)=>{
						if(item.creatorId === this.loginUser.account.id){
							created.push(item)
						} else {
							subscribed.push(item)
						}
					})
					this.playlist = this.playlistCreated = created
					this.playlistSubscribed = subscribed
				}
			}
		},
		computed:{
			...mapState('user', [
				'loginUser'
			])
		},
		watch:{
			loginUser(){
				this.userPlaylists()
			},
			tabShow(newVal, oldVal){
				if(newVal === 'subscribed'){
					this.playlist = this.playlistSubscribed
				}else{
					this.playlist = this.playlistCreated
					this.tabShow = 'created'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mine-container{
		cursor: default;
		position: relative;
		width: calc(100% - 20px);
		height: 100%;
		padding: 10px;
		background-color: #f3f3f3;
		overflow: hidden;
		.user{
			position: relative;
			margin: 10px 0 0;
			overflow: hidden;
			.login-user{
				cursor: pointer;
				position: relative;
				height: 50px;
				line-height: 50px;
				margin-bottom: 10px;
				overflow: hidden;
				.pic-box{
					float: left;
					display: block;
					position: relative;
					width: 46px;
					height: 46px;
					border: 2px solid #fff;
					border-radius: 50%;
					background-color: #fff;
					overflow: hidden;
					img{
						object-fit: cover;
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.info{
					height: 40px;
					line-height: 20px;
					margin-left: 60px;
					margin-right: 30px;
					padding: 5px 0;
					.name{
						height: 20px;
						color: #333;
						text-overflow: ellipsis;
						word-break: break-all;
						white-space: nowrap;
						overflow: hidden;
					}
					.tags{
						margin-top: 5px;
						height: 20px;
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
				.more{
					position: absolute;
					top: 0;
					right: 0;
					width: 30px;
					height: 100%;
					i.iconfont{
						display: inline-block;
						position: relative;
						transform: translateY(-50%);
						top: 50%;
						font-size: 16px;
					}
				}
			}
		}
		.apps{
			position: relative;
			width: auto;
			margin: 10px 0 0;
			border-radius: 7px;
			padding: 10px;
			background-color: #fff;
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr;
			grid-gap: 10px;
			.app{
				i.iconfont{
					display: block;
					font-size: 20px;
					text-align: center;
					color: #ec4141;
				}
				&.plus{
					i.iconfont{
						color: #999;
					}
				}
				span{
					display: block;
					width: auto;
					height: 20px;
					line-height: 20px;
					font-size: 10px;
					text-align: center;
					color: #555;
				}
			}
		}
		.playlist{
			position: relative;
			width: calc(100% - 20px);
			margin: 10px 0 0;
			border-radius: 7px;
			padding: 10px;
			background-color: #fff;
			overflow: hidden;
			.menus{
				display: inline-block;
				position: relative;
				transform: translateX(-50%);
				left: 50%;
				margin: auto;
				.title{
					display: inline-block;
					position: relative;
					height: 30px;
					line-height: 30px;
					margin: 10px;
					font-size: 15px;
					font-weight: normal;
					text-align: center;
					&.active{
						position: relative;
						font-weight: bold;
						&::after{
							content: "";
							display: block;
							position: absolute;
							transform: translateX(-50%);
							left: 50%;
							bottom: 2px;
							width: 90%;
							height: 2px;
							border-radius: 2px;
							background-color: #ec4141;
						}
					}
				}
			}
			.section{
				position: relative;
				.item{
					width: auto;
					height: 40px;
					padding: 5px;
					.pic-box{
						float: left;
						width: 40px;
						height: 40px;
						border-radius: 5px;
						overflow: hidden;
						img{
							object-fit: cover;
							width: 100%;
							height: 100%;
						}
					}
					.text-box{
						margin-left: 50px;
						padding: 2px 0;
						.name{
							height: 20px;
							line-height: 20px;
							font-size: 13px;
							color: #333;
						}
						.desc{
							height: 16px;
							line-height: 16px;
							font-size: 10px;
							color: #999;
						}
					}
				}
			}
		}
	}
</style>