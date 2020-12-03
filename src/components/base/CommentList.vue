<template>
	<div class="comment-list-container">
		<ul class="comment-list">
			<li
			class="comment"
			v-for="(comment, i) in data"
			:key="i">
				<div class="header">
					<img :src="comment.user.avatar" alt="">
				</div>
				<div class="body">
					<div class="content">
						<router-link
						tag="span"
						:to="`/page/user/`+ comment.user.id"
						class="author">{{ comment.user.name }}：</router-link>
						<div
						v-html="replaceEmoji(comment.content)"
						class="msg"></div>
						<div
						class="be-replied"
						v-show="comment.beReplied.length">
							<div
							class="item"
							v-for="(item, i) in comment.beReplied"
							:key="i">
								<router-link
								tag="span"
								:to="`/page/user/`+ item.user.id"
								class="author">@{{ item.user.name }}：</router-link>
								<div
								v-html="replaceEmoji(item.content)"
								class="msg"></div>
							</div>
						</div>
					</div>
					<div class="info">
						<div class="left">
							<a class="time">{{ comment.time|formatDate }}</a>
						</div>
						<div class="right">
							<a class="accusation">
								举报
							</a>
							<a class="like">
								<i class="iconfont icon-thumb-l"></i>
							</a>
							<a class="sharing">
								<i class="iconfont icon-sharing-l"></i>
							</a>
							<a class="reply" @click="reply(comment)">
								<i class="iconfont icon-comment-l"></i>
							</a>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	import {formatDate} from '@/utils'
	import {emojis} from '@/assets/images/emojis/data.js'
	
	export default{
		props:{
			data:{
				type: Array,
				required: true
			}
		},
		methods:{
			...mapMutations('user', [
				'setLoginPopupShow',
			]),
			// 替换网易云表情
			replaceEmoji(content){
				if(!content) return
				let result = content
				const emojiArr = content.match(/\[.*?\]/g)
				if(emojiArr){
					emojiArr.forEach((item)=>{
						if( emojis[item]){
							const emojiImg = "<div class='emoji'><img src="+ require('@/assets/images/emojis/'+ emojis[item]) +"></div>"
							const str = eval('/\\['+ item.slice(1, item.length-1) +'\\]/g')
							result = content.replace(str, emojiImg)
						}
					})
				}
				return result
			},
			// 回复评论
			reply(comment){
				document.querySelector("#comment").scrollIntoView({block: "end"});
				this.$emit('comment', comment)
			}
		},
		computed:{
			...mapState('user',[
				'loginUser'
			])
		}
	}
</script>

<style lang="scss" scoped>
	.comment-list-container{
		position: relative;
		.comment-list{
			cursor: default;
			list-style: none;
			line-height: 20px;
			margin: 0 0 10px;
			padding: 10px 0;
			border-bottom: 1px solid #eee;
			font-size: 13px;
			color: #333;
			.comment{
				margin: 10px 0;
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
						font-size: 12px;
						.author{
							cursor: pointer;
							color: #0c73c2;
						}
						.msg{
							display: inline;
							color: #333;
							/deep/.emoji{
								position: relative;
								display: inline-block;
								bottom: -5px;
								line-height: 20px;
								margin: 0 2px;
								img{
									float: left;
									display: block;
								}
							}
						}
						.be-replied{
							margin: 5px 0;
							padding: 5px;
							line-height: 20px;
							background: #f1f1f1;
							.author{
								color: #0c73c2;
							}
							.msg{
								color: #777;
							}
						}
					}
					.info{
						position: relative;
						height: 20px;
						line-height: 20px;
						margin: 5px 0 0;
						font-size: 12px;
						color: #777;
						.left{
							position: absolute;
							top: 0;
							left: 0;
						}
						.right{
							position: absolute;
							top: 0;
							right: 0;
							width: auto;
							overflow: hidden;
							a{
								cursor: pointer;
								float: left;
								display: block;
								position: relative;
								height: 20px;
								line-height: 20px;
								font-size: 10px;
								padding: 0 10px;
								color: #777;
								&:hover{
									color: #000;
								}
								&::after{
									content: "";
									position: absolute;
									top: 5px;
									right: 0;
									width: 1px;
									height: 10px;
									background: #ccc;
								}
								&:last-child::after{
									display: none;
								}
							}
							.accusation{
								visibility: hidden;
							}
							&:hover .accusation{
								visibility: visible;
							}
						}
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.comment-list-container{
		.comment-list{
			line-height: 20px;
			margin: 0 0 5px;
			padding: 5px 0;
			border-bottom: 1px solid #eee;
			font-size: 10px;
			.comment{
				margin: 5px 0;
				padding: 3px 0; 
				.header{
					width: 32px;
					height: 32px;
				}
				.body{
					margin: 0 0 0 40px;
					.content{
						height: auto;
						font-size: 10px;
						.be-replied{
							margin: 3px 0;
							padding: 0px;
						}
					}
					.info{
						margin: 3px 0 0;
						font-size: 10px;
					}
				}
			}
		}
	}
}
</style>
