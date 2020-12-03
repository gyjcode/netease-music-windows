<template>
	<div class="btn-default-container">
		<button>
			<i :class="['iconfont', icon]"></i>
			<div class="title">{{ title }}</div>
			<slot></slot>
		</button>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		name: 'BtnDefault',
		props: {
			title:{
				type: String,
				require: false
			},
			icon:{
				type: String,
				require: false
			}
		},
	}
</script>

<style lang="scss" scoped>
	.btn-default-container{
		display: inline-block;
		position: relative;
		button{
			cursor: pointer;
			outline: none;
			display: block;
			height: 34px;
			line-height: 28px;
			margin: auto;
			border: 1px solid #c9c9c9;
			border-radius: 30px;
			padding: 3px 15px;
			color: #333;
			background: #fff;
			&:hover{
				color: #000;
				background: #f9f9f9;
			}
			i{
				float: left;
				display: block;
				height: 26px;
				line-height: 26px;
				margin-right: 5px;
				font-size: 16px;
				overflow: hidden;
			}
			.title{
				display: inline-block;
				height: 20px;
				line-height: 20px;
				font-size: 14px;
				font-weight: normal;
			}
		}
	}
@media screen and (max-width: 540px) {
	.btn-default-container{
		button{
			height: 24px;
			line-height: 22px;
			border-radius: 22px;
			padding: 1px 9px;
			i{
				height: 20px;
				line-height: 20px;
				margin-right: 3px;
				font-size: 10px;
			}
			.title{
				height: 20px;
				line-height: 20px;
				font-size: 10px;
			}
		}
	}
}
</style>
