<template>
	<div class="history-container">
		<span :class="['back', {active: backActive}]" @click="back">
			<i class="iconfont icon-arrow-left-l"></i>
		</span>
		<span :class="['forward', {active: forwardActive}]" @click="forward">
			<i class="iconfont icon-arrow-right-l"></i>
		</span>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				backActive: window.history.length,
				forwardActive: window.history.length,
			};
		},
		methods:{
			back(){
				this.$router.back()
			},
			forward(){
				this.$router.forward()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.history-container{
		position: relative;
		transform: translate(0, -50%);
		top: 50%;
		&:after{
			content: '';
			clear: both;
			display: block;
			overflow: hidden;
		}
		span{
			float: left;
			cursor: pointer;
			display: block;
			width: 24px;
			height: 24px;
			line-height: 24px;
			margin: 5px;
			border-radius: 50%;
			color: #cd4949;
			font-size: 24px;
			text-align: center;
			background-color: #d93b3b;
			&:active{
				color: #901c1c;
				background-color: #d93b3b;
			}
			i{
				display: block;
				width: 100%;
				height: 100%;
				font-size: 10px;
			}
		}
		.active{
			color: #fff;
		}
		.back{
			
		}
		.forward{
			
		}
	}
</style>
