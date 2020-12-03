<template>
	<div class="player-sidebar-container">
		<SimiPlayList></SimiPlayList>
		<SimiSongs></SimiSongs>
	</div>
</template>

<script>
	import SimiPlayList from '@/components/base/SimiPlayList.vue'
	import SimiSongs from '@/components/base/SimiSongs.vue'
	
	export default{
		components:{
			SimiPlayList,
			SimiSongs
		},
		data(){
			return{
				
			};
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.player-sidebar-container{
		position: relative;
	}
</style>
