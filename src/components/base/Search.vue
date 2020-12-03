<template>
	<div class="search-container">
		<el-input
		placeholder="搜索音乐,视频,歌词,电台"
		@click.native="onClickInput"
		@keypress.enter.native="searchByKeyword"
		v-model="searchKeywords"
		class="search-input"
		ref="searchInput">
			<i 
			@click="searchByKeyword"
			class="el-input__icon el-icon-search"
			slot="suffix"></i>
		</el-input>
		<Toggle
		:reserveDoms="[$refs.searchInput && $refs.searchInput.$el]"
		:show.sync="searchPanelShow">
		<!-- show.sync 双向绑定 -->
			<div class="search-box" v-show="searchPanelShow">
				<div class="main">
					<div class="history" v-show="searchHistorys[0]">
						<div class="title">
							<h4>搜索历史</h4>
							<i @click="clearAllSearchHistory" class="iconfont icon-bin-l"></i>
						</div>
						<div class="content">
							<span
							class="item"
							@click="selectKeywordToSearch(item.keywords)"
							v-for="(item, i) in searchHistorys"
							:key="i">
								{{ item.keywords }}
								<i
								@click.stop="removeSearchHistory(i)"
								class="iconfont icon-close-l"></i>
							</span>
						</div>
					</div>
					<div class="search-hot" v-if="searchHots[0]">
						<div class="title">
							<h4>热搜榜</h4>
						</div>
						<div class="content">
							<ul>
								<li
								@click="selectKeywordToSearch(item.searchWord)"
								v-for="(item, i) in searchHots" :key="i"
								:class="['item', 'item-'+(i+1)]">
									<div class="num">
										{{ i+1 }}
									</div>
									<div class="desc">
										<div class="name">
											<span class="word">{{ item.searchWord }}</span>
											<span class="score">{{ item.score }}</span>
											<span
											:class="['type', 'type'+item.iconType]"
											v-if="item.iconType">
												<img :src="item.iconUrl" alt="">
											</span>
										</div>
										<div class="info">{{ item.content }}</div>
									</div>
								</li>
							</ul>
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
				searchKeywords: "",
				searchPanelShow: false,
				searchHistorys: localStorage.getItem('search_history') || [],
				searchHots: []
			};
		},
		methods:{
			onClickInput() {
				this.searchPanelShow = true
				this.searchHot()
			},
			async searchHot(){
				const data = await this.$api.getSearchHotDetail()
				// console.log(data)
				if(data.code ===200) this.searchHots = data.data
			},
			// 通过搜索关键字触发搜索
			searchByKeyword(){
				if (this.searchKeywords) this.goSearchPage(this.searchKeywords)
			},
			// 跳转搜索页面
			goSearchPage(keywords){
				// 判断是否有过搜索记录——没有则追加
				let hasItem = false
				this.searchHistorys.forEach(function(item){
					if( item.keywords === keywords ){
						hasItem = true
					}
				})
				if( !hasItem ) this.searchHistorys.push({ keywords: keywords })
				// 存储浏览器缓存
				localStorage.setItem('search_historys', this.searchHistorys)
				// 跳转搜索页 清空关键词 关闭搜索面板
				this.$router.push({ path: '/search', query:{keywords} })
				this.searchPanelShow = false
			},
			// 清除所有历史搜索记录
			clearAllSearchHistory(){
				this.searchHistorys = []
				localStorage.setItem('search_historys', this.searchHistorys)
			},
			// 移除历史搜索关键字
			removeSearchHistory(index){
				this.searchHistorys.shift(index)
				localStorage.setItem('search_historys', this.searchHistorys)
			},
			// 选择关键字用于搜索
			selectKeywordToSearch(keywords){
				this.searchKeywords = keywords
				// this.$refs.searchInput.focus()
				this.goSearchPage(keywords)
			},
		}
	}
</script>

