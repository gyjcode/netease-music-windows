<template>
	<div id="setting-about" class="setting-about-container">
		<div class="content">
			<div class="version">
				<span>当前版本2.7.4</span>
				<button>检查更新</button>
				<button>意见反馈</button>
			</div>
			<div class="update">
				<Radio :data="updateWays" :default="updateWays[0]" @selected="setUpdateWay"></Radio>
			</div>
			<div class="download">
				<span>下载移动客户端</span>
				<button class="down iphone">iPhone版</button>
				<button class="down ipad">iPad版</button>
				<button class="down android">Android版</button>
				<button class="down wp">WP版</button>
			</div>
			<div class="link">
				<a href="https://music.163.com/">《网易云音乐官网》</a>
				<a href="https://music.163.com/static/guideline.html">《网易云音乐社区管理细则》</a>
				<a href="https://st.music.163.com/official-terms/service#">《服务条款》</a>
				<a href="https://st.music.163.com/official-terms/privacy#">《隐私政策》</a>
				<a href="https://st.music.163.com/official-terms/children#">《儿童隐私政策》</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				updateWays: [
					{id: 1, tip: '自动更新'},
					{id: 2, tip: '有新版时提醒我'}
				],
				updateWay: {}
			};
		},
		methods:{
			setUpdateWay(val){
				this.updateWay = val
			}
		},
	}
</script>

<style lang="scss" scoped>
	.setting-about-container{
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
			.version{
				margin-right: 5px;
				color: #555;
				overflow: hidden;
				span{
					margin-right: 20px;
					font-size: 12px;
					color: #555;
				}
			}
			.download{
				margin: 10px 0 30px;
				span{
					margin-right: 20px;
					font-size: 12px;
					color: #555;
				}
				.down{
					border: 1px solid #ec4141;
					color: #fff;
					background-color: #ec4141;
					&:hover{
						background: #d73535;
					}
				}
			}
			.link{
				margin: 10px 0 30px;
				a{
					margin-right: 10px;
					font-size: 12px;
					color: #444;
					&:hover{
						color: #333;
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.setting-about-container{
		.title{
			height: 20px;
			line-height: 20px;
			h3{
				font-size: 13px;
			}
		}
		.content{
			font-size: 12px;
			button{
				flex-grow: 0;
				flex-basis: 100px;
				margin: 5px 0;
				margin-left: 10px;
				padding: 0 5px;
				font-size: 10px;
				width: 80px;
			}
			.version{
				span{
					font-size: 10px;
				}
			}
			.download{
				margin: 5px 0 15px;
				span{
					font-size: 10px;
				}
			}
			.link{
				margin: 5px 0 15px;
				a{
					font-size: 10px;
				}
			}
		}
	}
}
</style>
