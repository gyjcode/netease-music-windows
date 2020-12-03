<template>
	<div class="subscribe-artist-container">
		<Title class="title" title="收藏的歌手"><span>({{ artists.length }})</span></Title>
		<div class="artists">
			<div
			class="artist"
			v-for="(artist, i) in artists"
			:key="i">
				<router-link
				tag="div"
				:to="`/page/artist/` + artist.id"
				class="pic-box">
					<img :src="artist.picUrl + '?param=60y60'" alt="">
				</router-link>
				<router-link
				tag="div"
				:to="`/page/artist/` + artist.id"
				class="name">
					{{ artist.name }}
				</router-link>
				<div class="size album">
					{{ '专辑: ' + artist.albumSize }}
				</div>
				<div class="size mv">
					{{ 'MV: ' + artist.mvSize }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	
	export default{
		data(){
			return{
				artists: [],
			};
		},
		created() {
			this.subscribeArtists()
		},
		methods:{	
			async subscribeArtists(){
				const data = await this.$api.getArtistSublist()
				// console.log(data)
				if(data.code === 200){
					const result = data.data.map((data)=>{
						return {
							id: data.id,
							name: data.name,
							picUrl: data.picUrl,
							albumSize: data.albumSize,
							mvSize: data.mvSize
						}
					})
					this.artists = result
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.subscribe-artist-container{
		position: relative;
		margin: 20px 0;
		/deep/.title-container{
			margin: 15px 30px;
			h3{
				font-size: 15px;
			}
			span{
				margin: 0 3px;
				font-size: 10px;
				color: #777;
			}
		}
		.artists{
			cursor: default;
			position: relative;
			width: auto;
			height: auto;
			margin: 10px 0;
			padding: 0;
			overflow: hidden;
			.artist{
				position: relative;
				display: flex;
				width: auto;
				height: 80px;
				line-height: 80px;
				padding: 0 10px;
				background: #f0f1f2;
				overflow: hidden;
				&>div{
					position: relative;
					transform: translateY(-50%);
					top: 50%;
					font-size: 13px;
					color: #555;
				}
				.pic-box{
					cursor: pointer;
					float: left;
					width: 60px;
					height: 60px;
					margin: 0 10px;
					border-radius: 5px;
					overflow: hidden;
					img{
						object-fit: cover;
						width: 100%;
						height: 100%;
					}
				}
				.name{
					cursor: pointer;
					flex-grow: 1;
				}
				.album{
					cursor: pointer;
					flex-basis: 100px;
					color: #999;
				}
				.mv{
					flex-basis: 100px;
					color: #999;
				}
			}
			
		}
	}
</style>
