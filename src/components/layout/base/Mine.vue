<template>
	<div class="sidebar-mine-container">
		<div class="content">
			<router-link tag="div" to="/local" class="item">
				<i class="iconfont icon-music-l"></i>
				<span>本地音乐</span>
			</router-link>
			<router-link tag="div" to="/download" class="item">
				<i class="iconfont icon-download-l"></i>
				<span>下载管理</span>
			</router-link>
			<router-link tag="div" to="/cloud" v-show="loginUser && loginUser.account.id" class="item">
				<i class="iconfont icon-cloud-l"></i>
				<span>我的音乐云盘</span>
			</router-link>
			<router-link tag="div" to="/subscribe" v-show="loginUser && loginUser.account.id" class="item">
				<i class="iconfont icon-collect-l"></i>
				<span>我的收藏</span>
			</router-link>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default{
		data(){
			return{
				
			};
		},
		computed:{
			...mapState('user', [
				'loginUser'
			])
		},
	}
</script>

<style lang="scss" scoped>
	.sidebar-mine-container{
		cursor: default;
		position: relative;
		.content{
			position: relative;
			margin: 0;
			padding: 0;
			.item{
				cursor: pointer;
				position: relative;
				width: auto;
				height: 32px;
				line-height: 32px;
				margin: 0;
				border-radius: 2px;
				padding: 0 10px;
				font-size: 13px;
				font-weight: normal;
				color: #555;
				overflow: hidden;
				i.iconfont{
					float: left;
					width: 20px;
					height: 20px;
					font-size: 15px;
				}
				i.icon-heartbeat-l{
					z-index: 999;
					position: absolute;
					top: 0;
					right: 0;
				}
				span{
					display: block;
					height: 32px;
					font-size: 13px;
				}
				&:hover{
					color: #333;
				}
				&.active{
					border-left: 0px solid #c62f2f;
					color: #333;
					background-color: #eee;
				}
			}
		}
	}
</style>