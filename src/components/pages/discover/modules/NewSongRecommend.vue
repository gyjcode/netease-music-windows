<template>
	<div class="news-song-recommend-container">
		<div class="content" >
			<div 
				@dblclick="setCurrentSongArr(item);setPlaylistArr()"
				:class="['item', 'item-'+i]" 
				v-for="(item, i) in songsArr"
				:key="i">
				<div class="pic">
					<el-image
					:src="item.picUrl + '?param=60y60'"
					fit="cover"
					:lazy="false">
						<div slot="placeholder" class="loading">
							<i class="el-icon-loading"></i>
						</div>
						<div slot="error" class="error">
							<i class="el-icon-picture-outline"></i>
						</div>
					</el-image>
					<i class="iconfont icon-player-start-l"></i>
				</div>
				<div class="desc">
					<div class="name">{{ item.name }}</div>
					<div class="artists">
						<div class="tag quality">SQ</div>
						<div class="tag mv" v-if="item.mvid">MV</div>
						<div class="author">{{ item.artists.map(({name})=>name).join('/') }}</div>
					</div>
				</div>	
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import { createSong, formatOrderNum } from '@/utils'
	
	export default{
		data(){
			return{
				songsName: '最新音乐',
				songsArr: [],
			}
		},
		created() {
			this.getSongListNewsArr()
		},
		methods:{
			...mapMutations('music',[
				'setCurrentSong',
				'setPlaylist'
			]),
			// 生成最新音乐歌单
			async getSongListNewsArr(){
				const data = await this.$api.getSongListNews();
				// console.log(data)
				if(data.code === 200){
					const playlist = data.result.map(({song, picUrl}) =>{
						return createSong({
							id: song.id,
							name: song.name,
							mvid: song.mvid,
							picUrl: picUrl,
							duration: song.duration,
							artists: song.artists.map((artists)=>{
										return {
											id: artists.id,
											name: artists.name,
											picUrl: artists.picUrl
										}
									}),
							albumId: song.album.id,
							albumName: song.album.name,
							albumPicUrl: song.album.picUrl,
						})
					})
					this.songsArr = playlist
				}
				
			},
			// 设置当前播放音乐信息
			setCurrentSongArr(song){
				this.setCurrentSong(song)
			},
			// 设置播放列表
			setPlaylistArr(){
				this.setPlaylist(this.songsArr)
			},
		},
		computed:{
			...mapState('music', [
				'currentSong',
				'playlist'
			])
		}
	}
</script>

<style lang="scss" scoped>
	.news-song-recommend-container{
		position: relative;
		margin: 20px 0 40px;
		.content{
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-rows: 50px 50px 50px 50px;
			grid-gap: 15px;
			grid-auto-flow: column;
			overflow: hidden;
			.item{
				cursor: default;
				margin: 0;
				text-align: left;
				border-radius: 7px;
				overflow: hidden;
				&:hover{
					background: #f1f1f1;
				}
				.pic{
					float: left;
					position: relative;
					height: 50px;
					width: 50px;
					border-radius: 5px;
					overflow: hidden;
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
							font-size: 15px;
							color: #999;
						}
					}
					i.iconfont{
						position: absolute;
						transform: translate(-50%, -50%);
						top: 50%;
						left: 50%;
						font-size: 30px;
						font-weight: bold;
						color: #fff;
						&:hover{
							color: #f34c4c;
						}
					}
				}
				.desc{
					width: auto;
					height: 40px;
					line-height: 20px;
					margin-left: 60px;
					padding: 5px 0;
					.name{
						height: 20px;
						font-size: 13px;
						text-overflow: ellipsis;
						word-break: break-all;
						white-space: nowrap;
						overflow: hidden;
					}
					.artists{
						height: 20px;
						.tag{
							float: left;
							display: block;
							height: 12px;
							line-height: 12px;
							margin: 3px 4px 3px 0;
							border: 1px solid #ec4141;
							border-radius: 2px;
							padding: 0 3px;
							font-family: "Arial";
							font-size: 10px;
							color: #ec4141;
						}
						.author{
							margin-left: 35px;
							font-size: 10px;
							color: #999;
						}
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.news-song-recommend-container{
		position: relative;
		margin: 0;
		.content{
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: auto;
			grid-gap: 10px;
			grid-auto-flow: row;
			.item{
				cursor: default;
				margin: 0;
				text-align: left;
				border-radius: 7px;
				overflow: hidden;
				&:hover{
					background: #f1f1f1;
				}
				.pic{
					height: 40px;
					width: 40px;
					i.iconfont{
						font-size: 20px;
						font-weight: bold;
					}
				}
				.desc{
					height: 36px;
					line-height: 18px;
					margin-left: 50px;
					padding: 2px 0;
					.name{
						height: 18px;
						font-size: 12px;
					}
					.artists{
						height: 18px;
						.tag{
							display: none;
						}
						.author{
							margin-left: 0;
							font-size: 10px;
						}
					}
				}
			}
		}
	}
}
</style>
