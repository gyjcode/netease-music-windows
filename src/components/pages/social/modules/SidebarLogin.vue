<template>
	<div class="login-sidebar-container">
		<div class="unlogin" v-show="loginMsgShow">
			<div class="pic">
				<img :src="require('@/assets/images/platform.png')" alt="">
			</div>
			<div class="desc">
				登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
			</div>
			<div
			@click="loginPopup"
			class="btn">
				立即登录
			</div>
		</div>
		<div class="login"  v-show="!loginMsgShow">
			<div class="header">
				<div class="avatar">
					<img :src="loginUser.profile.avatarUrl || require('@/assets/images/avatar-default.png')" alt="">
				</div>
				<div class="text">
					<div class="name">
						{{ loginUser.profile.nickname }}
					</div>
					<div class="desc">
						<div>
							{{ loginUser.profile.signature }}
						</div>
					</div>
				</div>
			</div>
			<div class="body">
				<div class="content">
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
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	
	export default {
		data(){
			return{
				loginMsgShow: false
			}
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
		},
		computed:{
			...mapState('user',[
				'loginUser',
			]),
		},
		watch:{
			loginUser(newVal, oldVal){
				if (newVal.account.id){
					this.loginMsgShow = true
				}else{
					this.loginMsgShow = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-sidebar-container{
		position: relative;
		width: auto;
		padding: 20px;
		background: #f9f9f9;
		overflow: hidden;
		.unlogin{
			position: relative;
			overflow: hidden;
			.pic{
				img{
					width: 100%;
				}
			}
			.desc{
				margin: 10px 0;
				font-size: 12px;
				text-align: center;
				color: #777;
			}
			.btn{
				cursor: pointer;
				width: 100%;
				height: 40px;
				line-height: 40px;
				border-radius: 5px;
				font-size: 16px;
				text-align: center;
				color: #fff;
				background: #0c73c2;
			}
		}
		.login{
			position: relative;
			width: auto;
			height: auto;
			.header{
				width: 100%;
				height: auto;
				.avatar{
					float: left;
					width: 50px;
					height: 50px;
					border-radius: 50%;
					overflow: hidden;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.text{
					width: auto;
					height: 50px;
					margin-left: 60px;
					overflow: hidden;
					.name{
						height: 20px;
						line-height: 20px;
						font-size: 12px;
						color: #333;
					}
					.desc{
						position: relative;
						width: 100%;
						height: 30px;
						div{
							position: relative;
							transform: translateY(-50%);
							top: 50%;
							line-height: 15px;
							font-size: 10px;
							color: #999;
							text-overflow: ellipsis;
							word-break: break-all;
							overflow: hidden;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
						}
					}
				}
			}
			.body{
				.content{
					position: relative;
					width: 100%;
					height: 40px;
					margin: 15px 0;
					div.item{
						float: left;
						width: calc(100% / 3);
						height: 40px;
						&:after{
							float: right;
							position: absolute;
							top: 0;
							content: "";
							width: 1px;
							height: 100%;
							background: #ddd;
						}
						&:first-child:after{
							display: none;
						}
						.num{
							margin: 5px 0;
							font-family: "黑体";
							font-size: 18px;
							text-align: center;
							color: #777;
						}
						.name{
							margin: 5px 0;
							font-size: 12px;
							font-weight: normal;
							text-align: center;
							color: #777;
						}
					}
				}
			}
		}
	}
</style>
