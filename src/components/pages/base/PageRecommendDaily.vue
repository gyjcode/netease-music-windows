<template>
	<div class="page-recommend-daily-container">
		<div class="header">
			<div class="time-box">
				<!-- <div class="week" v-text="nowWeek"></div> -->
				<div class="date" v-text="nowDate"></div>
			</div>
			<div class="text-box">
				<h1 class="title">
					每日歌曲推荐
				</h1>
				<div class="desc">
					根据你的口味生成，每天6:00更新
				</div>
			</div>
			<div class="btns">
				<BtnPlayAll class="btn" :playlist="tableData"></BtnPlayAll>
				<BtnDefault class="btn" title="收藏全部" icon="icon-collect-l"></BtnDefault>
			</div>
		</div>
		<div class="body">
			<!-- 歌曲列表 -->
			<TablePlaylist :data="tableData"></TablePlaylist>
		</div>
	</div>
</template>

<script>
	// 导入公共函数库
	import {createSong, formatDate} from '@/utils'
	import {mapState, mapMutations} from 'vuex'
	
	export default{
		components:{
			
		},
		data(){
			return{
				headerData: {},
				tableData: [],
				nowDate: new Date().getDate(),
				nowWeek: '星期一'
			};
		},
		created() {
			this.getNowTime()
			this.songListArr()
		},
		methods:{
			...mapMutations('music',[
				'setCurrentSong',
				'setPlaylist'
			]),
			getNowTime(){
				this.nowDate = new Date().getDate()
				const weekArr = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
				this.nowWeek =weekArr[new Date().getDay()]
			},
			// 获取音乐列表
			async songListArr(){
				// 头部信息
				const data = await this.$api.getRecommendSongs();
				// console.log(data)
				// 歌曲列表
				const playlist = data.data.dailySongs.map(function(dailySongs){
					return createSong({
						id: dailySongs.id,
						name: dailySongs.name,
						picUrl: dailySongs.al.picUrl,
						duration: dailySongs.dt,
						artists: dailySongs.ar.map((ar)=>{
									return {
										id: ar.id,
										name: ar.name,
										picUrl: ar.picUrl
									}
								}),
						albumId: dailySongs.al.id,
						albumName: dailySongs.al.name,
						albumPicUrl: dailySongs.al.picUrl,
					})
				} )
				this.tableData = playlist
			},
		},
		computed:{
			...mapState('music', [
				'currentSong',
				'playlist'
			])
		},
	}
</script>

<style lang="scss" scoped>
	.page-recommend-daily-container{
		cursor: default;
		position: relative;
		height: 100%;
		background: #fafafa;
		overflow: hidden;
		overflow-y: auto;
		&::-webkit-scrollbar{
			display: block;
			width: 7px;
			height: 7px;
		}
		&::-webkit-scrollbar-thumb{
			border-radius: 14px;
			background: #7777;
		}
		&::-webkit-scrollbar-thumb:hover{
			background: #9999;
		}
		&::-webkit-scrollbar-track{
			border-right: 0px solid #7777;
			background: none;
		}
		.header{
			position: relative;
			width: auto;
			height: auto;
			padding: 30px 30px 10px;
			overflow: hidden;
			.time-box{
				float: left;
				position: relative;
				width: 60px;
				height: 50px;
				border: 4px solid #ec4141;
				border-radius: 15px;
				padding: 5px;
				text-align: center;
				background: #fff;
				&::before{
					content: "";
					display: block;
					position: absolute;
					top: -8px;
					left: 15px;
					width: 4px;
					height: 12px;
					background: #ec4141;
				}
				&::after{
					content: "";
					display: block;
					position: absolute;
					top: -8px;
					right: 15px;
					width: 4px;
					height: 12px;
					background: #ec4141;
				}
				.week{
					height: 20px;
					line-height: 20px;
					font-size: 16px;
					color: #777;
				}
				.date{
					position: relative;
					height: 40px;
					line-height: 40px;
					margin-top: 10px;
					font-family: '微软雅黑';
					font-size: 32px;
					font-weight: bold;
					color: #ec4141;
					&::before{
						content: "";
						display: block;
						position: absolute;
						transform: translateX(-50%);
						top: -5px;
						left: 50%;
						width: 50px;
						height: 3px;
						border-radius: 6px;
						background: #ec4141;
						overflow: hidden;
					}
				}
			}
			.text-box{
				width: auto;
				height: 50px;
				line-height: 20px;
				margin-left: 100px;
				padding: 10px;
				.title{
					margin: 0;
					font-family: "微软雅黑";
					font-size: 20px;
					font-weight: bold;
					color: #333;
				}
				.desc{
					margin-top: 10px;
					font-size: 10px;
					color: #777;
				}
			}
			.btns{
				margin: 20px 0 0;
				.btn{
					float: left;
					display: inline-block;
					margin-right: 20px;
				}
			}
		}
		.body{
			position: relative;
			padding-bottom: 20px;
		}
	}
@media screen and (max-width: 540px) {
	.page-recommend-daily-container{
		&::-webkit-scrollbar{
			display: none;
		}
		.header{
			padding: 10px;
			.text-box{
				padding: 10px;
			}
			.btns{
				margin: 10px 0 0;
				.btn{
					margin-right: 10px;
				}
			}
		}
		.body{
			padding-bottom: 10px;
		}
	}
}
</style>
