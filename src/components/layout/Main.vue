<template>
	<div class="main-container">
		<div class="content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			};
		},
		methods:{
			
		},
	}
</script>

<style lang="scss" scoped>
	.main-container{
		position: relative;
		width: auto;
		height: 100%;
		margin: 0 auto;
		margin-left: 201px;
		border: 0;
		padding: 0;
		background: #fafafa;
		overflow: hidden;
		.content{
			position: relative;
			transform: translate(-50%, 0);
			left: 50%;
			width: auto;
			height: 100%;
			overflow: hidden;
		}
	}
@media screen and (max-width: 540px) {
	.main-container{
		margin: 0 auto;
		.content{
			
		}
	}
}
</style>
