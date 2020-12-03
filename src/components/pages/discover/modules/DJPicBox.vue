<template>
	<div class="dj-picbox-container">
		<div class="content">
			<div
			class="item"
			v-for="(item, i) in data"
			:key="i">
				<router-link
				tag="div"
				:to="`/page/dj/`+item.id"
				class="pic-box"
				:style="'flex-basis:'+flexBasis+'px'"
				ref="picBox">
					<div class="main">
						<div class="name">
							{{ item.name }}
						</div>
						<el-image
						:src="item.picUrl + '?param=200y200'"
						fit="cover"
						:lazy="false">
							<div slot="placeholder" class="loading">
								<i class="el-icon-loading"></i>
							</div>
							<div slot="error" class="error">
								<i class="el-icon-picture-outline"></i>
							</div>
						</el-image>
					</div>
				</router-link>
				
				<router-link
				tag="div"
				:to="`/page/dj/`+item.id"
				class="rcmd-text">
					{{ item.rcmdText }}
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			data:{
				type: Array,
				required: true
			}
		},
		data(){
			return{
				flexBasis: 175
			}
		},
		updated(){    // mounted 无法找到使用了 v-if、v-show 或者 v-for 渲染的 DOM 节点
			// console.log(this)
			if(this.$refs.picBox) this.flexBasis = this.$refs.picBox[0].$el.offsetWidth
			window.addEventListener('resize', () => {
				this.flexBasis = this.$refs.picBox[0].$el.offsetWidth
			}, false);
		},
	}
</script>

<style lang="scss" scoped>
	.dj-picbox-container{
		position: relative;
		.content{
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
			grid-gap: 15px;
			width: 100%;
			.item{
				display: flex;
				flex-direction: column;
				width: auto;
				height: auto;
				min-height: 100px;
				padding: 10px 0;
				overflow: hidden;
				.pic-box{
					cursor: pointer;
					display: flex;
					position: relative;
					min-width: 100px;
					min-height: 100px;
					border-radius: 7px;
					overflow: hidden;
					.name{
						z-index: 999;
						display: block;
						position: absolute;
						left: 0;
						bottom: 0;
						height: 20px;
						width: 100%;
						padding: 3px 5px;
						font-size: 12px;
						color: #fff;
						white-space: nowrap;
						word-break: break-word;
						text-overflow: ellipsis;
						overflow: hidden;
					}
					.el-image{
						position: relative;
						width: 100%;
						height: 100%;
						background: #f1f1f1;
						img{
							width: 100%;
							height: 100%;
						}
						.error, .loading{
							position: absolute;
							transform: translate(-50%, -50%);
							top: 50%;
							left: 50%;
							font-size: 30px;
							color: #999;
						}
					}
				}
				.rcmd-text{
					cursor: pointer;
					flex-basis: 36px;
					bottom: 0;
					line-height: 18px;
					margin: 5px 0 0;
					font-size: 13px;
					text-align: justify;
					text-overflow: ellipsis;
					word-wrap: break-word;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.dj-picbox-container{
		position: relative;
		.content{
			grid-template-columns: 1fr 1fr 1fr;
			grid-gap: 10px;
			.item{
				padding: 0;
				.pic-box{
					min-width: 60px;
					min-height: 60px;
					.name{
						height: 20px;
						width: 100%;
						padding: 1px 3px;
						font-size: 10px;
					}
				}
				.rcmd-text{
					flex-basis: 32px;
					line-height: 16px;
					font-size: 13px;
				}
			}
		}
	}
}
</style>
