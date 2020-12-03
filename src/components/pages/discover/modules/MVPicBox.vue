<template>
	<div class="mv-recommend-container">
		<div class="content">
			<div class="item" v-for="(item, i) in mvArr" :key="i">
				<router-link
				tag="div"
				:to="`/page/mv/` + item.id"
				class="pic-box">
					<div class="tips">
						{{ item.copywriter }}
					</div>
					<div class="play-num">
						<i class="iconfont icon-video-l"></i>
						{{ Math.ceil(item.playCount/10000) }} 万
					</div>
					<el-image
					:src="item.picUrl + '?param=250y140'"
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
					<div class="name">{{ item.name }}</div>
					<div class="artist">{{ item.artistName }}</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				mvName: '推荐 MV',
				mvArr: [],
			}
		},
		methods:{
			async mvRecommend(){
				const data = await this.$api.getMVRecommend();
				this.mvArr = data.result
			}
		},
		created() {
			this.mvRecommend()
		}
	}
</script>

<style lang="scss" scoped>
	.mv-recommend-container{
		position: relative;
		margin: 0 0 20px;
		.content{
			display: grid;
			grid-template-columns: 23.5% 23.5% 23.5% 23.5%;
			grid-gap: 1.5%;
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
					flex-grow: 1;
					position: relative;
					min-width: 100px;
					min-height: 100px;
					display: flex;
					.play-num{
						float: right;
						z-index: 99;
						display: block;
						position: absolute;
						right: 0;
						top: 0;
						width: 50%;
						text-align: right;
						padding: 3px 5px;
						font-size: 12px;
						color: #fff;
						background: #0606065c;
						//background-image: linear-gradient(to left,#0606065c, #00000000);
						background: -webkit-gradient(linear,left top,right top,from(#00000000),to(#0606065c)) no-repeat;
						background: -webkit-linear-gradient(left,#00000000,#0606065c) no-repeat;
						background: linear-gradient(90deg,#00000000,#0606065c) no-repeat;
					}
					&:hover .play-num{
						display: none;
					}
					.tips{
						float: left;
						z-index: 999;
						display: none;
						position: absolute;
						top: 0;
						padding: 3px 5px;
						font-size: 12px;
						color: #fff;
						background-color: #0606065c;
					}
					&:hover .tips{
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
					.name{
						width: 100%;
						text-overflow: ellipsis;
						word-break: break-all;
						white-space: nowrap;
						overflow: hidden;
					}
					.artist{
						color: #999;
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.mv-recommend-container{
		position: relative;
		margin: 0;
		.content{
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: 10px;
			.item{
				min-height: 60px;
				padding:  0;
				.pic-box{
					flex-grow: 0;
					min-width: 60px;
					min-height: 60px;
					display: flex;
					.play-num{
						padding: 1px 3px;
						font-size: 10px;
					}
					.tips{
						padding: 1px 3px;
						font-size: 10px;
					}
				}
				.desc{
					flex-basis: 36px;
					margin: 0;
					.name{
						height: 20px;
						line-height: 20px;
						font-size: 12px;
					}
					.artist{
						height: 16px;
						line-height: 16px;
						font-size: 10px;
					}
				}
			}
		}
	}
}
</style>