<style lang="scss">
	.search-container{
		position: relative;
		width: auto;
		height: 100%;
		.el-input{
			position: absolute;
			transform: translateY(-50%);
			top: 50%;
			height: 36px;
			line-height: 36px;
			width: 200px;
			margin: 0;
			padding: 0 5px;
			.el-input__inner{
				height: 100%;
				border: 0;
				border-radius: 36px;
				font-size: 10px;
				color: #fff0f0;
				background-color: #e13e3e;
				&::-webkit-input-placeholder { /* Chrome/Opera/Safari */ 
					color: #f9c5c5;
				}
				&::-moz-placeholder { /* Firefox 19+ */  
					color: #f9c5c5;
				}
				&::-ms-input-placeholder { /* IE 10+ */ 
					color: #f9c5c5;
				}
				&::-moz-placeholder { /* Firefox 18- */ 
					color: #f9c5c5;
				}
			}
			.el-input__suffix {
			    right: 10px;
			    transition: all .3s;
			}
			.el-input__suffix-inner{
				.el-input__icon{
					font-size: 14px;
					color: #fff;
				}
			}
			&:hover .el-input__suffix-inner .el-input__icon{
				color: #f9c5c5;
			}
		}
		.search-box{
			position: relative;
			top: 70px;
			width: 360px;
			height: 500px;
			padding: 15px 10px;
			background: #fff;
			box-shadow: 0 0 7px #eeee;
			overflow: hidden;
			overflow-y: auto;
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
			.main{
				width: 100%;
				height: auto;
				overflow: hidden;
				.history{
					margin: 0 0 10px;
					.title{
						width: 100%;
						height: 30px;
						line-height: 30px;
						h4{
							display: inline-block;
							margin: 0 10px;
							line-height: 30px;
							font-size: 17px;
							font-weight: normal;
							color: #333;
						}
						i.iconfont{
							display: inline-block;
							margin: 0 5px;
							vertical-align: bottom;
							font-size: 14px;
						}
						&:hover i.iconfont{
							color: #777;
						}
					}
					.content{
						margin: 10px 0;
						height: auto;
						span{
							display: inline-block;
							height: 20px;
							margin: 5px 10px;
							border: 1px solid #999;
							padding: 5px 15px;
							border-radius: 15px;
							line-height: 20px;
							font-size: 12px;
							i.iconfont{
								display: none;
								margin: 0 -5px 0 3px;
								font-size: 10px;
							}
							&:hover i.iconfont{
								display: inline-block;
							}
						}
					}
				}
				.search-hot{
					margin: 0 0 10px;
					.title{
						width: 100%;
						height: 30px;
						line-height: 30px;
						h4{
							display: inline-block;
							margin: 0 15px;
							font-size: 17px;
							font-weight: normal;
							color: #333;
							i.iconfont{
								margin: 0 5px;
								font-size: 20px;
							}
						}
					}
					.content{
						height: 0;
						width: 100%;
						ul{
							list-style: none;
							width: 100%;
							height: auto;
							margin: 0 0 20px;
							padding: 0;
							li.item{
								height: 40px;
								margin: 10px 0;
								padding-left: 50px;
								.num{
									float: left;
									width: 40px;
									height: 40px;
									margin-left: -50px;
									font-size: 16px;
									font-weight: bold;
									line-height: 40px;
									text-align: center;
									color: #999;
								}
								&.item-1 .num{
									color: #f56c6c;
								}
								&.item-2 .num{
									color: #67c23a;
								}
								&.item-3 .num{
									color: #409eff;
								}
								.desc{
									width: 100%;
									height: 40px;
									line-height: 20px;
									.name{
										height: 20px;
										font-size: 14px;
										font-weight: normal;
										color: #333;
										word-break: break-all;
										white-space: nowrap;
										text-overflow: ellipsis;
										overflow: hidden;
										.word{
											
										}
										.score{
											margin: 0 5px;
											font-size: 12px;
											font-style: italic;
											color: #bbb;
										}
										.type{
											display: inline-block;
											width: 30px;
											height: 15px;
											margin: 0 5px;
											font-size: 14px;
											font-weight: bold;
											font-style: italic;
											color: #999;
											img{
												width: auto;
												height: 100%;
											}
										}
									}
									.info{
										height: 20px;
										font-size: 12px;
										font-weight: normal;
										color: #aaa;
										word-break: break-all;
										white-space: nowrap;
										text-overflow: ellipsis;
										overflow: hidden;
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>
