<template>
	<div class="dj-tablelist-container">
		<div
		@dblclick="setPlaylistArr"
		v-for="(item, i) in data"
		class="item"
		:key="i">
			<div
			v-if="serialNumShow"
			class="num">
				{{ item.serialNum }}
			</div>
			<div class="pic">
				<i class="iconfont icon-player-start-c-s"></i>
				<img :src="item.picUrl + '?param==80y80'" alt="">
			</div>
			<div
			@click="playingCurrentSong(item)"
			class="title">
				{{ item.name }}
			</div>
			<div class="play-count">
				<i class="iconfont icon-player-start-c-l"></i>
				{{ item.listenerCount }}
			</div>
			<div class="liked-count">
				<i class="iconfont icon-thumb-l"></i>
				{{ item.likedCount }}
			</div>
			<div class="date">
				{{ item.createTime|formatDate('YYYY-MM-DD') }}
			</div>
			<div class="duration">
				{{ item.duration|formatDate('mm:ss') }}
			</div>
		</div>
	</div>
</template>

<script>
	// 导入公共函数库
	import {formatDate} from '@/utils'
	import {mapState, mapMutations} from 'vuex'
	
	export default{
		props:{
			data:{
				type: Array,
				required: true
			},
			serialNumShow: {
				type: Boolean,
				default: true,
				required: false
			}
		},
		methods:{
			...mapMutations('music',[
				'setCurrentSong',
				'setPlaylist'
			]),
			// 双击设置播放列表
			setPlaylistArr(){
				let playlist = []
				this.data.forEach((item)=>{
					playlist.push(item.mainSong)
				})
				// console.log(playlist)
				this.setPlaylist(playlist)
			},
			// 双击歌曲名播放当前歌曲
			playingCurrentSong(item){
				this.setCurrentSong(item.mainSong)
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
	.dj-tablelist-container{
		position: relative;
		.item{
			cursor: default;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			position: relative;
			width: auto;
			height: 80px;
			padding: 0;
			line-height: 80px;
			text-align: left;
			font-size: 13px;
			color: #999;
			background: #fff;
			&:nth-child(2n){
				background: #f9f9f9;
			}
			&:hover{
				background: #f0f1f2;
			}
			.num{
				flex: 0 0 60px;
				margin-left: 10px;
				height: 100%;
				text-align: center;
				line-height: 80px;
			}
			.pic{
				position: relative;
				flex: 0 0 60px;
				width: 60px;
				height: 60px;
				margin: 10px;
				border-radius: 5px;
				overflow: hidden;
				img{
					width: 100%;
					height: 100%;
				}
				i{
					position: absolute;
					transform: translate(-50%,-50%);
					top: 50%;
					left: 50%;
					font-size: 20px;
					color: #fff;
					&:hover{
						color: #c62f2f;
					}
				}
			}
			.title{
				cursor: pointer;
				flex-grow: 1;
				margin: 0 10px;
				text-align: left;
				font-size: 15px;
				color: #333;
				text-overflow: ellipsis;
				word-wrap: normal;
				word-break: break-all;
				white-space: nowrap;
				overflow: hidden;
			}
			.play-count{
				flex: 0 0 100px;
			}
			.liked-count{
				flex: 0 0 80px;
			}
			.date{
				flex: 0 0 100px;
			}
			.duration{
				flex: 0 0 60px;
			}
		}
	}
@media screen and (max-width: 540px) {
	.dj-tablelist-container{
		.item{
			height: 60px;
			line-height: 60px;
			font-size: 10px;
			.num{
				flex: 0 0 30px;
				margin-left: 5px;
				line-height: 60px;
			}
			.pic{
				flex: 0 0 40px;
				width: 40px;
				height: 40px;
				margin: 10px;
				border-radius: 5px;
				i{
					font-size: 15px;
				}
			}
			.title{
				margin: 0 5px;
				font-size: 13px;
			}
			.play-count{
				display: none;
			}
			.liked-count{
				display: none;
			}
			.date{
				flex: 0 0 90px;
			}
			.duration{
				display: none;
			}
		}
	}
}
</style>
