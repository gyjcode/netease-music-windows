<template>
	<div
	v-if="data"
	class="ranking-tablebox-container">
		<div class="header">
			<div class="pic-box">
				<div
				:style="rankItemStyle"
				class="cover"></div>
				<div
				:style="'background-image: url(' + coverUrl + ')'"
				class="cover-img"></div>
				<!-- <img :src="data.coverImgUrl" alt=""> -->
				<div class="text">
					<div class="font init">
						{{ data.title[0] }}
					</div>
					<div class="font">
						{{ data.title[1] }}
					</div>
					<div class="font">
						{{ data.title[2] }}
					</div>
					<div class="time">
						{{ data.updateTime|formatDate('MM月DD日') }} 更新
					</div>
				</div>
				<div class="icon">
					<i
					@click="playCurrentList"
					class="iconfont icon-player-start-c-l"></i>
				</div>
			</div>
		</div>
		<div class="body">
			<table>
				<tr
				@click="playCurrentSong(item)"
				v-for="(item, i) in songsArr"
				:key="i">
					<td :class="['num', 'num-'+(i+1)]">
						{{ i+1 }}
					</td>
					<td class="state">-</td>
					<td class="name">
						{{ item.name }}
					</td>
					<td class="artists">
						{{ item.artists.map(({name})=>name).join('/') }}
					</td>
				</tr>
				<tr class="more">
					<router-link
					:to="`/page/playlist/`+ data.id"
					tag="span">
						查看全部
						<i class="iconfont icon-arrow-right-l"></i>
					</router-link>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
	import {formatDate, createSong} from '@/utils'
	import {mapState, mapMutations} from 'vuex'
	
	export default{
		props:{
			data:{
				type: Object,
				required: true
			}
		},
		data(){
			return{
				coverUrl: null,
				songsArr: null,
				playlist: null
			}
		},
		created() {
			this.playlistDetail()
		},
		methods:{
			...mapMutations('music',[
				'setCurrentSong',
				'setPlaylist',
			]),
			playCurrentList() {
				this.setCurrentSong(this.playlist[0])
				this.setPlaylist(this.playlist)
			},
			playCurrentSong(song) {
				this.setCurrentSong(song)
				this.setPlaylist(this.playlist)
			},
			// 获取指定类型歌单数据
			async playlistDetail(){
				const data = await this.$api.getPlayListDetail(this.data.id)
				// console.log(data)
				if(data.code === 200){
					const playlist = data.playlist.tracks.map(function(tracks){
						return createSong({
							id: tracks.id,
							name: tracks.name,
							picUrl: tracks.al.picUrl,
							duration: tracks.dt,
							artists: tracks.ar.map((ar)=>{
										return {
											id: ar.id,
											name: ar.name,
											picUrl: ar.picUrl
										}
									}),
							albumId: tracks.al.id,
							albumName: tracks.al.name,
							albumPicUrl: tracks.al.picUrl,
						})
					} )
					this.songsArr = playlist.splice(0, 5)
					this.coverUrl = playlist[0].picUrl
					this.playlist = playlist
				}
			}
		},
		computed:{
			rankItemStyle(){
				let style = ""
				if(this.data.colorBegin && this.data.colorEnd){
					style += 'background: linear-gradient(to bottom right, '+ this.data.colorBegin + ', ' + this.data.colorEnd + ');'
				}
				return style
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ranking-tablebox-container{
		cursor: default;
		display: block;
		position: relative;
		margin: 20px 0;
		overflow: hidden;
		.header{
			float: left;
			position: relative;
			height: 170px;
			width: 170px;
			border-radius: 7px;
			overflow: hidden;
			.pic-box{
				position: relative;
				width: 100%;
				height: 100%;
				overflow: hidden;
				.cover-img{
					z-index: 9;
					position: absolute;
					width: 100%;
					height: 100%;
					overflow: hidden;
					filter: blur(9px);
					background-color: #9999;
					background-position: center;
					background-repeat: no-repeat;
					background-size: cover;
				}
				.cover{
					z-index: 99;
					position: absolute;
					width: 100%;
					height: 100%;
					opacity: 0.6;
				}
				img{
					width: 100%;
					height: 100%;
				}
				.text{
					z-index: 999;
					position: absolute;
					transform: translate(-50%, -50%);
					top: 50%;
					left: 50%;
					width: 100%;
					height: auto;
					color: #fff;
					text-align: center;
					.font{
						display: inline-block;
						height: 40px;
						line-height: 40px;
						font-family: "微软雅黑";
						font-weight: bold;
						font-size: 32px;
					}
					.time{
						height: 30px;
						line-height: 30px;
						font-size: 13px;
						color: #ccc;
					}
				}
				.icon{
					z-index: 9999;
					display: none;
					position: absolute;
					transform: translate(-50%, -50%);
					top: 50%;
					left: 50%;
					i.iconfont{
						color: #ec414199;
						font-size: 42px;
					}
				}
				&:hover .icon{
					display: block;
				}
			}
			
		}
		.body{
			margin-left: 200px;
			table{
				display: block;
				position: relative;
				height: calc(100% + 40px);
				margin: 0;
				border: 0;
				border-spacing: 0;
				padding: 0;
				tr{
					display: flex;
					flex-direction: row;
					width: auto;
					padding: 0 10px;
					height: 32px;
					overflow: hidden;
					&:nth-child(2n+1){
						background: #f5f5f7;
					}
					&:hover{
						background: #e9e9e9;
					}
					td{
						display: inline-block;
						height: 32px;
						line-height: 32px;
						font-size: 13px;
						color: #555;
						text-align: center;
						word-break: break-all;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						&.num{
							flex-basis: 20px;
							width: 5%;
							font-size: 16px;
							color: #999;
							&.num-1{
								color: #c62f2f;
							}
							&.num-2{
								color: #67c23a;
							}
							&.num-3{
								color: #e6a23c;
							}
						}
						&.state{
							width: 20px;
						}
						&.name{
							width: 65%;
							padding-left: 5px;
							text-align: left;
						}
						&.artists{
							width: 15%;
							font-size: 12px;
							text-align: right;
						}
					}
				}
				.more{
					width: 100%;
					height: 30px;
					padding: 2px 0;
					span{
						cursor: default;
						display: inline-block;
						position: relative;
						height: 30px;
						padding: 0 5px;
						line-height: 40px;
						font-size: 13px;
						color: #555;
						background: none;
						i.iconfont{
							position: relative;
							right: 0;
							font-size: 10px;
						}
						&:hover{
							color: #333;
							background: none;
						}
					}
					&:hover{
						color: #333;
						background: none;
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.ranking-tablebox-container{
		margin: 10px 0;
		.header{
			height: 100px;
			width: 100px;
			border-radius: 5px;
			.pic-box{
				.text{
					.font{
						height: 30px;
						line-height: 30px;
						font-size: 24px;
					}
					.time{
						height: 20px;
						line-height: 20px;
						font-size: 10px;
					}
				}
				.icon{
					i.iconfont{
						font-size: 32px;
					}
				}
			}
			
		}
		.body{
			margin-left: 100px;
			table{
				height: calc(100% + 20px);
				tr{
					padding: 0 5px;
					height: 20px;
					td{
						height: 20px;
						line-height: 20px;
						font-size: 10px;
						&.num{
							flex-basis: 15px;
							font-size: 12px;
							font-weight: bold;
							color: #999;
						}
						&.state{
							display: none;
						}
						&.name{
							width: 100%;
						}
						&.artists{
							display: none;
						}
					}
				}
				.more{
					height: 20px;
					padding: 5px 0 0;
					span{
						height: 20px;
						line-height: 20px;
						font-size: 10px;
					}
				}
			}
		}
	}
}
</style>
