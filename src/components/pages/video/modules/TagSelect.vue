<template>
	<div class="tag-select-container">
		<div class="main">
			<div
			class="selected"
			@click="onClickSelectedTag"
			ref="selectTag">
				{{ selectedTag.name }}
				<i class="iconfont icon-arrow-down-l"></i>
			</div>
			<div class="hottags">
				<div class="tags">
					<span
					@click="onClickTag(item)"
					:class="['tag', item.name == selectedTag.name ? 'active': '']"
					v-for="(item, i) in hotTags"
					:key="i">
						{{ item.name }}
					</span>
				</div>
			</div>
			<Toggle
			:reserveDoms="[$refs.selectTag && $refs.selectTag.$el]"
			:show.sync="selectShow">
				<div
				class="body"
				v-show="selectShow">
					<div class="title">
						<h3>添加标签</h3>
					</div>
					<div class="content" >
						<div 
						class="tags">
							<div
							@click="onClickTag(tagAll)"
							:class="['tag all', selectedTag.id === tagAll.id ? 'active' : '']">
								全部视频
							</div>
							<div
							@click="onClickTag(tag)"
							:class="['tag', selectedTag.id === tag.id ? 'active' : '']"
							v-for="(tag, index) in tags"
							:key="index">
								{{ tag.name }}
							</div>
						</div>
					</div>
				</div>
			</Toggle>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				selectShow: false,
				selectedTag: {id: 58100, name: "现场"},
				tags: [],
				tagAll: {id: 0, name: "全部视频"},
				hotTags: [],
			}
		},
		created() {
			this.videoGroupList()
		},
		methods:{
			onClickSelectedTag() {
				this.selectShow = true
			},
			onClickTag(item){
				this.selectedTag = item
				this.$emit('selectedTag', item)
				this.selectShow = false
				alert("视频接口不可用，临时使用MV接口代替，分类选择无效！")
			},
			async videoGroupList(){
				const data = await this.$api.getVideoGroupList();
				// console.log(data)
				if(data.code === 200){
					const tags = data.data.map((data)=>{
						return {
							id: data.id,
							name: data.name
						}
					})
					this.tags = tags;
					this.hotTags = tags.slice(0,8)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tag-select-container{
		cursor: default;
		position: relative;
		.main{
			z-index: 999;
			position: relative;
			height: 30px;
			line-height: 30px;
		}
		.selected{
			cursor: pointer;
			float: left;
			display: block;
			position: relative;
			height: 24px;
			line-height: 24px;
			border: 1px solid #eee;
			border-radius: 30px;
			padding: 3px 15px;
			font-size: 14px;
			background: #fafafa;
		}
		.hottags{
			float: right;
			height: 30px;
			line-height: 30px;
			.tags{
				.tag{
					cursor: pointer;
					float: left;
					position: relative;
					display: block;
					width: auto;
					height: 10px;
					line-height: 10px;
					margin: 5px 7px;
					padding: 5px 9px;
					border-radius: 16px;
					font-size: 12px;
					text-align: center;
					color: #999;
					&:after{
						content: "";
						position: absolute;
						left: -7px;
						width: 1px;
						height: 10px;
						background: #e1e1e1;
					}
					&:first-child:after{
						display: none;
					}
					&:hover{
						color: #333;
					}
					&.active{
						color: #ec4141;
						background: #fcebeb;
					}
				}
			}
		}
		.body{
			position: absolute;
			top: 30px;
			width: 520px;
			height: auto;
			margin: 0;
			border: 1px solid #eee;
			border-radius: 5px;
			padding: 0;
			background: #fff;
			box-shadow: -3px -3px 5px #e9e9e9e9;
			.title{
				width: 100%;
				h3{
					height: 40px;
					line-height: 40px;
					margin: 0;
					border-bottom: 1px solid #eee;
					padding: 5px 20px;
					font-size: 15px;
					font-weight: normal;
				}
			}
			.content{
				position: relative;
				height: 400px;
				margin: 0;
				border: 0;
				padding: 0 20px;
				overflow: hidden;
				overflow-y: scroll;
				&::-webkit-scrollbar{
					width: 7px;
					height: 7px;
				}
				&::-webkit-scrollbar-thumb{
					border-radius: 14px;
					background: #eeee;
				}
				&::-webkit-scrollbar-thumb:hover{
					background: #cccc;
				}
				&::-webkit-scrollbar-track{
					background: none;
				}
				.tags{
					position: relative;
					transform: translate(-50%, 0);
					left: 50%;
					margin: 10px auto;
					.tag{
						float: left;
						display: inline-block;
						width: calc(12.666666666% - 2px);
						height: 32px;
						line-height: 30px;
						text-align: center;
						border: 1px solid #e9e9e9;
						border-right: 1px solid transparent;
						border-top: 1px solid transparent;
						padding: 0 2%;
						font-size: 12px;
						color: #333;
						background: #fefefe;
						text-overflow: ellipsis;
						white-space: nowrap;
						word-break: break-all;
						overflow: hidden;
						&.all{
							float: none;
							display: block;
							width: auto;
							margin: 0 0 10px;
							border: 1px solid #e9e9e9;
						}
						&:nth-child(6n+1){
							border-right: 1px solid #e9e9e9;
						}
						&:last-child{
							border-right: 1px solid #e9e9e9;
						}
						&:nth-child(2){
							border-top: 1px solid #e9e9e9;
						}
						&:nth-child(3){
							border-top: 1px solid #e9e9e9;
						}
						&:nth-child(4){
							border-top: 1px solid #e9e9e9;
						}
						&:nth-child(5){
							border-top: 1px solid #e9e9e9;
						}
						&:nth-child(6){
							border-top: 1px solid #e9e9e9;
						}
						
						&:nth-child(7){
							border-top: 1px solid #e9e9e9;
						}
						&.active{
							position: relative;
							border-radius: 0;
							border: 1px solid #c62f2f !important;
							&:before{
								content: '';
								position: absolute;
								right: 0;
								bottom: 0;
								width: 0;
								height: 0;
								border-left: 20px solid transparent;
								border-bottom: 15px solid #c62f2f;
							}
							&:after{
								content: '';
								position: absolute;
								right: 3px;
								bottom: 2px;
								width: 3px;
								height: 7px;
								border: 1px solid #fff;
								border-top-color: transparent;
								border-left-color: transparent;
								transform: rotate(45deg);
							}
						}
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.tag-select-container{
		height: auto;
		line-height: 20px;
		margin: 10px 0;
		overflow: hidden;
		.selected{
			display: none;
		}
		.hottags{
			float: none;
			height: auto;
			line-height: 20px;
			.tags{
				.tag{
					height: 10px;
					line-height: 10px;
					margin: 2px 5px;
					padding: 3px 5px;
					border-radius: 16px;
					font-size: 10px;
					&:after{
						display: none;
					}
				}
			}
		}
		.body{
			display: none;
		}
	}
}
</style>
