<template>
	<div id="setting-lyric" class="setting-lyric-container">
		<div class="title">
			<h3>歌词</h3>
		</div>
		<div class="content">
			<div class="group">
				<div class="title">
					<div class="name">类型：</div>
				</div>
				<Radio :data="types" :default="types[1]" @selected="setType"></Radio>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">启用：</div>
				</div>
				<CheckBox @checked="setEnableLyric" :default="false" tip="启用歌词"></CheckBox>
				<CheckBox @checked="setEnableForeignLyric" :default="false" tip="外文歌词显示翻译"></CheckBox>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">总在最前：</div>
				</div>
				<CheckBox @checked="setAlwaysInFront" :default="false" tip="启用总在最前"></CheckBox>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">更改配色方案：</div>
				</div>
				<div class="button played">
					<div class="preview-box" :style="'background:linear-gradient('+playedColor1+','+playedColor2+','+playedColor1+') ;'"></div>
					<span>已播放</span>
				</div>
				<div class="button not-played">
					<div class="preview-box" :style="'background:linear-gradient('+notPlayedColor1+','+notPlayedColor2+','+notPlayedColor1+') ;'"></div>
					<span>未播放</span>
				</div>
				<div class="select-plan">
					<span>预设方案</span>
					<Select class="plan-select" :data="plans" :default="selectedPlan" @selected="setSelectedPlan"></Select>
				</div>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">调整字号：</div>
				</div>
				<Select :data="fontSizes" :default="selectedFontSize" @selected="setSelectedFontSize"></Select>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">字体选择：</div>
				</div>
				<Select class="font-select" :data="fonts" :default="selectedFont" @selected="setSelectedFont"></Select>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">更改单双行：</div>
				</div>
				<Radio :data="lines" :default="lines[1]" @selected="setLine"></Radio>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">更改对齐方式：</div>
				</div>
				<Select class="alignmentway-select" :data="alignmentWays" :default="alignmentWays[0]" @selected="setAlignmentWay"></Select>
			</div>
			<div class="group">
				<div class="title">
					<div class="name">预览：</div>
				</div>
				<div class="preview">
					<div class="box">
						<div
						class="not-played"
						data-text="网易云音乐"
						:style="'font-size:'+selectedFontSize+'px;'
								+'font-family:'+selectedFont+';'
								+'text-align:'+playedAlignmentWay+';'
								+'background-image:linear-gradient('+playedColor1+','+playedColor2+','+playedColor1+') ;'">
							网易云音乐
						</div>
						<div
						class="played"
						data-text="网易云音乐"
						:style="'font-size:'+selectedFontSize+'px;'
								+'font-family:'+selectedFont+';'
								+'text-align:'+notPlayedAlignmentWay+';'
								+'background-image:linear-gradient('+notPlayedColor1+','+notPlayedColor2+','+notPlayedColor1+') ;'">
							网易云音乐
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				types: [
					{id: 1, tip: '桌面歌词'},
					{id: 2, tip: '软件内词栏'},
				],
				selectedType: {},
				enableLyric: false,
				enableForeignLyric: true,
				alwaysInFront: false,
				playedColor1: '#ffffff',
				playedColor2: '#ffa0a0',
				notPlayedColor1: '#ffffff',
				notPlayedColor2: '#e1e1e1',
				plans: ['自定义', '酷炫黑', '可爱粉', '清新绿', '天际蓝', '土豪金'],
				selectedPlan: '自定义',
				fontSizes: [
					20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
				],
				selectedFontSize: 36,
				fonts: ['默认', '宋体', '微软雅黑', '楷体', '黑体'],
				selectedFont: "微软雅黑",
				lines: [
					{id: 1, tip: '单行'},
					{id: 2, tip: '双行'},
				],
				selectedLine: {},
				alignmentWays: ['居中', '左对齐', '右对齐'],
				playedAlignmentWay: 'center',
				notPlayedAlignmentWay: 'center',
			};
		},
		methods:{
			// 类型
			setType(val){
				this.selectedType = val
			},
			// 启用歌词
			setEnableLyric(val){
				this.enableLyric = val
			},
			// 外文歌词显示
			setEnableForeignLyric(val){
				this.enableForeignLyric = val
			},
			// 外文歌词显示
			setAlwaysInFront(val){
				this.alwaysInFront = val
			},
			setSelectedPlan(val){
				this.selectedPlan = val
			},
			setSelectedFontSize(val){
				this.selectedFontSize = val
			},
			setSelectedFont(val){
				this.selectedFont = val
			},
			setLine(val){
				this.selectedLine = val
			},
			setAlignmentWay(val){
				if(val === '居中'){
					this.playedAlignmentWay = 'center'
					this.notPlayedAlignmentWay = 'center'
				}else if(val === '左对齐'){
					this.playedAlignmentWay = 'left'
					this.notPlayedAlignmentWay = 'right'
				}else if(val === '右对齐'){
					this.playedAlignmentWay = 'right'
					this.notPlayedAlignmentWay = 'left'
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.setting-lyric-container{
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
				.title{
					height: 20px;
					line-height: 20px;
					.name{
						float: left;
						margin-right: 5px;
						font-weight: bold;
						color: #555;
						span{
							color: #999;
						}
					}
					.desc{
						font-size: 12px;
					}
				}
				&>.played, .not-played{
					cursor: pointer;
					display: inline-block;
					outline: none;
					height: 24px;
					line-height: 24px;
					margin: 10px 0;
					margin-right: 5px;
					border: 1px solid #ccc;
					border-radius: 25px;
					padding: 0px 20px;
					font-size: 10px;
					color: #333;
					background: #f9f9f9;
					&:hover{
						background: #eee;
					}
					.preview-box{
						float: left;
						width: 16px;
						height: 16px;
						margin: 3px 7px;
						margin-left: -10px;
						border: 1px solid #ccc;
					}
				}
				.select-plan{
					display: inline-block;
					margin-left: 20px;
					span{
						margin-right: 5px;
						font-size: 10px;
						color: #555;
					}
					.select-container{
						display: inline-block;
						min-width: 100px;
					}
				}
				.font-select{
					min-width: 200px;
				}
				.alignmentway-select{
					min-width: 100px;
				}
				.preview{
					margin: 10px 0;
					border: 1px solid #ccc;
					padding: 5px;
					.box{
						width: 300px;
						margin: 0 auto;
						&>.played, .not-played{
							display: block;
							cursor: default;
							text-align: center;
							position: relative;
							width: auto;
							height: auto;
							line-height: 1;
							margin: 10px 0;
							border: 0;
							border-radius: 0;
							padding: 0;
							font-family: '黑体';
							font-weight: bold;
							font-size: 36px;
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
							-webkit-animation: hue 6s infinite linear;
							-moz-user-select: none; /*火狐*/
							-webkit-user-select: none; /*webkit浏览器*/
							-ms-user-select: none; /*IE10*/
							-khtml-user-select: none; /*早期浏览器*/
							user-select: none;
							&::before {
								z-index: -1;
								content: attr(data-text);
								position: absolute;
								-webkit-text-stroke: 2px #333;
							}
						}
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.setting-lyric-container{
		.title{
			height: 20px;
			line-height: 20px;
			h3{
				font-size: 13px;
			}
		}
		.content{
			font-size: 10px;
			.group{
				margin: 5px 0;
				.title{
					.desc{
						display: none;
					}
				}
				&>.played, .not-played{
					height: 20px;
					line-height: 20px;
					margin: 5px 0;
					margin-right: 5px;
					border: 1px solid #ccc;
					border-radius: 20px;
					padding: 0px 15px;
					.preview-box{
						width: 12px;
						height: 12px;
						margin: 3px 7px;
						margin-left: -8px;
					}
				}
				.select-plan{
					margin-left: 10px;
					.select-container{
						min-width: 80px;
					}
				}
				.font-select{
					min-width: 160px;
				}
				.alignmentway-select{
					min-width: 100px;
				}
				.preview{
					margin: 5px 0;
					.box{
						width: 260px;
					}
				}
			}
		}
	}
}
</style>
