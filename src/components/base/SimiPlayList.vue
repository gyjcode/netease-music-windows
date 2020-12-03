<template>
	<div class="song-list-news" v-show="playListArr[0]">
		<div class="title">
			<h3>{{ playListName }}</h3>
		</div>
		<div class="content" >
			<div 
			:class="['item', 'item-'+i]" 
			v-for="(item, i) in playListArr"
			:key="i">
				<div class="pic">
					<img :src="item.coverImgUrl" alt="">
				</div>
				<div class="desc">
					<div class="name">{{ item.name }}</div>
					<div class="artists">
						{{ item.creator.nickname }}
					</div>
				</div>	
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default{
		data(){
			return{
				playListName: '相似歌单',
				playListArr: [],
			}
		},
		methods:{
			// 生成最新音乐歌单
			async getPlayListSimiArr(){
				const data = await this.$api.getSimiPlayList(this.currentSong.id);
				// console.log(data)
				this.playListArr = data.playlists
			},
		},
		computed:{
			...mapState('music', [
				'currentSong',
			]),
		},
		watch:{
			currentSong(newVal, oldVal){
				this.getPlayListSimiArr()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.song-list-news{
		position: relative;
		width: 100%;
		height: auto;
		margin: 0 0 20px;
		.title{
			height: 40px;
			margin: 0 15px;
			border-bottom: 1px solid #aaa;
			line-height: 40px;
			h3{
				display: inline-block;
				margin: 0;
				font-size: 18px;
				font-weight: normal;
			}
			span{
				float: right;
				font-size: 14px;
				color: #555;
			}
		}
		.content{
			position: relative;
			width: auto;
			height: auto;
			margin: 15px;
			.item{
				display: flex;
				height: 40px;
				margin: 15px 0;
				padding-left: 55px;
				overflow: hidden;
				.pic{
					height: 40px;
					width: 40px;
					margin-left: -55px;
					img{
						height: 100%;
					}
				}
				.desc{
					width: 100%;
					height: 40px;
					margin-left: 15px;
					line-height: 20px;
					.name{
						height: 20px;
						font-size: 14px;
						overflow: hidden;
						text-overflow: ellipsis;
						word-break: break-all;
						white-space: nowrap;
					}
					.artists{
						height: 20px;
						font-size: 12px;
						color: #999;
						overflow: hidden;
						text-overflow: ellipsis;
						word-break: break-all;
						white-space: nowrap;
					}
				}
			}
		}
	}
</style>
