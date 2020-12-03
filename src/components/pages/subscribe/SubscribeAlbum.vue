<template>
	<div class="subscribe-album-container">
		<Title class="title" title="收藏的专辑"><span>({{ albums.length }})</span></Title>
		<div class="albums">
			<div
			class="album"
			v-for="(album, i) in albums"
			:key="i">
				<router-link
				tag="div"
				:to="`/page/album/` + album.id"
				class="pic-box">
					<img :src="album.picUrl + '?param=60y60'" alt="">
				</router-link>
				<router-link
				tag="div"
				:to="`/page/album/` + album.id"
				class="name">
					{{ album.name }}
				</router-link>
				<router-link
				tag="div"
				:to="`/page/artist/` + album.artists[0].id"
				class="artists">
					{{ album.artists[0].name }}
				</router-link>
				<div class="size">
					{{ album.size + '首' }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				albums: [],
			};
		},
		created() {
			this.subscribeAlbums()
		},
		methods:{	
			async subscribeAlbums(){
				const data = await this.$api.getAlbumSublist()
				// console.log(data)
				if(data.code === 200){
					const result = data.data.map((data)=>{
						return {
							id: data.id,
							name: data.name,
							picUrl: data.picUrl,
							size: data.size,
							artists: data.artists.map((artists)=>{
								return {
									id: artists.id,
									name: artists.name
								}
							}),
						}
					})
					this.albums = result
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.subscribe-album-container{
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
		.albums{
			cursor: default;
			position: relative;
			width: auto;
			height: auto;
			margin: 10px 0;
			padding: 0;
			overflow: hidden;
			.album{
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
				.artists{
					cursor: pointer;
					flex-basis: 100px;
					color: #999;
				}
				.size{
					flex-basis: 100px;
					color: #999;
				}
			}
			
		}
	}
</style>
