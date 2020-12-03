<template>
	<div class="user-events-list-container">
		<div
		class="event"
		v-if="item.eventType != 33"
		v-for="(item,i) in events"
		:key="i">
			<div class="header">
				<router-link
				tag="div"
				:to="`/page/user/` + item.userId"
				class="avatar">
					<img :src="item.userAvatar" alt="">
				</router-link>
				<router-link
				tag="div"
				:to="`/page/user/` + item.userId"
				class="text">
					<div class="name">
						{{ item.userName }}
						<span> {{ item.eventTypeName }} </span>
					</div>
					<div class="time">
						{{ item.eventTime|formatDate('YYYY年MM月DD日') }}
					</div>
				</router-link>
			</div>
			<div class="body">
				<div class="msg">
					{{ item.eventData.msg }}
				</div>
				
				<EventAlbum
				:data="item.eventData"
				v-if="item.eventType === 19 "></EventAlbum>
				
				<EventArticle
				:data="item.eventData"
				v-if="item.eventType === 24 "></EventArticle>
				
				<EventDJRadio
				:data="item.eventData"
				v-if="item.eventType === 28 "></EventDJRadio>
				
				<EventDJProgram
				:data="item.eventData"
				v-if="item.eventType === 17"></EventDJProgram>
				
				<EventPlaylist
				:data="item.eventData"
				v-if="item.eventType === 13"></EventPlaylist>
				
				<EventRepost
				:data="item.eventData"
				v-if="item.eventType === 22"></EventRepost>
				
				<EventSong
				:data="item.eventData"
				v-if="item.eventType === 18"></EventSong>
				
				<EventMV
				:data="item.eventData"
				v-if="item.eventType === 21"></EventMV>
				
				<EventVideo
				:data="item.eventData"
				v-if="item.eventType === 41"></EventVideo>
			</div>
		</div>
	</div>
</template>

<script>
	import {formatDate} from '@/utils'
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
			userId:{
				type: Number|String,
				required: true
			}
		},
		data(){
			return{
				events: [],
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
			this.event()
		},
		methods:{
			// 计算动态类型
			getEventTypeName(eventType){
				let result = null
				this.eventTypes.forEach((item)=>{
					if(item.id === eventType){
						result = item.name
					}
				})
				return result
			},
			// 朋友圈动态
			async event(){
				const data = await this.$api.getEvent({
					pagesize: 20
				})
				console.log(data)
				if(data.code === 200){
					const result = data.event.map((events)=>{
						return{
							actId: events.actId,
							actName: events.actName,
							userId: events.user.userId,
							userName: events.user.nickname,
							userAvatar: events.user.avatarUrl,
							eventData: JSON.parse(events.json),
							eventTime: events.eventTime,
							eventType: events.type,
							eventTypeName: this.getEventTypeName(events.type)
						}
					})
					this.events = result
				}
			},
		},
	}
</script>

<style lang="scss">
	.user-events-list-container{
		cursor: default;
		position: relative;
		width: auto;
		height: auto;
		.event{
			position: relative;
			width: 100%;
			height: auto;
			border-bottom: 1px solid #eee;
			padding-top: 10px;
			padding-bottom: 30px;
			.header{
				height: auto;
				padding: 10px 0;
				.avatar{
					cursor: pointer;
					float: left;
					width: 40px;
					height: 40px;
					border-radius: 50%;
					overflow: hidden;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.text{
					cursor: pointer;
					height: 40px;
					line-height: 20px;
					width: auto;
					margin-left: 50px;
					.name{
						font-size: 13px;
						color: #0b58b0;
						span{
							font-size: 12px;
							color: #999;
						}
					}
					.time{
						font-size: 11px;
						color: #999;
					}
				}
			}
			.body{
				position: relative;
				.msg{
					margin: 5px 0;
					font-size: 15px;
					color: #333;
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.user-events-list-container{
		.event{
			padding-top: 5px;
			padding-bottom: 15px;
			.header{
				padding: 5px 0;
				.avatar{
					width: 32px;
					height: 32px;
				}
				.text{
					height: 32px;
					line-height: 16px;
					margin-left: 40px;
					.name{
						font-size: 12px;
						span{
							font-size: 10px;
						}
					}
					.time{
						font-size: 10px;
					}
				}
			}
			.body{
				.msg{
					font-size: 12px;
				}
			}
		}
	}
}
</style>
