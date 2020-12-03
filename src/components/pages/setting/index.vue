<template>
	<div class="setting-container">
		<div class="header">
			<div class="title">设置</div>
			<div class="menu">
				<Menu></Menu>
			</div>
		</div>
		<div class="body">
			<div class="main">
				<Account class="setting"></Account>
				<Common class="setting"></Common>
				<Play class="setting"></Play>
				<MsgPrivacy class="setting"></MsgPrivacy>
				<ShortcutKey class="setting"></ShortcutKey>
				<Download class="setting"></Download>
				<Lyric class="setting"></Lyric>
				<Tools class="setting"></Tools>
				<About class="setting"></About>
			</div>
		</div>
	</div>
</template>

<script>
	import Menu from '@/components/pages/setting/SettingMenu.vue'
	import Account from '@/components/pages/setting/SettingAccount.vue'
	import Common from '@/components/pages/setting/SettingCommon.vue'
	import Play from '@/components/pages/setting/SettingPlay.vue'
	import MsgPrivacy from '@/components/pages/setting/SettingMsgPrivacy.vue'
	import ShortcutKey from '@/components/pages/setting/SettingShortcutKey.vue'
	import Download from '@/components/pages/setting/SettingDownload.vue'
	import Lyric from '@/components/pages/setting/SettingLyric.vue'
	import Tools from '@/components/pages/setting/SettingTools.vue'
	import About from '@/components/pages/setting/SettingAbout.vue'
	
	export default{
		components:{
			Menu,
			Account,
			Common,
			Play,
			MsgPrivacy,
			ShortcutKey,
			Download,
			Lyric,
			Tools,
			About
		},
	}
</script>
<style lang="scss" scoped>
	.setting-container{
		position: relative;
		width: auto;
		height: 100%;
		overflow: hidden;
		.header{
			margin: 20px 30px;
			.title{
				font-size: 24px;
				font-weight: bold;
				color: #333;
			}
			.menu{
				z-index: 999999;
				display: block;
				position: fixed;
				width: 100%;
				height: 30px;
				padding: 10px 0;
				background: #fafafa;
			}
		}
		.body{
			position: relative;
			width: auto;
			height: calc(100% - 100px);
			margin: 50px 0;
			padding: 0 30px;
			overflow: hidden;
			overflow-y: auto;
			&::-webkit-scrollbar{
				display: block;
				width: 9px;
				height: 9px;
			}
			&::-webkit-scrollbar-thumb{
				border-radius: 18px;
				background: #7777;
			}
			&::-webkit-scrollbar-thumb:hover{
				background: #9999;
			}
			&::-webkit-scrollbar-track{
				border-right: 0px solid #7777;
				background: none;
			}
			.main{
				.setting{
					margin: 15px 0 0;
					padding-bottom: 20px;
					border-bottom: 1px solid #eee;
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.setting-container{
		.header{
			margin: 10px;
			.title{
				font-size: 13px;
			}
			.menu{
				display: none;
			}
		}
		.body{
			height: calc(100% - 20px);
			margin: 10px 0;
			padding: 0 10px;
			overflow: hidden;
			overflow-y: auto;
			&::-webkit-scrollbar{
				display: none;
			}
			.main{
				.setting{
					margin: 10px 0 0;
					padding-bottom: 10px;
				}
			}
		}
	}
}
</style>
