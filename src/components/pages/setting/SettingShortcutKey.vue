<template>
	<div id="setting-shortcutkey" class="setting-shortcutkey-container">
		<div class="title">
			<h3>快捷键</h3>
		</div>
		<div class="content">
			<div class="group">
				<div class="table">
					<div class="row title">
						<div class="col name"><div>功能说明</div></div>
						<div class="col shortcut-key"><div>快捷键</div></div>
						<div class="col global-shortcut-key"><div>全局快捷键</div></div>
					</div>
					<div
					class="row item"
					v-for="(item, i) in shortcuts"
					:key="i">
						<div class="col name"><div>{{ item.name }}</div></div>
						<div class="col shortcut-key"><div><input type="text" v-model="item.shortcutKey"></div></div>
						<div class="col global-shortcut-key"><div><input type="text" v-model="item.shortcutKeyGlobal"></div></div>
					</div>
				</div>
			</div>
			<div class="group">
				<CheckBox class="global-shortcut" @checked="setGlobalShortcut" :default="false" tip="启用全局快捷键：<span>( 云音乐在后台时也能响应 )</span>"></CheckBox>
				<button class="restore">恢复默认</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				shortcuts: [
					{id: 1, name: '播放/暂停', shortcutKey: 'Ctrl+P', shortcutKeyGlobal: 'Ctrl+Alt+P'},
					{id: 2, name: '上一首', shortcutKey: 'Ctrl+Left', shortcutKeyGlobal: 'Ctrl+Alt+Left'},
					{id: 3, name: '下一首', shortcutKey: 'Ctrl+Right', shortcutKeyGlobal: 'Ctrl+Alt+Right'},
					{id: 4, name: '音量加', shortcutKey: 'Ctrl+Up', shortcutKeyGlobal: 'Ctrl+Alt+Up'},
					{id: 5, name: '音量减', shortcutKey: 'Ctrl+Down', shortcutKeyGlobal: 'Ctrl+Alt+Down'},
					{id: 6, name: 'mini/完整模式', shortcutKey: 'Ctrl+M', shortcutKeyGlobal: 'Ctrl+Alt+M'},
					{id: 7, name: '喜欢歌曲', shortcutKey: 'Ctrl+L', shortcutKeyGlobal: 'Ctrl+Alt+L'},
					{id: 8, name: '打开/关闭歌词', shortcutKey: 'Ctrl+D', shortcutKeyGlobal: 'Ctrl+Alt+D'},
				],
				globalShortcut: true
			};
		},
		methods:{
			// 全局快捷键
			setGlobalShortcut(val){
				this.globalShortcut = val
			}
		},
	}
</script>

<style lang="scss" scoped>
	.setting-shortcutkey-container{
		cursor: default;
		position: relative;
		.title{
			height: 30px;
			line-height: 30px;
			h3{
				margin: 0;
				padding: 0;
				font-size: 15px;
			}
		}
		.content{
			display: block;
			width: auto;
			height: auto;
			font-size: 13px;
			color: #999;
			.group{
				position: relative;
				margin: 10px 0;
				.table{
					display: block;
					position: relative;
					width: auto;
					.row{
						display: flex;
						flex-direction: row;
						position: relative;
						&.item{
							color: #555;
						}
						.col{
							flex: 0 0 150px;
							width: auto;
							height: 100%;
							padding: 3px 5px;
						}
						.name{
							margin: 0;
							font-weight: normal;
						}
						.shortcut-key{
							div{
								height: 15px;
								line-height: 15px;
								padding: 5px 15px;
								border: 1px solid #ccc;
							}
						}
						.global-shortcut-key{
							div{
								height: 15px;
								line-height: 15px;
								padding: 5px 15px;
								border: 1px solid #ccc;
							}
						}
						input{
							outline: none;
							display: block;
							width: 100%;
							height: 15px;
							line-height: 15px;
							margin: -5px -15px;
							padding: 5px 15px;
							border: 0;
							color: #555;
						}
					}
					
					.title{
						width: auto;
						height: auto;
						.shortcut-key{
							div{
								border: 0;
								padding: 0;
							}
						}
						.global-shortcut-key{
							div{
								border: 0;
								padding: 0;
							}
						}
					}
				}
				.title{
					position: relative;
					height: 20px;
					line-height: 20px;
					.name{
						float: left;
						margin-right: 5px;
						font-weight: bold;
						color: #555;
						span{
							font-weight: normal;
							color: #999;
						}
					}
					.desc{
						font-size: 12px;
					}
				}
				.global-shortcut{
					float: left;
					width: auto;
					min-width: 300px;
					margin-right: 30px;
				}
				button.restore{
					display: inline-block;
					margin: 7px 0;
				}
				button{
					cursor: pointer;
					outline: none;
					height: 24px;
					line-height: 24px;
					margin-right: 15px;
					border: 1px solid #ccc;
					border-radius: 20px;
					padding: 0px 15px;
					font-size: 10px;
					background: #f9f9f9;
					&:hover{
						background: #eee;
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.setting-shortcutkey-container{
		display: none;
	}
}
</style>
