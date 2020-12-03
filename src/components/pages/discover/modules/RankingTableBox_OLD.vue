<template>
	<div
	v-if="data"
	class="ranking-tablebox-container">
		<div
		:style="rankItemStyle"
		class="header">
			<div class="cover"></div>
			<div class="content">
				<div class="left">
					<div class="font init">
						{{ data.title[0] }}
					</div>
					<div class="more">
						<div class="word">
							<div class="font">
								{{ data.title[1] }}
							</div>
							<div class="font">
								{{ data.title[2] }}
							</div>
						</div>
						<div class="time">
							{{ data.updateTime|formatDate('MM月DD日') }} 更新
						</div>
					</div>
					<div class="right">
						<i
						@click="playCurrentList"
						class="iconfont icon-player-start-s"></i>
					</div>
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
					<td class="state">hot</td>
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
						更多
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
				songsArr: [],
				playlist: []
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
					this.songsArr = playlist.splice(0, 8)
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
		border: 1px solid #eee;
		overflow: hidden;
		.header{
			position: relative;
			height: 80px;
			background: linear-gradient(to bottom right, #3c8ede, #628fee);
			.cover{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-image: url(../../../../assets/images/cover-line.png);
				opacity: 0.08;
			}
			.content{
				height: 60px;
				padding: 10px;
				overflow: hidden;
				.left{
					position: relative;
					width: auto;
					height: 100%;
					.font{
						display: inline-block;
						height: 40px;
						line-height: 40px;
						font-family: "微软雅黑";
						font-weight: bold;
						font-size: 32px;
						color: #fff;
						&.init{
							float: left;
							width: 60px;
							height: 60px;
							padding: 0 7px;
							line-height: 60px;
							font-size: 52px;
							font-style: italic;
						}
					}
					.more{
						float: left;
						height: 60px;
						.word{
							height: 40px;
							line-height: 40px;
						}
						.time{
							height: 20px;
							line-height: 20px;
							font-size: 12px;
							color: #ccc;
						}
					}
				}
				.right{
					float: right;
					height: 60px;
					i.iconfont{
						font-size: 52px;
						line-height: 60px;
						color: #fff;
						&:hover{
							color: #ec4141cc;
						}
					}
				}
			}
		}
		.body{
			height: 300px;
			table{
				display: block;
				position: relative;
				height: 100%;
				margin: 0;
				border: 0;
				border-spacing: 0;
				padding: 0;
				tr{
					display: block;
					width: auto;
					padding: 0 10px;
					height: 32px;
					overflow: hidden;
					&.more{
						position: absolute;
						bottom: 0;
						right: 0;
						width: 100%;
						height: 40px;
						padding: 2px 0;
						span{
							float: right;
							cursor: default;
							display: inline-block;
							position: relative;
							height: 40px;
							padding: 0 10px;
							line-height: 40px;
							font-size: 14px;
							color: #999;
							i.iconfont{
								position: relative;
								top: 3px;
								right: 0;
								font-size: 20px;
							}
						}
						&:hover{
							background: #f5f5f7;
						}
					}
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
							width: 10%;
						}
						&.name{
							width: 50%;
							text-align: left;
						}
						&.artists{
							width: 25%;
							font-size: 12px;
							text-align: right;
						}
					}
				}
			}
		}
	}
</style>
