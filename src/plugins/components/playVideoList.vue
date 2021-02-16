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
            <youtube  
            ref="ytplayer" 
            width="560" 
            height="320"  
            @ready="onPlayerReady"
            @ended="playNext" 
            :player-vars="playerVars">
            </youtube>
            
                <v-card-actions class="primary pb-2" >
                <v-spacer></v-spacer>
                <v-btn  color="red" dark><v-icon @click="stopAndPlayPrevious">skip_previous</v-icon></v-btn>
                <v-btn  color="red" dark><v-icon @click="stopAndPlayNext">skip_next</v-icon> </v-btn>
                </v-card-actions>
        </v-card>
      </v-dialog>

       <!-- <dialog-drag title="test dialog" id="d1" :options="{ width:560,height:320,x:300,y:250 }" >
        <p>This is a test <strong>dialog</strong></p>
        </dialog-drag> -->

</template>

<script>
import DialogDrag from 'vue-dialog-drag'
export default {
    beforeMount(){
        this.currentVideo = this.startVideo
    },
    mounted() {
        // this.playVideo(this.list[this.currentVideo])
    },
    components: {
        DialogDrag
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
.dialog-drag{-webkit-animation-duration:.2s;-webkit-animation-name:dialog-anim;-webkit-animation-timing-function:ease-in;-webkit-box-shadow:1px 1px 1px rgba(0,0,0,.5);animation-duration:.2s;animation-name:dialog-anim;animation-timing-function:ease-in;background-color:#fff;border:2px solid #1aad8d;box-shadow:1px 1px 1px rgba(0,0,0,.5);height:auto;position:absolute;width:auto;z-index:101}
.dialog-drag .dialog-header{background-color:#1976D2;color:#fff;font-size:.9em;padding:1em 3em .25em 1em;position:relative;text-align:left;width:auto}
.dialog-drag .dialog-header .buttons{margin:.25em .25em 0 0;position:absolute;right:0;top:0;z-index:105}
.dialog-drag .dialog-header button.close,.dialog-drag .dialog-header button.pin{-webkit-box-shadow:none;background:transparent;border:none;box-shadow:none;color:#fff}
.dialog-drag .dialog-header button.close:hover,.dialog-drag .dialog-header button.pin:hover{color:#e3a826}
.dialog-drag .dialog-header button.close:after{content:"\2716"}
.dialog-drag .dialog-header button.pin:after{content:"\1F513"}
.dialog-drag .dialog-body{padding:1em}
.dialog-drag.fixed{-moz-user-select:auto;-ms-user-select:auto;-webkit-user-select:auto;border-color:#e3a826;user-select:auto}
.dialog-drag.fixed button.pin{font-weight:700}
.dialog-drag.fixed button.pin:after{content:"\1F512"}
@-webkit-keyframes dialog-anim{0%{-webkit-transform:scaleX(.1);opacity:0;transform:scaleX(.1)}50%{-webkit-transform:rotate(1deg);transform:rotate(1deg)}to{opacity:1}}
@keyframes dialog-anim{0%{-webkit-transform:scaleX(.1);opacity:0;transform:scaleX(.1)}50%{-webkit-transform:rotate(1deg);transform:rotate(1deg)}to{opacity:1}}
</style>
