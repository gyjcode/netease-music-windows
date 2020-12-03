<template>
	<div class="emoji-container">
		<div
		@click="emojiPopup"
		ref="emoji"
		class="popup">
			<i class="iconfont icon-smile-l"></i> 
		</div>
		<div
		v-show="emojiPanelShow"
		ref="emojiPanel"
		class="emoji-popup">
			<div
			@click="close"
			class="close">
				<div class="btn">&times;</div>
			</div>
			<div class="content">
				<div class="emojis">
					<div
					class="emoji"
					@click="emojiClick(name)"
					v-if="emoji"
					v-for="(emoji, name, i) in emojis"
					:key="i">
						<img
						:src="require('@/assets/images/emojis/'+ emoji)"
						:alt="name">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// 导入 Emoji 图片数据
	import {emojis} from '@/assets/images/emojis/data.js'
	export default{
		data(){
			return{
				emojiPanelShow: false,
				emojis: emojis
			}
		},
		methods:{
			// emoji 弹窗
			close(){
				this.emojiPanelShow = false
			},
			emojiClick(name){
				this.$emit('selectEmoji', name)
			},
			emojiPopup(event){
				// 获取点击事件触发的 DOM 元素
				const triggerElement = event.target
				// 获取插值内容的首个 DOM 元素
				const parentElement = [this.$refs.emoji, this.$refs.emojiPanel]
				if(!this.hasParent(triggerElement, parentElement)){
					this.emojiPanelShow = false
				}else{
					this.emojiPanelShow = true
				}
			},
			// 判断点击事件点击位置是否包含指定父元素
			hasParent(dom, parentDom) {
				parentDom = Array.isArray(parentDom) ? parentDom : [parentDom]
				while(dom) {
					if (parentDom.find(p => p === dom)) {
						return true
					} else {
						dom = dom.parentNode
					}
				}
			},
		},
		watch:{
			// 监听 emojiPanelShow
			emojiPanelShow(newVal, oldVal){
				if(newVal){
					document.addEventListener('mousedown', this.emojiPopup)
				}else {
					document.removeEventListener('mousedown', this.emojiPopup)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.emoji-container{
		position: relative;
		.popup{
			i.iconfont{
				font-size: 18px;
			}
		}
		.emoji-popup{
			z-index: 999999;
			position: absolute;
			width: 320px;
			height: 120px;
			border: 1px solid #eee;
			border-radius: 5px;
			padding: 5px;
			font-size: 13px;
			background: #fafafa;
			box-shadow: 0px 0px 5px #ccc;
			.close{
				height: 20px;
				overflow: hidden;
				.btn{
					float: right;
					height: 20px;
					line-height: 20px;
					width: 20px;
					font-size: 20px;
					text-align: center;
				}
			}
			.content{
				position: relative;
				height: 100px;
				margin-top: -5px;
				overflow: hidden;
				overflow-y: scroll;
				&::-webkit-scrollbar{
					display: none;
					width: 9px;
					height: 9px;
				}
				&::-webkit-scrollbar-thumb{
					border-radius: 18px;
					background: none;
				}
				&::-webkit-scrollbar-thumb:hover{
					background: none;
				}
				&::-webkit-scrollbar-track{
					border-right: 0px solid #7777;
					background: none;
				}
				.emojis{
					position: relative;
					width: auto;
					margin: 0 7px;
					overflow: hidden;
					.emoji{
						float: left;
						width: 20px;
						height: 20px;
						margin: 3px 5px;
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.emoji-container{
		position: relative;
		.popup{
			i.iconfont{
				font-size: 14px;
			}
		}
		.emoji-popup{
			z-index: 999999;
			position: absolute;
			width: 260px;
			height: 120px;
			border: 1px solid #eee;
			border-radius: 5px;
			padding: 5px;
			font-size: 13px;
			background: #fafafa;
			box-shadow: 0px 0px 5px #ccc;
			.close{
				height: 20px;
				overflow: hidden;
				.btn{
					float: right;
					height: 20px;
					line-height: 20px;
					width: 20px;
					font-size: 20px;
					text-align: center;
				}
			}
			.content{
				position: relative;
				height: 100px;
				margin-top: -5px;
				overflow: hidden;
				overflow-y: scroll;
				&::-webkit-scrollbar{
					display: none;
					width: 9px;
					height: 9px;
				}
				&::-webkit-scrollbar-thumb{
					border-radius: 18px;
					background: none;
				}
				&::-webkit-scrollbar-thumb:hover{
					background: none;
				}
				&::-webkit-scrollbar-track{
					border-right: 0px solid #7777;
					background: none;
				}
				.emojis{
					position: relative;
					width: auto;
					margin: 0 7px;
					overflow: hidden;
					.emoji{
						float: left;
						width: 20px;
						height: 20px;
						margin: 3px 5px;
					}
				}
			}
		}
	}
}
</style>
