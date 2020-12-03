<template>
	<div class="mv-picbox-container">
		<div class="items">
			<div
			class="item"
			v-for="(item, i) in data"
			:key="i">
				<router-link
				tag="div"
				:to="`/page/mv/`+item.id"
				class="pic-box">
					<div class="play-num">
						<i class="iconfont icon-video-l"></i>
							{{ item.playCount|formatNumber }}
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
					<div class="duration">
						{{ item.playTime|formatDate("mm:ss") }}
					</div>
				</router-link>
				<div class="desc">
					<router-link
					tag="div"
					:to="`/page/video/`+item.id"
					class="name">
						{{ item.name }}
					</router-link>
					<router-link
					tag="div"
					:to="`/page/artist/`+item.artistId"
					v-show="item.artistId"
					class="artists">
						by {{ item.artistName }}
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {formatDate, formatNumber} from '@/utils'
	
	export default{
		props: {
			data:{
				type: Array,
				required: true,
			}
		},
	}
</script>

<style lang="scss" scoped>
	.mv-picbox-container{
		position: relative;
		margin: 10px 0 0;
		border-radius: 7px;
		background: none;
		overflow: hidden;
		.items{
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr;
			grid-gap: 10px;
			.item{
				cursor: pointer;
				display: flex;
				flex-direction: column;
				width: auto;
				height: auto;
				min-height: 100px;
				padding: 5px 0;
				overflow: hidden;
				&:last-child{
					column-gap: 0;
				}
				.pic-box{
					flex-grow: 0;
					position: relative;
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
					img{
						width: 100%;
						height: 100%;
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
					.artists{
						float: left;
						position: absolute;
						left: 0;
						bottom: 0;
						padding: 3px 5px;
						font-size: 14px;
						color: #fff;
					}
					.duration{
						float: right;
						z-index: 999;
						position: absolute;
						left: 0;
						bottom: 0;
						padding: 1px 5px;
						font-size: 12px;
						color: #fff;
					}
				}
				.desc{
					flex-basis: 40px;
					line-height: 20px;
					bottom: 0;
					margin: 5px 0 0;
					font-size: 13px;
					.name{
						height: 20px;
						text-overflow: ellipsis;
						word-break: break-all;
						white-space: nowrap;
						overflow: hidden;
					}
					.artists{
						height: 20px;
						color: #999;
						text-overflow: ellipsis;
						word-break: break-all;
						white-space: nowrap;
						overflow: hidden;
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.mv-picbox-container{
		margin: 10px 0 0;
		.items{
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-gap: 10px;
			.item{
				padding: 0;
				.pic-box{
					.play-num{
						width: 90%;
						padding: 1px 3px;
						font-size: 10px;
					}
					.artists{
						padding: 1px 3px;
						font-size: 10px;
					}
					.duration{
						display: none;
					}
				}
				.desc{
					flex-basis: 32px;
					line-height: 16px;
					font-size: 10px;
					.name{
						height: 16px;
					}
					.artists{
						height: 16px;
					}
				}
			}
		}
	}
}
</style>
