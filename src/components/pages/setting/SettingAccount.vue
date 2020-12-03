<template>
	<div id="setting-account" class="setting-account-container">
		<div class="content">
			<div class="bindings">
				<div :class="['binding weibo', false ? 'active' : '']"><i class="iconfont icon-weibo-s"></i></div>
				<div :class="['binding wechat', false ? 'active' : '']"><i class="iconfont icon-wechat-s"></i></div>
				<div :class="['binding qq', true ? 'active' : '']"><i class="iconfont icon-qq-s"></i></div>
				<div class="more">
					<span>绑定账户</span>
					<i class="iconfont icon-arrow-right-l"></i>
				</div>
			</div>
			<div class="btns">
				<button>修改个人信息</button>
				<button>寻找并邀请好友</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				binding: true
			};
		},
		created() {
			
		},
		methods:{
			
		},
	}
</script>

<style lang="scss" scoped>
	.setting-account-container{
		cursor: default;
		position: relative;
		.content{
			.bindings{
				position: relative;
				margin: 10px 0 0;
				overflow: hidden;
				.binding{
					float: left;
					margin-right: 10px;
					color: #999;
					&.active{
						color: #38adf1;
					}
					i.iconfont{
						font-size: 20px;
					}
				}
				.more{
					cursor: pointer;
					margin-left: 20px;
					font-size: 13px;
					i.iconfont{
						font-size: 10px;
					}
				}
			}
			.btns{
				position: relative;
				margin: 10px 0;
				button{
					cursor: pointer;
					outline: none;
					height: 24px;
					line-height: 24px;
					margin-right: 15px;
					border: 1px solid #ccc;
					border-radius: 20px;
					padding: 0px 15px;
					font-size: 10px;
					background: #f9f9f9;
					&:hover{
						background: #eee;
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.setting-account-container{
		.content{
			.bindings{
				margin: 5px 0 0;
				.binding{
					font-size: 10px;
					i.iconfont{
						font-size: 16px;
					}
				}
				.more{
					margin-left: 15px;
					font-size: 10px;
				}
			}
			.btns{
				position: relative;
				margin: 5px 0;
				button{
					height: 20px;
					line-height: 20px;
					margin-right: 15px;
					border-radius: 20px;
					padding: 0px 9px;
					font-size: 10px;
				}
			}
		}
	}
}
</style>
