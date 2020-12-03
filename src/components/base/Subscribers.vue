<template>
	<div class="subscribers-container">
		<div class="content">
			<ul class="subscribers">
				<router-link
				tag="li"
				:to="`/page/user/` + item.userId"
				class="item"
				v-for="(item, i) in subscribers"
				:key="i">
					<div class="avatar">
						<img :src="item.avatarUrl" alt="">
					</div>
					<div class="name">
						{{ item.nickname }}
					</div>
				</router-link>
				<li
				class="item temp"
				v-for="i in 9"
				:key="'temp-'+i">
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {formatDate} from '@/utils'
	import {mapState} from 'vuex'
	
	export default{
		props:{
			id:{
				type: [String, Number],
				required: true
			},
			type:{
				type: String,
				default: 'music',
				required: true
			}
		},
		data(){
			return{
				subscribers: [],
			};
		},
		methods:{
			getSubscribers(id, type){
				switch (type){
					case 'playlist':
						this.subscribersOfPlaylist(id)
						break;
					case 'dj':
						this.djSubscribers(id)
						break;
					default:
				}
			},
			async subscribersOfPlaylist(id){
				const data = await this.$api.getPlaylistSubscribers({
					id,
				})
				// console.log(data)
				if(data.code === 200){
					this.subscribers = data.subscribers
				}
			},
			async djSubscribers(id){
				const data = await this.$api.getDJSubscribers({
					id,
					limit: 999
				})
				// console.log(data)
				if(data.code === 200){
					this.subscribers = data.subscribers
				}
			},
		},
		watch: {
		  id:{
		    handler(newId) {
				if (newId){
					this.getSubscribers( this.id, this.type)
				}
		    },
			immediate: true
		  }
		},
	}
</script>

<style lang="scss" scoped>
	.subscribers-container{
		margin: 20px 20px 0;
		.content{
			ul.subscribers{
				display: flex;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: space-around;
				list-style: none;
				line-height: 20px;
				margin: 0 0 10px;
				padding: 10px 0;
				font-size: 13px;
				color: #333;
				li.item{
					cursor: pointer;
					display: inline-block;
					width: 120px;
					margin: 15px 30px;
					padding: 0;
					overflow: hidden;
					&.temp {
						width: 120px;
						height: 0;
						margin: 0 30px;
					}
					.avatar{
						width: 80px;
						height: 80px;
						margin: 0 20px;
						border: 1px solid #eee;
						border-radius: 50%;
						overflow: hidden;
						img{
							width: 100%;
							height: 100%;
						}
					}
					.name{
						width: 120px;
						height: 40px;
						line-height: 40px;
						font-size: 14px;
						text-align: center;
						text-overflow: ellipsis;
						word-break: break-all;
						white-space: nowrap;
						overflow: hidden;
					}
				}
			}
		}
	}
@media screen and (max-width: 540px) {
	.subscribers-container{
		margin: 10px 10px 0;
		.content{
			ul.subscribers{
				line-height: 20px;
				margin: 0;
				padding: 0;
				font-size: 10px;
				li.item{
					display: inline-block;
					width: 60px;
					margin: 0 15px 10px;
					padding: 0;
					&.temp {
						width: 60px;
						height: 0;
						margin: 0 15px;
					}
					.avatar{
						width: 50px;
						height: 50px;
						margin: 0 5px;
					}
					.name{
						width: 60px;
						height: 20px;
						line-height: 20px;
						margin-top: 5px;
						font-size: 10px;
					}
				}
			}
		}
	}
}
</style>
