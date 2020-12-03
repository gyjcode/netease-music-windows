<template>
	<div class="playlist-recommend-container">
		<div class="content">
			<router-link
			tag="div"
			to="/page/recommend/daily"
			class="item">
				<div
				class="pic-box"
				:style="'height:'+ picBoxHeight"
				ref="picBox">
					<div class="tips">
						根据您的口味生成每日更新
					</div>
					<div class="time">
						<div class="time-box">
							<div class="week" v-text="nowWeek"></div>
							<div class="date" v-text="nowDate"></div>
						</div>
					</div>
				</div>
				
				<div class="desc">
					每日歌曲推荐
				</div>
			</router-link>
			<router-link 
			tag="div" 
			:to ="`/page/playlist/`+item.id"
			class="item" 
			v-for="(item, i) in songsArr" 
			:key="i">
				<div
				class="pic-box"
				:style="'height:'+ picBoxHeight"
				ref="picBox">
					<div class="tips">
						{{ item.copywriter }}
					</div>
					<div class="play-num">
						<i class="iconfont icon-musical-note-l"></i>
						{{ item.playCount|formatNumber(0) }}
					</div>
					<el-image
					:src="item.picUrl + '?param=300y300'"
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
					{{ item.name }}
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
	import {formatNumber} from '@/utils'
	
	export default{
		data(){
			return{
				picBoxHeight: null,
				songsName: '推荐歌单',
				songsArr: [],
				nowDate: new Date().getDate(),
				nowWeek: '星期一'
			}
		},
		created() {
			this.getNowTime()
			this.songListRecommend()
		},
		updated(){    // mounted 无法找到使用了 v-if、v-show 或者 v-for 渲染的 DOM 节点
			if(this.$refs.picBox.lenght) this.picBoxHeight = this.$refs.picBox[0].offsetWidth +'px'
			window.addEventListener('resize', () => {
				this.picBoxHeight = this.$refs.picBox[0].offsetWidth +'px'
			}, false);
		},
		methods:{
			getNowTime(){
				this.nowDate = new Date().getDate()
				const weekArr = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
				this.nowWeek =weekArr[new Date().getDay()]
			},
			async songListRecommend(){
				const data = await this.$api.getSongListRecommend(9);
				// console.log(data)
				this.songsArr = data.result
			}
		},
	}
</script>

<style lang="scss" scoped>
	.playlist-recommend-container{
		position: relative;
		margin: 0 0 20px;
		.content{
			display: grid;
			grid-template-columns: 18.5% 18.5% 18.5% 18.5% 18.5%;
			grid-gap: 1.5%;
			.item{
				cursor: pointer;
				display: flex;
				flex-direction: column;
				width: auto;
				height: auto;
				min-height: 100px;
				padding: 15px 0;
				overflow: hidden;
				.pic-box{
					display: flex;
					flex-grow: 0;
					position: relative;
					min-width: 100px;
					min-height: 100px;
					border-radius: 7px;
					overflow: hidden;
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
								font-size: 80px;
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
						text-overflow: ellipsis;
						word-break: break-all;
						white-space: nowrap;
						color: #fff;
						background: #0606065c;
						//background-image: linear-gradient(to left,#0606065c, #00000000);
						background: -webkit-gradient(linear,left top,right top,from(#00000000),to(#0606065c)) no-repeat;
						background: -webkit-linear-gradient(left,#00000000,#0606065c) no-repeat;
						background: linear-gradient(90deg,#00000000,#0606065c) no-repeat;
						overflow: hidden;
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
					line-height: 20px;
					margin: 5px 0 0;
					font-size: 14px;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-overflow: ellipsis;
					word-break: break-all;
					overflow: hidden;
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.playlist-recommend-container{
		position: relative;
		margin: 0 0 20px;
		.content{
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			grid-gap: 10px;
			.item{
				padding: 0;
				&:last-child{
					display: none;
				}
				.pic-box{
					.time{
						.time-box{
							.week{
								font-size: 15px;
							}
							.date{
								font-size: 60px;
							}
						}
					}
					.play-num{
						width: 80%;
						height: 20px;
						padding: 1px 3px;
						font-size: 10px;
					}
					.tips{
						padding: 1px 2px;
						font-size: 10px;
					}
					.player{
						padding: 1px 3px;
						i{
							font-size: 24px;
						}
					}
				}
				.desc{
					flex-basis: 30px;
					line-height: 15PX;
					margin: 3px 0 0;
					font-size: 10px;
				}
			}
		}
	}
}
</style>
