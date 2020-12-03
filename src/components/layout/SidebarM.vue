<template>
	<div class="sidebar-m-container">
		<div class="header">
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
				</div>
			</div>
		</div>
		<div class="body">
			<!-- 用户相关菜单 -->
			<div class="section user">
				<div class="title">
					用户服务
				</div>
				<router-link
				tag="div"
				:to="item.url"
				@click.native="clickItem(item)"
				class="item"
				v-for="(item, i) in commonMenus"
				:key="i">
					<div class="name">
						<i :class="['iconfont', item.icon]"></i>
						<span>{{ item.name }}</span>
					</div>
					<div class="more">
						<i class="iconfont icon-arrow-right-l"></i>
					</div>
				</router-link>
			</div>
			<!-- 通用设置菜单 -->
			<div class="section common">
				<div class="title">
					其他
				</div>
				<div
				class="item"
				@click="clickItem(item)"
				v-for="(item, i) in moreMenus"
				:key="i">
					<a :href="item.url" target="_blank"></a>
					<div class="name">
						<i :class="['iconfont', item.icon]"></i>
						<span>{{ item.name }}</span>
					</div>
					<div class="more">
						<i class="iconfont icon-arrow-right-l"></i>
					</div>
				</div>
			</div>
			<div class="section close" @click="logout">
				退出登录/关闭
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	
	export default{
		data(){
			return{
				commonMenus:[
					{id: 'message', name: '我的消息', url:'/#', icon: 'icon-comment-l'},
					{id: 'diy-skin', name: '个性装扮', url:'/#', icon: 'icon-shopping-l'},
					{id: 'setting', name: '设置', url:'/setting', icon: 'icon-setting-l' },
				],
				moreMenus:[
					{id: 'help-feedback', name: '问题与反馈', url:'https://blog.quietguoguo.com/', icon: 'icon-smile-l' },
					{id: 'share', name: '分享网易云音乐', url:'https://blog.quietguoguo.com/', icon: 'icon-sharing-l' },
					{id: 'about', name: '关于', url:'https://blog.quietguoguo.com/', icon: 'icon-smile-l' },
				]
			};
		},
		methods:{
			...mapMutations('user',[
				'setLoginPopupShow',
				'setUserLogout'
			]),
			clickItem(item){
				this.$emit('selectedItem', item)
			},
			// 显示登陆窗体
			loginPopup() {
				if(!this.loginUser.account.id){
					this.setLoginPopupShow(true)
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
		},
		computed:{
			...mapState('user', [
				'loginUser'
			])
		},
	}
</script>

<style lang="scss" scoped>
	.sidebar-m-container{
		z-index: 999999;
		cursor: default;
		position: fixed;
		width: 80%;
		border-right: 1px solid #eee;
		height: 100%;
		background-color: #fafafa;;
		overflow: hidden;
		.header{
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			height: 50px;
			width: 100%;
			background-color: #fff;
			overflow: hidden;
			.login-user{
				z-index: 999999;
				cursor: pointer;
				position: relative;
				height: 30px;
				line-height: 30px;
				padding: 10px;
				overflow: hidden;
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
		}
		.body{
			position: relative;
			top: 50px;
			width: auto;
			height: calc(100% - 120px);
			padding: 10px;
			overflow: hidden;
			.section{
				margin-top: 10px;
				border-radius: 7px;
				padding: 10px;
				background-color: #fff;
				.title{
					height: 30px;
					line-height: 30px;
					margin: -10px;
					margin-bottom: 0;
					border-bottom: 1px solid #f1f1f1;
					padding: 0 10px;
					font-size: 10px;
					color: #888;
				}
				.item{
					position: relative;
					height: 30px;
					line-height: 30px;
					font-size: 13px;
					a{
						position: absolute;
						width: 100%;
						height: 100%;
						background: none;
					}
					.name{
						i.iconfont{
							font-size: 15px;
						}
						span{
							margin-left: 5px;
						}
					}
					.more{
						position: absolute;
						top: 0;
						right: 0;
						height: 100%;
						i.iconfont{
							display: inline-block;
							position: relative;
							transform: translateY(-50%);
							top: 50%;
							font-size: 10px;
							color: #999;
						}
					}
				}
			}
			.user{
				
			}
			.close{
				color: #ec4141;
				text-align: center;
			}
		}
	}
</style>