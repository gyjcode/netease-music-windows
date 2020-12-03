<template>
	<div class="social-container">
		<div class="siderbar">
			<SocialSidebar></SocialSidebar>
		</div>
		<div class="content scroller-y">
			<div class="main">
				<div class="trends-content">
					<div class="title">
						<h3>动态</h3>
						<div class="btn" @click="addEvent">
							<i class="iconfont icon-plus-l"></i>
							<span>写动态</span>
						</div>
					</div>
					<div class="content">
						<div
						v-if="!loginUser.account.id"
						class="nologin">
							当前尚未登录
						</div>
						<SocialMain 
						v-if="loginUser.account.id"
						:userId="loginUser.account.id"></SocialMain>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	import SocialSidebar from '@/components/pages/social/SocialSidebar.vue'
	import SocialMain from '@/components/pages/social/SocialMain.vue'
	
	export default{
		components:{
			SocialSidebar,
			SocialMain
		},
		data(){
			return{
				
			};
		},
		methods:{
			...mapMutations('user',[
				'setLoginPopupShow',
				'setUserLogout'
			]),
			// 点击发布动态
			addEvent() {
				if(!this.loginUser.account.id){
					this.setLoginPopupShow(true)
				}else{
					alert("抱歉，暂无相关接口")
				}
			},
		},
		computed:{
			...mapState('user',[
				'loginUser'
			])
		}
	}
</script>

<style lang="scss" scoped>
	.social-container{
		position: relative;
		width: 100%;
		height: 100%;
		background: #fff;
		overflow: hidden;
		.siderbar{
			float: right;
			position: absolute;
			top: 0;
			right: 0;
			width: 240px;
			height: 100%;
			border-left: 1px solid #eee;
		}
		.content{
			width: calc(100% - 280px);
			height: calc(100% - 40px);
			margin: 0 240px 0 0;
			padding: 20px;
			overflow: hidden;
			overflow-y: auto;
			&::-webkit-scrollbar{
				width: 5px;
				height: 5px;
			}
			&::-webkit-scrollbar-thumb{
				border-radius: 10px;
				background: #eeee;
			}
			&::-webkit-scrollbar-thumb:hover{
				background: #9999;
			}
			&::-webkit-scrollbar-track{
				border-right: 0px solid #9999;
				background: none;
			}
			.main{
				width: 100%;
			}
		}
		.trends-content{
			position: relative;
			width: auto;
			height: 100%;
			.title{
				height: 40px;
				line-height: 40px;
				border-bottom: 1px solid #eee;
				h3{
					float: left;
					margin: 0;
					font-size: 18px;
					font-weight: normal;
				}
				.btn{
					float: right;
					cursor: pointer;
					font-size: 12px;
					height: 20px;
					line-height: 20px;
					margin: 10px 0;
					border: 1px solid #e9e9e9;
					border-radius: 20px;
					padding: 1px 9px;
					overflow: hidden;
					&:hover{
						background: #f2f2f2;
					}
					i.iconfont{
						float: left;
						height: 100%;
						margin-right: 5px;
						font-size: 10px;
						font-weight: bold;
						color: #c62f2f;
					}
					span{
						height: 100%;
					}
				}
			}
			.content{
				position: relative;
				transform: translateX(-50%);
				left: 50%;
				width: 100%;
				height: 100%;
				margin: 0 auto;
				padding: 0;
				.nologin{
					position: absolute;
					transform: translate(-50%,-50%);
					top: 50%;
					left: 50%;
					width: auto;
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.social-container{
		.siderbar{
			display: none;
		}
		.content{
			width: calc(100% - 20px);
			height: calc(100% - 20px);
			margin: 10px;
			padding: 0;
			&::-webkit-scrollbar{
				display: none;
			}
		}
		.trends-content{
			position: relative;
			width: auto;
			height: 100%;
			.title{
				height: 30px;
				line-height: 30px;
				h3{
					font-size: 15px;
					font-weight: bold;
				}
				.btn{
					font-size: 10px;
					height: 16px;
					line-height: 16px;
					margin: 5px 0;
					padding: 2px 9px;
				}
			}
		}
	}
}
</style>
