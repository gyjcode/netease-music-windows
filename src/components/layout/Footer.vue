<template>
	<div class="footer-container">
		<PlayerMin></PlayerMin>
	</div>
</template>

<script>
	import PlayerMin from '@/components/base/PlayerMin.vue'
	
	export default{
		components:{
			PlayerMin
		},
	}
</script>

<style lang="scss" scoped>
	.footer-container{
		height: 100%;
		width: 100%;
		border-top: 1px solid #e1e1e1;
		background-color: #fafafa;
	}
</style>