<!-- 全局 TablePlaylist 组件 : 默认歌曲列表 -->
<template>
	<div class="radio-container">
		<div class="radio-group">
			<div
			class="radio"
			v-for="(radio, i) in data"
			:key="i">
				<div
				:class="['ring', selected === radio ? 'selected' : '']"
				@click="toggleCheck(radio)"></div>
				<div class="tip" v-html="radio.tip"></div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {	
		name: 'Radio',
		props: {
			data: {
				type: Array,
				required: true
			},
			default:{
				type: String|Object,
				required: false,
			},
		},
		data(){
			return{
				selected: this.default || this.data[0],
			}
		},
		methods:{
			toggleCheck(radio){
				this.selected = radio
				this.$emit('selected', radio)
			}
		}
	}
</script>

<style lang="scss" scoped>
.radio-container{
	position: relative;
	margin: 10px 0;
	.radio-group{
		.radio{
			position: relative;
			margin: 5px 0;
			.ring{
				float: left;
				width: 14px;
				height: 14px;
				margin-right: 10px;
				border: 1px solid #ccc;
				border-radius: 50%;
				&.selected{
					position: relative;
					border: 1px solid #ec4141;
					background: #ec4141;
					&:after{
						content: '';
						position: absolute;
						width: 10px;
						height: 10px;
						border: 2px solid #fff;
						border-radius: 50%;
						background: #ec4141;
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
	}
}
@media screen and (max-width: 540px) {
	.radio-container{
		margin: 5px 0;
		.radio-group{
			.radio{
				margin: 3px 0;
				.ring{
					width: 12px;
					height: 12px;
					margin-right: 5px;
					&.selected{
						&:after{
							width: 8px;
							height: 8px;
							border: 2px solid #fff;
						}
					}
				}
				.tip{
					margin-left: 15px;
					font-size: 10px;
					/deep/span{
						display: none;
					}
				}
			}
		}
	}
}
</style>
