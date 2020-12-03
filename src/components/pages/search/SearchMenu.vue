<template>
	<div class="search-menu-container">
		<ul class="menu">
			<router-link
			tag="li"
			:class="['item', searchRoot.type===item.type ? 'router-link-exact-active' : '']"
			:to="{ path:`/search/${item.key}`, query:{ keywords: searchRoot.keywords, type: item.type }} "
			@click.native="itemClick(item.type)"
			v-for="(item, i) in items"
			:key="i">
				{{ item.name }}
			</router-link>
		</ul>
	</div>
</template>

<script>
	export default{
		inject: ["searchRoot"],
		data(){
			return{
				items:[
					{ name:'单曲', key: 'single', type: 1 },
					{ name:'歌手', key:'singer', type: 100 },
					{ name:'专辑', key: 'album', type: 10 },
					/* { name:'视频', key: 'video', type: 1014 }, */
					{ name:'MV', key: 'mv', type: 1004 },
					{ name:'歌单', key: 'playlist', type: 1000 },
					{ name:'歌词', key: 'lyric', type: 1006 },
					{ name:'主播电台', key: 'dj', type: 1009 },
					{ name:'用户', key: 'user', type: 1002 },
					/* { name:'综合', key: 'composite', type: 1018 }, */
				]
			};
		},
		methods:{
			// 点击项目向父组件传递切换的类型
			itemClick(type){
				this.$emit('typeChange', type);
			},
			itemActive(type){
				return this.searchRoot.type == type
			}
		},
	}
</script>

<style lang="scss" scoped>
	.search-menu-container{
		display: block;
		position: relative;
		margin: auto;
		height: 35px;
		ul.menu{
			list-style: none;
			display: flex;
			justify-content: left;
			position: relative;
			margin: 0;
			border-bottom: 1px solid #eee;
			padding: 0;
			text-align: left;
			height: 100%;
			.item{
				cursor: pointer;
				height: 100%;
				line-height: 1;
				margin-right: 20px;
				padding: 0;
				color: #555;
				font-size: 13px;
				line-height: 30px;
				&.router-link-exact-active{
					color: #333;
					font-weight: bold;
				}
			}
		}
	}
</style>
