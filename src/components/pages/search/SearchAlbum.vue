<template>
	<div class="search-album-container">
		<div class="albums">
			<div
			class="album"
			v-for="(album, i) in albums"
			:key="i">
				<router-link
				tag="div"
				:to="`/page/album/`+album.id"
				class="pic-box">
					<img :src="album.picUrl + '?param=100y100'" alt="">
				</router-link>
				<router-link
				tag="div"
				:to="`/page/album/`+album.id"
				v-html="album.name.replace(searchRoot.keywords, '<span>'+ searchRoot.keywords +'</span>')"
				class="name">
				</router-link>
				<router-link
				tag="div"
				:to="`/page/artist/`+ album.artists[0].id"
				v-if="album.artists.length"
				class="artists">
					{{ album.artists[0].name }}
				</router-link>
			</div>
		</div>
		<Paging @current="getCurrentPage" :all="pageCount"></Paging>
	</div>
</template>

<script>
	export default{
		inject: ["searchRoot"],
		data(){
			return{
				albums: [],
				pageCount: null,
				pageCurrent: 1,
			};
		},
		mounted() {
			this.searchAlbum()
		},
		methods:{
			// 获取单曲搜索结果
			async searchAlbum(){
				const data = await this.$api.getSearch({
					keywords: this.searchRoot.keywords,
					type: this.searchRoot.type,
					limit: 20,
					offset: (this.pageCurrent - 1) * 20
				})
				// console.log(data)
				if(data.code === 200){
					const result = data.result.albums.map((albums)=>{
						return {
							id: albums.id,
							name: albums.name,
							alia: albums.alias[0],
							picUrl: albums.picUrl,
							artists: albums.artists.map((artists)=>{
								return {
									id: artists.id,
									name: artists.name
								}
							})
						}
					})
					
					this.albums = result
					this.pageCount = Math.ceil(data.result.albumCount / 20)
					this.searchRoot.countMsg = "找到了"+ data.result.albumCount +"张专辑"
				}
			},
			getCurrentPage(num){
				this.pageCurrent = num
			}
		},
		watch:{
			$route:{
				handler(newVal, oldVal){
					this.searchAlbum()
				},
				deep: true
			},
			pageCurrent(newVal, oldVal){
				this.searchAlbum()
			}
		},
	}
</script>

<style lang="scss" scoped>
	.search-album-container{
		position: relative;
		.albums{
			position: relative;
			.album{
				position: relative;
				display: flex;
				flex-direction: row;
				width: auto;
				height: 80px;
				line-height: 80px;
				padding: 0 20px;
				overflow: hidden;
				background: #f1f2f3;
				&:nth-child(2n){
					background: #f9f9f9;
				}
				&:hover{
					background: #eee;
				}
				.pic-box{
					cursor: pointer;
					flex: 0 0 60px;
					height: 60px;
					margin: 10px 20px;
					border-radius: 5px;
					overflow: hidden;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.name{
					cursor: pointer;
					flex-grow: 1;
					display: block;
					height: 100%;
					width: 100%;
					font-size: 13px;
					color: #333;
					/deep/span{
						color: #0c73c6;
					}
				}
				.artists{
					cursor: pointer;
					display: block;
					width: 100%;
					height: 100%;
					font-size: 13px;
					color: #999;
				}
			}
		}
	}
</style>
