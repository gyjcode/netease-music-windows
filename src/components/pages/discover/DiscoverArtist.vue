<template>
	<div class="discover-singer-container">
		<div class="header">
			<div class="items">
				<label class="item name">
					语种：
				</label>
				<div
				class="item"
				@click="selectArea(item.id)"
				v-for="(item, i) in areaArr"
				:key="i">
					<span :class="['filter', activeAreaId == item.id ? 'active' : '']"
					>{{ item.name }}</span>
				</div>
			</div>
			<div class="items">
				<label class="item name">
					分类：
				</label>
				<div
				class="item"
				@click="selectType(item.id)"
				v-for="(item, i) in typeArr"
				:key="i">
					<span :class="['filter', activeTypeId == item.id ? 'active' : '']"
					>{{ item.name }}</span>
				</div>
			</div>
			<div class="items">
				<label class="item name">
					筛选：
				</label>
				<div
				class="item"
				@click="selectInitial(item.id)"
				v-for="(item, i) in initialArr"
				:key="i">
					<span :class="['filter', activeInitialId == item.id ? 'active' : '']"
					>{{ item.name }}</span>
				</div>
			</div>
		</div>
		<div class="body">
			<div class="title"></div>
			<div class="items">
				<router-link
				tag="div"
				class="item"
				:to ="`/page/artist/`+item.id"
				v-for="(item, i) in artists"
				:key="i">
					<div
					class="pic-box"
					:style="'height:' + picBoxHeight"
					ref="picBox">
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
					</div>
					<div class="desc">
						{{ item.name }}
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				areaArr: [{ id: -1, name: '全部'}, { id: 7, name: '华语'}, { id: 96, name: '欧美'}, { id: 8, name: '日本'}, { id: 16, name: '韩国'}, { id: 0, name: '其他'}],
				typeArr: [{ id: -1, name: '全部'}, { id: 1, name: '男歌手'}, { id: 2, name: '女歌手'}, { id: 3, name: '乐队组合'}],
				initialArr: [{ id: -1, name: '热门'},  { id: 'a', name: 'A'}, { id: 'b', name: 'B'}, { id: 'c', name: 'C'}, { id: 'd', name: 'D'}, { id: 'e', name: 'E'}, { id: 'f', name: 'F'},
							 { id: 'g', name: 'G'}, { id: 'h', name: 'H'}, { id: 'i', name: 'I'}, { id: 'j', name: 'J'}, { id: 'k', name: 'K'}, { id: 'l', name: 'L'}, { id: 'm', name: 'M'},
							 { id: 'n', name: 'N'}, { id: 'o', name: 'O'}, { id: 'p', name: 'P'}, { id: 'q', name: 'Q'}, { id: 'r', name: 'R'}, { id: 's', name: 'S'}, { id: 't', name: 'T'},
							 { id: 'u', name: 'U'}, { id: 'v', name: 'V'}, { id: 'w', name: 'W'}, { id: 'x', name: 'X'}, { id: 'y', name: 'Y'}, { id: 'z', name: 'Z'}, { id:  0 , name: '#'}],
				activeAreaId: -1,
				activeTypeId: -1,
				activeInitialId: -1,
				
				artists: [],
				picBoxHeight: 'auto'
			};
		},
		created() {
			this.artistList()
		},
		updated() {    // mounted 无法找到使用了 v-if、v-show 或者 v-for 渲染的 DOM 节点
			// console.log(this)
			if(this.$refs.picBox.lenght) this.picBoxHeight = this.$refs.picBox[0].offsetWidth +'px'
			window.addEventListener('resize', () => {
				this.picBoxHeight = this.$refs.picBox[0].offsetWidth +'px'
			}, false);
		},
		methods:{
			// 歌手列表
			async artistList(){
				const data = await this.$api.getArtistList({area: this.activeAreaId, type: this.activeTypeId, initial: this.activeInitialId})
				// console.log(data)
				if(data.code === 200){
					const artists = data.artists.map((artists)=>{
						return {
							id: artists.id,
							name: artists.name,
							url: artists.url,
							picUrl: artists.picUrl
						}
					})
					this.artists = artists
				}
			},
			// 选择地区
			selectArea(id){
				this.activeAreaId = id
			},
			// 选择类型
			selectType(id){
				this.activeTypeId = id
			},
			// 选择首字母
			selectInitial(id){
				this.activeInitialId = id
			},
		},
		watch:{
			activeAreaId(){
				this.artistList()
			},
			activeTypeId(){
				this.artistList()
			},
			activeInitialId(){
				this.artistList()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.discover-singer-container{
		position: relative;
		height: 100%;
		background: #fafafa;
		overflow: hidden;
		.header{
			cursor: default;
			.items{
				.item{
					position: relative;
					display: inline-block;
					height: 24px;
					line-height: 24px;
					margin: 3px 0;
					padding: 0 9px;
					font-size: 13px;
					color: #555;
					word-break: break-all;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					&:after{
						z-index: 999;
						content: "";
						position: absolute;
						top: 5px;
						right: 0;
						display: block;
						height: 10px;
						width: 1px;
						background: #e1e1e1;
					}
					&:last-child:after{
						display: none;
					}
					&.name{
						padding: 0;
						&:after{
							display: none;
						}
					}
					span{
						cursor: default;
						display: inline-block;
						height: 20px;
						line-height: 20px;
						padding: 2px 12px;
						border-radius: 20px;
						font-size: 13px;
						color: #333;
						&:hover{
							color: #333;
							background: #fdeded;
						}
						&.active{
							color: #ec4141;
							background: #fdf1f1;
						}
					}
				}
			}
		}
		.body{
			margin: 20px 0 0;
			.title{
				border-bottom: 1px solid #eee;
			}
			.items{
				width: 100%;
				height: auto;
				margin: 30px 0 0;
				.item{
					float: left;
					width: calc(15% - 2px);
					margin: 0;
					margin-bottom: 10px;
					margin-right: 2%;
					display: flex;
					flex-direction: column;
					&:nth-child(6n){
						margin-right: 0;
					}
					.pic-box{
						flex-grow: 0;
						position: relative;
						min-width: 100px;
						min-height: 100px;
						border-radius: 7px;
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
								font-size: 30px;
								color: #999;
							}
						}
					}
					.desc{
						flex-basis: 40px;
						bottom: 0;
						margin: 5px 0 0;
						font-size: 14px;
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.discover-singer-container{
		.header{
			.items{
				height: auto;
				line-height: 24px;
				.item{
					height: 18px;
					line-height: 18px;
					margin: 3px 0;
					padding: 0 5px;
					font-size: 10px;
					&:after{
						display: none;
					}
					span{
						height: 18px;
						line-height: 18px;
						padding: 0px 5px;
						border-radius: 16px;
						font-size: 10px;
						color: #333;
					}
				}
			}
		}
		.body{
			margin: 5px 0 0;
			.title{
				border-bottom: 1px solid #eee;
			}
			.items{
				width: 100%;
				height: auto;
				margin: 15px 0 0;
				.item{
					float: left;
					width: calc(33.3333% - 10px);
					margin: 5px;
					margin-top: 0;
					.pic-box{
						min-width: 60px;
						min-height: 60px;
						border-radius: 5px;
					}
					.desc{
						flex-basis: 20px;
						margin: 3px 0 0;
						font-size: 10px;
					}
				}
			}
		}
	}
}
</style>
