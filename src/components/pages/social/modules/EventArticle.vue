<template>
	<div class="event-article-container">
		<div class="content">
			<div class="pic">
				<img :src="data.topic.coverUrl+ '?param=115y75'" alt="">
			</div>
			<div class="text">
				<div class="title">
					<span>专栏</span>
					{{ data.topic.recmdTitle }}
				</div>
				<div class="desc">
					by {{ data.topic.creator.nickname }}
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
	.event-article-container{
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
			height: auto;
			margin: 10px 0;
			padding: 7px;
			.pic{
				float: right;
				position: relative;
				width: 110px;
				height: 72px;
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
				padding: 16px 5px;
				.title{
					cursor: default;
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
					cursor: default;
					font-size: 12px;
					color: #999;
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.event-article-container{
		.content{
			margin: 5px 0;
			padding: 5px;
			.pic{
				width: 90px;
				height: 60px;
				border-radius: 5px;
			}
			.text{
				padding: 10px 5px;
				.title{
					cursor: default;
					font-size: 12px;
					text-overflow: ellipsis;
					word-break: break-all;
					white-space: nowrap;
					overflow: hidden;
					span{
						height: 12px;
						line-height: 12px;
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
