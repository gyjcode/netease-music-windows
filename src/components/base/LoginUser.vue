<template>
	<div class="login-user-container">
		<div
		@click="loginPopup"
		v-show="loginUser"
		ref="loginUser"
		class="login-user">
			<img
			:src="loginUser.profile.avatarUrl || require('@/assets/images/avatar-default.png')"
			class="avatar">
			<div class="name">
				<span>{{ loginUser.profile.nickname || '未登录'}}</span>
				<i class="iconfont icon-arrow-down-l"></i> 
			</div>
		</div>
		<Toggle
		:reserveDoms="[$refs.loginUser && $refs.loginUser.$el]"
		:show.sync="userPanelShow"> <!-- show.sync 双向绑定 -->
			<div class="user-box" v-show="userPanelShow">
				<div class="header">
					<!-- 基本动态 -->
					<div class="trends">
						<div class="item trend">
							<div class="num">
								{{ loginUser.profile.eventCount }}
							</div>
							<div class="name">
								动态
							</div>
						</div>
						<div class="item concern">
							<div class="num">
								{{ loginUser.profile.follows }}
							</div>
							<div class="name">
								关注
							</div>
						</div>
						<div class="item fans">
							<div class="num">
								{{ loginUser.profile.followeds }}
							</div>
							<div class="name">
								粉丝
							</div>
						</div>
					</div>
					<div class="check-in">
						<i class="iconfont icon-coins-l"></i>
						<span>签到</span>
					</div>
				</div>
				<div class="body">
					<div class="content">
						<!-- 会员中心 -->
						<div class="vip-center">
							<i class="iconfont icon-vip-l"></i>
							<span>会员中心</span>
							<div class="right">
								<span>{{ loginUser.profile.vipType ? '会员': '未订购' }}</span>
								<i class="iconfont icon-arrow-right-l"></i>
							</div>
						</div>
						<!-- 等级 -->
						<div class="level">
							<i class="iconfont icon-badge-l"></i>
							<span>等级</span>
							<div class="right">
								<span>{{ level ? ('Lv.'+ level) : 'Lv.0' }}</span>
								<i class="iconfont icon-arrow-right-l"></i>
							</div>
						</div>
						<!-- 商城 -->
						<div class="shopping">
							<a target="_blank" href="https://music.163.com/store/product"></a>
							<i class="iconfont icon-shopping-l"></i>
							<span>商城</span>
							<div class="right">
								<i class="iconfont icon-arrow-right-l"></i>
							</div>
						</div>
					</div>
					<div class="content">
						<!-- 个人信息设置 -->
						<div class="user-setting">
							<i class="iconfont icon-setting-l"></i>
							<span>个人信息设置</span>
							<div class="right">
								<i class="iconfont icon-arrow-right-l"></i>
							</div>
						</div>
						<!-- 绑定社交账号 -->
						<div class="binddings">
							<i class="iconfont icon-cellphone-l"></i>
							<span>绑定社交账号</span>
							<div class="right">
								<i class="iconfont icon-arrow-right-l"></i>
							</div>
						</div>
					</div>
				</div>
				<div class="footer">
					<div
					@click="logout"
					class="logout">
						<i class="iconfont icon-power-switch-l"></i>
						<span>退出登录</span>
					</div>
				</div>
			</div>
		</Toggle>
	</div>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	
	export default{
		data(){
			return{
				userPanelShow: false,
				level: 0,
			};
		},
		created() {
			this.userLevel()
		},
		methods:{
			...mapMutations('user',[
				'setLoginPopupShow',
				'setUserLogout'
			]),
			// 显示登陆窗体
			loginPopup() {
				if(!this.loginUser.account.id){
					this.setLoginPopupShow(true)
				}else{
					this.userPanelShow = true
				}
			},
			// 退出登录
			logout() {
				this.setUserLogout()
				this.userPanelShow = false
				// 退出登录清空 LocalStorage 及 Cookies
				localStorage.removeItem('login_user')
				this.$cookies.remove("login_user")
			},
			// 用户等级
			async userLevel(){
				const data = await this.$api.getUserLevel(this.loginUser.profile.id)
				// console.log(data)
				if(data.code === 200){
					this.level = data.data.level
				}
			}
		},
		computed:{
			...mapState('user',[
				'loginPopupShow',
				'loginUser'
			])
		},
		watch:{
			loginUser(newVal, oldVal){
				if(newVal){
					this.userLevel()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-user-container{
		position: relative;
		width: auto;
		min-width: 100px;
		height: 60px;
		.login-user{
			cursor: pointer;
			position: relative;
			transform: translateY(-50%);
			top: 50%;
			height: 30px;
			line-height: 30px;
			overflow: hidden;
			&:hover{
				color: #fff;
			}
			.avatar{
				float: left;
				display: block;
				position: relative;
				width: 30px;
				height: 30px;
				border-radius: 50%;
			}
			.name{
				display: block;
				position: relative;
				width: auto;
				height: 20px;
				line-height: 20px;
				margin-left: 35px;
				padding: 5px 0;
				white-space: nowrap;
				overflow: hidden;
				span{
					display: inline-block;
					word-break: break-all;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
				i{
					display: inline-block;
					position: relative;
					top: -4px;
					font-size: 12px;
					line-height: 20px;
				}
			}
		}
		.user-box{
			position: absolute;
			top: 60px;
			left: -50%;
			width: 280px;
			height: auto;
			border-radius: 9px;
			color: #333;
			background: #fff;
			box-shadow: 2px 2px 5px #777;
			&:before{
				content: "";
				position: absolute;
				transform: translateX(-50%);
				top: -15px;
				left: 50%;
				width: 0;
				height: 0;
				border-right: 15px solid transparent;
				border-left: 15px solid transparent;
				border-bottom: 15px solid #fff;
			}
			.header{
				margin: 15px;
				.trends{
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					position: relative;
					width: 100%;
					height: 40px;
					margin-top: 30px;
					div.item{
						width: 100%;
						height: 40px;
						.num{
							height: 20px;
							line-height: 20px;
							font-size: 20px;
							font-family: '黑体';
							font-weight: bold;
							text-align: center;
							color: #333;
						}
						.name{
							height: 20px;
							line-height: 20px;
							font-size: 12px;
							font-weight: normal;
							text-align: center;
							color: #555;
						}
					}
				}
				.check-in{
					cursor: pointer;
					position: relative;
					width: 50px;
					height: 24px;
					line-height: 24px;
					margin: 10px auto;
					border: 1px solid #e9e9e9;
					border-radius: 30px;
					padding: 2px 15px;
					background: #fff;
					&:hover{
						background: #fafafa;
					}
				}
			}
			.body{
				position: relative;
				height: auto;
				.content{
					border-top: 1px solid #eee;
					&>div{
						cursor: pointer;
						position: relative;
						width: auto;
						height: 35px;
						line-height: 35px;
						padding-left: 15px;
						padding-right: 10px;
						&:hover{
							background: #ecedee;
						}
						&>.right{
							position: absolute;
							top: 0;
							right: 5px;
							span{
								font-size: 12px;
								color: #ccc;
							}
							i.iconfont{
								float: none;
								font-size: 10px;
								color: #ccc;
							}
						}
						i.iconfont{
							float: left;
							margin-right: 5px;
							font-size: 16px;
						}
						span{
							font-size: 13px;
							color: #333;
						}
						&.level{
							.right{
								span{
									font-weight: bold;
									font-style: italic;
									color: #aaa;
								}
							}
						}
						&.shopping{
							a{
								position: absolute;
								width: 100%;
								height: 100%;
							}
						}
					}
				}
			}
			.footer{
				border-top: 1px solid #eee;
				overflow: hidden;
				.logout{
					cursor: pointer;
					height: 40px;
					line-height: 40px;
					padding: 5px 15px;
					&:hover{
						background: #ecedee;
					}
					i.iconfont{
						float: left;
						margin-right: 5px;
						font-size: 15px;
						font-weight: lighter;
					}
					span{
						color: #333;
					}
				}
			}
		}
	}
</style>
