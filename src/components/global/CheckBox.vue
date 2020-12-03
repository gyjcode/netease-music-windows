<!-- 全局 TablePlaylist 组件 : 默认歌曲列表 -->
<template>
	<div class="checkbox-container">
		<div
		:class="['box', checked ? 'checked' : '']"
		@click="toggleCheck"></div>
		<div class="tip" v-html="tip"></div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {	
		name: 'CheckBox',
		props: {
			default:{
				type: Boolean,
				required: false,
				default: false
			},
			tip:{
				type: String,
				required: false,
			},
		},
		data(){
			return{
				checked: this.default,
			}
		},
		methods:{
			toggleCheck(){
				this.checked = !this.checked
				this.$emit('checked', this.checked)
			}
		}
	}
</script>

<style lang="scss" scoped>
.checkbox-container{
	position: relative;
	margin: 10px 0;
	.box{
		float: left;
		width: 14px;
		height: 14px;
		margin-right: 10px;
		border: 1px solid #ccc;
		border-radius: 3px;
		&.checked{
			position: relative;
			border: 1px solid #ec4141;
			background: #ec4141;
			&:after{
				content: '';
				position: absolute;
				transform: rotate(45deg);
				right: 4px;
				bottom: 3px;
				width: 3px;
				height: 9px;
				border: 1px solid #fff;
				border-top-color: transparent;
				border-left-color: transparent;
			}
		}
	}
	.tip{
		margin-left: 20px;
		font-size: 12px;
		color: #555;
		/deep/span{
			margin-left: 5px;
			color: #999;
		}
	}
}
@media screen and (max-width: 540px) {
	.checkbox-container{
		margin: 5px 0;
		.box{
			width: 12px;
			height: 12px;
			margin-right: 5px;
			&.checked{
				position: relative;
				border: 1px solid #ec4141;
				background: #ec4141;
				&:after{
					right: 3px;
					bottom: 3px;
					width: 2px;
					height: 7px;
				}
			}
		}
		.tip{
			margin-left: 15px;
			font-size: 10px;
			color: #555;
			/deep/span{
				display: none;
			}
		}
	}
}
</style>
