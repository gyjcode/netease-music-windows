<template>
	<div class="download-container">
		<Title title="下载管理"></Title>
		<div class="menu">
			<Menu></Menu>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	 import Menu from '@/components/pages/download/DownloadMenu.vue'
	 
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
	.download-container{
		position: relative;
		margin: 0 30px;
		/deep/.title-container{
			height: 30px;
			line-height: 30px;
			margin: 15px 0 5px;
			h3{
				font-size: 20px;
				font-weight: bold;
			}
			span{
				font-size: 12px;
				margin: 0 10px;
				color: #777;
			}
		}
	}
</style>
