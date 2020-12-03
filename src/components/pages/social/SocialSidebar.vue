<template>
	<div class="social-sidebar-container">
		<SidebarLogin></SidebarLogin>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import SidebarLogin from '@/components/pages/social/modules/SidebarLogin.vue'
	
	export default{
		components:{
			SidebarLogin
		},
		data(){
			return{
				
			}
		},
		methods:{
			
		},
		computed:{
			...mapState('user',[
				'loginUser'
			])
		}
	}
</script>

<style>
	.social-sidebar-container{
		position: relative;
		margin: 0;
		padding: 0;
	}
</style>
