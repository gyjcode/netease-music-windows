<template>
	<div class="discover-new-container" ref="newContainer">
		<div class="header">
			<div class="tabs">
				<div
				:class="['tab', {active: currentTab === 'song' }]"
				@click="toggleTabs('song')">
					新歌速递
				</div>
				<div
				:class="['tab', {active: currentTab === 'album' }]"
				@click="toggleTabs('album')">
					新碟上架
				</div>
			</div>
		</div>
		<div class="body">
			<div class="main">
				<div class="menus">
					<div
					:class="['menu', menu.id === activeAreaId ? 'active' : '']"
					@click="changeMenu(menu)"
					v-for="(menu, i) in areaArr"
					:key="i">
						{{ menu.name }}
					</div>
					<div
					class="types"
					v-show="currentTab === 'album'">
						<div
						:class="['type', type.abbr === activeTypeAbbr ? 'active' : '']"
						@click="changeType(type)"
						v-for="(type, i) in typeArr"
						:key="i">
							{{ type.name }}
						</div>
					</div>
				</div>
				<div class="content">
					<NewSongList
					:type="activeAreaId"
					v-show="currentTab === 'song'"></NewSongList>
					<NewAlbumBox
					:data="{area: activeAreaAbbr, type: activeTypeAbbr}"
					v-show="currentTab === 'album'"></NewAlbumBox>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import NewSongList from '@/components/pages/discover/modules/NewSongList.vue'
	import NewAlbumBox from '@/components/pages/discover/modules/NewAlbumBox.vue'
	
	export default{
		components:{
			NewSongList,
			NewAlbumBox
		},
		data(){
			return{
				currentTab: 'song',
				areaArr:  [
					{ id: 0 , name: '全部', abbr: 'ALL'},
					{ id: 7 , name: '华语', abbr: 'ZH'},
					{ id: 96, name: '欧美', abbr: 'EA'},
					{ id: 16, name: '韩国', abbr: 'KR'},
					{ id: 8 , name: '日本', abbr: 'JP'}],
				typeArr:  [{ abbr: 'hot', name: '热门'}, { abbr: 'new', name: '最新'}],
				activeAreaId: 0,
				activeAreaAbbr: 0,
				activeTypeAbbr: 'new'
				
			};
		},
		methods:{
			// 切换播放列表&历史记录
			toggleTabs(name){
				this.currentTab = name
			},
			// 选择菜单
			changeMenu(obj){
				this.activeAreaId = obj.id
				this.activeAreaAbbr = obj.abbr
			},
			changeType(obj){
				this.activeTypeAbbr = obj.abbr
			},
		},
	}
</script>

<style lang="scss" scoped>
	.discover-new-container{
		position: relative;
		margin: 20px 0 0;
		width: auto;
		height: 100%;
		overflow: hidden;
		.header{
			width: 100%;
			height: 40px;
			line-height: 40px;
			text-align: center;
			.tabs{
				display: inline-block;
				width: auto;
				height: 32px;
				margin: 7px auto;
				border: 1px solid #ccc;
				border-radius: 5px;
				line-height: 34px;
				border-radius: 34px;
				overflow: hidden;
				.tab{
					cursor: pointer;
					float: left;
					margin: 0;
					border: 0;
					padding: 0 40px;
					font-size: 13px;
					border-radius: 34px;
					&.active{
						color: #fff;
						background: #aaa;
						&:hover{
							background: #aaa;
						}
					}
					&:hover{
						background: #f4f4f4;
					}
				}
			}
		}
		.body{
			position: relative;
			width: 100%;
			height: calc(100% - 40px);
			margin-top: 40px;
			background: #fafafa;
			.main{
				width: 100%;
				height: auto;
				.menus{
					height: 30px;
					line-height: 30px;
					border-bottom: 0px solid #eee;
					margin: 0 20px;
					.menu{
						cursor: default;
						display: inline-block;
						height: 29px;
						margin-right: 10px;
						font-size: 14px;
						color: #777;
						text-align: left;
						&:hover{
							color: #333;
						}
						&.active{
							border-bottom: 0px solid #333;
							color: #333;
							font-weight: bold;
						}
					}
					.types{
						float: right;
						display: inline-block;
						.type{
							cursor: default;
							display: inline-block;
							height: 20px;
							line-height: 20px;
							margin-left: 5px;
							padding: 2px 15px;
							font-size: 12px;
							color: #333;
							border-radius: 30px;
							&:hover{
								color: #333;
								background: #fdeded;
							}
							&.active{
								color: #ec4141;
								background: #fdf5f5;
							}
						}
					}
				}
				.content{
					margin: 0 20px;
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.discover-new-container{
		margin: 10px 0 0;
		.header{
			height: 32px;
			line-height: 32px;
			.tabs{
				height: 24px;
				margin: 3px auto;
				line-height: 24px;
				border-radius: 24px;
				.tab{
					padding: 0 20px;
					font-size: 10px;
					border-radius: 24px;
				}
			}
		}
		.body{
			height: calc(100% - 20px);
			margin-top: 10px;
			.main{
				.menus{
					height: 20px;
					line-height: 20px;
					margin: 0 10px;
					.menu{
						height: 18px;
						margin-right: 5px;
						font-size: 10px;
					}
					.types{
						display: none;
					}
				}
				.content{
					margin: 0;
				}
			}
		}
	}
}
</style>
