<template>
	<div class="banner-card-container">
		<el-carousel
		:autoplay="false"
		:interval="4000"
		:height="bannerHeight+'px'"
		ref="banner"
		type="card">
			<el-carousel-item
			ref="bannerItem"
			v-for="(item, i) in data"
			:key="i">
				<el-image
				:src="item.picUrl + '?param540y200'"
				fit="cover"
				:lazy="false">
					<div slot="placeholder" class="loading">
						<i class="el-icon-loading"></i>
					</div>
					<div slot="error" class="error">
						<i class="el-icon-picture-outline"></i>
					</div>
				</el-image>
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
	export default{
		name: 'Banner',
		props:{
			data:{
				type: Array,
				required: true
			}
		},
		data(){
			return{
				bannerHeight: 200
			}
		},
		updated(){    // mounted 无法找到使用了 v-if、v-show 或者 v-for 渲染的 DOM 节点
			// console.log(this)
			if(this.$refs.bannerItem.length) this.bannerHeight = this.$refs.bannerItem[0].$el.offsetWidth/520*200
			window.addEventListener('resize', () => {
				if(this.$refs.bannerItem[0].$el) this.bannerHeight = this.$refs.bannerItem[0].$el.offsetWidth/520*200
			}, false);
		},
		methods:{
			
		},
	}
</script>

<style lang="scss" scoped>
	.banner-card-container{
		position: relative;
		margin: 20px 0;
		/deep/.el-carousel{
			width: 100%;
			height: auto;
			.el-carousel__indicators{
				&.el-carousel__indicators--outside{
					bottom: 5px;
				}
				.el-carousel__button{
					width: 6px;
					height: 6px;
					border-radius: 50%;
				}
				.is-active{
					.el-carousel__button{
						background: #ec4141;
					}
				}
			}
		}
		.el-image{
			position: relative;
			width: 100%;
			height: 100%;
			border-radius: 7px;
			background: #f1f1f1;
			overflow: hidden;
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
@media screen and (max-width: 540px) {
	.banner-card-container{
		position: relative;
		margin: 5px 0;
		/deep/.el-carousel{
			position: relative;
			.el-carousel__container{
				.el-carousel__item{
					&.el-carousel__item--card{
						transform: translateX(0) scale(1)!important;
						width: 100%;
					}
				}
			}
			.el-carousel__container{
				position: relative;
				overflow: hidden;
				&::after{
					clear: both;
					content: "";
					display: block;
					height: 0;
					overflow: hidden;
					visibility: hidden;
				}
			}
			.el-carousel__indicators{
				position: absolute;
				transform: translateX(-50%);
				left: 50%;
				bottom: 0;
				&.el-carousel__indicators--outside{
					bottom: 0;
				}
				.el-carousel__indicator{
					padding: 5px 3px;
				}
				.el-carousel__button{
					width: 6px;
					height: 6px;
					border-radius: 50%;
				}
				.is-active{
					.el-carousel__button{
						background: #ec4141;
					}
				}
			}
		}
	}
}
</style>
