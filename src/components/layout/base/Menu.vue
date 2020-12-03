<template>
	<div class="sidebar-menu-container">
		<div class="content">
			<router-link tag="div" to="/discover" class="item">
				<i class="iconfont icon-musical-note-l"></i>
				<span>发现音乐</span>
			</router-link>
			<router-link tag="div" to="/video" class="item">
				<i class="iconfont icon-video-l"></i>
				<span>视频</span>
			</router-link>
			<router-link tag="div" to="/social" class="item">
				<i class="iconfont icon-peoples-l"></i>
				<span>朋友</span>
			</router-link>
			<router-link tag="div" to="/live" class="item">
				<i class="iconfont icon-camera-l"></i>
				<span>直播</span>
			</router-link>
			<router-link tag="div" to="/fm" class="item">
				<i class="iconfont icon-fm-l"></i>
				<span>私人FM</span>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
	.sidebar-menu-container{
		position: relative;
		.content{
			list-style: none;
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
				font-size: 15px;
				font-weight: normal;
				color: #555;
				overflow: hidden;
				i.iconfont{
					float: left;
					display: none;
					width: 20px;
					height: 20px;
					font-size: 15px;
				}
				span{
					display: block;
					height: 32px;
				}
				&:hover{
					color: #333;
				}
				&.active{
					border-left: 0px solid #c62f2f;
					font-size: 18px;
					font-weight: bold;
					color: #333;
					background-color: #eee;
				}
			}
		}
	}
</style>