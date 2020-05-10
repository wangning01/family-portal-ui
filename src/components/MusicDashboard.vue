<template>
  <v-content class="background">
    <navigation-comp></navigation-comp>
    <v-container fluid >
      <v-layout row wrap>
        <v-flex  xs12 >
          <div class="spaceHolder">
            <header-comp></header-comp>
          </div>
        </v-flex>
        <v-flex v-for="(video, index) in videos" :key="video.videoId" xs4 class="pr-1 pb-1">
          <v-card >
            <v-layout >
              <v-flex xs7 class="video-bg-color" @click.prevent="play(video)">
                  <v-layout>
                      <yt-player :yturl="video.youtubeLink" ref="yt" :width="225" :height="120" :playerVars="playerVars"></yt-player>
                  </v-layout>
              </v-flex>
              <v-flex xs5 class="video-bg-color" >
                <!-- <v-container fill-height> -->
                  <v-layout column wrap justify-center>
                    <!-- <div> -->
                      <v-layout row wrap>
                        <v-flex xs9  @click="play(video)">
                          <h3>{{video.name}}</h3>
                        </v-flex>
                        <v-flex xs3 pl-3>
                          <v-icon @click="showMenu(video, index)" :id="'menu_'+index">menu</v-icon>
                        </v-flex>
                      </v-layout>
                      <!-- <v-toolbar-side-icon style="float:right"  ></v-toolbar-side-icon> -->
                    <!-- </div> -->
                    <!-- <v-layout  @click="play(video)">
                      by {{video.performedBy}}
                    </v-layout> -->
                  </v-layout>
                  <v-layout  @click="play(video)" fill-height>
                    <v-flex xs12 >
                          by {{video.performedBy}}
                    </v-flex>
                  </v-layout>
                <!-- </v-container> -->
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
      <v-dialog v-model="isDisplay" width="560" persistent>
        <v-card>
          <v-card-title
            class="headline primary pb-1 pt-1"
            primary-title
          >
            <v-spacer>{{thisVideo.name}}</v-spacer>
            <v-icon @click="closeDialog">close</v-icon>
          </v-card-title>
        <!-- <youtube :src="youtubeLink" :width="560" :height="315"></youtube> -->
        <!-- <youtube :video-id="videoId" ref="youtube" width="560" height="315" :player-vars="playerVars"></youtube> -->
            <yt-player 
            ref="youtube" 
            :width="560" 
            :height="315" 
            @ended="playNext"
            :playerVars="playerVars"></yt-player>
        </v-card>
      </v-dialog>
    </v-container>
  </v-content>
</template>

<script>
/* eslint-disable no-dupe-keys */
import HeaderComp from '@/components/common/HeaderComp.vue'
import NavigationComp from '@/components/common/NavigationComp.vue'
import axios from 'axios'
import ActionTypes from '@/plugins/store/types.js'

export default {
  name: 'Home',
  components: {HeaderComp, NavigationComp},
  beforeMount: function () {
    // console.log(this.$store.state)
    axios({
      method: 'GET',
      'url': '/api/allVideos'
    }).then((response) => {
      console.log('videos:')
      console.log(response.data)
      this.$store.dispatch(ActionTypes.UPDATE_VIDEOS, {videos: response.data})
    },
    (error) => {
      console.log(error)
    });

    // Load left navigation filters
    axios({
      method: 'GET',
      'url': '/api/filters'
    }).then((response) => {
      console.log('filters:')
      console.log(response.data)
      this.$store.dispatch(ActionTypes.UPDATE_FILTERS, {filters: response.data})
    },
    (error) => {
      console.log(error)
    });

  },
  data () {
    return {
      items: [
        { title: this.$t('navigationDrawer.addNewVideoLabel'), icon: 'add' }
      ],
      isDisplay: false,
      playerVars: {
        origin: 'https://localhost:8080',
        enablejsapi: 1
      },
      thisVideo: {},
      isDisplayEditDialog: false
    }
  },
  computed: {
    videos: {
      get: function () {
        return this.$store.state.videos
      }
    }
  },
  methods: {
    play (video) {
      // console.log('Now playing' + video.name)
      // this.isDisplay = true
      // this.thisVideo = video
      // this.$refs.youtube.loadByUrl(video.youtubeLink)
      // this.$refs.youtube.player.playVideo()
      this.$playVideoList(
        {
          startVideo: video,
          list: this.videos,
          continuous: true
        }
      )
    },
    playing () {
      console.log('we are watching')
    },
    closeDialog () {
      this.$refs.youtube.player.stopVideo()
      this.isDisplay = false
    },
    showMenu (video, index) {
      // alert('Menu clicked.')
      let options = {
        parent: this,
        video: video,
        index: index
      }
      this.$actionOnVideoDialog(options).then(
        response => {
          console.log('action: '+response.action)
        }
      )
    },
    playNext (){
      let nextIndex = this.$store.state.videos.findIndex(
        video=>video.videoId===this.thisVideo.videoId
      ) + 1
      if(nextIndex<this.$store.state.videos.length){
        this.play(this.$store.state.videos[nextIndex])
        // this.$refs.youtube.loadByUrl(this.thisVideo.youtubeLink)
        // this.$refs.youtube.player.playVideo()
        // this.thisVideo = this.$store.state.videos[index+1]
      }
    },
    onPlayerReady (){
      this.$refs.youtube.player.playVideo()
    }
    
  }
}
</script>

<style scoped>
  .background {
    /*background-image: url("../assets/image/home.jpg");*/
    background-size: cover;
  }
  .spaceHolder {
    height: 20px;
  }
  .resultContainer {
    height: 350px;
  }

  .video-bg-color {
    background-color: rgb(163, 163, 194)
  }
</style>
