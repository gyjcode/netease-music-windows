<template>
	<div class="discover-container">
		<div class="menu">
			<Menu></Menu>
		</div>
		<div
		ref="discoverScrollY"
		class="content">
			<div class="main">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	import Menu from '@/components/pages/discover/DiscoverMenu.vue'
	
	export default{
		components:{
			Menu
		},
		data(){
			return{
				scrollY: 0,
			};
		},
		mounted() {
			// console.log(this)
			this.$refs.discoverScrollY.addEventListener('scroll', ()=>{
				this.scrollY = this.$refs.discoverScrollY.scrollTop
			})
		},
		methods:{
			...mapMutations('base', [
				'setDiscoverScrollY'
			]),
		},
		computed:{
			...mapState('base', [
				'discoverScrollY'
			])
		},
		watch:{
			...mapMutations('base', [
				'setDiscoverScrollY'
			]),
			scrollY(){
				this.setDiscoverScrollY(this.scrollY)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.discover-container{
		position: relative;
		width: auto;
		height: 100%;
		overflow: hidden;
		.menu{
			z-index: 999999;
			display: block;
			position: fixed;
			width: 100%;
			height: 45px;
			line-height: 45px;
			padding: 10px 0;
			background: #fafafa;
		}
		.content{
			position: relative;
			width: auto;
			height: calc(100% - 120px);
			padding: 60px 30px;
			overflow: hidden;
			overflow-y: auto;
			&::-webkit-scrollbar{
				display: none;
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
				max-width: 1200px;
				margin: 0 auto;
			}
		}
	}
@media screen and (max-width: 540px) {
	.discover-container{
		.menu{
			top: -1px;
			height: 30px;
			line-height: 30px;
			padding: 5px 0;
		}
		.content{
			height: calc(100% - 60px);
			padding: 40px 15px;
			.main{
				max-width: 1200px;
				margin: 0 auto;
			}
		}
	}
}
</style>
