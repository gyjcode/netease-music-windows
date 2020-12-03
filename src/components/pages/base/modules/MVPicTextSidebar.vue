<template>
	<div class="mv-pictext-sidebar-container">
		<div class="items">
			<div
			class="item"
			v-for="(item, i) in data"
			:key="i">
				<router-link
				tag="div"
				:to="`/page/mv/`+item.id"
				class="pic-box">
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
					<div class="play-num">
						{{ item.playCount|formatNumber }}
					</div>
					<div class="play-time">
						{{ item.playTime|formatDate('mm:ss') }}
					</div>
				</router-link>
				<div class="text-box">
					<router-link
					tag="div"
					:to="`/page/mv/`+item.id"
					class="name">
						{{ item.name }}
					</router-link>
					<router-link
					tag="div"
					:to="`/page/artist/`+item.artistId"
					class="artist">
						by {{ item.artistName }}
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {formatNumber, formatDate} from'@/utils'
	export default{
		props:{
			data:{
				type: Array,
				required: true
			},
		},
	}
</script>

<style lang="scss" scoped>
	.mv-pictext-sidebar-container{
		position: relative;
		.items{
			.item{
				cursor: default;
				display: block;
				position: relative;
				width: auto;
				height: 80px;
				margin: 10px 0;
				.pic-box{
					cursor: pointer;
					float: left;
					display: block;
					position: relative;
					width: 140px;
					height: 80px;
					overflow: hidden;
					.el-image{
						position: absolute;
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
					}
					.play-time{
						float: right;
						z-index: 99;
						display: block;
						position: absolute;
						right: 0;
						bottom: 0;
						width: 50%;
						text-align: right;
						padding: 3px 5px;
						font-size: 12px;
						color: #fff
					}
				}
				.text-box{
					cursor: pointer;
					display: block;
					width: auto;
					height: 60px;
					margin-left: 150px;
					padding: 10px 0;
					overflow: hidden;
					line-height: 20px;
					.name{
						height: 40px;
						font-size: 14px;
						word-break: break-all;
						text-overflow: ellipsis;
						overflow: hidden;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
					.artist{
						font-size: 12px;
						color: #999;
						word-break: break-all;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}
				}
			}
		}
	}
</style>
