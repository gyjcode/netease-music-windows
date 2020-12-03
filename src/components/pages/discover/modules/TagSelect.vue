<template>
	<div class="tag-select-container">
		<div
		class="selected"
		@click="onClickSelectedTag"
		ref="selectTag">
			{{ selectedTag.name }}
			<i class="iconfont icon-arrow-right-l"></i>
		</div>
		<div class="hottags">
			<span
			@click="onClickTag(tag)"
			:class="['tag', tag.name == selectedTag.name ? 'active': '']"
			v-for="(tag, i) in hotTags"
			:key="i">
				{{ tag.name }}
			</span>
		</div>
		<Toggle
		:reserveDoms="[$refs.selectTag && $refs.selectTag.$el]"
		:show.sync="selectShow">
			<div
			class="body"
			v-show="selectShow">
				<div class="content" >
					<div 
					class="categrogys">
						<div class="categrogy all">
							<div
							@click="onClickTag(categoriesAll)"
							:class="['tag-item', selectedTag.name === '全部歌单' ? 'active' : '']">
								全部歌单
							</div>
						</div>
						<div
						class="categrogy"
						v-for="(category, index) in categories"
						:key="index">
							<div class="cat-item">
								{{ category }}
							</div>
							<div class="tags">
								<div
								:class="['tag-item', selectedTag.name === item.name ? 'active' : '']"
								@click="onClickTag(item)"
								v-if="item.category == index"
								v-for="(item, j) in categoriesSub"
								:key="j">
									{{ item.name }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Toggle>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				selectShow: false,
				selectedTag: {id:5001, name:"华语"},
				hotTags: [],
				categories: null,
				categoriesAll: null,
				categoriesSub: null,
			}
		},
		created() {
			this.playlistCategories()
			this.playlistHotTags()
		},
		methods:{
			onClickSelectedTag() {
				this.selectShow = true
			},
			onClickTag(item){
				this.selectedTag = item
				this.$emit('selectedTag', item)
				this.selectShow = false
			},
			async playlistCategories(){
				const data = await this.$api.getPlaylistCategories();
				// console.log(data)
				this.categories = data.categories
				this.categoriesAll = data.all
				this.categoriesSub = data.sub
			},
			async playlistHotTags(){
				const data = await this.$api.getPlaylistHotTags();
				// console.log(data)
				this.hotTags = data.tags.map((tags)=>{
					return {
						id: tags.id,
						name: tags.name,
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tag-select-container{
		clear: both;
		display: block;
		cursor: default;
		position: relative;
		width: 100%;
		height: 30px;
		margin: 15px 0;
		.selected{
			cursor: pointer;
			float: left;
			display: block;
			position: relative;
			height: 28px;
			line-height: 28px;
			padding: 2px 15px;
			border: 1px solid #d8d8d8;
			border-radius: 30px;
			font-size: 14px;
			background: #fafafa;
			i.iconfont{
				font-size: 10px;
			}
		}
		.hottags{
			float: right;
			display: block;
			font-size: 14px;
			span{
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
		.body{
			z-index: 999;
			position: absolute;
			top: 40px;
			width: 600px;
			height: auto;
			margin: 0;
			border: 1px solid #eee;
			border-radius: 5px;
			padding: 0;
			background: #fff;
			box-shadow: -3px -3px 5px #e9e9e9e9;
			.content{
				position: relative;
				height: 400px;
				margin: 0;
				border: 0;
				padding: 0;
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
				.categrogys{
					position: relative;
					transform: translate(-50%, 0);
					left: 50%;
					margin: 10px auto;
					.categrogy{
						cursor: pointer;
						width: auto;
						margin: 15px;
						text-align: right;
						overflow: hidden;
						&.all{
							width: auto;
							height: auto;
							height: 32px;
							line-height: 30px;
							border-bottom: 1px solid #e9e9e9;
							margin: 0 -15px;
							text-align: center;
							font-size: 13px;
							color: #777;
							.tag{
								width: 100%;
							}
						}
						.active{
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
						.cat-item{
							float: left;
							width: 40px;
							padding: 0 10px;
							color: #c62f2f;
						}
						.tags{
							margin: 0 0 0 60px;
							overflow: hidden;
							.tag-item{
								float: left;
								display: inline-block;
								width: calc(16% - 2px);
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
								&:nth-child(5n){
									border-right: 1px solid #e9e9e9;
								}
								&:last-child{
									border-right: 1px solid #e9e9e9;
								}
								&:nth-child(1){
									border-top: 1px solid #e9e9e9;
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
			font-size: 10px;
			span{
				height: 10px;
				line-height: 10px;
				margin: 3px 5px;
				padding: 3px 5px;
				border-radius: 16px;
				font-size: 10px;
				&:after{
					display: none;
				}
			}
		}
		.body{
			display: none;
		}
	}
}
</style>
