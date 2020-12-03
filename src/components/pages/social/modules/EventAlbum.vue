<template>
	<div class="event-album-container">
		<div class="content">
			<div class="pic">
				<i class="iconfont icon-player-start-c-l"></i>
				<img :src="data.album.picUrl+ '?param=60y60'" alt="">
			</div>
			<div class="text">
				<div class="title">
					{{ data.album.name }}
				</div>
				<div class="desc">
					{{ data.album.artists.map(({name})=>name).join('/') }}
				</div>
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
	.event-album-container{
		position: relative;
		width: 100%;
		height: auto;
		border-radius: 5px;
		background: #f3f3f3;
		&:hover{
			background: #efefee;
		}
		.content{
			position: relative;
			height: 40px;
			margin: 10px 0;
			padding: 7px;
			.pic{
				float: left;
				position: relative;
				width: 40px;
				height: 40px;
				border-radius: 5px;
				overflow: hidden;
				i.iconfont{
					position: absolute;
					transform: translate(-50%, -50%);
					top: 50%;
					left: 50%;
					font-size: 16px;
					color: #fff;
					&:hover{
						color: #ec4141;
					}
				}
				img{
					width: 100%;
					height: 100%;
				}
			}
			.text{
				height: 40px;
				line-height: 20px;
				margin-left: 50px ;
				.title{
					cursor: default;
					font-size: 13px;
					color: #333;
				}
				.desc{
					cursor: default;
					font-size: 12px;
					color: #999;
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.event-album-container{
		.content{
			position: relative;
			height: 36px;
			margin: 5px 0;
			padding: 7px;
			.pic{
				width: 36px;
				height: 36px;
				i.iconfont{
					font-size: 13px;
				}
			}
			.text{
				height: 36px;
				line-height: 18px;
				margin-left: 44px ;
				.title{
					font-size: 12px;
				}
				.desc{
					font-size: 10px;
				}
			}
		}
	}
}
</style>
