<!-- 全局 TablePlaylist 组件 : 默认歌曲列表 -->
<template>
	<div class="select-container">
		<div class="select">
			<div
			@click="setSelectorShow"
			ref="select"
			class="trigger">
				<span>{{ selectedItem }}</span>
				<i class="iconfont icon-arrow-down-s"></i>
			</div>
			<Toggle
			:reserveDoms="[$refs.select]"
			:show.sync="selectorShow">
				<div
				v-show="selectorShow"
				class="items">
					<div
					@click="selectItem(item)"
					:class="['item', item === selectedItem ? 'selected' : '']"
					v-for="(item, i) in data"
					:key="i">{{ item }}</div>
				</div>
			</Toggle>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {	
		name: 'Select',
		props: {
			data:{
				type: Array,
				required: true,
			},
			default:{
				required:false,
				default: '默认'
			}
		},
		data(){
			return{
				selectedItem: this.default,
				selectorShow: false
			}
		},
		methods:{
			setSelectorShow(){
				this.selectorShow = true
			},
			selectItem(item){
				this.$emit('selected', item)
				this.selectedItem = item
				this.selectorShow = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.select-container{
		display: inline-block;
		position: relative;
		width: auto;
		margin: 10px 0;
		.title{
			height: 20px;
			line-height: 20px;
			.name{
				float: left;
				margin-right: 5px;
				font-weight: bold;
				color: #555;
			}
			.desc{
				font-size: 12px;
			}
		}
		.select{
			cursor: default;
			position: relative;
			width: auto;
			height: auto;
			margin: 5px 0;
			font-size: 10px;
			.trigger{
				width: calc(100% - 22px);
				height: 16px;
				line-height: 16px;
				border: 1px solid #ccc;
				border-radius: 5px;
				padding: 3px 10px;
				span{
					color: #555;
				}
				i.iconfont{
					float: right;
					margin-left: 10px;
					font-size: 10px;
				}
			}
			.items{
				z-index: 999;
				position: absolute;
				top: 23px;
				width: calc(100% - 2px);
				height: auto;
				max-height: 156px;
				border: 1px solid #ccc;
				border-radius: 5px;
				background-color: #fff;
				overflow: hidden;
				overflow-y: auto;
				&::-webkit-scrollbar{
					width: 5px;
					height: 5px;
				}
				&::-webkit-scrollbar-thumb{
					border-radius: 10px;
					background: #aaaa;
				}
				&::-webkit-scrollbar-thumb:hover{
					background: #9999;
				}
				&::-webkit-scrollbar-track{
					border-right: 0px solid #7777;
					background: #eeee;
				}
				.item{
					line-height: 20px;
					width: 100%;
					padding: 3px 10px;
					color: #777;
					&:hover{
						color: #666;
						background-color: #f4f4f4;
					}
					&.selected{
						color: #333;
						background-color: #f9f9f9;
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.select-container{
		margin: 5px 0;
		.title{
			.desc{
				display: none;
			}
		}
		.select{
			margin: 5px 0;
		}
	}
}
</style>
