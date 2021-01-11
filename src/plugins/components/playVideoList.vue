<template>
    <v-dialog v-model="isDisplay" width="560" persistent>
        <v-card class="primary">
          <v-card-title
            class="headline primary pb-1 pt-1"
            primary-title
          >
            <v-spacer>{{computedVideo.name}}</v-spacer>
            <v-icon @click="closeDialog">close</v-icon>
          </v-card-title>
            <!-- <yt-player 
            ref="ytplayer" 
            :width="560" 
            :height="315" 
            @ready="onPlayerReady"
            @ended="playNext"
            :playerVars="playerVars"></yt-player> -->
            <youtube  
            ref="ytplayer" 
            width="560" 
            height="320"  
            @ready="onPlayerReady"
            @ended="playNext" 
            :player-vars="playerVars">
            </youtube>
            
            <!-- <v-card-title class="headline primary pb-1 pt-1" > -->
                <v-card-actions class="primary pb-2" >
                <v-spacer></v-spacer>
                <v-btn  color="red" dark><v-icon @click="stopAndPlayPrevious">skip_previous</v-icon></v-btn>
                <v-btn  color="red" dark><v-icon @click="stopAndPlayNext">skip_next</v-icon> </v-btn>
                </v-card-actions>
            <!-- </v-card-title> -->
        </v-card>
      </v-dialog>
</template>

<script>
export default {
    beforeMount(){
        this.currentVideo = this.startVideo
    },
    mounted() {
        // this.playVideo(this.list[this.currentVideo])
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
            currentVideo: null
        }
    },
    computed: {
        computedVideo: {
            get: function(){
                return this.currentVideo
            }
        }
    },
    methods: {
        onPlayerReady(){
            // let videoIndex = this.findIndexOfVideo(this.startVideo, this.list)
            // this.playVideo(this.list[this.currentVideo])
            this.playVideo(this.currentVideo)
        },
        playVideo(video) {
            // this.thisVideo = video
            // this.$refs.ytplayer.loadByUrl(video.youtubeLink)
            this.$refs.ytplayer.player.loadVideoByUrl(video.youtubeLink)
            this.$refs.ytplayer.player.playVideo()
        },
        stopVideo(){
            if(this.$refs.ytplayer.player) 
                this.$refs.ytplayer.player.stopVideo()
        },
        playPrevious() {
            this.currentVideo = this.findPreviousVideoInList(this.currentVideo, this.list)
            if(this.currentVideo) this.playVideo(this.currentVideo)
        },
        playNext (){
            if(this.continuous){
                let nextV = this.findNextVideoInList(this.currentVideo, this.list)
                if(nextV){
                    this.currentVideo = this.findNextVideoInList(this.currentVideo, this.list)
                    this.playVideo(this.currentVideo)
                }
            }else{
                this.isDisplay = false
                this.$$destroy()
            }
        },
        findPreviousVideoInList(current, list) {
            let prevIndex = list.findIndex(
                video=>video.videoId===current.videoId
            ) - 1
            return list[prevIndex]
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
        },
        stopAndPlayNext() {
            this.stopVideo()
            this.playNext()
        },
        stopAndPlayPrevious() {
            this.stopVideo
            this.playPrevious()
        }
    }
}
</script>

<style>

</style>
