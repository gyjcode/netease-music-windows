<template>
	<div class="search-container">
		<div class="main">
			<div class="header">
				<div class="count-msg">
					<!-- 搜索 <span>"{{ keywords }}"</span>, -->
					{{ countMsg }}
				</div>
				<div class="menus">
					<Menu @typeChange="getSearchType"></Menu>
				</div>
			</div>
			<div class="body">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import Menu from '@/components/pages/search/SearchMenu.vue'
	
	export default{
		components:{
			Menu
		},
		provide() {
			return {
				searchRoot: this
			}
		},
		data(){
			return{
				keywords: this.$route.query.keywords,
				limit: 30,
				type: this.$route.query.type ? this.$route.query.type : 1,
				countMsg: ''
			};
		},
		methods:{
			// 获取点击类型
			getSearchType(type){
				this.type = type
			},
		},
		watch:{
			$route:{
				handler(newVal, oldVal){
					this.keywords = this.$route.query.keywords
					this.type = this.$route.query.type ? this.$route.query.type : 1
				},
				deep: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-container{
		cursor: default;
		display: block;
		position: relative;
		width: auto;
		height: 100%;
		margin: 0 auto;
		overflow: hidden;
		overflow-y: auto;
		&::-webkit-scrollbar{
			width: 9px;
			height: 9px;
		}
		&::-webkit-scrollbar-thumb{
			border-radius: 18px;
			background: #7777;
		}
		&::-webkit-scrollbar-thumb:hover{
			background: #9999;
		}
		&::-webkit-scrollbar-track{
			border-right: 0px solid #7777;
			background: none;
		}
		.main{
			margin: 0 auto;
		}
		.header{
			margin: 20px 0 0;
			.menus{
				/deep/.menu{
					padding: 0 30px;
				}
			}
			.count-msg{
				margin: 15px 30px;
				font-size: 18px;
				color: #333;
				font-weight: bold;
				span{
					color: #0c73c2;
				}
			}
			.menus{
				margin: 15px 0 0;
			}
		}
		.body{
			width: auto;
			height: auto;
			margin: 10px 0;
			padding: 0;
			border: 0;
		}
	}
</style>
