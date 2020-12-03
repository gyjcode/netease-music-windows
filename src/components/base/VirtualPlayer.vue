<template>
	<div class="virtual-player">
		<div class="content">
			<img class="player-support" src="@/assets/images/player-support.png" alt="">
			<img
			:class="['player-bar', { 'play': play }]"
			src="@/assets/images/player-bar.png"
			alt="">
			<div
			:class="['virtual-disc', play ? 'play' : 'pause']"
			ref="virtualDisc">
				<div class="outer">
					<div class="middle">
						<div class="inner">
							<img :src="picUrl" alt="">
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			play:{
				type: Boolean,
				required: true,
				default: false
			},
			picUrl:{
				type: String,
				required: true,
			}
		}
	}
</script>

<style lang="scss" scoped>
	.virtual-player{
		position: relative;
		transform: translateX(-50%);
		left: 50%;
		width: 320px;
		height: 320px;
		.content{
			margin: 75px 0 0;
			width: 100%;
			height: 100%;
			.player-support{
				z-index: 99;
				position: absolute;
				transform: translateX(-50%);
				top: -75px;
				left: 50%;
				width: 30px;
				height: 30px;
			}
			.player-bar{
				z-index: 9;
				position: absolute;
				transform: translateX(-50%);
				top: -50px;
				left: 50%;
				width: 80px;
				/* 控制虚拟唱片针旋转 */
				transform-origin: 0 0;
				transform: rotate(-30deg);
				transition: all 0.3s;
				&.play{
					transform: rotate(0);
				}
			}
			.virtual-disc{
				position: absolute;
				width: 100%;
				height: 100%;
				/* 控制虚拟唱片旋转 */
				animation: rotate 20s linear infinite;
				&.play{
					transform: rotate(5deg);
				}
				&.pause{
					animation-play-state: paused;
				}
				@keyframes rotate {
					0%{
						transform: rotate(0);
					}
					100% {
						transform: rotate(1turn);
					}
				}
				.outer{
					position: absolute;
					transform: translate(-50%, -50%);
					top: 50%;
					left: 50%;
					width: 100%;
					height: 100%;
					border-radius: 50%;
					background-color: #c9c9c9;
					.middle{
						position: absolute;
						transform: translate(-50%, -50%);
						top: 50%;
						left: 50%;
						width: calc(100% - 20px);
						height: calc(100% - 20px);
						border-radius: 50%;
						background-image: url('../../assets/images/player-film.png');
						background-repeat: no-repeat;
						background-size: cover;
						.inner{
							position: absolute;
							transform: translate(-50%, -50%);
							top: 50%;
							left: 50%;
							width: 60%;
							height: 60%;
							border: 10px solid #111;
							border-radius: 50%;
							background-color: #111;
							overflow: hidden;
							img{
								width: 100%;
								height: 100%;
							}
						}
					}
				}
			}
		}
	}
</style>
