<template>
	<div class="event-mv-container">
		<div class="content">
			<div class="pic">
				<i class="iconfont icon-player-start-c-l"></i>
				<img :src="data.mv.imgurl + '?param=360y200'" alt="">
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			data:{
				type: Object,
				required: true
			}
		},
	}
</script>

<style lang="scss" scoped>
	.event-mv-container{
		position: relative;
		width: 100%;
		height: auto;
		border-radius: 7px;
		.content{
			position: relative;
			.pic{
				position: relative;
				width: 360px;
				height: 200px;
				overflow: hidden;
				img{
					width: 100%;
					height: 100%;
				}
				i.iconfont{
					position: absolute;
					transform: translate(-50%, -50%);
					top: 50%;
					left: 50%;
					font-size: 32px;
					color: #fff;
					&:hover{
						color: #ce4141;
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.event-mv-container{
		border-radius: 5px;
		.content{
			.pic{
				width: 100%;
				height: auto;
				i.iconfont{
					font-size: 24px;
				}
			}
		}
	}
}
</style>
