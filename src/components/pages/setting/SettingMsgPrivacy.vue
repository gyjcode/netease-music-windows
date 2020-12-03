<template>
	<div id="setting-msgprivacy" class="setting-msgprivacy-container">
		<div class="title">
			<h3>消息与隐私</h3>
		</div>
		<div class="content">
			<div class="group">
				<div class="title">
					<div class="name">私信：<span>接收私信提醒</span></div>
				</div>
				<Radio :data="privateMsgs" :default="privateMsgs[0]" @selected="setPrivateMsg"></Radio>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">通知：</div>
				</div>
				<CheckBox @checked="setSubscribed" :default="false" tip="歌单被收藏"></CheckBox>
				<CheckBox @checked="setBeLiked" :default="false" tip="收到赞"></CheckBox>
				<CheckBox @checked="setNewFans" :default="false" tip="新粉丝"></CheckBox>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">我的听歌排行：</div>
				</div>
				<Radio :data="rankCanSees" :default="rankCanSees[0]" @selected="setRankCanSee"></Radio>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">黑名单设置：</div>
				</div>
				<div class="black-list">
					<span>我的黑名单</span>
					<button>查看</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				privateMsgs: [
					{id: 1, tip: '所有人'},
					{id: 2, tip: '我所关注的人'}
				],
				subscribed: true,
				beLiked: true,
				newFans: true,
				rankCanSees: [
					{id: 1, tip: '所有人可见'},
					{id: 2, tip: '我关注的人可见'},
					{id: 3, tip: '仅自己可见'}
				],
			};
		},
		methods:{
			// 播放列表
			setPrivateMsg(val){
				this.privateMsgs = val
			},
			// 歌单被收藏
			setSubscribed(val){
				this.subscribed = val
			},
			// 收到赞
			setBeLiked(val){
				this.beLiked = val
			},
			// 新粉丝
			setNewFans(val){
				this.newFans = val
			},
			// 我的听歌排行
			setRankCanSee(val){
				this.playlistVal = val
			},
		},
	}
</script>

<style lang="scss" scoped>
	.setting-msgprivacy-container{
		cursor: default;
		position: relative;
		.title{
			height: 30px;
			line-height: 30px;
			h3{
				margin: 0;
				padding: 0;
				font-size: 15px;
			}
		}
		.content{
			display: block;
			width: auto;
			height: auto;
			font-size: 13px;
			color: #999;
			.group{
				position: relative;
				margin: 10px 0;
				.title{
					height: 20px;
					line-height: 20px;
					.name{
						float: left;
						margin-right: 5px;
						font-weight: bold;
						color: #555;
						span{
							font-weight: normal;
							color: #999;
						}
					}
					.desc{
						font-size: 12px;
					}
				}
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
				.black-list{
					margin: 10px 0;
					span{
						font-size: 12px;
						color: #333;
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.setting-msgprivacy-container{
		.title{
			height: 20px;
			line-height: 20px;
			h3{
				font-size: 13px;
			}
		}
		.content{
			font-size: 10px;
			.group{
				margin: 5px 0;
				.title{
					.desc{
						display: none;
					}
				}
				.output-devices{
					min-width: 200px;
				}
			}
		}
		button{
			height: 20px;
			line-height: 20px;
			margin-right: 15px;
			padding: 0px 9px;
		}
	}
}
</style>
