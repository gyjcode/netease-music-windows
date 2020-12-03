<template>
	<div class="comment-box-container">
		<div
		v-show="alertMsgShow"
		class="alert-popup">
			<div class="cover"></div>
			<div class="msg">
				{{ alertMsg }}
			</div>
		</div>
		<div class="content">
			<div
			id="comment"
			class="comment">
				<textarea
				v-model="commentMsg"
				ref="commentBox"
				name="commentBox"
				id="commentBox">
				ceshi</textarea>
				<div
				:class="['text-num', 140 - commentMsg.length < 0 ? 'error':'']">
					{{ 140 - commentMsg.length }}
				</div>
			</div>
			<div class="tools">
				<div class="left">
					<Emoji
					@selectEmoji="setEmoji"
					class="btn"></Emoji>
					<div
					@click="atClick"
					class="btn">@</div>
					<div
					@click="topicClick"
					class="btn">#</div>
				</div>
				<div class="right">
					<BtnDefault
					@click.native="submitComment"
					title="评论"
					class="btn-submit"></BtnDefault>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	import Emoji from '@/components/base/Emoji.vue'
	export default{
		components:{
			Emoji
		},
		props:{
			resourceType:{    // 数字, 资源类型, 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
				type: Number,
				required: true
			},
			resourceId:{    // 要评论的资源ID
				type: Number,
				required: true
			},
			parentComment:{    // 回复时的父评论
				type: Object,
				required: false
			}
		},
		data(){
			return{
				alertMsgShow: false,
				alertMsg: "",
				replyParentMsg: "",
				commentType: 1,
				commentId: null,
				commentMsg: "",
			};
		},
		methods:{...mapMutations('user', [
				'setLoginPopupShow',
			]),
			// 点击 @
			atClick(){
				this.commentMsg = this.insertText(this.$refs.commentBox, "@") 
			},
			// 点击话题
			topicClick(){
				this.commentMsg = this.insertText(this.$refs.commentBox, "#输入想说的话题#")
			},
			// 点击 Emoji
			setEmoji(name){
				this.commentMsg = this.insertText(this.$refs.commentBox, name)
			},
			// 光标位置插入文本
			insertText(obj, str) {
				if (document.selection) {
					var sel = document.selection.createRange();
					sel.text = str;
				} else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
					var startPos = obj.selectionStart,
						endPos = obj.selectionEnd,
						cursorPos = startPos,
						tmpStr = obj.value;
					obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
					cursorPos += str.length;
					obj.selectionStart = obj.selectionEnd = cursorPos;
				} else {
					obj.value += str;
				}
			},
			// 提交评论
			async submitComment(){
				if(!this.loginUser.account.id){
					this.setLoginPopupShow(true)
					return
				}
				const data = await this.$api.postComment({
					t: this.commentType,
					type: this.resourceType,
					id: this.resourceId,
					content: this.commentMsg.replace(this.replyParentMsg, ""),
					commentId: this.commentId
				})
				// console.log(data)
				// 评论成功清空评论框
				if(data.code === 200) this.commentMsg = ""
				
				// 评论成功弹窗消息
				this.alertMsg = data.msg || data.message
				this.alertMsgShow = true
				clearTimeout(timer)
				const timer = setTimeout(()=>{
					this.alertMsgShow = false
				}, 1000);
			},
		},
		computed:{
			...mapState('user',[
				'loginUser'
			])
		},
		watch:{
			parentComment(newVal, oldVal){
				if(newVal){
					this.replyParentMsg = '回复'+ newVal.user.name +':'
					if(newVal.user) this.commentMsg = this.replyParentMsg
				}
			},
			commentMsg(newVal, oldVal){
				if(!this.parentComment) return
				if(newVal){
					const str = this.replyParentMsg
					if(this.parentComment.id && newVal.search(str) != 0){
						this.commentType = 1
						this.commentId = null
					}else{
						this.commentType = 2
						this.commentId = this.parentComment.id
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment-box-container{
		position: relative;
		width: auto;
		height: auto;
		.alert-popup{
			z-index: 999;
			position: fixed;
			transform: translate(-50%, -50%);
			top: 50%;
			left: 50%;
			width: 240px;
			height: 80px;
			border-radius: 5px;
			font-size: 20px;
			color: #fff;
			overflow: hidden;
			.cover{
				width: 100%;
				height: 100%;
				background: #000;
				opacity: 0.6;
			}
			.msg{
				position: absolute;
				transform: translate(-50%, -50%);
				top: 50%;
				left: 50%;
				padding: 30px 50px;
				text-align: center;
				white-space: nowrap;
				word-break: break-all;
				text-overflow: ellipsis;
			}
		}
		.content{
			cursor: default;
			.comment{
				position: relative;
				width: 100%;
				height: auto;
				margin: 0;
				padding: 0;
				border: 1px solid #ccc9;
				border-radius: 7px;
				line-height: 30px;
				background: #fff9;
				overflow: hidden;
				textarea{
					position: relative;
					resize: vertical;
					outline: none;
					display: block;
					width: calc(100% - 16px);
					min-height: 60px;
					margin: auto;
					padding: 8px 10px;
					border: 0;
					font-size: 13px;
					color: #555;
					&::before{
						position: absolute;
						top: 0;
						left: 0;
						content: " ";
						color: #000;
						width: 20px;
						height: 20px;
						background-color: red;
					}
				}
				.text-num{
					position: absolute;
					right: 5px;
					bottom: 0px;
					height: 20px;
					line-height: 20px;
					font-size: 12px;
					color: #999;
					&.error{
						color: #ec4141;
					}
				}
			}
			.tools{
				height: 20px;
				line-height: 20px;
				margin: 10px 0 0;
				.left{
					float: left;
					display: block;
					.btn{
						float: left;
						margin-right: 10px;
						font-size: 20px;
						font-weight: normal;
						color: #777;
						&:hover{
							color: #555;
						}
					}
				}
				.right{
					float: right;
					display: block;
					position: relative;
					width: auto;
					/deep/.btn-submit{
						button{
							cursor: pointer;
							outline: none;
							height: 28px;
							line-height: 20px;
							border: 1px solid #c9c9c9;
							border-radius: 30px;
							padding: 3px 15px;
							color: #333;
							background: #fff;
							&:hover{
								background: #fafafa;
							}
						}
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.comment-box-container{
		.alert-popup{
			width: 160px;
			height: 60px;
			border-radius: 3px;
			font-size: 15px;
			.msg{
				padding: 15px 30px;
			}
		}
		.content{
			.comment{
				border-radius: 5px;
				line-height: 20px;
				textarea{
					width: calc(100% - 10px);
					min-height: 40px;
					padding: 5px 10px;
					font-size: 12px;
				}
				.text-num{
					position: absolute;
					right: 5px;
					bottom: 0px;
					height: 20px;
					line-height: 20px;
					font-size: 12px;
					color: #999;
					&.error{
						color: #ec4141;
					}
				}
			}
			.tools{
				height: 20px;
				line-height: 20px;
				margin: 5px 0 0;
				.left{
					height: 20px;
					line-height: 20px;
					.btn{
						margin-right: 5px;
						font-size: 16px;
					}
				}
				.right{
					/deep/.btn-submit{
						button{
							height: 20px;
							line-height: 20px;
							border-radius: 20px;
							padding: 1px 9px;
						}
					}
				}
			}
		}
	}
}
</style>
