<template>
	<div class="event-repost-container">
		<div class="content scroller-y">
			<div
			v-html="sourceEventMsg"
			class="event-msg"></div>
			
			<div class="event-content">
				<EventAlbum
				class="event-content-item"
				:data="sourceEvent"
				v-if="data.event.type === 19 "></EventAlbum>
				
				<EventArticle
				class="event-content-item"
				:data="sourceEvent"
				v-if="data.event.type === 24 "></EventArticle>
				
				<EventDJRadio
				class="event-content-item"
				:data="sourceEvent"
				v-if="data.event.type === 28 "></EventDJRadio>
				
				<EventDJProgram
				class="event-content-item"
				:data="sourceEvent"
				v-if="data.event.type === 17"></EventDJProgram>
				
				<EventPlaylist
				class="event-content-item"
				:data="sourceEvent"
				v-if="data.event.type === 13"></EventPlaylist>
				
				<EventSong
				class="event-content-item"
				:data="sourceEvent"
				v-if="data.event.type === 18"></EventSong>
				
				<EventMV
				class="event-content-item"
				:data="sourceEvent"
				v-if="data.event.type === 21"></EventMV>
				
				<EventVideo
				class="event-content-item"
				:data="sourceEvent"
				v-if="data.event.type === 41"></EventVideo>
			</div>
			
			<div class="event-pics">
				<div
				class="pic"
				v-for="(pic, i) in data.event.pics"
				:key="i">
					<img :src="pic.originUrl" alt="">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import EventAlbum from '@/components/pages/social/modules/EventAlbum.vue'
	import EventArticle from '@/components/pages/social/modules/EventArticle.vue'
	import EventDJProgram from '@/components/pages/social/modules/EventDJProgram.vue'
	import EventDJRadio from '@/components/pages/social/modules/EventDJRadio.vue'
	import EventPlaylist from '@/components/pages/social/modules/EventPlaylist.vue'
	import EventRepost from '@/components/pages/social/modules/EventRepost.vue'
	import EventSong from '@/components/pages/social/modules/EventSong.vue'
	import EventMV from '@/components/pages/social/modules/EventMV.vue'
	import EventVideo from '@/components/pages/social/modules/EventVideo.vue'
	
	export default{
		components:{
			EventSong,
			EventAlbum,
			EventArticle,
			EventDJRadio,
			EventDJProgram,
			EventPlaylist,
			EventRepost,
			EventMV,
			EventVideo
		},
		props:{
			data:{
				type: Object,
				required: true
			}
		},
		data(){
			return{
				eventTypeName: null,
				eventTypes: [
					{id: 18, name: '分享单曲'},
					{id: 19, name: '分享专辑'},
					{id: 17, name: '分享电台节目'},
					{id: 28, name: '分享电台节目'},
					{id: 22, name: '转发'},
					{id: 39, name: '发布视频'},
					{id: 13, name: '分享歌单'},
					{id: 24, name: '分享专栏文章'},
					{id: 21, name: '分享MV'},
					{id: 41, name: '分享视频'},
				]
			}
		},
		created() {
			this.getEventTypeName()
		},
		methods:{
			// 计算动态类型
			getEventTypeName(eventType){
				let result = "分享动态"
				this.eventTypes.forEach((item)=>{
					if(item.id === eventType){
						result = item.name
					}
				})
				this.eventTypeName = result
			}
		},
		computed:{
			// 计算转发原作者的信息
			sourceEvent(){
				return JSON.parse(this.data.event.json)
			},
			sourceEventMsg(){
				let result = JSON.parse(this.data.event.json).msg.replace(/\n/g,'<p>')
				if(this.data.event.actName){
					result = result.replace('#'+this.data.event.actName+'#','<a style="cursor: pointer;color: #0b58b0">#'+this.data.event.actName+'#</a>')
				}
				result = '<a style="cursor: pointer;color: #0b58b0">@'+ this.data.event.user.nickname +'</a>&nbsp;'+ this.eventTypeName + '&nbsp;'+ result
				return result
			}
		}
	}
</script>

<style lang="scss" scoped>
	.event-repost-container{
		position: relative;
		width: 100%;
		height: auto;
		border-radius: 7px;
		background: #f3f3f3;
		overflow: hidden;
		&:hover{
			background: #efefee;
		}
		.content{
			position: relative;
			height: auto;
			width: auto;
			margin: 10px 0;
			padding: 10px;
			.event-msg{
				margin: 10px 0;
				font-size: 12px;
				color: #555;
				a{
					cursor: pointer;
				}
			}
			.event-content{
				.event-content-item{
					background: #f9f9f9;
				}
			}
			.event-pics{
				display: grid;
				grid-gap: 5px;
				grid-template-columns: auto auto auto;
				grid-template-rows: auto auto auto;
				position: relative;
				max-width: 380px;
				max-height: 370px;
				.pic{
					float: left;
					border-radius: 7px;
					width: 120px;
					height: 120px;
					overflow: hidden;
					img{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.event-repost-container{
		border-radius: 5px;
		.content{
			margin: 5px 0;
			padding: 7px;
			.event-pics{
				max-width: 260px;
				max-height: 260px;
				.pic{
					border-radius: 5px;
					width: 80px;
					height: 80px;
				}
			}
		}
	}
}
</style>
