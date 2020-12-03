<template>
	<div class="video-container">
		<div class="menu">
			<Menu></Menu>
		</div>
		<div class="content">
			<div class="main">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import Menu from '@/components/pages/video/VideoMenu.vue'
	
	export default{
		components:{
			Menu
		},
	}
</script>
<style lang="scss" scoped>
	.video-container{
		position: relative;
		width: auto;
		height: 100%;
		overflow: hidden;
		.menu{
			z-index: 999999;
			display: block;
			position: fixed;
			width: 100%;
			height: 45px;
			line-height: 45px;
			padding: 10px 0;
			background: #fafafa;
		}
		.content{
			position: relative;
			width: auto;
			height: calc(100% - 120px);
			padding: 60px 30px;
			overflow: hidden;
			overflow-y: auto;
			&::-webkit-scrollbar{
				display: none;
				width: 9px;
				height: 9px;
			}
			&::-webkit-scrollbar-thumb{
				border-radius: 18px;
				background: #7777;
			}
			&::-webkit-scrollbar-thumb:hover{
				background: #9999;
			}
			&::-webkit-scrollbar-track{
				border-right: 0px solid #7777;
				background: none;
			}
			.main{
				max-width: 1200px;
				margin: 0 auto;
			}
		}
	}
@media screen and (max-width: 540px) {
	.video-container{
		.menu{
			height: 30px;
			line-height: 30px;
			padding: 5px 0;
		}
		.content{
			height: calc(100% - 60px);
			padding: 30px 10px;
		}
	}
}
</style>
