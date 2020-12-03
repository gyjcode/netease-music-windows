<template>
	<div class="layout">
		
		<div class="header">
			<Header class="pc"></Header>
			<HeaderM class="mobile"></HeaderM>
		</div>
		
		<div class="body">
			<Sidebar class="pc"></Sidebar>
			<Main></Main>
			<Player></Player>
			<PlayList></PlayList>
			<LoginPopup
			v-show="loginPopupShow"></LoginPopup>
		</div>
		
		<div class="footer">
			<Footer></Footer>
		</div>
		
		<PlayLyric></PlayLyric>
		
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	
	import Header from './Header.vue'
	import Sidebar from './Sidebar.vue'
	import Main from './Main.vue'
	import Footer from './Footer.vue'
	import HeaderM from './HeaderM.vue'
	
	import Player from '@/components/base/Player.vue'
	import PlayList from '@/components/base/PlayList.vue'
	import PlayLyric from '@/components/base/PlayLyric.vue'
	import LoginPopup from '@/components/base/LoginPopup.vue'
	
	export default{
		components:{
			Header,
			Sidebar,
			Main,
			Footer,
			HeaderM,
			
			Player,
			PlayList,
			PlayLyric,
			LoginPopup
		},
		data(){
			return{
				
			};
		},
		methods:{
			
		},
		computed:{
			...mapState('user',[
				'loginPopupShow'
			])
		}
	}
</script>

<style lang="scss" scoped>
	.layout{
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		border: 0;
		overflow: hidden;
		.header{
			z-index: 999;
			position: fixed;
			top: 0;
			width: 100%;
			height: 60px;
			.mobile{
				display: none;
			}
		}
		.body{
			margin: 60px 0;
			height: calc(100% - 130px);
			overflow: hidden;
			overflow-y: auto;
		}
		.footer{
			z-index: 999;
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 70px;
		}
	}
@media screen and (max-width: 540px) {
	.layout{
		.header{
			height: 50px;
			.pc{
				display: none;
			}
			.mobile{
				display: block;
			}
		}
		.body{
			margin: 50px 0;
			height: calc(100% - 100px);
			.pc{
				display: none;
			}
		}
		.footer{
			height: 50px;
		}
	}
}
</style>
