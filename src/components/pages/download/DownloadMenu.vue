<template>
	<div class="download-menu-container">
		<ul
		class="menus">
			<li
			:class="['menu', activeMenu === item.name ? 'active' : '']"
			@click = "changeActiveMenu(item.name)"
			v-for="(item, i) in menus"
			:key="i">
				<router-link tag="div" :to="item.path">{{ item.name }}</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				menus:[
					{name: '已下载单曲', path: '/download/song'},
					{name: '已下载电台节目', path: '/download/dj'},
					{name: '已下载MV', path: '/download/mv'},
					{name: '正在下载', path: '/download/ing'}
				],
				activeMenu: '已下载单曲'
			};
		},
		methods:{
			changeActiveMenu(name) {
				this.activeMenu = name
			}
		}
	}
</script>

<style lang="scss" scoped>
	.download-menu-container{
		display: block;
		position: relative;
		width: auto;
		height: auto;
		overflow: hidden;
		.menus{
			list-style: none;
			display: inline-block;
			height: 20px;
			line-height: 20px;
			margin: 10px 0;
			padding: 0;
			font-size: 13px;
			color: #777;
			.menu{
				float: left;
				cursor: pointer;
				width: auto;
				height: 20px;
				line-height: 20px;
				margin-right: 15px;
				text-align: center;
				color: #333;
				&:hover{
					color: #000;
				}
				&.active{
					position: relative;
					color: #000;
					font-weight: bold;
					&::after{
						content: "";
						position: absolute;
						bottom: -5px;
						left: 5%;
						width: 90%;
						height: 3px;
						background: #ec4141;
					}
				}
			}
		}
	}
</style>
