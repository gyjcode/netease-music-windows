<template>
	<div class="event-playlist-container">
		<div class="content">
			<div class="pic">
				<img :src="data.playlist.coverImgUrl+ '?param=60y60'" alt="">
			</div>
			<div class="text">
				<div class="title">
					<span>歌单</span>
					{{ data.playlist.name }}
				</div>
				<div class="desc">
					by {{ data.playlist.creator.nickname }}
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
	.event-playlist-container{
		position: relative;
		width: 100%;
		height: auto;
		border-radius: 7px;
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
					cursor: pointer;
					font-size: 13px;
					color: #333;
					span{
						display: inline-block;
						height: 14px;
						line-height: 14px;
						margin: 3px 0;
						border: 1px solid #ec4141;
						padding: 0 3px;
						font-size: 12px;
						color: #ec4141;
					}
				}
				.desc{
					cursor: pointer;
					font-size: 12px;
					color: #999;
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.event-playlist-container{
		border-radius: 5px;
		.content{
			height: 36px;
			margin: 5px 0;
			padding: 7px;
			.pic{
				width: 36px;
				height: 36px;
			}
			.text{
				height: 36px;
				line-height: 18px;
				margin-left: 44px ;
				.title{
					cursor: pointer;
					font-size: 12px;
					color: #333;
					span{
						height: 12px;
						line-height: 12px;
						margin: 3px 0;
						font-size: 10px;
					}
				}
				.desc{
					font-size: 10px;
				}
			}
		}
	}
}
</style>
