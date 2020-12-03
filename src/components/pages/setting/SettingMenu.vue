<template>
	<div id="setting-menu" class="menu-container">
		<div class="menus">
			<div
			:class="['menu', currentId === item.id ? 'active' : '']"
			@click="toId(item.id)"
			v-for="(item, i) in menus"
			:key="i">{{ item.name }}</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				menus:[
					{name: '账号', id: '#setting-account'},
					{name: '常规', id: '#setting-common'},
					{name: '播放', id: '#setting-play'},
					{name: '消息和隐私', id: '#setting-msgprivacy'},
					{name: '快捷键', id: '#setting-shortcutkey'},
					{name: '下载设置', id: '#setting-download'},
					{name: '歌词', id: '#setting-lyric'},
					{name: '工具', id: '#setting-tools'},
					{name: '关于网易云音乐', id: '#setting-about'}
				],
				currentId: "#setting-account"
			};
		},
		methods:{
			toId(id){
				this.currentId = id
				document.querySelector(id).scrollIntoView(false);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.menu-container{
		cursor: default;
		position: relative;
		height: 30px;
		.menus{
			cursor: default;
			display: flex;
			justify-content: left;
			position: relative;
			margin: 0;
			text-align: center;
			height: 100%;
			background: none;
			.menu{
				cursor: pointer;
				position: relative;
				height: 100%;
				line-height: 1;
				margin: 10px 20px 0 0;
				padding: 0;
				font-size: 13px;
				color: #555;
				&.active{
					color: #333;
					&::after{
						position: absolute;
						transform: translateX(-50%);
						left: 50%;
						bottom: 7px;
						content: "";
						width: 75%;
						height: 3px;
						background: #ec4141;
					}
				}
			}
		}
	}
</style>
