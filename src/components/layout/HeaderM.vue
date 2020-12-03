<template>
	<div class="header-m-container">
		<div
		class="sidebar"
		@click="changeSidebarShow"
		ref="sidebar">
			<i class="iconfont icon-menu-l"></i>
		</div>
		<Toggle
		:reserveDoms="[$refs.sidebar]"
		:show.sync="sidebarShow">
			<div
			v-show="sidebarShow"
			class="sidebar-box">
				<SidebarM @selectedItem="hideSidebar"></SidebarM>
			</div>
		</Toggle>
		<div class="menus">
			<router-link tag="div" to="/mine" class="item">
				<span>我的</span>
			</router-link>
			<router-link tag="div" to="/discover" class="item">
				<span>发现</span>
			</router-link>
			<router-link tag="div" to="/social" class="item">
				<span>朋友</span>
			</router-link>
			<router-link tag="div" to="/video" class="item">
				<span>视频</span>
			</router-link>
		</div>
		<div
		@click="searchShow = true"
		class="search">
			<i class="iconfont icon-search-l"></i>
		</div>
		<div class="search-box" v-show="searchShow">
			<div
			@click="searchShow = false"
			class="go-back">
				<i class="iconfont icon-arrow-left-l"></i>
			</div>
			<Search></Search>
		</div>
	</div>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	import Search from '@/components/base/Search.vue'
	import SidebarM from '@/components/layout/SidebarM.vue'
	
	export default {
		components:{
			Search,
			SidebarM
		},
		data(){
			return{
				sidebarShow: false,
				searchShow: false,
			}
		},
		methods:{
			...mapMutations('base', [
				'setMobileSidebarShow'
			]),
			changeSidebarShow(){
				this.sidebarShow = true
			},
			hideSidebar(item){
				console.log(item)
				this.sidebarShow = false
			}
		},
		computed:{
			...mapState('base', [
				'mobileSidebarShow'
			])
		},
	}
</script>

<style lang="scss" scoped>
	.header-m-container{
		position: relative;
		width: auto;
		height: 100%;
		.sidebar{
			float: left;
			position: relative;
			top: 0;
			width: 50px;
			height: 100%;
			i.iconfont{
				position: absolute;
				transform: translate(-50%, -50%);
				top: 50%;
				left: 50%;
				font-size: 20px;
			}
		}
		.menus{
			position: relative;
			transform: translateY(-50%);
			top: 50%;
			display: flex;
			justify-content: space-around;
			margin: 0 50px;
			padding: 0;
			.item{
				cursor: pointer;
				position: relative;
				width: auto;
				height: 32px;
				line-height: 32px;
				margin: 0;
				border-radius: 2px;
				padding: 0 10px;
				font-size: 13px;
				font-weight: normal;
				color: #555;
				background: none;
				overflow: hidden;
				span{
					display: block;
					height: 32px;
				}
				&.active{
					font-size: 15px;
					font-weight: bold;
					color: #333;
				}
			}
		}
		.search{
			float: right;
			position: absolute;
			top: 0;
			right: 0;
			width: 50px;
			height: 100%;
			i.iconfont{
				position: absolute;
				transform: translate(-50%, -50%);
				top: 50%;
				left: 50%;
				font-size: 16px;
			}
		}
		.search-box{
			position: absolute;
			top: 0;
			right: 0;
			width: 100%;
			height: calc(100% - 20px);
			padding: 10px 0;
			background: #fff;
			.go-back{
				float: left;
				z-index: 9999;
				position: relative;
				width: 50px;
				height: 100%;
				i.iconfont{
					position: absolute;
					transform: translate(-50%, -50%);
					top: 50%;
					left: 50%;
					font-size: 16px;
				}
			}
			/deep/.search-container{
				position: relative;
				width: calc(100% - 100px);
				height: 100%;
				padding: 0 50px;
				.search-input{
					position: relative;
					width: 100%;
					height: 100%;
					line-height: 1;
					margin: 0;
					padding: 0;
					background: none;
					&.el-input{
						background: none;
						.el-input__inner{
							height: 100%;
							border: 0;
							color: #999;
							border: 1px solid #999;
							font-size: 10px;
							color: #555;
							background: none;
							&::-webkit-input-placeholder { /* Chrome/Opera/Safari */ 
								color: #555;
							}
							&::-moz-placeholder { /* Firefox 19+ */  
								color: #555;
							}
							&::-ms-input-placeholder { /* IE 10+ */ 
								color: #555;
							}
							&::-moz-placeholder { /* Firefox 18- */ 
								color: #555;
							}
						}
						.el-input__suffix {
							position: absolute;
							height: 100%;
							line-height: 1;
						    right: 10px;
						    transition: all .3s;
						}
						.el-input__suffix-inner{
							float: left;
							position: relative;
							transform: translateY(-50%);
							margin: auto;
							top: 50%;
							.el-input__icon{
								display: inline;
								font-size: 15px;
								color: #555;
							}
						}
						&:hover .el-input__suffix-inner .el-input__icon{
							color: #333;
						}
					}
				}
				.toggle-container{
					position: absolute;
					width: 100%;
					margin: 10px 0;
				}
				.search-box{
					top: 0;
					width: calc(100% - 20px);
					height: 520px;
					margin: 0 -50px;
					padding: 10px;
				}
			}
		}
	}
</style>