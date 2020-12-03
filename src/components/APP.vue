<template>
	<div class="app-container">
		<Layout></Layout>
	</div>
</template>

<script>
	import Layout from '@/components/layout/index.vue'
	
	export default{
		data(){
			return{
				
			};
		},
		methods:{
			
		},
		components:{
			Layout
		}
	}
</script>

<style lang="scss" scoped>
	.app-container{
		display: block;
		position: relative;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		border: 0;
	}
</style>
