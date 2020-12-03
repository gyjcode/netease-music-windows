<template>
	<div class="comment-list-container">
		<ul class="comment-list" v-for="(item, i) in data" :key="i">
			<li>
				<div class="header">
					<img :src="item.user.avatar" alt="">
				</div>
				<div class="body">
					<div class="content">
						<a class="author">{{ item.user.nickname }}：</a>
						<span class="msg">{{ item.content }}</span>
					</div>
					<div class="info">
						—— {{ item.programName }}
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import {formatDate} from '@/utils'
	
	export default{
		props:{
			data:{
				type: Array,
				required: true
			}
		},
	}
</script>

<style lang="scss" scoped>
	.comment-list-container{
		margin: 20px 20px 0;
		ul.comment-list{
			list-style: none;
			line-height: 20px;
			margin: 0 0 10px;
			padding: 10px 0;
			border-bottom: 1px solid #eee;
			font-size: 13px;
			color: #333;
			li{
				padding: 5px 0; 
				.header{
					float: left;
					width: 42px;
					height: 42px;
					img{
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.body{
					margin: 0 0 0 60px;
					.content{
						height: auto;
						font-size: 11px;
						.author{
							color: #0c73c2;
						}
					}
					.info{
						height: 20px;
						line-height: 20px;
						margin: 5px 0 0;
						font-size: 10px;
						color: #777;
					}
				}
			}
		}
	}
</style>
