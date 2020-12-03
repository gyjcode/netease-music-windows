<template>
	<div class="header-container">
		
		<div class="left">
			<h1 class="logo">
				<img src="@/assets/images/logo.png" alt="">
			</h1>
			<div class="history">
				<History></History>
			</div>
			<div class="search">
				<Search></Search>
			</div>
		</div>
		
		<div class="right">
			<LoginUser></LoginUser>
			
			<div
			onclick="javascript:alert('抱歉，该功能暂不可用')"
			class="vip-active">
				开通 VIP
			</div>
			<div class="theme">
				<i class="iconfont icon-skin-l"></i> 
			</div>
			<div class="message">
				<i class="iconfont icon-email-l"></i> 
			</div>
			<router-link
			tag="div"
			:to="`/setting`"
			class="setting">
				<i class="iconfont icon-setting-l"></i> 
			</router-link>
			<div class="controllers">
				<div class="small">
					<i class="iconfont icon-small-l"></i> 
				</div>
				<div class="minimize">
					<i class="iconfont icon-mini-l"></i> 
				</div>
				<div class="maximize">
					<i class="iconfont icon-rectangle-l"></i> 
				</div>
				<div class="close">
					<i class="iconfont icon-close-l"></i> 
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import '@/assets/css/iconfont.css'
	import History from '@/components/base/History.vue'
	import Search from '@/components/base/Search.vue'
	import LoginUser from '@/components/base/LoginUser.vue'
	
	export default{
		components:{
			History,
			Search,
			LoginUser
		},
		data(){
			return{
				
			};
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.header-container{
		cursor: default;
		position: relative;
		height: 100%;
		background-color: #ec4141;
		.left{
			display: inline-block;
			height: 100%;
			.logo{
				float: left;
				width: auto;
				height: 100%;
				margin: 0 10px;
				padding: 0 10px;
				img{
					display: block;
					position: relative;
					transform: translate(0, -50%);
					top: 50%;
					left: 0;
					max-width: 120px;
					width: 100%;
					max-height: 24px;
					height: 100%;
				}
			}
			
			.history{
				float: left;
				min-width: 50px;
				height: 100%;
				margin: 0 10px 0 30px;
			}
			
			.search{
				float: left;
				height: 100%;
				margin: 0 10px;
			}
		}
		
		.right{
			position: absolute;
			top: 0;
			right: 0;
			height: 100%;
			div{
				float: left;
				width: auto;
				height: 100%;
				line-height: 60px;
				margin: 0 10px;
				font-size: 14px;
				color: #fbd9d9;
				&:hover{
					color: #fff;
				}
				i{
					font-size: 16px;
				}
			}
			.vip-active{
				
			}
			.theme{
				
			}
			.message{
				
			}
			.setting{
				
			}
			.controllers{
				position: relative;
				transform: translate(0, -50%);
				top: 50%;
				height: 30px;
				line-height: 30px;
				padding: 0 10px;
				div{
					height: 30px;
					line-height: 30px;
					margin: 0 5px;
					font-size: 20px;
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.header-container{
		.left{
			.logo{
				margin: 0 5px;
				padding: 0 5px;
				img{
					max-width: 80px;
					max-height: 16px;
				}
			}
			.history{
				display: none;
			}
			.search{
				float: right;
				margin: 0 5px;
			}
		}
		.right{
			div{
				line-height: 50px;
				margin: 0 5px;
				font-size: 13px;
				i{
					font-size: 15px;
				}
			}
			.controllers{
				height: 20px;
				line-height: 20px;
				padding: 0 5px;
				div{
					height: 20px;
					line-height: 20px;
					margin: 0 5px;
					font-size: 18px;
				}
			}
		}
	}
}
</style>
