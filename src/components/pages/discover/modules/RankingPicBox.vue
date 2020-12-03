<template>
	<div class="ranking-picbox-container">
		<div class="content">
			<router-link 
			tag="div" 
			:to ="`/page/playlist/`+data.id"
			class="item">
				<div class="pic-box">
					<div class="play-num">
						<i class="iconfont icon-musical-note-l"></i>
						{{ data.playCount|formatNumber }} 
					</div>
					<el-image
					:src="data.picUrl + '?param=200y200'"
					fit="cover"
					:lazy="false">
						<div slot="placeholder" class="loading">
							<i class="el-icon-loading"></i>
						</div>
						<div slot="error" class="error">
							<i class="el-icon-picture-outline"></i>
						</div>
					</el-image>
					<div class="player">
						<i class="iconfont icon-player-start-l"></i>
					</div>
				</div>
				<div class="desc">
					{{ data.name }}
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
	import {formatNumber} from '@/utils'
	export default{
		props:{
			data:{
				type: Object,
				required: true
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			
		},
	}
</script>

<style lang="scss" scoped>
	.ranking-picbox-container{
		position: relative;
		margin: 0 0 20px;
		.content{
			.item{
				display: flex;
				flex-direction: column;
				width: auto;
				height: auto;
				min-height: 100px;
				padding: 15px 0;
				overflow: hidden;
				.pic-box{
					flex-grow: 1;
					position: relative;
					min-width: 100px;
					min-height: 100px;
					display: flex;
					.time{
						flex-grow: 1;
						border: 1px solid #eee;
						text-align: center;
						.time-box{
							position: relative;
							transform: translate(-50%, -50%);
							top: 50%;
							left: 50%;
							.week{
								font-size: 18px;
								color: #999;
							}
							.date{
								font-size: 100px;
								color: #c62f2f;
							}
						}
					}
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
					.player{
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
				}
				.desc{
					flex-basis: 40px;
					bottom: 0;
					margin: 5px 0 0;
					font-size: 14px;
					overflow: hidden;
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.ranking-picbox-container{
		margin: 0;
		.content{
			.item{
				padding: 0;
				.pic-box{
					min-width: 60px;
					min-height:60px;
					.time{
						display: none;
					}
					.play-num{
						width: 90%;
						padding: 0;
						font-size: 6px;
					}
					.player{
						padding: 0;
						i{
							font-size: 24px;
						}
					}
				}
				.desc{
					flex-basis: 30px;
					line-height: 15px;
					margin: 3px 0 0;
					font-size: 10px;
				}
			}
		}
	}
}
</style>
