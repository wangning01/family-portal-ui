<template>
    <v-dialog v-model="isDisplay" width="560" persistent>
        <v-card>
          <v-card-title
            class="headline primary pb-1 pt-1"
            primary-title
          >
            <v-spacer>{{this.nextVideo.name}}</v-spacer>
            <v-icon @click="closeDialog">close</v-icon>
          </v-card-title>
            <yt-player 
            ref="ytplayer" 
            :width="560" 
            :height="315" 
            @ready="onPlayerReady"
            @ended="playNext"
            :playerVars="playerVars"></yt-player>
        </v-card>
      </v-dialog>
</template>

<script>
export default {
    beforeMount(){
        this.nextVideo = this.startVideo
    },
    mounted() {
        // this.playVideo(this.list[this.nextVideo])
    },
    props: {
        startVideo: {
            type: Object
        },
        list: {
            type: Array
        },
        continuous: {
            type: Boolean
        }
    },
    data() {
        return {
            isDisplay: true,
            playerVars: {
                origin: 'https://localhost:8081',
                enablejsapi: 1
            },
            nextVideo: null
        }
    },
    methods: {
        onPlayerReady(){
            // let videoIndex = this.findIndexOfVideo(this.startVideo, this.list)
            // this.playVideo(this.list[this.nextVideo])
            this.playVideo(this.nextVideo)
        },
        playVideo(video) {
            // this.thisVideo = video
            this.$refs.ytplayer.loadByUrl(video.youtubeLink)
            this.$refs.ytplayer.player.playVideo()
        },
        stopVideo(){
            if(this.$refs.ytplayer.player) 
                this.$refs.ytplayer.player.stopVideo()
        },
        playNext (){
            if(this.continuous){
                this.nextVideo = this.findNextVideoInList(this.nextVideo, this.list)
                if(this.nextVideo) this.playVideo(this.nextVideo)
            }else{
                this.isDisplay = false
                this.$$destroy()
            }

            
        },
        findNextVideoInList(current, list){
            let nextIndex = list.findIndex(
                video=>video.videoId===current.videoId
            ) + 1
            return list[nextIndex]
        },
        closeDialog() {
            this.isDisplay = false
            this.stopVideo()
            this.$destroy()
        }
    }
}
</script>

<style>

</style>
