<template>
	<div class="mv-exclusive-container">
		<div class="content">
			<div
			class="item"
			v-for="(item, i) in mvArr"
			:key="i">
				<router-link
				tag="div"
				:to="`/page/mv/` + item.id"
				class="pic-box">
					<div class="ico-video">
						<i class="iconfont icon-video-l"></i>
					</div>
					<el-image
					:src="item.picUrl + '?param=400y240'"
					fit="cover"
					:lazy="false">
						<div slot="placeholder" class="loading">
							<i class="el-icon-loading"></i>
						</div>
						<div slot="error" class="error">
							<i class="el-icon-picture-outline"></i>
						</div>
					</el-image>
				</router-link>
				
				<router-link
				tag="div"
				:to="`/page/mv/` + item.id"
				class="desc">
					{{ item.name }}
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				mvName: '独家放送',
				mvArr: []
			};
		},
		methods:{
			async mvExclusive(){
				const data = await this.$api.getMVExclusive();
				this.mvName = data.name
				this.mvArr = data.result
			}
		},
		created() {
			this.mvExclusive()
		}
		
	}
</script>
<style lang="scss" scoped>
	.mv-exclusive-container{
		position: relative;
		margin: 0 0 20px;
		.content{
			display: grid;
			grid-template-columns: 32% 32% 32%;
			grid-gap: 1.33%;
			.item{
				display: flex;
				flex-direction: column;
				width: auto;
				height: auto;
				min-height: 100px;
				padding: 15px 0;
				overflow: hidden;
				.pic-box{
					cursor: pointer;
					flex-grow: 0;
					position: relative;
					min-width: 100px;
					min-height: 100px;
					display: flex;
					.ico-video{
						float: right;
						z-index: 999;
						display: none;
						position: absolute;
						right: 0;
						bottom: 0;
						padding: 3px 5px;
						i{
							font-size: 36px;
							color: #eee;
						}
					}
					&:hover .player{
						display: block;
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
				.desc{
					cursor: pointer;
					flex-basis: 40px;
					bottom: 0;
					margin: 5px 0 0;
					font-size: 14px;
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.mv-exclusive-container{
		position: relative;
		margin: 0 0 10px;
		.content{
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			grid-gap: 10px;
			.item{
				min-height: 60px;
				padding: 0;
				.pic-box{
					min-width: 60px;
					min-height: 60px;
					.ico-video{
						padding: 1px 3px;
						i{
							font-size: 24px;
						}
					}
				}
				.desc{
					display: none;
				}
			}
		}
	}
}
</style>
