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
					{name: '专辑', path: '/subscribe/album'},
					{name: '歌手', path: '/subscribe/artist'},
					{name: '视频', path: '/subscribe/video'},
					/* {name: '专栏', path: '/subscribe/column'} */
				],
				activeMenu: '专辑'
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
		margin: 20px 30px;
		overflow: hidden;
		.menus{
			list-style: none;
			display: inline-block;
			height: 20px;
			line-height: 20px;
			margin: 10px 0;
			padding: 0;
			font-size: 16px;
			color: #777;
			.menu{
				float: left;
				cursor: pointer;
				width: auto;
				height: 20px;
				line-height: 20px;
				margin-right: 30px;
				text-align: center;
				color: #333;
				&:hover{
					color: #000;
				}
				&.active{
					position: relative;
					color: #000;
					font-size: 20px;
					font-weight: bold;
					&::after{
						content: "";
						position: absolute;
						bottom: -10px;
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
