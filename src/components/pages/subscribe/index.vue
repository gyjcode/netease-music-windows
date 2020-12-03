<template>
	<div class="subscribe-container">
		<div class="menu">
			<Menu></Menu>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	 import Menu from '@/components/pages/subscribe/SubscribeMenu.vue'
	 
	 export default{
		 components: {
			Menu
		 },
		 data() {
			 return{
				 
			 }
		 },
		 methods: {
			
		}
	}
	 
</script>

<style lang="scss" scoped>
	.subscribe-container{
		position: relative;
	}
</style>
