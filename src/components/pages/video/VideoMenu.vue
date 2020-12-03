<template>
	<div class="menu-container">
		<el-menu :default-active="$route.path" class="el-menu" mode="horizontal">
			<el-menu-item
			:index="item.path"
			v-for="(item, i) in menus"
			:key="i">
				<router-link :to="item.path">{{ item.name }}</router-link>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				menus:[
					{name: '视频', path: '/video/all'},
					{name: 'MV', path: '/video/mv'}
				]
			};
		},
	}
</script>

<style lang="scss" scoped>
	.menu-container{
		position: relative;
		height: 45px;
		.el-menu{
			display: flex;
			justify-content: left;
			position: relative;
			margin: 0 10px;
			text-align: center;
			height: 100%;
			background: none;
			.el-menu-item{
				height: 100%;
				line-height: 1;
				margin: 0 10px;
				padding: 0 5px;
				font-size: 18px;
				color: #333;
				a{
					display: block;
					position: relative;
					transform: translateY(-50%);
					top: 50%;
					text-decoration: none;
				}
			}
		}
		.el-menu--horizontal{
			border: 0;
			.el-menu-item.is-active {
				position: relative;
				border-bottom: 0px solid #c62f2f;
				font-size: 22px;
				font-weight: bold;
				color: #000;
				&::after{
					position: absolute;
					transform: translateX(-50%);
					left: 50%;
					bottom: -1px;
					content: "";
					width: 75%;
					height: 3px;
					background: #ec4141;
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.menu-container{
		height: 30px;
		.el-menu{
			margin: 0 5px;
			.el-menu-item{
				margin: 0 5px;
				padding: 0 3px;
				font-size: 13px;
			}
		}
		.el-menu--horizontal{
			.el-menu-item{
				/deep/span.pc{
					display: none;
				}
			}
			.el-menu-item.is-active {
				position: relative;
				border-bottom: 0px solid #c62f2f;
				font-size: 15px;
				&::after{
					bottom: 0px;
					height: 2px;
					background: #ec4141;
				}
			}
		}
	}
}
</style>
