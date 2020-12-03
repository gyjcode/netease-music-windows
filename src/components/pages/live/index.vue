<template>
	<div class="live-container">
		<div class="main">
			<div class="nodata">
				抱歉，暂无直播数据
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss" scoped>
	.live-container{
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
			max-width: 1200px;
			margin: 0 auto;
		}
		.nodata{
			position: absolute;
			transform: translate(-50%, -50%);
			top: 50%;
			left: 50%;
			font-size: 36px;
			color: #999;
		}
	}
</style>
